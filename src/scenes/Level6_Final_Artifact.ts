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

/**
 * Level 6: Final Artifact (Mini Project / Boss Level)
 * Concepts: Full ML pipeline, connecting all concepts together
 */
export default class Level6_Final_Artifact extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private quizOverlay?: QuizOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitZone?: Phaser.GameObjects.Zone;
  private quizCompleted: boolean = false;

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

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_6_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Final Artifact! Complete the pipeline room and final quiz to earn your certificate. ' +
          'TODO: Implement pipeline room activity and final quiz.',
          () => {}
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
      if (!this.quizCompleted) {
        this.startFinalQuiz();
      } else {
        this.completeLevel();
      }
    }, undefined, this);

    const exitSign = this.add.text(1200, 650, 'QUIZ', {
      fontSize: '20px',
      color: COLORS.WARNING.toString(16),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitSign.setOrigin(0.5);
  }

  private startFinalQuiz(): void {
    const questions: QuizQuestion[] = [
      {
        question: 'What is the difference between AI, ML, and DL?',
        options: [
          'AI is the broad field, ML is a subset, DL is a subset of ML',
          'They are all the same thing',
          'ML is the broadest, then AI, then DL'
        ],
        correctIndex: 0,
        explanation: 'AI is the broadest field. Machine Learning is a subset of AI that learns from data. Deep Learning is a subset of ML using neural networks.'
      },
      {
        question: 'What is a label in machine learning?',
        options: [
          'The correct answer or output we want to predict',
          'A feature of the input data',
          'The model itself'
        ],
        correctIndex: 0,
        explanation: 'Labels are the correct answers we want our model to learn to predict.'
      },
      {
        question: 'What is a neuron in a neural network?',
        options: [
          'A unit that computes a weighted sum and applies an activation function',
          'A type of data',
          'A training algorithm'
        ],
        correctIndex: 0,
        explanation: 'A neuron takes inputs, multiplies them by weights, sums them, and applies an activation function.'
      },
      {
        question: 'What is a train/test split?',
        options: [
          'Dividing data into training set (to learn) and test set (to evaluate)',
          'Splitting the model into two parts',
          'Training the model twice'
        ],
        correctIndex: 0,
        explanation: 'We split data so the model learns on training data and we evaluate on unseen test data.'
      },
      {
        question: 'What does Teachable Machine do?',
        options: [
          'Lets you train custom models using your own data',
          'Teaches you how to code',
          'Is a programming language'
        ],
        correctIndex: 0,
        explanation: 'Teachable Machine is a tool that lets you create custom AI models by providing your own examples.'
      }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    const showNextQuestion = () => {
      if (currentQuestionIndex < questions.length) {
        this.quizOverlay!.show(questions[currentQuestionIndex], (correct: boolean) => {
          if (correct) correctAnswers++;
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            this.time.delayedCall(500, showNextQuestion);
          } else {
            this.quizCompleted = true;
            this.dialogBox!.show(
              `Quiz Complete! You got ${correctAnswers} out of ${questions.length} correct. ` +
              `Go to the exit to see your certificate!`,
              () => {}
            );
          }
        });
      }
    };

    showNextQuestion();
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Final Artifact',
      concepts: [
        'AI, ML, and DL are connected concepts',
        'The full ML pipeline: Data → Model → Evaluation',
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

    // All links panel
    const linksTitle = this.add.text(640, 480, 'Continue Learning:', {
      fontSize: '18px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    linksTitle.setOrigin(0.5);

    const linksText = this.add.text(640, 520,
      'Level 1: https://colab.research.google.com/ai_intro_examples\n' +
      'Level 2: https://colab.research.google.com/ml_basics_workflow\n' +
      'Level 3: https://colab.research.google.com/first_linear_model\n' +
      'Level 4: https://colab.research.google.com/tiny_neural_net_mnist\n' +
      'Level 5: https://teachablemachine.withgoogle.com/',
      {
        fontSize: '12px',
        color: '#000000',
        fontFamily: 'monospace',
        align: 'center'
      }
    );
    linksText.setOrigin(0.5);

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

