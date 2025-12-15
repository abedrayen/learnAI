import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_2_SLIDES_ENHANCED } from '../data/learningSlides2';

interface MLScenario {
  description: string;
  questionType: 'ml-type' | 'supervised-subtype' | 'data-quality';
  correct: string;
  options: Array<{ label: string; value: string; color: number }>;
}

export default class Level2_ML_Basics extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // ML Detective Mode
  private detectiveContainer?: Phaser.GameObjects.Container;
  private currentScenario?: MLScenario;
  private answerButtons: Array<{ container: Phaser.GameObjects.Container; value: string }> = [];
  private scenarioIndex: number = 0;
  private scenarios: MLScenario[] = [];
  private progressText?: Phaser.GameObjects.Text;
  
  private activityCompleted: { detective: boolean } = {
    detective: false
  };

  constructor() {
    super({ key: 'Level2_ML_Basics' });
  }

  preload(): void {
    // Load images for slides
    this.load.image('simple-regression-model', 'src/images/simple-regression-model.png');
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
          'Welcome to Machine Whisperer! Complete the ML Detective activity',
          () => {
            this.startDetectiveMode();
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
      if (this.activityCompleted.detective) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete the ML Detective activity first!', () => {});
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

  // ========== ML DETECTIVE MODE ==========
  private startDetectiveMode(): void {
    this.scenarioIndex = 0;
    
    this.scenarios = [
      // ML Type Questions
      {
        description: 'We have images with cat/dog labels. Which ML type?',
        questionType: 'ml-type',
        correct: 'supervised',
        options: [
          { label: 'Supervised', value: 'supervised', color: COLORS.PRIMARY },
          { label: 'Unsupervised', value: 'unsupervised', color: COLORS.SECONDARY },
          { label: 'Reinforcement', value: 'reinforcement', color: COLORS.WARNING }
        ]
      },
      {
        description: 'Finding patterns in customer data without labels. Which ML type?',
        questionType: 'ml-type',
        correct: 'unsupervised',
        options: [
          { label: 'Supervised', value: 'supervised', color: COLORS.PRIMARY },
          { label: 'Unsupervised', value: 'unsupervised', color: COLORS.SECONDARY },
          { label: 'Reinforcement', value: 'reinforcement', color: COLORS.WARNING }
        ]
      },
      {
        description: 'Training an AI to play a game through trial and error. Which ML type?',
        questionType: 'ml-type',
        correct: 'reinforcement',
        options: [
          { label: 'Supervised', value: 'supervised', color: COLORS.PRIMARY },
          { label: 'Unsupervised', value: 'unsupervised', color: COLORS.SECONDARY },
          { label: 'Reinforcement', value: 'reinforcement', color: COLORS.WARNING }
        ]
      },
      // Supervised Subtype Questions (Classification vs Regression)
      {
        description: 'Predicting if an email is spam or not spam. What type of supervised learning?',
        questionType: 'supervised-subtype',
        correct: 'classification',
        options: [
          { label: 'Classification', value: 'classification', color: COLORS.SUCCESS },
          { label: 'Regression', value: 'regression', color: COLORS.PRIMARY }
        ]
      },
      {
        description: 'Predicting house prices from features like size and location. What type of supervised learning?',
        questionType: 'supervised-subtype',
        correct: 'regression',
        options: [
          { label: 'Classification', value: 'classification', color: COLORS.SUCCESS },
          { label: 'Regression', value: 'regression', color: COLORS.PRIMARY }
        ]
      },
      {
        description: 'Identifying whether a tumor is benign or malignant. What type of supervised learning?',
        questionType: 'supervised-subtype',
        correct: 'classification',
        options: [
          { label: 'Classification', value: 'classification', color: COLORS.SUCCESS },
          { label: 'Regression', value: 'regression', color: COLORS.PRIMARY }
        ]
      },
      {
        description: 'Predicting the temperature tomorrow based on weather data. What type of supervised learning?',
        questionType: 'supervised-subtype',
        correct: 'regression',
        options: [
          { label: 'Classification', value: 'classification', color: COLORS.SUCCESS },
          { label: 'Regression', value: 'regression', color: COLORS.PRIMARY }
        ]
      },
      // Unsupervised Learning Questions
      {
        description: 'Grouping similar customers together without labels. What unsupervised technique?',
        questionType: 'ml-type',
        correct: 'unsupervised',
        options: [
          { label: 'Supervised', value: 'supervised', color: COLORS.PRIMARY },
          { label: 'Unsupervised', value: 'unsupervised', color: COLORS.SECONDARY },
          { label: 'Reinforcement', value: 'reinforcement', color: COLORS.WARNING }
        ]
      },
      {
        description: 'Finding products frequently bought together in shopping data. What ML type?',
        questionType: 'ml-type',
        correct: 'unsupervised',
        options: [
          { label: 'Supervised', value: 'supervised', color: COLORS.PRIMARY },
          { label: 'Unsupervised', value: 'unsupervised', color: COLORS.SECONDARY },
          { label: 'Reinforcement', value: 'reinforcement', color: COLORS.WARNING }
        ]
      },
      // Data Quality Questions
      {
        description: 'Your dataset has many missing values and duplicates. What should you do first?',
        questionType: 'data-quality',
        correct: 'clean-data',
        options: [
          { label: 'Clean the Data', value: 'clean-data', color: COLORS.SUCCESS },
          { label: 'Train the Model', value: 'train-model', color: COLORS.ERROR }
        ]
      },
      {
        description: 'Your model performs well on training data but poorly on new data. What problem is this?',
        questionType: 'data-quality',
        correct: 'overfitting',
        options: [
          { label: 'Overfitting', value: 'overfitting', color: COLORS.WARNING },
          { label: 'Underfitting', value: 'underfitting', color: COLORS.SECONDARY }
        ]
      },
      {
        description: 'You have 1000 examples but need 10,000 for good results. What data issue?',
        questionType: 'data-quality',
        correct: 'insufficient-data',
        options: [
          { label: 'Insufficient Data', value: 'insufficient-data', color: COLORS.WARNING },
          { label: 'Too Much Data', value: 'too-much-data', color: COLORS.SUCCESS }
        ]
      }
    ];
    
    this.showDetectiveScenario();
  }

  private showDetectiveScenario(): void {
    if (this.scenarioIndex >= this.scenarios.length) {
      this.activityCompleted.detective = true;
      this.dialogBox!.show('Excellent! ML Detective complete!', () => {
        if (this.detectiveContainer) {
          this.detectiveContainer.destroy();
        }
        this.completeLevel();
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
    
    // Progress indicator
    this.progressText = this.add.text(0, -260, `Question ${this.scenarioIndex + 1} / ${this.scenarios.length}`, {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    this.progressText.setOrigin(0.5);
    this.detectiveContainer.add(this.progressText);
    
    // Magnifying glass icon
    const magnifier = this.add.text(0, -180, '🔍', { fontSize: '60px' });
    magnifier.setOrigin(0.5);
    this.detectiveContainer.add(magnifier);
    
    // Scenario
    const scenario = this.add.text(0, -80, this.currentScenario.description, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      wordWrap: { width: 900 },
      align: 'center'
    });
    scenario.setOrigin(0.5);
    this.detectiveContainer.add(scenario);
    
    // Question type indicator
    const typeLabels: Record<string, string> = {
      'ml-type': 'ML Type Question',
      'supervised-subtype': 'Supervised Learning Subtype',
      'data-quality': 'Data Quality Question'
    };
    const typeLabel = this.add.text(0, -20, typeLabels[this.currentScenario.questionType], {
      fontSize: '16px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    typeLabel.setOrigin(0.5);
    this.detectiveContainer.add(typeLabel);
    
    const instruction = this.add.text(0, 20, 'Click the correct answer', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instruction.setOrigin(0.5);
    this.detectiveContainer.add(instruction);
    
    // Create answer buttons
    this.createAnswerButtons();
  }

  private createAnswerButtons(): void {
    if (!this.currentScenario) return;
    
    this.answerButtons = [];
    const numOptions = this.currentScenario.options.length;
    const spacing = 800 / (numOptions + 1);
    const startX = -400 + spacing;
    
    this.currentScenario.options.forEach((option, index) => {
      const x = startX + index * spacing;
      const container = this.add.container(x, 150);
      
      // Button background
      const button = this.add.rectangle(0, 0, 220, 200, option.color, 0.7);
      button.setStrokeStyle(4, option.color);
      button.setInteractive({ useHandCursor: true });
      container.add(button);
      
      // Button label
      const label = this.add.text(0, -40, option.label, {
        fontSize: '22px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 200 }
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Icon based on option type
      let icon = '🎯';
      if (option.value === 'supervised') icon = '📚';
      else if (option.value === 'unsupervised') icon = '🔍';
      else if (option.value === 'reinforcement') icon = '🎮';
      else if (option.value === 'classification') icon = '🏷️';
      else if (option.value === 'regression') icon = '📈';
      else if (option.value === 'clean-data') icon = '🧹';
      else if (option.value === 'overfitting') icon = '📈';
      else if (option.value === 'underfitting') icon = '📉';
      else if (option.value === 'insufficient-data') icon = '⚠️';
      
      const iconText = this.add.text(0, 30, icon, { fontSize: '50px' });
      iconText.setOrigin(0.5);
      container.add(iconText);
      
      button.on('pointerdown', () => {
        this.selectAnswer(option.value);
      });
      
      button.on('pointerover', () => {
        button.setScale(1.05);
        button.setFillStyle(option.color, 0.9);
      });
      
      button.on('pointerout', () => {
        button.setScale(1);
        button.setFillStyle(option.color, 0.7);
      });
      
      this.answerButtons.push({
        container,
        value: option.value
      });
      
      this.detectiveContainer!.add(container);
    });
  }

  private selectAnswer(selectedValue: string): void {
    if (!this.currentScenario) return;
    
    const isCorrect = selectedValue === this.currentScenario.correct;
    
    // Find the button
    const button = this.answerButtons.find(b => b.value === selectedValue);
    if (!button) return;
    
    // Animation
    this.tweens.add({
      targets: button.container,
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 200,
      yoyo: true
    });
    
    // Show feedback based on question type
    let feedbackText = '';
    if (isCorrect) {
      if (this.currentScenario.questionType === 'ml-type') {
        const feedbacks: Record<string, string> = {
          'supervised': '📊 Correct! Supervised learning uses labeled data to learn patterns.',
          'unsupervised': '🔍 Correct! Unsupervised learning finds patterns without labels.',
          'reinforcement': '🎮 Correct! Reinforcement learning learns through trial and reward.'
        };
        feedbackText = feedbacks[selectedValue] || '✓ Correct!';
      } else if (this.currentScenario.questionType === 'supervised-subtype') {
        const feedbacks: Record<string, string> = {
          'classification': '🏷️ Correct! Classification categorizes data into classes.',
          'regression': '📈 Correct! Regression predicts continuous numerical values.'
        };
        feedbackText = feedbacks[selectedValue] || '✓ Correct!';
      } else if (this.currentScenario.questionType === 'data-quality') {
        const feedbacks: Record<string, string> = {
          'clean-data': '🧹 Correct! Always clean data before training.',
          'overfitting': '📈 Correct! Overfitting means memorizing instead of learning.',
          'insufficient-data': '⚠️ Correct! More data is needed for better results.'
        };
        feedbackText = feedbacks[selectedValue] || '✓ Correct!';
      }
    } else {
      feedbackText = '❌ Not quite right. Try again!';
    }
    
    const feedback = this.add.text(0, 320, feedbackText, {
      fontSize: '22px',
      color: isCorrect ? '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') : '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 1000 }
    });
    feedback.setOrigin(0.5);
    this.detectiveContainer!.add(feedback);
    
    if (isCorrect) {
      // Create particle effect
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const particle = this.add.circle(button.container.x, button.container.y, 4, COLORS.SUCCESS);
        particle.setAlpha(0.9);
        this.detectiveContainer!.add(particle);
        
        this.tweens.add({
          targets: particle,
          x: button.container.x + Math.cos(angle) * 50,
          y: button.container.y + Math.sin(angle) * 50,
          alpha: 0,
          scale: 0,
          duration: 600,
          onComplete: () => particle.destroy()
        });
      }
      
      const correctText = this.add.text(0, 380, '✓ Correct!', {
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
      const tryAgain = this.add.text(0, 380, 'Try another answer!', {
        fontSize: '24px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'Arial'
      });
      tryAgain.setOrigin(0.5);
      this.detectiveContainer!.add(tryAgain);
      
      this.time.delayedCall(2000, () => {
        feedback.destroy();
        tryAgain.destroy();
      });
    }
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Machine Whisperer',
      concepts: [
        'ML can be supervised, unsupervised, or reinforcement learning',
        'Supervised learning has two types: Classification (categories) and Regression (numbers)',
        'Unsupervised learning finds patterns without labels',
        'Reinforcement learning learns through trial and reward',
        'Data quality is crucial: clean data, avoid overfitting, ensure sufficient data'
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
