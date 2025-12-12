import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

/**
 * Dialog box for NPC conversations, signs, and explanations
 */
export class DialogBox {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 500);
    this.container.setVisible(false);
    this.container.setDepth(1000);
  }

  show(text: string, onClose?: () => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.container!.setVisible(true);

    // Background
    const bg = this.scene.add.rectangle(0, 0, 1000, 150, COLORS.BG_MEDIUM, 0.95);
    bg.setStrokeStyle(4, COLORS.PRIMARY);

    // Text
    const textObj = this.scene.add.text(0, 0, text, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 900 },
      align: 'center'
    });
    textObj.setOrigin(0.5);

    // Close button - create as a zone for better click detection
    const closeBtn = this.scene.add.zone(450, -50, 100, 40);
    closeBtn.setOrigin(0.5, 0.5);
    const closeBtnRect = this.scene.add.rectangle(450, -50, 100, 40, COLORS.PRIMARY);
    closeBtnRect.setOrigin(0.5, 0.5);
    const closeText = this.scene.add.text(450, -50, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    // Make the zone interactive
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.hide();
      if (onClose) onClose();
    });

    this.container!.add([bg, textObj, closeBtnRect, closeText, closeBtn]); // Zone last so it's on top for clicks

    this.container!.add([bg, textObj, closeBtn, closeText]);
  }

  hide(): void {
    this.isVisible = false;
    if (this.container) {
      this.container.removeAll(true);
      this.container.setVisible(false);
    }
  }

  destroy(): void {
    if (this.container) {
      this.container.destroy();
    }
  }
}

