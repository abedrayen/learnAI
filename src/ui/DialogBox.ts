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
    // Centered on screen (both X and Y), on top of all elements
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(5000); // Highest depth to be on top of everything
  }

  show(text: string, onClose?: () => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.container!.setVisible(true);

    // Background - centered
    const bg = this.scene.add.rectangle(0, 0, 1000, 150, COLORS.BG_MEDIUM, 0.95);
    bg.setStrokeStyle(4, COLORS.PRIMARY);
    bg.setOrigin(0.5, 0.5);

    // Text - centered
    const textObj = this.scene.add.text(0, 0, text, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 900 },
      align: 'center'
    });
    textObj.setOrigin(0.5, 0.5);

    // Close button - centered below text
    const closeBtnY = 75; // Position below the dialog box
    const closeBtn = this.scene.add.zone(0, closeBtnY, 100, 40);
    closeBtn.setOrigin(0.5, 0.5);
    const closeBtnRect = this.scene.add.rectangle(0, closeBtnY, 100, 40, COLORS.PRIMARY);
    closeBtnRect.setOrigin(0.5, 0.5);
    const closeText = this.scene.add.text(0, closeBtnY, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    closeText.setOrigin(0.5, 0.5);
    // Make the zone interactive
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.hide();
      if (onClose) onClose();
    });

    // Add all elements to container (zone last so it's on top for clicks)
    this.container!.add([bg, textObj, closeBtnRect, closeText, closeBtn]);
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

