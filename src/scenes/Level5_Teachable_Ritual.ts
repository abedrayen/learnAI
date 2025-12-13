import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_5_SLIDES_ENHANCED } from '../data/learningSlides2';

export default class Level5_Teachable_Ritual extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'Level5_Teachable_Ritual' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.createExitButton();

    this.slideOverlay.show(LEVEL_5_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.showTeachableMachineLink();
      });
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);
    this.exitButton.on('pointerdown', () => {
      this.completeLevel();
    });

    const exitText = this.add.text(1200, 650, 'EXIT', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitText.setOrigin(0.5);
    exitText.setDepth(3001);
  }

  // ========== TEACHABLE MACHINE LINK ==========
  private showTeachableMachineLink(): void {
    const linkContainer = this.add.container(640, 360);
    linkContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    linkContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -200, 'Try It Yourself!', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    linkContainer.add(title);
    
    // Description
    const description = this.add.text(0, -100, 'You\'ve learned how to collect data and train a model.\nNow try creating your own model with Google Teachable Machine!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: 900 }
    });
    description.setOrigin(0.5);
    linkContainer.add(description);
    
    // Link button
    const linkBtn = this.add.rectangle(0, 100, 400, 80, COLORS.PRIMARY);
    linkBtn.setInteractive({ useHandCursor: true });
    linkBtn.setStrokeStyle(4, COLORS.SUCCESS);
    
    const linkText = this.add.text(0, 100, 'Open Teachable Machine', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    linkText.setOrigin(0.5);
    
    linkBtn.on('pointerdown', () => {
      window.open('https://teachablemachine.withgoogle.com/', '_blank');
    });
    
    linkBtn.on('pointerover', () => {
      linkBtn.setScale(1.05);
    });
    
    linkBtn.on('pointerout', () => {
      linkBtn.setScale(1);
    });
    
    linkContainer.add([linkBtn, linkText]);
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      linkContainer.destroy();
    });
    linkContainer.add([closeBtn, closeText]);
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
      },
      nextLevel: {
        key: 'Level6_Final_Artifact',
        name: 'Level 6: Final Artifact'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level5_Teachable_Ritual');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level5_Teachable_Ritual');
      this.scene.start(levelKey);
    });
  }

}
