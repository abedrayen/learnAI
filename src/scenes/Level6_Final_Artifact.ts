import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { QuizOverlay, QuizQuestion } from '../ui/QuizOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_6_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

interface PipelineRoom {
  name: string;
  container: Phaser.GameObjects.Container;
  completed: boolean;
  challenge: () => void;
}

interface DraggableConcept {
  container: Phaser.GameObjects.Container;
  text: string;
  category: string;
  isPlaced: boolean;
  originalX: number;
  originalY: number;
}

export default class Level6_Final_Artifact extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private quizOverlay?: QuizOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitZone?: Phaser.GameObjects.Zone;
  
  // Activity 1: Full ML Pipeline Puzzle (Room-based)
  private pipelineActive: boolean = false;
  private pipelineContainer?: Phaser.GameObjects.Container;
  private currentRoomIndex: number = 0;
  private rooms: PipelineRoom[] = [];
  private roomsCompleted: number = 0;
  
  // Activity 2: Final Knowledge Challenge
  private knowledgeActive: boolean = false;
  private knowledgeContainer?: Phaser.GameObjects.Container;
  private draggableConcepts: DraggableConcept[] = [];
  private matchingPairs: Array<{ concept: string; definition: string }> = [];
  private matchedPairs: number = 0;
  
  private activityCompleted: { pipeline: boolean; knowledge: boolean } = {
    pipeline: false,
    knowledge: false
  };

  constructor() {
    super({ key: 'Level6_Final_Artifact' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.quizOverlay = new QuizOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);
    this.inputManager = new InputManager(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.platforms = this.physics.add.staticGroup();
    this.createPlatforms();
    this.createPlayer();
    this.createExitZone();

    this.slideOverlay.show(LEVEL_6_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Final Artifact! Complete two activities:\n\n' +
          '1. Full ML Pipeline Puzzle - Traverse rooms and solve challenges\n' +
          '2. Final Knowledge Challenge - Match concepts to definitions',
          () => {
            this.startPipelinePuzzle();
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

  private createExitZone(): void {
    this.exitZone = this.add.zone(1200, 650, 80, 50);
    this.physics.add.existing(this.exitZone, true);
    this.physics.add.overlap(this.player!, this.exitZone, () => {
      if (this.activityCompleted.pipeline && this.activityCompleted.knowledge) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete both activities first!', () => {});
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

  // ========== ACTIVITY 1: FULL ML PIPELINE PUZZLE ==========
  private startPipelinePuzzle(): void {
    this.pipelineActive = true;
    this.currentRoomIndex = 0;
    this.roomsCompleted = 0;
    
    this.pipelineContainer = this.add.container(640, 360);
    this.pipelineContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.pipelineContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Full ML Pipeline Puzzle', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.pipelineContainer.add(title);
    
    // Create rooms
    this.createRooms();
    
    // Show first room
    this.showRoom(0);
  }

  private createRooms(): void {
    this.rooms = [
      {
        name: 'Data Chamber',
        container: this.add.container(0, 0),
        completed: false,
        challenge: () => this.dataChamberChallenge()
      },
      {
        name: 'Model Forge',
        container: this.add.container(0, 0),
        completed: false,
        challenge: () => this.modelForgeChallenge()
      },
      {
        name: 'Evaluation Lens',
        container: this.add.container(0, 0),
        completed: false,
        challenge: () => this.evaluationLensChallenge()
      },
      {
        name: 'Deployment Gate',
        container: this.add.container(0, 0),
        completed: false,
        challenge: () => this.deploymentGateChallenge()
      }
    ];
  }

  private showRoom(index: number): void {
    if (index >= this.rooms.length) {
      // All rooms completed
      this.activityCompleted.pipeline = true;
      this.pipelineContainer!.destroy();
      this.dialogBox!.show('Excellent! Pipeline complete! Now try the Final Knowledge Challenge!', () => {
        this.startKnowledgeChallenge();
      });
      return;
    }
    
    this.currentRoomIndex = index;
    const room = this.rooms[index];
    
    // Clear previous room
    this.rooms.forEach(r => {
      r.container.removeAll(true);
      r.container.setVisible(false);
    });
    
    room.container.setVisible(true);
    
    // Room background
    const roomBg = this.add.rectangle(0, 0, 1000, 500, COLORS.BG_MEDIUM, 0.8);
    roomBg.setStrokeStyle(4, COLORS.PRIMARY);
    room.container.add(roomBg);
    
    // Room title
    const roomTitle = this.add.text(0, -200, room.name, {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    roomTitle.setOrigin(0.5);
    room.container.add(roomTitle);
    
    // Room description
    const descriptions = [
      'Sort data cards into Features and Labels',
      'Select the correct model type for the problem',
      'Arrange evaluation metrics in order of importance',
      'Activate deployment switches in the correct sequence'
    ];
    
    const description = this.add.text(0, -150, descriptions[index], {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    description.setOrigin(0.5);
    room.container.add(description);
    
    // Start challenge
    room.challenge();
    
    this.pipelineContainer!.add(room.container);
  }

  private dataChamberChallenge(): void {
    const room = this.rooms[this.currentRoomIndex];
    
    // Create data cards
    const cards = [
      { text: 'Color: Red', type: 'feature', x: -400, y: 0 },
      { text: 'Size: Large', type: 'feature', x: -200, y: 0 },
      { text: 'Price: $5', type: 'feature', x: 0, y: 0 },
      { text: 'Category: Fruit', type: 'label', x: 200, y: 0 },
      { text: 'Is Edible: Yes', type: 'label', x: 400, y: 0 }
    ];
    
    const featureBucket = this.add.rectangle(-300, 150, 200, 100, COLORS.PRIMARY, 0.3);
    featureBucket.setStrokeStyle(3, COLORS.PRIMARY);
    room.container.add(featureBucket);
    
    const featureLabel = this.add.text(-300, 150, 'Features', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    featureLabel.setOrigin(0.5);
    room.container.add(featureLabel);
    
    const labelBucket = this.add.rectangle(300, 150, 200, 100, COLORS.SUCCESS, 0.3);
    labelBucket.setStrokeStyle(3, COLORS.SUCCESS);
    room.container.add(labelBucket);
    
    const labelLabel = this.add.text(300, 150, 'Labels', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    labelLabel.setOrigin(0.5);
    room.container.add(labelLabel);
    
    let placedCount = 0;
    
    cards.forEach(cardData => {
      const card = this.add.rectangle(cardData.x, cardData.y, 150, 60, 
        cardData.type === 'feature' ? COLORS.PRIMARY : COLORS.SUCCESS, 0.8);
      card.setStrokeStyle(3, cardData.type === 'feature' ? COLORS.PRIMARY : COLORS.SUCCESS);
      card.setInteractive({ useHandCursor: true });
      room.container.add(card);
      
      const cardText = this.add.text(cardData.x, cardData.y, cardData.text, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 140 }
      });
      cardText.setOrigin(0.5);
      room.container.add(cardText);
      
      card.on('pointerdown', () => {
        const targetX = cardData.type === 'feature' ? -300 : 300;
        const targetY = 150;
        
        this.tweens.add({
          targets: [card, cardText],
          x: targetX,
          y: targetY,
          duration: 500,
          onComplete: () => {
            placedCount++;
            if (placedCount >= cards.length) {
              room.completed = true;
              this.roomsCompleted++;
              this.showNextRoom();
            }
          }
        });
      });
    });
  }

  private modelForgeChallenge(): void {
    const room = this.rooms[this.currentRoomIndex];
    
    const problem = this.add.text(0, -50, 'Problem: Classify images as cat or dog', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    problem.setOrigin(0.5);
    room.container.add(problem);
    
    const options = [
      { text: 'Linear Regression', correct: false, x: -300, y: 100 },
      { text: 'Neural Network', correct: true, x: 0, y: 100 },
      { text: 'Decision Tree', correct: false, x: 300, y: 100 }
    ];
    
    options.forEach(option => {
      const btn = this.add.rectangle(option.x, option.y, 200, 80, COLORS.SECONDARY, 0.7);
      btn.setStrokeStyle(3, COLORS.SECONDARY);
      btn.setInteractive({ useHandCursor: true });
      room.container.add(btn);
      
      const btnText = this.add.text(option.x, option.y, option.text, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 180 }
      });
      btnText.setOrigin(0.5);
      room.container.add(btnText);
      
      btn.on('pointerdown', () => {
        if (option.correct) {
          room.completed = true;
          this.roomsCompleted++;
          const success = this.add.text(option.x, option.y - 100, '✓ Correct!', {
            fontSize: '24px',
            color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
            fontFamily: 'Arial',
            fontStyle: 'bold'
          });
          success.setOrigin(0.5);
          room.container.add(success);
          this.time.delayedCall(1000, () => this.showNextRoom());
        } else {
          const error = this.add.text(option.x, option.y - 100, 'Try again!', {
            fontSize: '20px',
            color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
            fontFamily: 'Arial'
          });
          error.setOrigin(0.5);
          room.container.add(error);
          this.time.delayedCall(1000, () => error.destroy());
        }
      });
    });
  }

  private evaluationLensChallenge(): void {
    const room = this.rooms[this.currentRoomIndex];
    
    const metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score'];
    const correctOrder = ['Accuracy', 'Precision', 'Recall', 'F1-Score'];
    
    let selectedOrder: string[] = [];
    
    metrics.forEach((metric, index) => {
      const btn = this.add.rectangle(-300 + index * 200, 0, 150, 60, COLORS.WARNING, 0.8);
      btn.setStrokeStyle(3, COLORS.WARNING);
      btn.setInteractive({ useHandCursor: true });
      room.container.add(btn);
      
      const btnText = this.add.text(-300 + index * 200, 0, metric, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      btnText.setOrigin(0.5);
      room.container.add(btnText);
      
      btn.on('pointerdown', () => {
        selectedOrder.push(metric);
        btn.setAlpha(0.5);
        
        if (selectedOrder.length === metrics.length) {
          const isCorrect = selectedOrder.every((m, i) => m === correctOrder[i]);
          if (isCorrect) {
            room.completed = true;
            this.roomsCompleted++;
            const success = this.add.text(0, 150, '✓ Correct order!', {
              fontSize: '24px',
              color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
              fontFamily: 'Arial',
              fontStyle: 'bold'
            });
            success.setOrigin(0.5);
            room.container.add(success);
            this.time.delayedCall(1000, () => this.showNextRoom());
          } else {
            selectedOrder = [];
            metrics.forEach((m, i) => {
              const b = room.container.list.find((child: any) => 
                child instanceof Phaser.GameObjects.Rectangle && Math.abs(child.x - (-300 + i * 200)) < 10) as Phaser.GameObjects.Rectangle;
              if (b) b.setAlpha(1);
            });
          }
        }
      });
    });
  }

  private deploymentGateChallenge(): void {
    const room = this.rooms[this.currentRoomIndex];
    
    const switches = ['Validate', 'Test', 'Deploy', 'Monitor'];
    const correctSequence = ['Validate', 'Test', 'Deploy', 'Monitor'];
    let sequence: string[] = [];
    
    switches.forEach((switchName, index) => {
      const switchBtn = this.add.rectangle(-300 + index * 200, 0, 150, 80, COLORS.PRIMARY, 0.7);
      switchBtn.setStrokeStyle(3, COLORS.PRIMARY);
      switchBtn.setInteractive({ useHandCursor: true });
      room.container.add(switchBtn);
      
      const switchText = this.add.text(-300 + index * 200, 0, switchName, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      switchText.setOrigin(0.5);
      room.container.add(switchText);
      
      switchBtn.on('pointerdown', () => {
        const expectedNext = correctSequence[sequence.length];
        if (switchName === expectedNext) {
          sequence.push(switchName);
          switchBtn.setFillStyle(COLORS.SUCCESS);
          
          if (sequence.length === switches.length) {
            room.completed = true;
            this.roomsCompleted++;
            const success = this.add.text(0, 150, '✓ Pipeline Activated!', {
              fontSize: '28px',
              color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
              fontFamily: 'Arial',
              fontStyle: 'bold'
            });
            success.setOrigin(0.5);
            room.container.add(success);
            
            // Animate pipeline glow
            this.tweens.add({
              targets: room.container.list.filter((child: any) => child instanceof Phaser.GameObjects.Rectangle),
              alpha: 1,
              scale: 1.1,
              duration: 300,
              yoyo: true,
              repeat: 2
            });
            
            this.time.delayedCall(1500, () => this.showNextRoom());
          }
        } else {
          sequence = [];
          switches.forEach((s, i) => {
            const sw = room.container.list.find((child: any) => 
              child instanceof Phaser.GameObjects.Rectangle && Math.abs(child.x - (-300 + i * 200)) < 10) as Phaser.GameObjects.Rectangle;
            if (sw) sw.setFillStyle(COLORS.PRIMARY, 0.7);
          });
        }
      });
    });
  }

  private showNextRoom(): void {
    this.time.delayedCall(500, () => {
      this.showRoom(this.currentRoomIndex + 1);
    });
  }

  // ========== ACTIVITY 2: FINAL KNOWLEDGE CHALLENGE ==========
  private startKnowledgeChallenge(): void {
    this.knowledgeActive = true;
    this.matchedPairs = 0;
    
    this.knowledgeContainer = this.add.container(640, 360);
    this.knowledgeContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.knowledgeContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Final Knowledge Challenge', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.knowledgeContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Drag concepts to their matching definitions', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.knowledgeContainer.add(instructions);
    
    // Create matching pairs
    this.matchingPairs = [
      { concept: 'Feature', definition: 'Input data used to make predictions' },
      { concept: 'Label', definition: 'The correct answer we want to predict' },
      { concept: 'Neuron', definition: 'A unit that computes weighted sum and applies activation' },
      { concept: 'Training', definition: 'The process of learning patterns from data' },
      { concept: 'Overfitting', definition: 'Model performs well on training but poorly on new data' }
    ];
    
    // Create concept cards (draggable)
    this.createConceptCards();
    
    // Create definition slots
    this.createDefinitionSlots();
    
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
      if (this.activityCompleted.knowledge) {
        this.knowledgeActive = false;
        this.knowledgeContainer!.destroy();
        this.dialogBox!.show('Perfect! All activities complete!', () => {});
      } else {
        this.dialogBox!.show('Match all concepts to complete this activity!', () => {});
      }
    });
    this.knowledgeContainer.add([closeBtn, closeText]);
  }

  private createConceptCards(): void {
    const startX = -500;
    const startY = -150;
    const spacing = 200;
    
    this.matchingPairs.forEach((pair, index) => {
      const x = startX + (index % 3) * spacing;
      const y = startY + Math.floor(index / 3) * spacing;
      
      const container = this.add.container(x, y);
      
      const card = this.add.rectangle(0, 0, 150, 80, COLORS.PRIMARY, 0.8);
      card.setStrokeStyle(3, COLORS.PRIMARY);
      container.add(card);
      
      const text = this.add.text(0, 0, pair.concept, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 140 }
      });
      text.setOrigin(0.5);
      container.add(text);
      
      container.setInteractive(new Phaser.Geom.Rectangle(-75, -40, 150, 80), Phaser.Geom.Rectangle.Contains);
      this.input.setDraggable(container);
      
      const draggableConcept: DraggableConcept = {
        container,
        text: pair.concept,
        category: pair.definition,
        isPlaced: false,
        originalX: x,
        originalY: y
      };
      
      this.draggableConcepts.push(draggableConcept);
      this.knowledgeContainer!.add(container);
      
      // Drag events
      this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !draggableConcept.isPlaced) {
          container.setScale(1.1);
          container.setDepth(1000);
        }
      });
      
      this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
        if (gameObject === container && !draggableConcept.isPlaced) {
          container.x = dragX;
          container.y = dragY;
        }
      });
      
      this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !draggableConcept.isPlaced) {
          container.setScale(1);
          
          // Check if dropped on correct definition slot
          const slotIndex = this.matchingPairs.findIndex(p => p.definition === draggableConcept.category);
          if (slotIndex >= 0) {
            const slotX = 300;
            const slotY = -200 + slotIndex * 100;
            
            if (Math.abs(container.x - slotX) < 100 && Math.abs(container.y - slotY) < 50) {
              // Correct match!
              draggableConcept.isPlaced = true;
              container.x = slotX;
              container.y = slotY;
              container.setAlpha(0.8);
              this.matchedPairs++;
              
              // Visual feedback
              const feedback = this.add.text(slotX, slotY - 40, '✓', {
                fontSize: '30px',
                color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
                fontFamily: 'Arial',
                fontStyle: 'bold'
              });
              feedback.setOrigin(0.5);
              this.knowledgeContainer!.add(feedback);
              
              if (this.matchedPairs >= this.matchingPairs.length) {
                this.activityCompleted.knowledge = true;
                const success = this.add.text(0, 250, '✓ All concepts matched!', {
                  fontSize: '28px',
                  color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
                  fontFamily: 'Arial',
                  fontStyle: 'bold'
                });
                success.setOrigin(0.5);
                this.knowledgeContainer!.add(success);
              }
            } else {
              // Return to original position
              container.x = draggableConcept.originalX;
              container.y = draggableConcept.originalY;
            }
          }
        }
      });
    });
  }

  private createDefinitionSlots(): void {
    this.matchingPairs.forEach((pair, index) => {
      const x = 300;
      const y = -200 + index * 100;
      
      const slot = this.add.rectangle(x, y, 400, 80, COLORS.BG_LIGHT, 0.5);
      slot.setStrokeStyle(3, COLORS.SECONDARY);
      this.knowledgeContainer!.add(slot);
      
      const definitionText = this.add.text(x, y, pair.definition, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 380 }
      });
      definitionText.setOrigin(0.5);
      this.knowledgeContainer!.add(definitionText);
    });
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Final Artifact',
      concepts: [
        'AI, ML, and DL are connected concepts',
        'The full ML pipeline: Data → Model → Evaluation → Deployment',
        'You can create custom AI models with tools like Teachable Machine'
      ],
      labLink: {
        title: 'All Labs',
        description: 'Review all the Colab notebooks and Teachable Machine projects you explored!',
        url: 'https://colab.research.google.com/'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level6_Final_Artifact');
      this.showCertificate();
    });
  }

  private showCertificate(): void {
    // Clear scene
    this.children.removeAll();

    // Certificate background
    const certBg = this.add.rectangle(640, 360, 1000, 600, 0xf5f5dc);
    certBg.setStrokeStyle(8, COLORS.PRIMARY);

    // Certificate title
    const certTitle = this.add.text(640, 150, 'Certificate of AI Exploration', {
      fontSize: '36px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    certTitle.setOrigin(0.5);

    // Certificate text
    const certText = this.add.text(640, 250, 'This certifies that you have completed', {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'Arial'
    });
    certText.setOrigin(0.5);

    const playerName = this.add.text(640, 300, 'AI Explorer', {
      fontSize: '28px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    playerName.setOrigin(0.5);

    const completionText = this.add.text(640, 350, 
      'the AI/ML/DL Learning Journey\n\n' +
      'Concepts Covered:\n' +
      '• Introduction to AI\n' +
      '• Machine Learning Basics\n' +
      '• First Models\n' +
      '• Deep Learning\n' +
      '• Teachable Machine\n' +
      '• Full ML Pipeline',
      {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'Arial',
        align: 'center'
      }
    );
    completionText.setOrigin(0.5);

    // Menu button
    const menuBtn = this.add.rectangle(640, 650, 200, 50, COLORS.PRIMARY);
    const menuText = this.add.text(640, 650, 'Back to Menu', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    menuText.setOrigin(0.5);
    menuBtn.setInteractive(new Phaser.Geom.Rectangle(-100, -25, 200, 50), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    menuBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  update(): void {
    if (!this.player || !this.inputManager) return;

    if (this.pipelineActive || this.knowledgeActive) {
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
