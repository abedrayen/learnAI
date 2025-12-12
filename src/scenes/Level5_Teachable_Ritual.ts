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

/**
 * Level 5: Teachable Ritual (Teachable Machine Concept)
 * Concepts: Collecting examples, training on custom data, testing models
 */
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

    // Show learning slides first, then enable gameplay
    this.slideOverlay.show(LEVEL_5_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Teachable Ritual! Learn how to train models on your own data. ' +
          'TODO: Implement shrine selection, example collection simulation, and testing simulation.',
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

