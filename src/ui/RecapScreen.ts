import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { LabLinkInfo } from './LabLinkOverlay';

export interface RecapData {
  levelName: string;
  concepts: string[];
  labLink?: LabLinkInfo;
  nextLevel?: {
    key: string;
    name: string;
  };
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
  private onNextLevel?: (levelKey: string) => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(1000);
  }

  show(data: RecapData, onContinue: () => void, onGoToColab?: () => void, onNextLevel?: (levelKey: string) => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.onContinue = onContinue;
    this.onGoToColab = onGoToColab;
    this.onNextLevel = onNextLevel;
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
        wordWrap: { width: 700 }
      });
      labUrl.setOrigin(0.5);
      
      // Copy button
      const copyBtn = this.scene.add.rectangle(400, 180, 100, 40, COLORS.PRIMARY);
      copyBtn.setOrigin(0.5);
      copyBtn.setInteractive({ useHandCursor: true });
      const copyText = this.scene.add.text(400, 180, 'Copy', {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      copyText.setOrigin(0.5);
      
      let copyFeedback: Phaser.GameObjects.Text | null = null;
      copyBtn.on('pointerdown', () => {
        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(data.labLink.url).then(() => {
            // Show feedback
            if (copyFeedback) {
              copyFeedback.destroy();
            }
            copyFeedback = this.scene.add.text(400, 220, '✓ Copied!', {
              fontSize: '14px',
              color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
              fontFamily: 'Arial',
              fontStyle: 'bold'
            });
            copyFeedback.setOrigin(0.5);
            this.container!.add(copyFeedback);
            
            // Remove feedback after 2 seconds
            this.scene.time.delayedCall(2000, () => {
              if (copyFeedback) {
                copyFeedback.destroy();
                copyFeedback = null;
              }
            });
          }).catch((err) => {
            console.error('Failed to copy:', err);
            // Try fallback method
            const textArea = document.createElement('textarea');
            textArea.value = data.labLink.url;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
              document.execCommand('copy');
              if (copyFeedback) {
                copyFeedback.destroy();
              }
              copyFeedback = this.scene.add.text(400, 220, '✓ Copied!', {
                fontSize: '14px',
                color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
                fontFamily: 'Arial',
                fontStyle: 'bold'
              });
              copyFeedback.setOrigin(0.5);
              this.container!.add(copyFeedback);
              this.scene.time.delayedCall(2000, () => {
                if (copyFeedback) {
                  copyFeedback.destroy();
                  copyFeedback = null;
                }
              });
            } catch (fallbackErr) {
              console.error('Fallback copy failed:', fallbackErr);
              if (copyFeedback) {
                copyFeedback.destroy();
              }
              copyFeedback = this.scene.add.text(400, 220, 'Copy failed', {
                fontSize: '14px',
                color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
                fontFamily: 'Arial'
              });
              copyFeedback.setOrigin(0.5);
              this.container!.add(copyFeedback);
              this.scene.time.delayedCall(2000, () => {
                if (copyFeedback) {
                  copyFeedback.destroy();
                  copyFeedback = null;
                }
              });
            }
            document.body.removeChild(textArea);
          });
        } else {
          // Fallback for browsers without clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = data.labLink.url;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            if (copyFeedback) {
              copyFeedback.destroy();
            }
            copyFeedback = this.scene.add.text(400, 220, '✓ Copied!', {
              fontSize: '14px',
              color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
              fontFamily: 'Arial',
              fontStyle: 'bold'
            });
            copyFeedback.setOrigin(0.5);
            this.container!.add(copyFeedback);
            this.scene.time.delayedCall(2000, () => {
              if (copyFeedback) {
                copyFeedback.destroy();
                copyFeedback = null;
              }
            });
          } catch (err) {
            console.error('Fallback copy failed:', err);
          }
          document.body.removeChild(textArea);
        }
      });
      
      copyBtn.on('pointerover', () => {
        copyBtn.setScale(1.05);
      });
      
      copyBtn.on('pointerout', () => {
        copyBtn.setScale(1);
      });
      
      labSection = [labTitle, labDesc, labUrl, copyBtn, copyText];
    }

    // Buttons
    const buttonY = 250;
    let continueBtn: Phaser.GameObjects.GameObject[] = [];
    
    // Show "Continue to Level N+1" if next level is available, otherwise show "Continue"
    if (data.nextLevel && this.onNextLevel) {
      const nextLevelBtn = this.scene.add.rectangle(0, buttonY, 300, 60, COLORS.SUCCESS);
      nextLevelBtn.setOrigin(0.5, 0.5);
      const nextLevelText = this.scene.add.text(0, buttonY, `To ${data.nextLevel.name}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      nextLevelText.setOrigin(0.5);
      const nextLevelZone = this.scene.add.zone(0, buttonY, 300, 60);
      nextLevelZone.setOrigin(0.5, 0.5);
      nextLevelZone.setInteractive({ useHandCursor: true });
      nextLevelZone.on('pointerdown', () => {
        this.hide();
        if (this.onNextLevel) {
          this.onNextLevel(data.nextLevel!.key);
        }
      });
      continueBtn = [nextLevelBtn, nextLevelText, nextLevelZone];
    } else {
      const btn = this.scene.add.rectangle(0, buttonY, 200, 60, COLORS.PRIMARY);
      btn.setOrigin(0.5, 0.5);
      const btnText = this.scene.add.text(0, buttonY, 'Continue', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      btnText.setOrigin(0.5);
      const btnZone = this.scene.add.zone(0, buttonY, 200, 60);
      btnZone.setOrigin(0.5, 0.5);
      btnZone.setInteractive({ useHandCursor: true });
      btnZone.on('pointerdown', () => {
        this.hide();
        if (this.onContinue) this.onContinue();
      });
      continueBtn = [btn, btnText, btnZone];
    }

    let colabBtn: Phaser.GameObjects.GameObject[] = [];
    if (data.labLink && this.onGoToColab) {
      const colabX = data.nextLevel ? -150 : 200;
      const btn = this.scene.add.rectangle(colabX, buttonY, 200, 60, COLORS.SECONDARY);
      btn.setOrigin(0.5, 0.5);
      const btnText = this.scene.add.text(colabX, buttonY, 'Go to Colab', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      btnText.setOrigin(0.5);
      // Use zone for better click detection
      const colabZone = this.scene.add.zone(colabX, buttonY, 200, 60);
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
      ...labSection, ...continueBtn, ...colabBtn
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

