import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_5_SLIDES_ENHANCED } from '../data/learningSlides2';

interface Sample {
  container: Phaser.GameObjects.Container;
  class: 'happy' | 'sad' | 'neutral';
  x: number;
  y: number;
}


export default class Level5_Teachable_Ritual extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // Activity 1: Collect Examples
  private collectionContainer?: Phaser.GameObjects.Container;
  private currentClass: 'happy' | 'sad' | 'neutral' = 'happy';
  private samples: Sample[] = [];
  private samplesPerClass: { happy: number; sad: number; neutral: number } = { happy: 0, sad: 0, neutral: 0 };
  private cameraBeam?: Phaser.GameObjects.Graphics;
  private isCapturing: boolean = false;
  
  // Activity 2: Training Dashboard
  private trainingContainer?: Phaser.GameObjects.Container;
  private lossBar?: Phaser.GameObjects.Rectangle;
  private accuracyBar?: Phaser.GameObjects.Rectangle;
  private trainingProgress: number = 0;
  private isTraining: boolean = false;
  
  private activityCompleted: { collection: boolean; training: boolean } = {
    collection: false,
    training: false
  };

  constructor() {
    super({ key: 'Level5_Teachable_Ritual' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.createExitButton();

    this.slideOverlay.show(LEVEL_5_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Teachable Ritual! Complete two activities:\n\n' +
          '1. Collect Examples - Use the camera beam to capture samples\n' +
          '2. Training Dashboard - Watch your model train\n\n' +
          'Then try it yourself with Google Teachable Machine!',
          () => {
            this.startCollectionActivity();
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
      if (this.activityCompleted.collection && this.activityCompleted.training) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete all activities first!', () => {});
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

  // ========== ACTIVITY 1: COLLECT EXAMPLES ==========
  private startCollectionActivity(): void {
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
        this.trainingContainer!.destroy();
        this.showTeachableMachineLink();
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

  // ========== TEACHABLE MACHINE LINK ==========
  private showTeachableMachineLink(): void {
    const linkContainer = this.add.container(640, 360);
    linkContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    linkContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -200, 'Try It Yourself!', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    linkContainer.add(title);
    
    // Description
    const description = this.add.text(0, -100, 'You\'ve learned how to collect data and train a model.\nNow try creating your own model with Google Teachable Machine!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: 900 }
    });
    description.setOrigin(0.5);
    linkContainer.add(description);
    
    // Link button
    const linkBtn = this.add.rectangle(0, 100, 400, 80, COLORS.PRIMARY);
    linkBtn.setInteractive({ useHandCursor: true });
    linkBtn.setStrokeStyle(4, COLORS.SUCCESS);
    
    const linkText = this.add.text(0, 100, 'Open Teachable Machine', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    linkText.setOrigin(0.5);
    
    linkBtn.on('pointerdown', () => {
      window.open('https://teachablemachine.withgoogle.com/', '_blank');
    });
    
    linkBtn.on('pointerover', () => {
      linkBtn.setScale(1.05);
    });
    
    linkBtn.on('pointerout', () => {
      linkBtn.setScale(1);
    });
    
    linkContainer.add([linkBtn, linkText]);
    
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
      linkContainer.destroy();
      this.dialogBox!.show('Perfect! You can now try Teachable Machine yourself!', () => {});
    });
    linkContainer.add([closeBtn, closeText]);
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
      },
      nextLevel: {
        key: 'Level6_Final_Artifact',
        name: 'Level 6: Final Artifact'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level5_Teachable_Ritual');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level5_Teachable_Ritual');
      this.scene.start(levelKey);
    });
  }

}
