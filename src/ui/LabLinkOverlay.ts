import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

export interface LabLinkInfo {
  title: string;
  description: string;
  url: string;
  shortCode?: string;
}

/**
 * Lab Link Overlay for displaying Colab notebook links
 */
export class LabLinkOverlay {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(1000);
  }

  show(info: LabLinkInfo, onClose?: () => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.container!.setVisible(true);

    // Background
    const bg = this.scene.add.rectangle(0, 0, 1000, 500, COLORS.BG_MEDIUM, 0.95);
    bg.setStrokeStyle(4, COLORS.SECONDARY);

    // Title
    const title = this.scene.add.text(0, -200, info.title, {
      fontSize: '28px',
      color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Description
    const description = this.scene.add.text(0, -120, info.description, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 900 },
      align: 'center'
    });
    description.setOrigin(0.5);

    // URL label
    const urlLabel = this.scene.add.text(0, 0, 'Colab Notebook URL:', {
      fontSize: '20px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial'
    });
    urlLabel.setOrigin(0.5);

    // URL text field (styled to look like a text input)
    const urlBg = this.scene.add.rectangle(0, 50, 900, 60, COLORS.BG_LIGHT);
    urlBg.setStrokeStyle(2, COLORS.PRIMARY);
    const urlText = this.scene.add.text(0, 50, info.url, {
      fontSize: '16px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'monospace',
      wordWrap: { width: 850 }
    });
    urlText.setOrigin(0.5);
    // Text objects don't need explicit hitArea, but we'll use a simple rectangle
    urlText.setInteractive(new Phaser.Geom.Rectangle(-450, -30, 900, 60), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    urlText.on('pointerdown', () => {
      // Copy to clipboard (if possible) or open in new tab
      if (navigator.clipboard) {
        navigator.clipboard.writeText(info.url);
        this.showCopyFeedback();
      } else {
        window.open(info.url, '_blank');
      }
    });

    // Short code (if provided)
    let shortCodeElements: Phaser.GameObjects.GameObject[] = [];
    if (info.shortCode) {
      const shortCodeLabel = this.scene.add.text(0, 130, 'Short Code:', {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      shortCodeLabel.setOrigin(0.5);
      const shortCodeBg = this.scene.add.rectangle(0, 170, 300, 40, COLORS.BG_LIGHT);
      shortCodeBg.setStrokeStyle(2, COLORS.WARNING);
      const shortCodeText = this.scene.add.text(0, 170, info.shortCode, {
        fontSize: '18px',
        color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
        fontFamily: 'monospace',
        fontStyle: 'bold'
      });
      shortCodeText.setOrigin(0.5);
      shortCodeElements = [shortCodeLabel, shortCodeBg, shortCodeText];
    }

    // Close button
    const closeBtn = this.scene.add.rectangle(0, 220, 150, 50, COLORS.PRIMARY);
    const closeText = this.scene.add.text(0, 220, 'Close', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.setInteractive(new Phaser.Geom.Rectangle(-75, -25, 150, 50), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.hide();
      if (onClose) onClose();
    });

    this.container!.add([
      bg, title, description, urlLabel, urlBg, urlText,
      ...shortCodeElements, closeBtn, closeText
    ]);
  }

  private showCopyFeedback(): void {
    const feedback = this.scene.add.text(0, 100, 'URL copied to clipboard!', {
      fontSize: '16px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial'
    });
    feedback.setOrigin(0.5);
    this.container!.add(feedback);
    this.scene.time.delayedCall(2000, () => {
      feedback.destroy();
    });
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

