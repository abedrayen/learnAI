import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { LabLinkInfo } from './LabLinkOverlay';

export interface RecapData {
  levelName: string;
  concepts: string[];
  labLink?: LabLinkInfo;
}

/**
 * Recap screen shown after completing a level
 */
export class RecapScreen {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;
  private onContinue?: () => void;
  private onGoToColab?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(1000);
  }

  show(data: RecapData, onContinue: () => void, onGoToColab?: () => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.onContinue = onContinue;
    this.onGoToColab = onGoToColab;
    this.container!.setVisible(true);

    // Background
    const bg = this.scene.add.rectangle(0, 0, 1100, 650, COLORS.BG_MEDIUM, 0.98);
    bg.setStrokeStyle(4, COLORS.SUCCESS);

    // Title
    const title = this.scene.add.text(0, -280, `Level Complete: ${data.levelName}`, {
      fontSize: '32px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Concepts learned
    const conceptsTitle = this.scene.add.text(0, -200, 'In this level, you learned:', {
      fontSize: '24px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    conceptsTitle.setOrigin(0.5);

    // Concept list
    const conceptTexts: Phaser.GameObjects.Text[] = [];
    data.concepts.forEach((concept, index) => {
      const yPos = -120 + index * 40;
      const bullet = this.scene.add.text(-400, yPos, '•', {
        fontSize: '20px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial'
      });
      bullet.setOrigin(0, 0.5);
      const text = this.scene.add.text(-380, yPos, concept, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        wordWrap: { width: 800 }
      });
      text.setOrigin(0, 0.5);
      conceptTexts.push(bullet, text);
    });

    // Lab link section (if provided)
    let labSection: Phaser.GameObjects.GameObject[] = [];
    if (data.labLink) {
      const labTitle = this.scene.add.text(0, 100, 'Try it in Colab:', {
        fontSize: '22px',
        color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      labTitle.setOrigin(0.5);
      const labDesc = this.scene.add.text(0, 140, data.labLink.description, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        wordWrap: { width: 900 },
        align: 'center'
      });
      labDesc.setOrigin(0.5);
      const labUrl = this.scene.add.text(0, 180, data.labLink.url, {
        fontSize: '14px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'monospace',
        wordWrap: { width: 900 }
      });
      labUrl.setOrigin(0.5);
      labSection = [labTitle, labDesc, labUrl];
    }

    // Buttons
    const buttonY = 250;
    const continueBtn = this.scene.add.rectangle(-200, buttonY, 200, 60, COLORS.PRIMARY);
    continueBtn.setOrigin(0.5, 0.5);
    const continueText = this.scene.add.text(-200, buttonY, 'Continue', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    continueText.setOrigin(0.5);
    // Use zone for better click detection in containers
    const continueZone = this.scene.add.zone(-200, buttonY, 200, 60);
    continueZone.setOrigin(0.5, 0.5);
    continueZone.setInteractive({ useHandCursor: true });
    continueZone.on('pointerdown', () => {
      this.hide();
      if (this.onContinue) this.onContinue();
    });

    let colabBtn: Phaser.GameObjects.GameObject[] = [];
    if (data.labLink && this.onGoToColab) {
      const btn = this.scene.add.rectangle(200, buttonY, 200, 60, COLORS.SECONDARY);
      btn.setOrigin(0.5, 0.5);
      const btnText = this.scene.add.text(200, buttonY, 'Go to Colab', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      btnText.setOrigin(0.5);
      // Use zone for better click detection
      const colabZone = this.scene.add.zone(200, buttonY, 200, 60);
      colabZone.setOrigin(0.5, 0.5);
      colabZone.setInteractive({ useHandCursor: true });
      colabZone.on('pointerdown', () => {
        if (this.onGoToColab) {
          window.open(data.labLink!.url, '_blank');
          this.onGoToColab();
        }
      });
      colabBtn = [btn, btnText, colabZone];
    }

    this.container!.add([
      bg, title, conceptsTitle, ...conceptTexts,
      ...labSection, continueBtn, continueText, continueZone, ...colabBtn
    ]);
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

