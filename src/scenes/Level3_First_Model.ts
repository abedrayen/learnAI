import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_3_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

/**
 * Level 3: Data Scrolls & First Spell (First Model / Linear Regression)
 * Concepts: Using data to fit a simple model, understanding that models learn patterns
 */
export default class Level3_First_Model extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private inputManager?: InputManager;
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private labTerminal?: Phaser.GameObjects.Rectangle;
  private exitZone?: Phaser.GameObjects.Zone;

  constructor() {
    super({ key: 'Level3_First_Model' });
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

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_3_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to Data Scrolls! Learn how models learn patterns from data. ' +
          'TODO: Implement drag-and-drop pipeline puzzle and prediction activity.',
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
        title: 'First Model Lab',
        description: 'Open this Colab to train your first linear regression model and see how it learns patterns from data.',
        url: 'https://colab.research.google.com/first_linear_model',
        shortCode: 'colab.link/first-model-1'
      };
      this.labLinkOverlay!.show(labInfo);
    });
  }

  private createExitZone(): void {
    this.exitZone = this.add.zone(1200, 650, 80, 50);
    this.physics.add.existing(this.exitZone, true);
    this.physics.add.overlap(this.player!, this.exitZone, () => {
      this.completeLevel();
    }, undefined, this);

    const exitSign = this.add.text(1200, 650, 'EXIT', {
      fontSize: '20px',
      color: COLORS.SUCCESS.toString(16),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitSign.setOrigin(0.5);
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Data Scrolls & First Spell',
      concepts: [
        'Models learn patterns from data',
        'The ML pipeline: Load Data → Split → Train → Test → Predict',
        'Linear regression is a simple but powerful model'
      ],
      labLink: {
        title: 'First Model Lab',
        description: 'Train your first model in Python',
        url: 'https://colab.research.google.com/first_linear_model'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level3_First_Model');
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

