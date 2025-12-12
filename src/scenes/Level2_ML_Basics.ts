import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_2_SLIDES_ENHANCED } from '../data/learningSlides2';

interface DataCard {
  container: Phaser.GameObjects.Container;
  text: string;
  type: 'feature' | 'label';
  originalX: number;
  originalY: number;
  isPlaced: boolean;
}

interface MLScenario {
  description: string;
  correct: 'supervised' | 'unsupervised' | 'reinforcement';
}

export default class Level2_ML_Basics extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // Activity 1: Dataset Builder
  private datasetContainer?: Phaser.GameObjects.Container;
  private dataCards: DataCard[] = [];
  private featureBucket?: Phaser.GameObjects.Container;
  private labelBucket?: Phaser.GameObjects.Container;
  private datasetRows: Array<{ features: string[]; label: string }> = [];
  private cardsPlaced: number = 0;
  
  // Activity 2: ML Detective Mode
  private detectiveContainer?: Phaser.GameObjects.Container;
  private currentScenario?: MLScenario;
  private mlDoors: Array<{ container: Phaser.GameObjects.Container; type: 'supervised' | 'unsupervised' | 'reinforcement' }> = [];
  private scenarioIndex: number = 0;
  private scenarios: MLScenario[] = [];
  
  // Activity 3: Train/Test Split
  private splitContainer?: Phaser.GameObjects.Container;
  private splitBar?: Phaser.GameObjects.Rectangle;
  private splitRatio: number = 0.7; // 70% train, 30% test
  private isDraggingSplit: boolean = false;
  
  private activityCompleted: { dataset: boolean; detective: boolean; split: boolean } = {
    dataset: false,
    detective: false,
    split: false
  };

  constructor() {
    super({ key: 'Level2_ML_Basics' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.createExitButton();

    this.slideOverlay.show(LEVEL_2_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to Machine Whisperer! Complete three activities:\n\n' +
          '1. Dataset Builder - Sort data cards into Features and Labels\n' +
          '2. ML Detective - Classify problems into ML types\n' +
          '3. Train/Test Split - Divide your dataset',
          () => {
            this.startDatasetBuilder();
          }
        );
      });
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);
    this.exitButton.on('pointerdown', () => {
      if (this.activityCompleted.dataset && this.activityCompleted.detective && this.activityCompleted.split) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete all three activities first!', () => {});
      }
    });

    const exitText = this.add.text(1200, 650, 'EXIT', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitText.setOrigin(0.5);
    exitText.setDepth(3001);
  }

  // ========== ACTIVITY 1: DATASET BUILDER ==========
  private startDatasetBuilder(): void {
    this.cardsPlaced = 0;
    this.dataCards = [];
    this.datasetRows = [];
    
    this.datasetContainer = this.add.container(640, 360);
    this.datasetContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.datasetContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Dataset Builder', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.datasetContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Drag data cards into Features or Labels buckets to build your dataset', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.datasetContainer.add(instructions);
    
    // Create buckets
    this.createBuckets();
    
    // Create data cards
    this.createDataCards();
    
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
      if (this.cardsPlaced >= this.dataCards.length) {
        this.activityCompleted.dataset = true;
        this.datasetContainer!.destroy();
        this.dialogBox!.show('Great! Dataset built! Now try ML Detective Mode!', () => {
          this.startDetectiveMode();
        });
      } else {
        this.dialogBox!.show('Place all cards first!', () => {});
      }
    });
    this.datasetContainer.add([closeBtn, closeText]);
  }

  private createBuckets(): void {
    // Feature bucket (left)
    this.featureBucket = this.add.container(-400, 0);
    const featureBg = this.add.rectangle(0, 0, 300, 400, COLORS.PRIMARY, 0.3);
    featureBg.setStrokeStyle(4, COLORS.PRIMARY);
    this.featureBucket.add(featureBg);
    
    const featureLabel = this.add.text(0, -150, 'Features\n(Inputs)', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    featureLabel.setOrigin(0.5);
    this.featureBucket.add(featureLabel);
    
    this.datasetContainer!.add(this.featureBucket);
    
    // Label bucket (right)
    this.labelBucket = this.add.container(400, 0);
    const labelBg = this.add.rectangle(0, 0, 300, 400, COLORS.SUCCESS, 0.3);
    labelBg.setStrokeStyle(4, COLORS.SUCCESS);
    this.labelBucket.add(labelBg);
    
    const labelLabel = this.add.text(0, -150, 'Labels\n(Outputs)', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    labelLabel.setOrigin(0.5);
    this.labelBucket.add(labelLabel);
    
    this.datasetContainer!.add(this.labelBucket);
  }

  private createDataCards(): void {
    const cards = [
      { text: 'Color: Red', type: 'feature' as const },
      { text: 'Weight: 124g', type: 'feature' as const },
      { text: 'Is Fruit: Yes', type: 'label' as const },
      { text: 'Price: $3.50', type: 'feature' as const },
      { text: 'Size: Large', type: 'feature' as const },
      { text: 'Category: Apple', type: 'label' as const }
    ];
    
    // Reposition cards to be more centered and visible
    const startX = -500;
    const startY = 100;
    const colSpacing = 180;
    const rowSpacing = 120;
    
    cards.forEach((cardData, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = startX + col * colSpacing;
      const y = startY + row * rowSpacing;
      
      const container = this.add.container(x, y);
      
      // Card background
      const bg = this.add.rectangle(0, 0, 150, 80, 
        cardData.type === 'feature' ? COLORS.PRIMARY : COLORS.SUCCESS, 0.8);
      bg.setStrokeStyle(3, cardData.type === 'feature' ? COLORS.PRIMARY : COLORS.SUCCESS);
      container.add(bg);
      
      // Card text
      const text = this.add.text(0, 0, cardData.text, {
        fontSize: '16px',
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
      
      const dataCard: DataCard = {
        container,
        text: cardData.text,
        type: cardData.type,
        originalX: x,
        originalY: y,
        isPlaced: false
      };
      
      this.dataCards.push(dataCard);
      this.datasetContainer!.add(container);
      
      // Drag events - store reference and drag offset
      const cardRef = dataCard;
      let dragOffsetX = 0;
      let dragOffsetY = 0;
      
      this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !cardRef.isPlaced) {
          container.setScale(1.1);
          container.setDepth(1000);
          
          // Calculate offset from pointer to container center
          // Container's world position = datasetContainer world (640, 360) + container local (x, y)
          const containerWorldX = 640 + container.x;
          const containerWorldY = 360 + container.y;
          dragOffsetX = pointer.worldX - containerWorldX;
          dragOffsetY = pointer.worldY - containerWorldY;
        }
      });
      
      this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !cardRef.isPlaced) {
          // Convert world coordinates to container-relative coordinates
          // datasetContainer is at world position (640, 360)
          container.x = pointer.worldX - 640 - dragOffsetX;
          container.y = pointer.worldY - 360 - dragOffsetY;
        }
      });
      
      this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !cardRef.isPlaced) {
          container.setScale(1);
          
          // Container coordinates are relative to datasetContainer
          const containerX = container.x;
          const containerY = container.y;
          
          // Check if dropped in correct bucket
          const featureWorldX = -400;
          const labelWorldX = 400;
          const bucketY = 0;
          
          if (Math.abs(containerY - bucketY) < 200) {
            if (Math.abs(containerX - featureWorldX) < 150 && cardRef.type === 'feature') {
              // Correct placement in feature bucket
              cardRef.isPlaced = true;
              container.x = featureWorldX;
              container.y = bucketY - 100 + this.cardsPlaced * 40;
              container.setAlpha(0.7);
              this.cardsPlaced++;
              
              this.showSuccessFeedback(featureWorldX, bucketY - 150);
              
              if (this.cardsPlaced >= this.dataCards.length) {
                this.showDatasetTable();
              }
            } else if (Math.abs(containerX - labelWorldX) < 150 && cardRef.type === 'label') {
              // Correct placement in label bucket
              cardRef.isPlaced = true;
              container.x = labelWorldX;
              container.y = bucketY - 100 + (this.cardsPlaced - this.dataCards.filter(c => c.type === 'feature').length) * 40;
              container.setAlpha(0.7);
              this.cardsPlaced++;
              
              this.showSuccessFeedback(labelWorldX, bucketY - 150);
              
              if (this.cardsPlaced >= this.dataCards.length) {
                this.showDatasetTable();
              }
            } else {
              // Wrong bucket - return
              this.tweens.add({
                targets: container,
                x: cardRef.originalX,
                y: cardRef.originalY,
                duration: 300
              });
            }
          } else {
            // Return to original position
            container.x = cardRef.originalX;
            container.y = cardRef.originalY;
          }
        }
      });
    });
  }

  private showSuccessFeedback(x: number, y: number): void {
    const feedback = this.add.text(x, y, '✓', {
      fontSize: '30px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    feedback.setOrigin(0.5);
    this.datasetContainer!.add(feedback);
    this.tweens.add({
      targets: feedback,
      alpha: 0,
      y: feedback.y - 30,
      duration: 1000,
      onComplete: () => feedback.destroy()
    });
  }

  private showDatasetTable(): void {
    const table = this.add.rectangle(0, 250, 600, 200, COLORS.BG_MEDIUM, 0.9);
    table.setStrokeStyle(3, COLORS.PRIMARY);
    this.datasetContainer!.add(table);
    
    const tableTitle = this.add.text(0, 180, 'Your Dataset', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    tableTitle.setOrigin(0.5);
    this.datasetContainer!.add(tableTitle);
    
    const tableText = this.add.text(0, 250, 'Features | Labels\n' +
      'Color: Red, Weight: 124g, Price: $3.50, Size: Large | Is Fruit: Yes, Category: Apple', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: 550 }
    });
    tableText.setOrigin(0.5);
    this.datasetContainer!.add(tableText);
    
    // Glow effect
    this.tweens.add({
      targets: table,
      alpha: 0.7,
      duration: 500,
      yoyo: true,
      repeat: 3
    });
  }

  // ========== ACTIVITY 2: ML DETECTIVE MODE ==========
  private startDetectiveMode(): void {
    this.scenarioIndex = 0;
    
    this.scenarios = [
      { description: 'We have images with cat/dog labels. Which ML type?', correct: 'supervised' },
      { description: 'Finding patterns in customer data without labels. Which ML type?', correct: 'unsupervised' },
      { description: 'Training an AI to play a game through trial and error. Which ML type?', correct: 'reinforcement' },
      { description: 'Predicting house prices from features like size and location. Which ML type?', correct: 'supervised' },
      { description: 'Grouping similar customers together without labels. Which ML type?', correct: 'unsupervised' }
    ];
    
    this.showDetectiveScenario();
  }

  private showDetectiveScenario(): void {
    if (this.scenarioIndex >= this.scenarios.length) {
      this.activityCompleted.detective = true;
      this.dialogBox!.show('Excellent! ML Detective complete! Now try the Train/Test Split!', () => {
        if (this.detectiveContainer) {
          this.detectiveContainer.destroy();
        }
        this.startTrainTestSplit();
      });
      return;
    }
    
    this.currentScenario = this.scenarios[this.scenarioIndex];
    
    if (this.detectiveContainer) {
      this.detectiveContainer.destroy();
    }
    
    this.detectiveContainer = this.add.container(640, 360);
    this.detectiveContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.detectiveContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -300, 'ML Detective Mode', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.detectiveContainer.add(title);
    
    // Magnifying glass icon
    const magnifier = this.add.text(0, -200, '🔍', { fontSize: '60px' });
    magnifier.setOrigin(0.5);
    this.detectiveContainer.add(magnifier);
    
    // Scenario
    const scenario = this.add.text(0, -100, this.currentScenario.description, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      wordWrap: { width: 900 },
      align: 'center'
    });
    scenario.setOrigin(0.5);
    this.detectiveContainer.add(scenario);
    
    const instruction = this.add.text(0, -30, 'Drag the magnifying glass to the correct door', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instruction.setOrigin(0.5);
    this.detectiveContainer.add(instruction);
    
    // Create ML doors
    this.createMLDoors();
  }

  private createMLDoors(): void {
    const doors = [
      { type: 'supervised' as const, label: 'Supervised', color: COLORS.PRIMARY, x: -400 },
      { type: 'unsupervised' as const, label: 'Unsupervised', color: COLORS.SECONDARY, x: 0 },
      { type: 'reinforcement' as const, label: 'Reinforcement', color: COLORS.WARNING, x: 400 }
    ];
    
    this.mlDoors = [];
    
    doors.forEach(doorData => {
      const container = this.add.container(doorData.x, 150);
      
      // Door
      const door = this.add.rectangle(0, 0, 250, 300, doorData.color, 0.7);
      door.setStrokeStyle(4, doorData.color);
      door.setInteractive({ useHandCursor: true });
      container.add(door);
      
      // Door label
      const label = this.add.text(0, -100, doorData.label, {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Door icon
      const icon = this.add.text(0, 0, '🚪', { fontSize: '60px' });
      icon.setOrigin(0.5);
      container.add(icon);
      
      door.on('pointerdown', () => {
        this.selectMLDoor(doorData.type);
      });
      
      door.on('pointerover', () => {
        door.setScale(1.05);
      });
      
      door.on('pointerout', () => {
        door.setScale(1);
      });
      
      this.mlDoors.push({
        container,
        type: doorData.type
      });
      
      this.detectiveContainer!.add(container);
    });
  }

  private selectMLDoor(selectedType: 'supervised' | 'unsupervised' | 'reinforcement'): void {
    if (!this.currentScenario) return;
    
    const isCorrect = selectedType === this.currentScenario.correct;
    
    // Find the door
    const door = this.mlDoors.find(d => d.type === selectedType);
    if (!door) return;
    
    // Animation
    this.tweens.add({
      targets: door.container,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true
    });
    
    // Show AI behavior animation
    const behaviors = {
      supervised: '📊 Analyzing labeled data... Learning patterns!',
      unsupervised: '🔍 Finding hidden patterns... No labels needed!',
      reinforcement: '🎮 Trying actions... Learning from rewards!'
    };
    
    const behaviorText = this.add.text(0, 300, behaviors[selectedType], {
      fontSize: '22px',
      color: isCorrect ? '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') : '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    behaviorText.setOrigin(0.5);
    this.detectiveContainer!.add(behaviorText);
    
    if (isCorrect) {
      const correctText = this.add.text(0, 350, '✓ Correct!', {
        fontSize: '28px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      correctText.setOrigin(0.5);
      this.detectiveContainer!.add(correctText);
      
      this.time.delayedCall(2000, () => {
        this.scenarioIndex++;
        this.showDetectiveScenario();
      });
    } else {
      const tryAgain = this.add.text(0, 350, 'Try another door!', {
        fontSize: '24px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'Arial'
      });
      tryAgain.setOrigin(0.5);
      this.detectiveContainer!.add(tryAgain);
      
      this.time.delayedCall(2000, () => {
        behaviorText.destroy();
        tryAgain.destroy();
      });
    }
  }

  // ========== ACTIVITY 3: TRAIN/TEST SPLIT ==========
  private startTrainTestSplit(): void {
    this.splitRatio = 0.7;
    
    this.splitContainer = this.add.container(640, 360);
    this.splitContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.splitContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -300, 'Split the Data', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.splitContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -250, 'Drag the dividing bar to split your dataset into Train and Test sets', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.splitContainer.add(instructions);
    
    // Data box
    const dataBox = this.add.rectangle(0, 0, 800, 400, COLORS.BG_MEDIUM, 0.8);
    dataBox.setStrokeStyle(4, COLORS.PRIMARY);
    this.splitContainer.add(dataBox);
    
    // Train section (left)
    const trainWidth = 800 * this.splitRatio;
    const trainSection = this.add.rectangle(-400 + trainWidth / 2, 0, trainWidth, 400, COLORS.PRIMARY, 0.3);
    this.splitContainer.add(trainSection);
    
    const trainLabel = this.add.text(-400 + trainWidth / 2, 0, `Train\n${Math.round(this.splitRatio * 100)}%`, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    trainLabel.setOrigin(0.5);
    this.splitContainer.add(trainLabel);
    
    // Test section (right)
    const testWidth = 800 * (1 - this.splitRatio);
    const testSection = this.add.rectangle(400 - testWidth / 2, 0, testWidth, 400, COLORS.SUCCESS, 0.3);
    this.splitContainer.add(testSection);
    
    const testLabel = this.add.text(400 - testWidth / 2, 0, `Test\n${Math.round((1 - this.splitRatio) * 100)}%`, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    testLabel.setOrigin(0.5);
    this.splitContainer.add(testLabel);
    
    // Split bar (draggable)
    this.splitBar = this.add.rectangle(-400 + trainWidth, 0, 10, 400, COLORS.WARNING);
    this.splitBar.setInteractive({ useHandCursor: true });
    this.splitContainer.add(this.splitBar);
    
    // Data cards visualization
    for (let i = 0; i < 20; i++) {
      const cardX = -400 + (i * 40) + 20;
      const card = this.add.rectangle(cardX, 0, 30, 50, COLORS.SECONDARY, 0.6);
      this.splitContainer.add(card);
    }
    
    // Drag handler
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.splitBar && Phaser.Geom.Rectangle.Contains(this.splitBar.getBounds(), pointer.x, pointer.y)) {
        this.isDraggingSplit = true;
      }
    });
    
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDraggingSplit && this.splitBar) {
        const minX = -400;
        const maxX = 400;
        const newX = Phaser.Math.Clamp(pointer.x - 640, minX, maxX);
        this.splitRatio = (newX - minX) / (maxX - minX);
        
        // Update visuals
        this.updateSplitVisuals();
      }
    });
    
    this.input.on('pointerup', () => {
      this.isDraggingSplit = false;
      
      // Check if split is reasonable (between 60% and 80%)
      if (this.splitRatio >= 0.6 && this.splitRatio <= 0.8) {
        this.activityCompleted.split = true;
        const success = this.add.text(0, 250, '✓ Good split! (70% train, 30% test is common)', {
          fontSize: '24px',
          color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold'
        });
        success.setOrigin(0.5);
        this.splitContainer!.add(success);
        
        this.time.delayedCall(2000, () => {
          this.splitContainer!.destroy();
          this.dialogBox!.show('Perfect! All activities complete!', () => {});
        });
      }
    });
    
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
      if (this.activityCompleted.split) {
        this.splitContainer!.destroy();
      } else {
        this.dialogBox!.show('Adjust the split bar to complete this activity!', () => {});
      }
    });
    this.splitContainer.add([closeBtn, closeText]);
  }

  private updateSplitVisuals(): void {
    // This would update the train/test sections and labels
    // For simplicity, we'll just update the bar position
    if (this.splitBar) {
      const minX = -400;
      const maxX = 400;
      this.splitBar.x = minX + (maxX - minX) * this.splitRatio;
    }
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Machine Whisperer',
      concepts: [
        'Datasets contain features (inputs) and labels (outputs)',
        'ML can be supervised, unsupervised, or reinforcement learning',
        'Data is split into training and testing sets'
      ],
      labLink: {
        title: 'ML Basics Lab',
        description: 'Try the ML workflow in Python',
        url: 'https://colab.research.google.com/drive/11sKkvemiI3LbNcdpvspmUV1QsKgXRyU7?usp=sharing'
      },
      nextLevel: {
        key: 'Level3_First_Model',
        name: 'Level 3: Data Scrolls'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level2_ML_Basics');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level2_ML_Basics');
      this.scene.start(levelKey);
    });
  }

}
