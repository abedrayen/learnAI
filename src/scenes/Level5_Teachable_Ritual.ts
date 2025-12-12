import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_5_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

interface Sample {
  container: Phaser.GameObjects.Container;
  class: 'happy' | 'sad' | 'neutral';
  x: number;
  y: number;
}

interface TestExample {
  container: Phaser.GameObjects.Container;
  class: 'happy' | 'sad' | 'neutral';
  isDragging: boolean;
}

export default class Level5_Teachable_Ritual extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private labTerminal?: Phaser.GameObjects.Rectangle;
  private exitZone?: Phaser.GameObjects.Zone;
  
  // Activity 1: Collect Examples
  private collectionActive: boolean = false;
  private collectionContainer?: Phaser.GameObjects.Container;
  private currentClass: 'happy' | 'sad' | 'neutral' = 'happy';
  private samples: Sample[] = [];
  private samplesPerClass: { happy: number; sad: number; neutral: number } = { happy: 0, sad: 0, neutral: 0 };
  private cameraBeam?: Phaser.GameObjects.Graphics;
  private isCapturing: boolean = false;
  
  // Activity 2: Training Dashboard
  private trainingActive: boolean = false;
  private trainingContainer?: Phaser.GameObjects.Container;
  private lossBar?: Phaser.GameObjects.Rectangle;
  private accuracyBar?: Phaser.GameObjects.Rectangle;
  private trainingProgress: number = 0;
  private isTraining: boolean = false;
  
  // Activity 3: Live Classification Test
  private classificationActive: boolean = false;
  private classificationContainer?: Phaser.GameObjects.Container;
  private testExamples: TestExample[] = [];
  private classificationZone?: Phaser.GameObjects.Rectangle;
  private confidenceBars: Array<{ bar: Phaser.GameObjects.Rectangle; label: Phaser.GameObjects.Text }> = [];
  
  private activityCompleted: { collection: boolean; training: boolean; classification: boolean } = {
    collection: false,
    training: false,
    classification: false
  };

  constructor() {
    super({ key: 'Level5_Teachable_Ritual' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);
    this.inputManager = new InputManager(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.platforms = this.physics.add.staticGroup();
    this.createPlatforms();
    this.createPlayer();
    this.createLabTerminal();
    this.createExitZone();

    this.slideOverlay.show(LEVEL_5_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Teachable Ritual! Complete three activities:\n\n' +
          '1. Collect Examples - Use the camera beam to capture samples\n' +
          '2. Training Dashboard - Watch your model train\n' +
          '3. Live Classification - Test your model with new examples',
          () => {
            this.startCollectionActivity();
          }
        );
      });
    }, this.inputManager);

    this.physics.add.collider(this.player!, this.platforms!);
  }

  private createPlatforms(): void {
    SceneHelpers.createPlatform(this, this.platforms!, 640, 700, 1280, 40, COLORS.BG_MEDIUM);
    SceneHelpers.createPlatform(this, this.platforms!, 300, 550, 200, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 640, 450, 200, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 980, 550, 200, 20, COLORS.BG_LIGHT);
  }

  private createPlayer(): void {
    this.player = SceneHelpers.createPlayer(this, 100, 400);
  }

  private createLabTerminal(): void {
    this.labTerminal = this.add.rectangle(1200, 200, 100, 100, COLORS.SECONDARY);
    this.labTerminal.setStrokeStyle(4, COLORS.PRIMARY);
    this.labTerminal.setInteractive(new Phaser.Geom.Rectangle(-50, -50, 100, 100), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    
    const terminalIcon = this.add.text(1200, 200, '💻', { fontSize: '40px' });
    terminalIcon.setOrigin(0.5);
    const terminalLabel = this.add.text(1200, 250, 'Lab Terminal', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    terminalLabel.setOrigin(0.5);

    this.labTerminal.on('pointerdown', () => {
      const labInfo: LabLinkInfo = {
        title: 'Teachable Machine',
        description: 'Open Teachable Machine to train a real model using your webcam, microphone, or images. This is a real tool - not a simulation!',
        url: 'https://teachablemachine.withgoogle.com/',
        shortCode: 'tm.withgoogle.com'
      };
      this.labLinkOverlay!.show(labInfo);
    });
  }

  private createExitZone(): void {
    this.exitZone = this.add.zone(1200, 650, 80, 50);
    this.physics.add.existing(this.exitZone, true);
    this.physics.add.overlap(this.player!, this.exitZone, () => {
      if (this.activityCompleted.collection && this.activityCompleted.training && this.activityCompleted.classification) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete all three activities first!', () => {});
      }
    }, undefined, this);

    const exitSign = this.add.text(1200, 650, 'EXIT', {
      fontSize: '20px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitSign.setOrigin(0.5);
  }

  // ========== ACTIVITY 1: COLLECT EXAMPLES ==========
  private startCollectionActivity(): void {
    this.collectionActive = true;
    this.samples = [];
    this.samplesPerClass = { happy: 0, sad: 0, neutral: 0 };
    
    this.collectionContainer = this.add.container(640, 360);
    this.collectionContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.collectionContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Collect Examples', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.collectionContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Select a class, then click objects in the world to capture samples', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.collectionContainer.add(instructions);
    
    // Class selector buttons
    this.createClassSelector();
    
    // World area with objects
    this.createWorldObjects();
    
    // Dataset panel
    this.createDatasetPanel();
    
    // Camera beam visualization
    this.cameraBeam = this.add.graphics();
    this.cameraBeam.setVisible(false);
    this.collectionContainer.add(this.cameraBeam);
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.samplesPerClass.happy >= 3 && this.samplesPerClass.sad >= 3 && this.samplesPerClass.neutral >= 3) {
        this.activityCompleted.collection = true;
        this.collectionActive = false;
        this.collectionContainer!.destroy();
        this.dialogBox!.show('Great! Samples collected! Now train your model!', () => {
          this.startTrainingActivity();
        });
      } else {
        this.dialogBox!.show('Collect at least 3 samples for each class!', () => {});
      }
    });
    this.collectionContainer.add([closeBtn, closeText]);
  }

  private createClassSelector(): void {
    const classes = [
      { type: 'happy' as const, label: '😊 Happy', color: COLORS.SUCCESS, x: -400 },
      { type: 'sad' as const, label: '😢 Sad', color: COLORS.ERROR, x: 0 },
      { type: 'neutral' as const, label: '😐 Neutral', color: COLORS.WARNING, x: 400 }
    ];
    
    classes.forEach(classData => {
      const btn = this.add.rectangle(classData.x, -200, 200, 60, classData.color, 0.7);
      btn.setInteractive({ useHandCursor: true });
      btn.setStrokeStyle(4, classData.color);
      
      const text = this.add.text(classData.x, -200, classData.label, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      text.setOrigin(0.5);
      
      btn.on('pointerdown', () => {
        this.currentClass = classData.type;
        // Update button states
        classes.forEach(c => {
          const b = this.collectionContainer!.list.find((child: any) => 
            child instanceof Phaser.GameObjects.Rectangle && Math.abs(child.x - c.x) < 10) as Phaser.GameObjects.Rectangle;
          if (b) {
            if (c.type === classData.type) {
              b.setAlpha(1);
              b.setStrokeStyle(4, c.color);
            } else {
              b.setAlpha(0.5);
              b.setStrokeStyle(2, c.color);
            }
          }
        });
      });
      
      if (classData.type === this.currentClass) {
        btn.setAlpha(1);
      } else {
        btn.setAlpha(0.5);
      }
      
      this.collectionContainer!.add([btn, text]);
    });
  }

  private createWorldObjects(): void {
    // Create stylized face objects in the world
    const faces = [
      { x: -500, y: 100, class: 'happy' as const, emoji: '😊' },
      { x: -300, y: 100, class: 'happy' as const, emoji: '😄' },
      { x: -100, y: 100, class: 'happy' as const, emoji: '😁' },
      { x: 100, y: 100, class: 'sad' as const, emoji: '😢' },
      { x: 300, y: 100, class: 'sad' as const, emoji: '😭' },
      { x: 500, y: 100, class: 'sad' as const, emoji: '😞' },
      { x: -400, y: 200, class: 'neutral' as const, emoji: '😐' },
      { x: -200, y: 200, class: 'neutral' as const, emoji: '😑' },
      { x: 0, y: 200, class: 'neutral' as const, emoji: '😶' },
      { x: 200, y: 200, class: 'neutral' as const, emoji: '🙂' },
      { x: 400, y: 200, class: 'neutral' as const, emoji: '😌' }
    ];
    
    faces.forEach(face => {
      const container = this.add.container(face.x, face.y);
      
      const bg = this.add.circle(0, 0, 40, COLORS.BG_LIGHT, 0.8);
      bg.setStrokeStyle(3, COLORS.PRIMARY);
      bg.setInteractive({ useHandCursor: true });
      container.add(bg);
      
      const emoji = this.add.text(0, 0, face.emoji, { fontSize: '40px' });
      emoji.setOrigin(0.5);
      container.add(emoji);
      
      bg.on('pointerdown', () => {
        this.captureSample(face.x, face.y, face.class);
      });
      
      this.collectionContainer!.add(container);
    });
  }

  private captureSample(x: number, y: number, faceClass: 'happy' | 'sad' | 'neutral'): void {
    if (this.isCapturing) return;
    this.isCapturing = true;
    
    // Only capture if it matches current class
    if (faceClass !== this.currentClass) {
      this.dialogBox!.show('Select the correct class first!', () => {});
      this.isCapturing = false;
      return;
    }
    
    // Show camera beam effect
    if (this.cameraBeam) {
      this.cameraBeam.clear();
      this.cameraBeam.lineStyle(4, COLORS.SECONDARY, 0.8);
      this.cameraBeam.beginPath();
      this.cameraBeam.moveTo(0, -250);
      this.cameraBeam.lineTo(x, y);
      this.cameraBeam.strokePath();
      this.cameraBeam.setVisible(true);
      
      this.tweens.add({
        targets: this.cameraBeam,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          if (this.cameraBeam) this.cameraBeam.setVisible(false);
        }
      });
    }
    
    // Create sample in dataset panel
    this.samplesPerClass[this.currentClass]++;
    this.addSampleToPanel(this.currentClass);
    
    // Visual feedback
    const feedback = this.add.text(x, y - 60, '📷 Captured!', {
      fontSize: '18px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    feedback.setOrigin(0.5);
    this.collectionContainer!.add(feedback);
    this.tweens.add({
      targets: feedback,
      alpha: 0,
      y: feedback.y - 30,
      duration: 1000,
      onComplete: () => feedback.destroy()
    });
    
    this.isCapturing = false;
  }

  private createDatasetPanel(): void {
    const panel = this.add.rectangle(0, 250, 1000, 200, COLORS.BG_MEDIUM, 0.8);
    panel.setStrokeStyle(3, COLORS.PRIMARY);
    this.collectionContainer!.add(panel);
    
    const panelTitle = this.add.text(0, 180, 'Your Dataset', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    panelTitle.setOrigin(0.5);
    this.collectionContainer!.add(panelTitle);
    
    // Class counters
    const happyCounter = this.add.text(-400, 220, '😊 Happy: 0', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    happyCounter.setOrigin(0.5);
    this.collectionContainer!.add(happyCounter);
    
    const sadCounter = this.add.text(0, 220, '😢 Sad: 0', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    sadCounter.setOrigin(0.5);
    this.collectionContainer!.add(sadCounter);
    
    const neutralCounter = this.add.text(400, 220, '😐 Neutral: 0', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    neutralCounter.setOrigin(0.5);
    this.collectionContainer!.add(neutralCounter);
    
    // Store references for updating
    (this.collectionContainer as any).happyCounter = happyCounter;
    (this.collectionContainer as any).sadCounter = sadCounter;
    (this.collectionContainer as any).neutralCounter = neutralCounter;
  }

  private addSampleToPanel(classType: 'happy' | 'sad' | 'neutral'): void {
    const counters = {
      happy: (this.collectionContainer as any).happyCounter as Phaser.GameObjects.Text,
      sad: (this.collectionContainer as any).sadCounter as Phaser.GameObjects.Text,
      neutral: (this.collectionContainer as any).neutralCounter as Phaser.GameObjects.Text
    };
    
    if (counters[classType]) {
      const emoji = classType === 'happy' ? '😊' : classType === 'sad' ? '😢' : '😐';
      const label = classType === 'happy' ? 'Happy' : classType === 'sad' ? 'Sad' : 'Neutral';
      counters[classType].setText(`${emoji} ${label}: ${this.samplesPerClass[classType]}`);
    }
  }

  // ========== ACTIVITY 2: TRAINING DASHBOARD ==========
  private startTrainingActivity(): void {
    this.trainingActive = true;
    this.trainingProgress = 0;
    this.isTraining = false;
    
    this.trainingContainer = this.add.container(640, 360);
    this.trainingContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.trainingContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Training Dashboard', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.trainingContainer.add(title);
    
    // Loss bar
    const lossLabel = this.add.text(-400, -200, 'Loss (decreasing)', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    lossLabel.setOrigin(0.5);
    this.trainingContainer.add(lossLabel);
    
    const lossBg = this.add.rectangle(-400, -150, 300, 30, COLORS.BG_LIGHT, 0.5);
    lossBg.setStrokeStyle(2, COLORS.TEXT);
    this.trainingContainer.add(lossBg);
    
    this.lossBar = this.add.rectangle(-400 - 150, -150, 300, 30, COLORS.ERROR);
    this.lossBar.setOrigin(0, 0.5);
    this.trainingContainer.add(this.lossBar);
    
    // Accuracy bar
    const accuracyLabel = this.add.text(400, -200, 'Accuracy (increasing)', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    accuracyLabel.setOrigin(0.5);
    this.trainingContainer.add(accuracyLabel);
    
    const accuracyBg = this.add.rectangle(400, -150, 300, 30, COLORS.BG_LIGHT, 0.5);
    accuracyBg.setStrokeStyle(2, COLORS.TEXT);
    this.trainingContainer.add(accuracyBg);
    
    this.accuracyBar = this.add.rectangle(400 - 150, -150, 0, 30, COLORS.SUCCESS);
    this.accuracyBar.setOrigin(0, 0.5);
    this.trainingContainer.add(this.accuracyBar);
    
    // Training messages area
    const messagesArea = this.add.rectangle(0, 0, 800, 300, COLORS.BG_MEDIUM, 0.5);
    messagesArea.setStrokeStyle(2, COLORS.PRIMARY);
    this.trainingContainer.add(messagesArea);
    
    // Train button
    const trainBtn = this.add.rectangle(0, 200, 200, 60, COLORS.SUCCESS, 0.9);
    trainBtn.setInteractive({ useHandCursor: true });
    const trainText = this.add.text(0, 200, 'Train Model', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    trainText.setOrigin(0.5);
    trainBtn.on('pointerdown', () => {
      if (!this.isTraining) {
        this.startTraining();
      }
    });
    this.trainingContainer.add([trainBtn, trainText]);
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.activityCompleted.training) {
        this.trainingActive = false;
        this.trainingContainer!.destroy();
        this.dialogBox!.show('Great! Model trained! Now test it!', () => {
          this.startClassificationActivity();
        });
      } else {
        this.dialogBox!.show('Train the model first!', () => {});
      }
    });
    this.trainingContainer.add([closeBtn, closeText]);
  }

  private startTraining(): void {
    this.isTraining = true;
    this.trainingProgress = 0;
    
    const messages = [
      'Initializing model...',
      'Your model just had a breakthrough!',
      'Learning patterns from data...',
      'Loss decreasing nicely!',
      'Accuracy improving!',
      'Training complete!'
    ];
    
    let messageIndex = 0;
    const messageText = this.add.text(0, 0, messages[0], {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    messageText.setOrigin(0.5);
    this.trainingContainer!.add(messageText);
    
    // Animate training
    const trainingTween = this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 5000,
      onUpdate: (tween) => {
        const progress = tween.getValue();
        this.trainingProgress = progress;
        
        // Update loss (decreasing)
        if (this.lossBar) {
          this.lossBar.width = (100 - progress) * 3;
          this.lossBar.x = -400 - 150 + (100 - progress) * 3;
        }
        
        // Update accuracy (increasing)
        if (this.accuracyBar) {
          this.accuracyBar.width = progress * 3;
        }
        
        // Update messages
        const newIndex = Math.floor((progress / 100) * messages.length);
        if (newIndex !== messageIndex && newIndex < messages.length) {
          messageIndex = newIndex;
          messageText.setText(messages[newIndex]);
          
          // Animate message
          this.tweens.add({
            targets: messageText,
            scale: 1.2,
            duration: 200,
            yoyo: true
          });
        }
      },
      onComplete: () => {
        this.isTraining = false;
        this.activityCompleted.training = true;
        messageText.setText('✓ Training Complete!');
        messageText.setStyle({ color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') });
      }
    });
  }

  // ========== ACTIVITY 3: LIVE CLASSIFICATION TEST ==========
  private startClassificationActivity(): void {
    this.classificationActive = true;
    this.testExamples = [];
    
    this.classificationContainer = this.add.container(640, 360);
    this.classificationContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.classificationContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Live Classification Test', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.classificationContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Drag test examples to the classification zone', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.classificationContainer.add(instructions);
    
    // Create test examples
    this.createTestExamples();
    
    // Classification zone
    this.classificationZone = this.add.rectangle(0, 150, 400, 300, COLORS.PRIMARY, 0.3);
    this.classificationZone.setStrokeStyle(4, COLORS.PRIMARY);
    this.classificationZone.setInteractive({ useHandCursor: false });
    this.classificationContainer.add(this.classificationZone);
    
    const zoneLabel = this.add.text(0, 50, 'Classification Zone', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    zoneLabel.setOrigin(0.5);
    this.classificationContainer.add(zoneLabel);
    
    // Confidence bars
    this.createConfidenceBars();
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.activityCompleted.classification) {
        this.classificationActive = false;
        this.classificationContainer!.destroy();
        this.dialogBox!.show('Perfect! All activities complete!', () => {});
      } else {
        this.dialogBox!.show('Test at least one example to complete this activity!', () => {});
      }
    });
    this.classificationContainer.add([closeBtn, closeText]);
  }

  private createTestExamples(): void {
    const examples = [
      { x: -500, y: -100, class: 'happy' as const, emoji: '😊' },
      { x: -300, y: -100, class: 'sad' as const, emoji: '😢' },
      { x: -100, y: -100, class: 'neutral' as const, emoji: '😐' },
      { x: 100, y: -100, class: 'happy' as const, emoji: '😄' },
      { x: 300, y: -100, class: 'sad' as const, emoji: '😭' }
    ];
    
    examples.forEach(example => {
      const container = this.add.container(example.x, example.y);
      
      const bg = this.add.circle(0, 0, 40, COLORS.WARNING, 0.8);
      bg.setStrokeStyle(3, COLORS.WARNING);
      container.add(bg);
      
      const emoji = this.add.text(0, 0, example.emoji, { fontSize: '40px' });
      emoji.setOrigin(0.5);
      container.add(emoji);
      
      container.setInteractive(new Phaser.Geom.Circle(0, 0, 40), Phaser.Geom.Circle.Contains);
      this.input.setDraggable(container);
      
      const testExample: TestExample = {
        container,
        class: example.class,
        isDragging: false
      };
      
      this.testExamples.push(testExample);
      this.classificationContainer!.add(container);
      
      // Drag events
      this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container) {
          testExample.isDragging = true;
          container.setScale(1.2);
          container.setDepth(1000);
        }
      });
      
      this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
        if (gameObject === container && testExample.isDragging) {
          container.x = dragX;
          container.y = dragY;
        }
      });
      
      this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && testExample.isDragging) {
          testExample.isDragging = false;
          container.setScale(1);
          
          // Check if dropped in classification zone
          if (this.classificationZone && 
              Math.abs(container.x) < 200 && 
              container.y > 0 && container.y < 300) {
            this.classifyExample(testExample);
          } else {
            // Return to original position
            container.x = example.x;
            container.y = example.y;
          }
        }
      });
    });
  }

  private createConfidenceBars(): void {
    const classes = ['happy', 'sad', 'neutral'];
    const emojis = ['😊', '😢', '😐'];
    const colors = [COLORS.SUCCESS, COLORS.ERROR, COLORS.WARNING];
    
    classes.forEach((classType, index) => {
      const x = -400 + index * 400;
      const y = 250;
      
      const label = this.add.text(x, y - 30, `${emojis[index]} ${classType}`, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      this.classificationContainer!.add(label);
      
      const barBg = this.add.rectangle(x, y + 20, 200, 20, COLORS.BG_LIGHT, 0.5);
      barBg.setStrokeStyle(2, COLORS.TEXT);
      this.classificationContainer!.add(barBg);
      
      const bar = this.add.rectangle(x - 100, y + 20, 0, 20, colors[index]);
      bar.setOrigin(0, 0.5);
      this.classificationContainer!.add(bar);
      
      const percentText = this.add.text(x, y + 50, '0%', {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      percentText.setOrigin(0.5);
      this.classificationContainer!.add(percentText);
      
      this.confidenceBars.push({ bar, label: percentText });
    });
  }

  private classifyExample(example: TestExample): void {
    // Simulate classification with confidence scores
    const confidences = {
      happy: example.class === 'happy' ? 0.85 : example.class === 'sad' ? 0.10 : 0.20,
      sad: example.class === 'sad' ? 0.80 : example.class === 'happy' ? 0.15 : 0.25,
      neutral: example.class === 'neutral' ? 0.75 : example.class === 'happy' ? 0.30 : 0.35
    };
    
    // Normalize
    const total = confidences.happy + confidences.sad + confidences.neutral;
    confidences.happy /= total;
    confidences.sad /= total;
    confidences.neutral /= total;
    
    // Update confidence bars
    const classes = ['happy', 'sad', 'neutral'];
    classes.forEach((classType, index) => {
      const confidence = confidences[classType as keyof typeof confidences];
      const bar = this.confidenceBars[index].bar;
      const percentText = this.confidenceBars[index].label;
      
      this.tweens.add({
        targets: bar,
        width: confidence * 200,
        duration: 500
      });
      
      percentText.setText(`${Math.round(confidence * 100)}%`);
    });
    
    // Check if correct
    const predicted = Object.keys(confidences).reduce((a, b) => 
      confidences[a as keyof typeof confidences] > confidences[b as keyof typeof confidences] ? a : b);
    
    const isCorrect = predicted === example.class;
    
    // Visual feedback
    if (isCorrect) {
      // Confetti effect
      for (let i = 0; i < 10; i++) {
        const particle = this.add.circle(example.container.x, example.container.y, 5, COLORS.SUCCESS);
        this.classificationContainer!.add(particle);
        this.tweens.add({
          targets: particle,
          x: particle.x + (Math.random() - 0.5) * 200,
          y: particle.y + (Math.random() - 0.5) * 200,
          alpha: 0,
          scale: 0,
          duration: 1000
        });
      }
    } else {
      const feedback = this.add.text(example.container.x, example.container.y - 60, 
        'Oops. I\'m still learning. More data please.', {
        fontSize: '16px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'italic',
        wordWrap: { width: 200 },
        align: 'center'
      });
      feedback.setOrigin(0.5);
      this.classificationContainer!.add(feedback);
      this.tweens.add({
        targets: feedback,
        alpha: 0,
        duration: 2000,
        onComplete: () => feedback.destroy()
      });
    }
    
    // Return example to original position
    const originalExample = this.testExamples.find(e => e.container === example.container);
    if (originalExample) {
      this.tweens.add({
        targets: example.container,
        x: originalExample.container.x,
        y: originalExample.container.y,
        duration: 500
      });
    }
    
    this.activityCompleted.classification = true;
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Teachable Ritual',
      concepts: [
        'You can train models on your own data',
        'Collecting diverse examples improves model performance',
        'Teachable Machine makes it easy to create custom AI models'
      ],
      labLink: {
        title: 'Teachable Machine',
        description: 'Train your own model with Teachable Machine',
        url: 'https://teachablemachine.withgoogle.com/'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level5_Teachable_Ritual');
      this.scene.start('MenuScene');
    });
  }

  update(): void {
    if (!this.player || !this.inputManager) return;

    if (this.collectionActive || this.trainingActive || this.classificationActive) {
      this.player.setVelocityX(0);
      return;
    }

    if (this.inputManager.isLeftPressed()) {
      this.player.setVelocityX(-200);
    } else if (this.inputManager.isRightPressed()) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.inputManager.isJumpJustPressed() && this.player.body!.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
}
