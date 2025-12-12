import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { QuizOverlay, QuizQuestion } from '../ui/QuizOverlay';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_1_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

interface AIExample {
  x: number;
  y: number;
  type: string;
  description: string;
  collected: boolean;
  sprite?: Phaser.GameObjects.Rectangle;
  icon?: Phaser.GameObjects.Text;
}

interface CategoryPlatform {
  x: number;
  y: number;
  category: 'rule-based' | 'ml' | 'dl';
  label: string;
  sprite?: Phaser.GameObjects.Rectangle;
}

export default class Level1_AI_Jungle extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private quizOverlay?: QuizOverlay;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  
  private aiExamples: AIExample[] = [];
  private collectedCount: number = 0;
  private categoryPlatforms: CategoryPlatform[] = [];
  private categorizationActive: boolean = false;
  private currentExample?: { type: string; description: string; correct: string };
  private categorizationExamples: Array<{ type: string; description: string; correct: string }> = [];
  private completedCategorizations: number = 0;
  private floatingLabel?: Phaser.GameObjects.Text;
  private labTerminal?: Phaser.GameObjects.Rectangle;
  private exitZone?: Phaser.GameObjects.Zone;

  constructor() {
    super({ key: 'Level1_AI_Jungle' });
  }

  create(): void {
    // Initialize UI components
    this.dialogBox = new DialogBox(this);
    this.quizOverlay = new QuizOverlay(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);
    this.inputManager = new InputManager(this);

    // Background
    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    // Create platforms
    this.platforms = this.physics.add.staticGroup();
    this.createPlatforms();

    // Create player
    this.createPlayer();

    // Create AI example collectibles
    this.createAIExamples();

    // Create categorization platforms
    this.createCategoryPlatforms();

    // Create Lab Terminal
    this.createLabTerminal();

    // Create exit zone
    this.createExitZone();

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_1_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the AI Jungle! Your mission: Learn about AI by collecting examples and categorizing them. ' +
          'Collect the AI icons scattered around, then test your knowledge by categorizing examples!',
          () => {}
        );
      });
    }, this.inputManager);

    // Physics collisions
    this.physics.add.collider(this.player!, this.platforms!);
    
    // Create a group for AI examples for overlap detection
    const aiExampleGroup = this.physics.add.staticGroup();
    this.aiExamples.forEach(example => {
      if (example.sprite) {
        aiExampleGroup.add(example.sprite);
      }
    });
    this.physics.add.overlap(this.player!, aiExampleGroup, this.collectAIExample, undefined, this);
    
    // Category platforms overlap - create a group for them
    const categoryPlatformGroup = this.physics.add.staticGroup();
    this.categoryPlatforms.forEach(platform => {
      if (platform.sprite) {
        categoryPlatformGroup.add(platform.sprite);
      }
    });
    this.physics.add.overlap(this.player!, categoryPlatformGroup, this.landOnCategoryPlatform, undefined, this);
  }

  private createPlatforms(): void {
    // Ground
    SceneHelpers.createPlatform(this, this.platforms!, 640, 700, 1280, 40, COLORS.BG_MEDIUM);
    
    // Additional platforms
    SceneHelpers.createPlatform(this, this.platforms!, 200, 550, 300, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 500, 450, 300, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 800, 550, 300, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 1100, 450, 300, 20, COLORS.BG_LIGHT);
    
    // Categorization area platforms (at the end)
    SceneHelpers.createPlatform(this, this.platforms!, 300, 300, 200, 20, COLORS.SUCCESS);
    SceneHelpers.createPlatform(this, this.platforms!, 640, 300, 200, 20, COLORS.PRIMARY);
    SceneHelpers.createPlatform(this, this.platforms!, 980, 300, 200, 20, COLORS.SECONDARY);
  }

  private createPlayer(): void {
    this.player = SceneHelpers.createPlayer(this, 100, 400);
  }

  private createAIExamples(): void {
    const examples: Array<{x: number; y: number; type: string; description: string}> = [
      { x: 200, y: 500, type: 'search', description: 'Search engines use AI to find relevant results' },
      { x: 500, y: 400, type: 'recommendation', description: 'Netflix uses AI to recommend movies' },
      { x: 800, y: 500, type: 'face-recognition', description: 'Face recognition uses AI to identify people' },
      { x: 1100, y: 400, type: 'chatbot', description: 'Chatbots use AI to have conversations' },
      { x: 600, y: 200, type: 'self-driving', description: 'Self-driving cars use AI to navigate' }
    ];

    examples.forEach(example => {
      const sprite = this.add.rectangle(example.x, example.y, 50, 50, COLORS.SECONDARY);
      sprite.setStrokeStyle(3, COLORS.PRIMARY);
      sprite.setOrigin(0.5, 0.5);
      
      // Make it a physics body so overlap detection works
      this.physics.add.existing(sprite, true); // true = static body
      const body = sprite.body as Phaser.Physics.Arcade.StaticBody;
      if (body) {
        body.setSize(50, 50);
        // Static bodies are already immovable and don't have gravity
      }
      
      const icon = this.add.text(example.x, example.y, '🤖', { fontSize: '30px' });
      icon.setOrigin(0.5);
      
      this.aiExamples.push({
        ...example,
        collected: false,
        sprite,
        icon
      });
    });
  }

  private collectAIExample(player: Phaser.GameObjects.GameObject, exampleSprite: Phaser.GameObjects.GameObject): void {
    const example = this.aiExamples.find(e => e.sprite === exampleSprite);
    if (example && !example.collected) {
      example.collected = true;
      example.sprite!.setVisible(false);
      if (example.icon) {
        example.icon.setVisible(false);
      }
      this.collectedCount++;

      // Show tooltip
      this.dialogBox!.show(`Collected: ${example.description}`, () => {});

      // Check if all collected
      if (this.collectedCount >= this.aiExamples.length) {
        this.time.delayedCall(1000, () => {
          this.startCategorizationActivity();
        });
      }
    }
  }

  private createCategoryPlatforms(): void {
    this.categoryPlatforms = [
      { x: 300, y: 280, category: 'rule-based', label: 'Rule-based AI' },
      { x: 640, y: 280, category: 'ml', label: 'Machine Learning' },
      { x: 980, y: 280, category: 'dl', label: 'Deep Learning' }
    ];

    this.categoryPlatforms.forEach((platform, index) => {
      const sprite = this.add.rectangle(platform.x, platform.y, 200, 20, 
        index === 0 ? COLORS.SUCCESS : index === 1 ? COLORS.PRIMARY : COLORS.SECONDARY);
      sprite.setAlpha(0.5);
      sprite.setOrigin(0.5, 0.5);
      
      // Make it a physics body for overlap detection
      this.physics.add.existing(sprite, true); // true = static body
      const body = sprite.body as Phaser.Physics.Arcade.StaticBody;
      if (body) {
        body.setSize(200, 20);
      }
      
      const label = this.add.text(platform.x, platform.y - 30, platform.label, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      platform.sprite = sprite;
    });
  }

  private startCategorizationActivity(): void {
    this.categorizationActive = true;
    this.completedCategorizations = 0;
    
    // Initialize the list of examples to categorize
    this.categorizationExamples = [
      { type: 'rule-based', description: 'Classic calculator', correct: 'rule-based' },
      { type: 'ml', description: 'Netflix recommendations', correct: 'ml' },
      { type: 'dl', description: 'Self-driving car vision', correct: 'dl' },
      { type: 'ml', description: 'Email spam filter', correct: 'ml' },
      { type: 'dl', description: 'Image recognition', correct: 'dl' }
    ];
    
    this.dialogBox!.show(
      'Great! Now categorize these examples. Jump onto the correct platform for each example that appears.',
      () => {
        this.showNextCategorizationExample();
      }
    );
  }

  private showNextCategorizationExample(): void {
    // Check if all examples are done
    if (this.completedCategorizations >= this.categorizationExamples.length) {
      this.dialogBox!.show(
        'Excellent! You\'ve completed all categorizations. You can now proceed to the exit!',
        () => {}
      );
      this.categorizationActive = false;
      return;
    }

    // Remove any existing floating label
    if (this.floatingLabel) {
      this.floatingLabel.destroy();
      this.floatingLabel = undefined;
    }

    // Get a random example from the remaining ones
    const availableExamples = this.categorizationExamples.filter((_, index) => 
      !this.categorizationExamples.slice(0, this.completedCategorizations).some((ex, i) => 
        i === index && ex.description === this.categorizationExamples[index].description
      )
    );
    
    // Actually, let's just go through them in order to avoid repeats
    if (this.completedCategorizations < this.categorizationExamples.length) {
      this.currentExample = this.categorizationExamples[this.completedCategorizations];
      
      this.floatingLabel = this.add.text(640, 150, this.currentExample.description, {
        fontSize: '24px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold',
        backgroundColor: '#' + COLORS.BG_MEDIUM.toString(16).padStart(6, '0'),
        padding: { x: 20, y: 10 }
      });
      this.floatingLabel.setOrigin(0.5);
      this.floatingLabel.setDepth(100);
    }
  }

  private landOnCategoryPlatform(player: Phaser.GameObjects.GameObject, platformSprite: Phaser.GameObjects.GameObject): void {
    if (!this.categorizationActive || !this.currentExample) return;

    const platform = this.categoryPlatforms.find(p => p.sprite === platformSprite);
    if (!platform) return;

    const isCorrect = platform.category === this.currentExample.correct;
    
    if (isCorrect) {
      const exampleDesc = this.currentExample.description;
      this.completedCategorizations++;
      
      // Remove floating label
      if (this.floatingLabel) {
        this.floatingLabel.destroy();
        this.floatingLabel = undefined;
      }
      
      this.dialogBox!.show(
        `Correct! ${exampleDesc} is an example of ${this.currentExample.correct === 'rule-based' ? 'Rule-based AI' : this.currentExample.correct === 'ml' ? 'Machine Learning' : 'Deep Learning'}.`,
        () => {
          this.currentExample = undefined;
          // Continue with next or complete
          this.time.delayedCall(500, () => {
            this.showNextCategorizationExample();
          });
        }
      );
    } else {
      this.dialogBox!.show(
        `Not quite! Try again. ${this.currentExample.description} belongs to a different category.`,
        () => {}
      );
    }
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
        title: 'AI Intro Lab',
        description: 'Open this Colab to see a simple Python notebook that lists different AI applications and classifies them.',
        url: 'https://colab.research.google.com/ai_intro_examples',
        shortCode: 'colab.link/ai-intro-1'
      };
      this.labLinkOverlay!.show(labInfo);
    });
  }

  private createExitZone(): void {
    // Create exit as a rectangle with physics for better detection
    const exitRect = this.add.rectangle(1200, 650, 80, 50, COLORS.SUCCESS);
    exitRect.setAlpha(0.3); // Make it semi-transparent so it's visible but not too prominent
    exitRect.setOrigin(0.5, 0.5);
    this.physics.add.existing(exitRect, true); // true = static body
    const exitBody = exitRect.body as Phaser.Physics.Arcade.StaticBody;
    if (exitBody) {
      exitBody.setSize(80, 50);
    }
    
    // Store as exitZone for reference
    this.exitZone = exitRect as any;
    
    // Create a static group for the exit
    const exitGroup = this.physics.add.staticGroup();
    exitGroup.add(exitRect);
    
    this.physics.add.overlap(this.player!, exitGroup, () => {
      // Only allow exit if categorization is complete or not required
      if (!this.categorizationActive || this.completedCategorizations >= this.categorizationExamples.length) {
        this.completeLevel();
      } else {
        this.dialogBox!.show(
          'Complete the categorization activity first! Jump onto the platforms to categorize the examples.',
          () => {}
        );
      }
    }, undefined, this);

    const exitSign = this.add.text(1200, 650, 'EXIT', {
      fontSize: '20px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitSign.setOrigin(0.5);
    exitSign.setDepth(10); // Make sure text is visible
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'AI Jungle',
      concepts: [
        'AI is used in many everyday applications',
        'AI can be categorized into Rule-based, Machine Learning, and Deep Learning',
        'Different AI systems work in different ways'
      ],
      labLink: {
        title: 'AI Intro Lab',
        description: 'Try classifying AI examples in Python',
        url: 'https://colab.research.google.com/ai_intro_examples'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level1_AI_Jungle');
      this.scene.start('MenuScene');
    }, () => {
      // Go to Colab callback
    });
  }

  update(): void {
    if (!this.player || !this.inputManager) return;

    // Horizontal movement
    if (this.inputManager.isLeftPressed()) {
      this.player.setVelocityX(-200);
    } else if (this.inputManager.isRightPressed()) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    // Jumping
    if (this.inputManager.isJumpJustPressed() && this.player.body!.touching.down) {
      this.player.setVelocityY(-500);
    }
  }
}

