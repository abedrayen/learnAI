import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_1_SLIDES_ENHANCED } from '../data/learningSlides2';

interface DraggableIcon {
  sprite: Phaser.GameObjects.Container;
  type: 'rule-based' | 'ml' | 'dl';
  name: string;
  icon: string;
  originalX: number;
  originalY: number;
  isDragging: boolean;
  isPlaced: boolean;
  correctZone: 'rule-based' | 'ml' | 'dl';
}

interface AIZone {
  container: Phaser.GameObjects.Container;
  type: 'rule-based' | 'ml' | 'dl';
  label: string;
  color: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BrainChoice {
  container: Phaser.GameObjects.Container;
  type: 'rule' | 'ml' | 'dl';
  label: string;
  reaction: string;
}

export default class Level1_AI_Jungle extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  
  // Activity 1: AI Ecosystem Drag & Drop
  private ecosystemContainer?: Phaser.GameObjects.Container;
  private draggableIcons: DraggableIcon[] = [];
  private aiZones: AIZone[] = [];
  private placedCount: number = 0;
  
  // Activity 2: AI Guess-the-Brain
  private brainGameContainer?: Phaser.GameObjects.Container;
  private currentScenario?: { description: string; animation: string; correct: 'rule' | 'ml' | 'dl' };
  private brainChoices: BrainChoice[] = [];
  private scenarioIndex: number = 0;
  private scenarios: Array<{ description: string; animation: string; correct: 'rule' | 'ml' | 'dl' }> = [];
  
  private exitButton?: Phaser.GameObjects.Rectangle;
  private activityCompleted: { ecosystem: boolean; brainGame: boolean } = { ecosystem: false, brainGame: false };

  constructor() {
    super({ key: 'Level1_AI_Jungle' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    // Background
    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    // Create exit button
    this.createExitButton();

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_1_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the AI Jungle! Complete two interactive activities:\n\n' +
          '1. AI Ecosystem Map - Drag AI examples to the correct zones\n' +
          '2. AI Guess-the-Brain - Choose the right AI type for each scenario',
          () => {
            // Ensure dialog is hidden
            this.dialogBox!.hide();
            this.time.delayedCall(100, () => {
              this.startEcosystemActivity();
            });
          }
        );
      });
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.on('pointerdown', () => {
      if (this.activityCompleted.ecosystem && this.activityCompleted.brainGame) {
        this.completeLevel();
      } else {
        this.dialogBox!.show(
          'Complete both activities first!',
          () => {}
        );
      }
    });

    const exitText = this.add.text(1200, 650, 'EXIT', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitText.setOrigin(0.5);
    exitText.setDepth(10);
  }

  // ========== ACTIVITY 1: AI ECOSYSTEM DRAG & DROP MAP ==========
  private startEcosystemActivity(): void {
    this.placedCount = 0;
    
    // Create fullscreen overlay
    this.ecosystemContainer = this.add.container(640, 360);
    this.ecosystemContainer.setDepth(2000); // Higher than dialog box
    
    // Background overlay - don't make it interactive so it doesn't block child elements
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.8);
    this.ecosystemContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'AI Ecosystem Map', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.ecosystemContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -280, 'Drag each AI example to its correct zone', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.ecosystemContainer.add(instructions);
    
    // Label for icons (centered above the icons)
    const iconsLabel = this.add.text(0, -240, '', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    iconsLabel.setOrigin(0.7);
    this.ecosystemContainer.add(iconsLabel);
    
    // Create zones
    this.createAIZones();
    
    // Create draggable icons
    this.createDraggableIcons();
    
    // Close button
    const closeBtn = this.add.rectangle(600, -300, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -300, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.placedCount >= this.draggableIcons.length) {
        this.activityCompleted.ecosystem = true;
        this.ecosystemContainer!.destroy();
        this.dialogBox!.show('Great! Now try the AI Guess-the-Brain game!', () => {
          this.startBrainGame();
        });
      } else {
        this.dialogBox!.show('Place all icons first!', () => {});
      }
    });
    this.ecosystemContainer.add([closeBtn, closeText]);
  }

  private createAIZones(): void {
    const zones = [
      { type: 'rule-based' as const, label: 'Rule-Based Zone\n(Algorithmic Trees)', x: -350, y: 50, color: COLORS.BG_LIGHT },
      { type: 'ml' as const, label: 'Machine Learning Valley', x: 0, y: 50, color: COLORS.PRIMARY },
      { type: 'dl' as const, label: 'Deep Learning Caverns', x: 350, y: 50, color: COLORS.SECONDARY }
    ];
    
    zones.forEach(zoneData => {
      const container = this.add.container(zoneData.x, zoneData.y);
      
      // Zone background
      const bg = this.add.rectangle(0, 0, 280, 350, zoneData.color, 0.3);
      bg.setStrokeStyle(4, zoneData.color);
      container.add(bg);
      
      // Zone label
      const label = this.add.text(0, -140, zoneData.label, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 250 }
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Drop zone indicator
      const dropZone = this.add.rectangle(0, 20, 250, 250, 0xffffff, 0.1);
      dropZone.setStrokeStyle(2, 0xffffff, 0.5);
      container.add(dropZone);
      
      this.aiZones.push({
        container,
        type: zoneData.type,
        label: zoneData.label,
        color: zoneData.color,
        x: zoneData.x,
        y: zoneData.y,
        width: 280,
        height: 350
      });
      
      this.ecosystemContainer!.add(container);
    });
  }

  private createDraggableIcons(): void {
    const icons: Array<{ name: string; icon: string; correctZone: 'rule-based' | 'ml' | 'dl' }> = [
      { name: 'Tesla Car', icon: '🚗', correctZone: 'dl' },
      { name: 'Netflix', icon: '📺', correctZone: 'ml' },
      { name: 'Google Lens', icon: '🔍', correctZone: 'dl' },
      { name: 'Spam Filter', icon: '📧', correctZone: 'ml' },
      { name: 'Anti-cheat Bot', icon: '🛡️', correctZone: 'ml' },
      { name: 'Calculator', icon: '🔢', correctZone: 'rule-based' }
    ];
    
    // Arrange icons horizontally in a single row, centered above the zones
    const totalIcons = icons.length;
    const iconSpacing = 160; // Space between icons (reduced to fit better)
    const totalWidth = (totalIcons - 1) * iconSpacing;
    const startX = -totalWidth / 2; // Center the row
    const startY = -220; // Position well above the zones (zones are at y: 50, with labels at y: -90)
    
    icons.forEach((iconData, index) => {
      const x = startX + index * iconSpacing;
      const y = startY;
      
      const container = this.add.container(x, y);
      
      // Icon background - make this interactive
      const bg = this.add.rectangle(0, 0, 90, 90, COLORS.WARNING, 0.8);
      bg.setStrokeStyle(3, COLORS.WARNING);
      container.add(bg);
      
      // Icon emoji
      const iconText = this.add.text(0, -10, iconData.icon, { fontSize: '35px' });
      iconText.setOrigin(0.5);
      container.add(iconText);
      
      // Icon label
      const label = this.add.text(0, 30, iconData.name, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 80 }
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Create draggable icon object first
      const draggableIcon: DraggableIcon = {
        sprite: container,
        type: iconData.correctZone,
        name: iconData.name,
        icon: iconData.icon,
        originalX: x,
        originalY: y,
        isDragging: false,
        isPlaced: false,
        correctZone: iconData.correctZone
      };
      
      // Make container draggable - set up interactive area
      container.setInteractive(
        new Phaser.Geom.Rectangle(-45, -45, 90, 90),
        Phaser.Geom.Rectangle.Contains
      );
      container.setData('isDragging', false);
      container.setData('iconData', draggableIcon); // Store reference
      
      // Enable dragging
      this.input.setDraggable(container);
      
      // Visual feedback on hover
      container.on('pointerover', () => {
        if (!draggableIcon.isPlaced) {
          container.setScale(1.05);
        }
      });
      
      container.on('pointerout', () => {
        if (!draggableIcon.isDragging && !draggableIcon.isPlaced) {
          container.setScale(1);
        }
      });
      
      this.draggableIcons.push(draggableIcon);
      this.ecosystemContainer!.add(container);
      
      // Drag events - store reference for event handlers
      const iconRef = draggableIcon;
      let dragOffsetX = 0;
      let dragOffsetY = 0;
      
      // Use global input events but check for this specific container
      this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        if (gameObject === container && !iconRef.isPlaced) {
          iconRef.isDragging = true;
          container.setScale(1.1);
          container.setDepth(3000); // Higher depth when dragging
          
          // Calculate offset from pointer to container center
          // Container's world position = ecosystemContainer world (640, 360) + container local (x, y)
          const containerWorldX = 640 + container.x;
          const containerWorldY = 360 + container.y;
          dragOffsetX = pointer.worldX - containerWorldX;
          dragOffsetY = pointer.worldY - containerWorldY;
        }
      });
      
      this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        if (gameObject === container && iconRef.isDragging && !iconRef.isPlaced) {
          // Convert world coordinates to container-relative coordinates
          // ecosystemContainer is at world position (640, 360)
          // Account for the drag offset to keep the cursor at the same relative position
          container.x = pointer.worldX - 640 - dragOffsetX;
          container.y = pointer.worldY - 360 - dragOffsetY;
        }
      });
      
      this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        if (gameObject === container && iconRef.isDragging) {
          iconRef.isDragging = false;
          container.setScale(1);
          
          // Check if dropped in correct zone
          // Container coordinates are relative to ecosystemContainer (which is at 640, 360)
          const containerX = container.x;
          const containerY = container.y;
          
          let droppedInZone = false;
          for (const zone of this.aiZones) {
            const zoneX = zone.x; // Already relative to ecosystemContainer
            const zoneY = zone.y;
            // Check if dropped within zone bounds (zone is 280x350, centered at zoneX, zoneY)
            if (Math.abs(containerX - zoneX) < 140 && Math.abs(containerY - zoneY) < 175) {
              droppedInZone = true;
              
              if (zone.type === draggableIcon.correctZone) {
                // Correct placement!
                draggableIcon.isPlaced = true;
                container.x = zoneX;
                container.y = zoneY;
                container.setAlpha(0.8);
                this.placedCount++;
                
                // Particle effect
                this.createParticleBurst(zoneX, zoneY, zone.color);
                
                // Sound feedback (visual)
                const feedback = this.add.text(zoneX, zoneY - 100, '✓ Correct!', {
                  fontSize: '24px',
                  color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
                  fontFamily: 'Arial',
                  fontStyle: 'bold'
                });
                feedback.setOrigin(0.5);
                this.ecosystemContainer!.add(feedback);
                this.tweens.add({
                  targets: feedback,
                  alpha: 0,
                  y: feedback.y - 50,
                  duration: 1000,
                  onComplete: () => feedback.destroy()
                });
                
                if (this.placedCount >= this.draggableIcons.length) {
                  this.time.delayedCall(1000, () => {
                    this.dialogBox!.show('Perfect! All icons placed correctly!', () => {});
                  });
                }
              } else {
                // Incorrect - shake and hint
                this.tweens.add({
                  targets: container,
                  x: container.x - 10,
                  duration: 50,
                  yoyo: true,
                  repeat: 5,
                  onComplete: () => {
                    container.x = draggableIcon.originalX;
                    container.y = draggableIcon.originalY;
                  }
                });
                
                const hint = this.add.text(zoneX, zoneY - 100, 'Needs training data...', {
                  fontSize: '18px',
                  color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
                  fontFamily: 'Arial',
                  fontStyle: 'italic'
                });
                hint.setOrigin(0.5);
                this.ecosystemContainer!.add(hint);
                this.tweens.add({
                  targets: hint,
                  alpha: 0,
                  duration: 2000,
                  onComplete: () => hint.destroy()
                });
              }
              break;
            }
          }
          
          if (!droppedInZone && !draggableIcon.isPlaced) {
            // Return to original position
            container.x = draggableIcon.originalX;
            container.y = draggableIcon.originalY;
          }
        }
      });
    });
  }

  private createParticleBurst(x: number, y: number, color: number): void {
    // Create visual burst effect with circles
    // Coordinates are relative to ecosystemContainer
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 30;
      const particle = this.add.circle(0, 0, 5, color);
      particle.setAlpha(0.8);
      particle.x = x;
      particle.y = y;
      this.ecosystemContainer!.add(particle);
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0,
        duration: 500,
        onComplete: () => particle.destroy()
      });
    }
  }

  // ========== ACTIVITY 2: AI GUESS-THE-BRAIN ==========
  private startBrainGame(): void {
    this.scenarioIndex = 0;
    
    this.scenarios = [
      { description: 'A robot sees a cat in an image', animation: '🤖👁️🐱', correct: 'dl' },
      { description: 'A device transcribes speech to text', animation: '🎤→📝', correct: 'dl' },
      { description: 'A system follows "if temperature > 30, turn on AC"', animation: '🌡️→❄️', correct: 'rule' },
      { description: 'An app recommends movies based on your history', animation: '📊→🎬', correct: 'ml' },
      { description: 'A chess engine evaluates board positions', animation: '♟️→🧠', correct: 'ml' }
    ];
    
    this.showNextScenario();
  }

  private showNextScenario(): void {
    if (this.scenarioIndex >= this.scenarios.length) {
      this.activityCompleted.brainGame = true;
      this.dialogBox!.show('Excellent! You completed the AI Guess-the-Brain game!', () => {
        if (this.brainGameContainer) {
          this.brainGameContainer.destroy();
        }
      });
      return;
    }
    
    this.currentScenario = this.scenarios[this.scenarioIndex];
    
    // Create fullscreen overlay
    if (this.brainGameContainer) {
      this.brainGameContainer.destroy();
    }
    this.brainGameContainer = this.add.container(640, 360);
    this.brainGameContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.brainGameContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -280, 'AI Guess-the-Brain', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.brainGameContainer.add(title);
    
    // Scenario animation
    const animText = this.add.text(0, -180, this.currentScenario.animation, {
      fontSize: '60px',
      fontFamily: 'Arial'
    });
    animText.setOrigin(0.5);
    this.brainGameContainer.add(animText);
    
    // Scenario description
    const desc = this.add.text(0, -100, this.currentScenario.description, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      wordWrap: { width: 800 }
    });
    desc.setOrigin(0.5);
    this.brainGameContainer.add(desc);
    
    const question = this.add.text(0, -50, 'Which AI type handles this?', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    question.setOrigin(0.5);
    this.brainGameContainer.add(question);
    
    // Create brain choices
    this.createBrainChoices();
  }

  private createBrainChoices(): void {
    const choices = [
      { type: 'rule' as const, label: 'Rule-Brain', reaction: 'I don\'t see images, give me rules! 😵', color: COLORS.BG_LIGHT },
      { type: 'ml' as const, label: 'ML-Brain', reaction: 'Ah yes, I learned this pattern. 😎', color: COLORS.PRIMARY },
      { type: 'dl' as const, label: 'DL-Brain', reaction: 'Give me pixels, I feast! 🧠🔥', color: COLORS.SECONDARY }
    ];
    
    this.brainChoices = [];
    const spacing = 400;
    const startX = -400;
    
    choices.forEach((choiceData, index) => {
      const x = startX + index * spacing;
      const container = this.add.container(x, 100);
      
      // Brain box
      const box = this.add.rectangle(0, 0, 300, 200, choiceData.color, 0.7);
      box.setStrokeStyle(4, choiceData.color);
      box.setInteractive({ useHandCursor: true });
      container.add(box);
      
      // Brain label
      const label = this.add.text(0, -50, choiceData.label, {
        fontSize: '22px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Brain emoji
      const emoji = this.add.text(0, 0, '🧠', { fontSize: '50px' });
      emoji.setOrigin(0.5);
      container.add(emoji);
      
      // Click handler
      box.on('pointerdown', () => {
        this.selectBrain(choiceData.type, choiceData.reaction);
      });
      
      box.on('pointerover', () => {
        box.setScale(1.05);
      });
      
      box.on('pointerout', () => {
        box.setScale(1);
      });
      
      this.brainChoices.push({
        container,
        type: choiceData.type,
        label: choiceData.label,
        reaction: choiceData.reaction
      });
      
      this.brainGameContainer!.add(container);
    });
  }

  private selectBrain(selectedType: 'rule' | 'ml' | 'dl', reaction: string): void {
    if (!this.currentScenario) return;
    
    const isCorrect = selectedType === this.currentScenario.correct;
    
    // Show reaction
    const reactionText = this.add.text(0, 250, reaction, {
      fontSize: '24px',
      color: isCorrect ? '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') : '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      wordWrap: { width: 1000 },
      align: 'center'
    });
    reactionText.setOrigin(0.5);
    this.brainGameContainer!.add(reactionText);
    
    if (isCorrect) {
      const correctText = this.add.text(0, 320, '✓ Correct!', {
        fontSize: '28px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      correctText.setOrigin(0.5);
      this.brainGameContainer!.add(correctText);
      
      this.time.delayedCall(2000, () => {
        this.scenarioIndex++;
        this.showNextScenario();
      });
    } else {
      const tryAgain = this.add.text(0, 320, 'Try again!', {
        fontSize: '24px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'Arial'
      });
      tryAgain.setOrigin(0.5);
      this.brainGameContainer!.add(tryAgain);
      
      this.time.delayedCall(2000, () => {
        reactionText.destroy();
        tryAgain.destroy();
      });
    }
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'AI Jungle',
      concepts: [
        'AI can be categorized into Rule-based, Machine Learning, and Deep Learning',
        'Different AI systems work in different ways for different tasks',
        'Real-world AI applications use various approaches'
      ]
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level1_AI_Jungle');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level1_AI_Jungle');
      this.scene.start(levelKey);
    });
  }

}
