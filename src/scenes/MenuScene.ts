import Phaser from 'phaser';
import { COLORS, LEVELS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { AchievementOverlay } from '../ui/AchievementOverlay';
import { AchievementManager } from '../systems/AchievementManager';
import { soundManager } from '../systems/SoundManager';

export default class MenuScene extends Phaser.Scene {
  private achievementOverlay?: AchievementOverlay;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    this.achievementOverlay = new AchievementOverlay(this);
    
    // Background
    this.add.rectangle(640, 360, 1280, 720, COLORS.BG_DARK);

    // Title
    const title = this.add.text(640, 100, 'AI Explorer', {
      fontSize: '64px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(640, 180, 'Learn AI Through Play', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    subtitle.setOrigin(0.5);

    // Start Game button
    const startBtn = this.add.rectangle(640, 300, 300, 80, COLORS.PRIMARY);
    startBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 80), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    startBtn.setDepth(10); // Ensure button is on top
    startBtn.on('pointerdown', () => {
      soundManager.playClick();
      console.log('Start Game clicked');
      try {
        this.scene.start('Level1_AI_Jungle');
      } catch (error) {
        console.error('Error starting Level1:', error);
      }
    });
    const startText = this.add.text(640, 300, 'Start Game', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    startText.setOrigin(0.5);
    startText.setDepth(11); // Text above button

    // Level Select button
    const levelSelectBtn = this.add.rectangle(640, 400, 300, 80, COLORS.SECONDARY);
    levelSelectBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 80), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    levelSelectBtn.on('pointerdown', () => {
      soundManager.playClick();
      this.showLevelSelect();
    });
    const levelSelectText = this.add.text(640, 400, 'Level Select', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    levelSelectText.setOrigin(0.5);

    // Achievements button
    const achievementsBtn = this.add.rectangle(640, 500, 300, 80, COLORS.WARNING);
    achievementsBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 80), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    achievementsBtn.on('pointerdown', () => {
      soundManager.playClick();
      this.achievementOverlay!.showAll();
    });
    const achievementsText = this.add.text(640, 500, `Achievements (${AchievementManager.getUnlockedCount()}/${AchievementManager.getTotalCount()})`, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    achievementsText.setOrigin(0.5);

    // Footer credit
    const creditText = this.add.text(640, 680, 'Created by Abed Rayen', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    creditText.setOrigin(0.5);
  }

  private showLevelSelect(): void {
    // Clear current scene
    this.children.removeAll();

    // Background
    this.add.rectangle(640, 360, 1280, 720, COLORS.BG_DARK);

    // Title
    const title = this.add.text(640, 80, 'Select Level', {
      fontSize: '48px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Level buttons
    const levels = [
      { key: LEVELS.LEVEL_1, name: 'Level 1: AI Jungle', y: 180 },
      { key: LEVELS.LEVEL_2, name: 'Level 2: Machine Whisperer', y: 260 },
      { key: LEVELS.LEVEL_3, name: 'Level 3: Data Scrolls', y: 340 },
      { key: LEVELS.LEVEL_4, name: 'Level 4: Neural Temple', y: 420 },
      { key: LEVELS.LEVEL_5, name: 'Level 5: Teachable Ritual', y: 500 },
      { key: LEVELS.LEVEL_6, name: 'Level 6: Final Artifact', y: 580 }
    ];

    levels.forEach(level => {
      const isUnlocked = ProgressManager.isLevelUnlocked(level.key);
      const isCompleted = ProgressManager.isLevelCompleted(level.key);
      
      const btnColor = isUnlocked ? COLORS.PRIMARY : COLORS.BG_LIGHT;
      const textColor = isUnlocked ? '#ffffff' : '#666666';
      
      const btn = this.add.rectangle(640, level.y, 600, 60, btnColor);
      const btnText = this.add.text(640, level.y, 
        level.name + (isCompleted ? ' ✓' : '') + (isUnlocked ? '' : ' (Locked)'),
        {
          fontSize: '22px',
          color: textColor,
          fontFamily: 'Arial'
        }
      );
      btnText.setOrigin(0.5);

      if (isUnlocked) {
        btn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 600, 60), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
        btn.on('pointerdown', () => {
          soundManager.playClick();
          this.scene.start(level.key);
        });
      }
    });

    // Back button
    const backBtn = this.add.rectangle(640, 650, 200, 50, COLORS.BG_MEDIUM);
    backBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 50), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    backBtn.on('pointerdown', () => {
      soundManager.playClick();
      this.scene.restart();
    });
    const backText = this.add.text(640, 650, 'Back to Menu', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    backText.setOrigin(0.5);

    // Footer credit
    const creditText = this.add.text(640, 680, 'Created by Abed Rayen', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    creditText.setOrigin(0.5);
  }
}

