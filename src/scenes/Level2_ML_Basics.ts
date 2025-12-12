import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_2_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

/**
 * Level 2: Machine Whisperer (ML Basics)
 * Concepts: Dataset, features, labels, training vs testing, supervised vs unsupervised vs reinforcement
 */
interface DataOrb {
  x: number;
  y: number;
  type: 'feature' | 'label';
  sprite?: Phaser.GameObjects.Rectangle;
  collected: boolean;
}

export default class Level2_ML_Basics extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private labTerminal?: Phaser.GameObjects.Rectangle;
  private exitZone?: Phaser.GameObjects.Rectangle;
  
  private dataOrbs: DataOrb[] = [];
  private collectedOrbs: number = 0;
  private featureBox?: Phaser.GameObjects.Rectangle;
  private labelBox?: Phaser.GameObjects.Rectangle;
  private dataCollectionActive: boolean = false;
  private mlGateActive: boolean = false;
  private currentScenario?: { description: string; correct: 'supervised' | 'unsupervised' | 'reinforcement' };
  private mlGates: Array<{ x: number; y: number; type: 'supervised' | 'unsupervised' | 'reinforcement'; sprite?: Phaser.GameObjects.Rectangle }> = [];

  constructor() {
    super({ key: 'Level2_ML_Basics' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
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

    // Create Lab Terminal
    this.createLabTerminal();

    // Create data collection boxes
    this.createDataBoxes();

    // Create ML type gates
    this.createMLGates();

    // Create exit zone
    this.createExitZone();

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_2_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Machine Whisperer level! Your mission: Learn about ML by collecting data points and categorizing ML types. ' +
          'First, collect the data orbs and sort them into Features and Labels boxes.',
          () => {
            this.startDataCollection();
          }
        );
      });
    }, this.inputManager);

    // Physics collisions
    this.physics.add.collider(this.player!, this.platforms!);
  }

  private createPlatforms(): void {
    SceneHelpers.createPlatform(this, this.platforms!, 640, 700, 1280, 40, COLORS.BG_MEDIUM);
    SceneHelpers.createPlatform(this, this.platforms!, 200, 550, 200, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 500, 450, 200, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 800, 550, 200, 20, COLORS.BG_LIGHT);
    SceneHelpers.createPlatform(this, this.platforms!, 1100, 450, 200, 20, COLORS.BG_LIGHT);
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
        title: 'ML Basics Lab',
        description: 'Open this Colab to see a simple Python notebook that demonstrates ML workflow: loading data, splitting into train/test, and training a simple model.',
        url: 'https://colab.research.google.com/ml_basics_workflow',
        shortCode: 'colab.link/ml-basics-1'
      };
      this.labLinkOverlay!.show(labInfo);
    });
  }

  private createDataBoxes(): void {
    // Feature box (left side)
    this.featureBox = this.add.rectangle(200, 300, 150, 100, COLORS.PRIMARY);
    this.featureBox.setAlpha(0.5);
    this.featureBox.setStrokeStyle(3, COLORS.PRIMARY);
    const featureLabel = this.add.text(200, 300, 'Features\n(Inputs)', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    featureLabel.setOrigin(0.5);

    // Label box (right side)
    this.labelBox = this.add.rectangle(1080, 300, 150, 100, COLORS.SUCCESS);
    this.labelBox.setAlpha(0.5);
    this.labelBox.setStrokeStyle(3, COLORS.SUCCESS);
    const labelLabel = this.add.text(1080, 300, 'Labels\n(Outputs)', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    labelLabel.setOrigin(0.5);
  }

  private startDataCollection(): void {
    this.dataCollectionActive = true;
    
    // Create data orbs
    const orbPositions = [
      { x: 300, y: 500, type: 'feature' as const },
      { x: 500, y: 400, type: 'label' as const },
      { x: 700, y: 500, type: 'feature' as const },
      { x: 900, y: 400, type: 'label' as const },
      { x: 600, y: 300, type: 'feature' as const }
    ];

    orbPositions.forEach(pos => {
      const orb = this.add.rectangle(pos.x, pos.y, 40, 40, 
        pos.type === 'feature' ? COLORS.PRIMARY : COLORS.SUCCESS);
      orb.setOrigin(0.5, 0.5);
      orb.setStrokeStyle(2, 0xffffff);
      
      // Make it a physics body
      this.physics.add.existing(orb, true);
      const body = orb.body as Phaser.Physics.Arcade.StaticBody;
      if (body) {
        body.setSize(40, 40);
      }
      
      this.dataOrbs.push({
        ...pos,
        sprite: orb,
        collected: false
      });
    });

    // Create physics group for orbs
    const orbGroup = this.physics.add.staticGroup();
    this.dataOrbs.forEach(orb => {
      if (orb.sprite) orbGroup.add(orb.sprite);
    });
    
    this.physics.add.overlap(this.player!, orbGroup, this.collectDataOrb, undefined, this);
    this.physics.add.overlap(this.player!, [this.featureBox!, this.labelBox!].filter(b => b), 
      this.dropOrbInBox, undefined, this);
  }

  private collectDataOrb(player: Phaser.GameObjects.GameObject, orbSprite: Phaser.GameObjects.GameObject): void {
    const orb = this.dataOrbs.find(o => o.sprite === orbSprite);
    if (orb && !orb.collected) {
      orb.collected = true;
      orb.sprite!.setVisible(false);
      this.collectedOrbs++;
      
      this.dialogBox!.show(
        `Collected a ${orb.type === 'feature' ? 'Feature' : 'Label'}! ` +
        `Take it to the ${orb.type === 'feature' ? 'Features' : 'Labels'} box.`,
        () => {}
      );
    }
  }

  private dropOrbInBox(player: Phaser.GameObjects.GameObject, boxSprite: Phaser.GameObjects.GameObject): void {
    // This is a simplified version - in a full implementation, you'd track which orb the player is carrying
    // For now, we'll just check if all orbs are collected
    if (this.collectedOrbs >= this.dataOrbs.length && !this.mlGateActive) {
      this.mlGateActive = true;
      this.dataCollectionActive = false;
      this.dialogBox!.show(
        'Great! You\'ve learned about features and labels. Now test your knowledge of ML types by choosing the correct gate!',
        () => {
          this.startMLGateActivity();
        }
      );
    }
  }

  private createMLGates(): void {
    this.mlGates = [
      { x: 300, y: 200, type: 'supervised' },
      { x: 640, y: 200, type: 'unsupervised' },
      { x: 980, y: 200, type: 'reinforcement' }
    ];

    this.mlGates.forEach((gate, index) => {
      const sprite = this.add.rectangle(gate.x, gate.y, 200, 150, 
        index === 0 ? COLORS.PRIMARY : index === 1 ? COLORS.SECONDARY : COLORS.WARNING);
      sprite.setAlpha(0.6);
      sprite.setStrokeStyle(4, 0xffffff);
      sprite.setOrigin(0.5, 0.5);
      
      // Make it a physics body
      this.physics.add.existing(sprite, true);
      const body = sprite.body as Phaser.Physics.Arcade.StaticBody;
      if (body) {
        body.setSize(200, 150);
      }
      
      const label = this.add.text(gate.x, gate.y, gate.type.charAt(0).toUpperCase() + gate.type.slice(1), {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      
      gate.sprite = sprite;
    });
  }

  private startMLGateActivity(): void {
    const scenarios = [
      { description: 'We have images with cat/dog labels. Which type?', correct: 'supervised' as const },
      { description: 'Finding patterns in customer data without labels. Which type?', correct: 'unsupervised' as const },
      { description: 'Training an AI to play a game through trial and error. Which type?', correct: 'reinforcement' as const }
    ];

    const randomScenario = Phaser.Utils.Array.GetRandom(scenarios);
    this.currentScenario = randomScenario;
    
    const scenarioText = this.add.text(640, 100, randomScenario.description, {
      fontSize: '22px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      backgroundColor: '#' + COLORS.BG_MEDIUM.toString(16).padStart(6, '0'),
      padding: { x: 20, y: 10 },
      wordWrap: { width: 1000 }
    });
    scenarioText.setOrigin(0.5);
    scenarioText.setDepth(100);

    // Create physics group for gates
    const gateGroup = this.physics.add.staticGroup();
    this.mlGates.forEach(gate => {
      if (gate.sprite) gateGroup.add(gate.sprite);
    });
    
    this.physics.add.overlap(this.player!, gateGroup, this.enterMLGate, undefined, this);
  }

  private enterMLGate(player: Phaser.GameObjects.GameObject, gateSprite: Phaser.GameObjects.GameObject): void {
    if (!this.mlGateActive || !this.currentScenario) return;

    const gate = this.mlGates.find(g => g.sprite === gateSprite);
    if (!gate) return;

    const isCorrect = gate.type === this.currentScenario.correct;
    
    if (isCorrect) {
      this.dialogBox!.show(
        `Correct! ${this.currentScenario.description} This is ${gate.type} learning.`,
        () => {
          this.mlGateActive = false;
          this.currentScenario = undefined;
          // Remove scenario text
          this.children.list.forEach(child => {
            if (child instanceof Phaser.GameObjects.Text && child.text.includes('Which type?')) {
              child.destroy();
            }
          });
        }
      );
    } else {
      this.dialogBox!.show(
        `Not quite! Try a different gate.`,
        () => {}
      );
    }
  }

  private createExitZone(): void {
    // Create exit as a rectangle with physics for better detection
    const exitRect = this.add.rectangle(1200, 650, 80, 50, COLORS.SUCCESS);
    exitRect.setAlpha(0.3);
    exitRect.setOrigin(0.5, 0.5);
    this.physics.add.existing(exitRect, true);
    const exitBody = exitRect.body as Phaser.Physics.Arcade.StaticBody;
    if (exitBody) {
      exitBody.setSize(80, 50);
    }
    
    this.exitZone = exitRect;
    
    const exitGroup = this.physics.add.staticGroup();
    exitGroup.add(exitRect);
    
    this.physics.add.overlap(this.player!, exitGroup, () => {
      if (!this.mlGateActive || !this.currentScenario) {
        this.completeLevel();
      } else {
        this.dialogBox!.show(
          'Complete the ML type gate activity first!',
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
    exitSign.setDepth(10);
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Machine Whisperer',
      concepts: [
        'Datasets contain features (inputs) and labels (outputs)',
        'ML models are trained on training data and tested on test data',
        'ML can be supervised, unsupervised, or reinforcement learning'
      ],
      labLink: {
        title: 'ML Basics Lab',
        description: 'Try the ML workflow in Python',
        url: 'https://colab.research.google.com/ml_basics_workflow'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level2_ML_Basics');
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

