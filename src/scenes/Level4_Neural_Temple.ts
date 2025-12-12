import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { InputManager } from '../systems/InputManager';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_4_SLIDES_ENHANCED } from '../data/learningSlides2';
import { SceneHelpers } from '../utils/SceneHelpers';

/**
 * Level 4: Neural Temple (Deep Learning Basics)
 * Concepts: Neuron, layers, weighted sum + activation, why DL is useful
 */
export default class Level4_Neural_Temple extends Phaser.Scene {
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
    super({ key: 'Level4_Neural_Temple' });
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
    this.slideOverlay.show(LEVEL_4_SLIDES_ENHANCED, () => {
      // Slides completed - enable gameplay
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Neural Temple! Explore how neural networks work through layers of neurons. ' +
          'TODO: Implement "Path of the Signal" activity and neuron switch puzzle.',
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
        title: 'Tiny Neural Net Lab',
        description: 'Open this Colab to build and train a small neural network on MNIST digits.',
        url: 'https://colab.research.google.com/tiny_neural_net_mnist',
        shortCode: 'colab.link/neural-net-1'
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
      levelName: 'Neural Temple',
      concepts: [
        'Neural networks consist of layers of neurons',
        'Each neuron performs a weighted sum and applies an activation function',
        'Deep learning is powerful for images, speech, and text'
      ],
      labLink: {
        title: 'Tiny Neural Net Lab',
        description: 'Build your first neural network',
        url: 'https://colab.research.google.com/tiny_neural_net_mnist'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level4_Neural_Temple');
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

