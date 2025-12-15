import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { Achievement, AchievementManager } from '../systems/AchievementManager';
import { soundManager } from '../systems/SoundManager';

/**
 * UI component for displaying achievements
 */
export class AchievementOverlay {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Show achievement unlock notification
   */
  showUnlock(achievement: Achievement, callback?: () => void): void {
    if (this.isVisible) return;
    
    soundManager.playAchievement();
    this.isVisible = true;

    // Create overlay container
    this.container = this.scene.add.container(640, 360);
    this.container.setDepth(10000);

    // Background overlay
    const bg = this.scene.add.rectangle(0, 0, 1280, 720, 0x000000, 0.7);
    this.container.add(bg);

    // Achievement card
    const cardBg = this.scene.add.rectangle(0, -100, 600, 300, COLORS.BG_LIGHT, 0.95);
    cardBg.setStrokeStyle(4, COLORS.SUCCESS);
    this.container.add(cardBg);

    // Title
    const title = this.scene.add.text(0, -220, '🎉 Achievement Unlocked!', {
      fontSize: '28px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Achievement icon
    const icon = this.scene.add.text(0, -120, achievement.icon, {
      fontSize: '80px',
      fontFamily: 'Arial'
    });
    icon.setOrigin(0.5);
    this.container.add(icon);

    // Achievement name
    const name = this.scene.add.text(0, -20, achievement.name, {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    name.setOrigin(0.5);
    this.container.add(name);

    // Achievement description
    const desc = this.scene.add.text(0, 30, achievement.description, {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: 550 }
    });
    desc.setOrigin(0.5);
    this.container.add(desc);

    // Close button
    const closeBtn = this.scene.add.rectangle(0, 120, 200, 50, COLORS.SUCCESS);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.scene.add.text(0, 120, 'Continue', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    closeText.setOrigin(0.5);
    this.container.add([closeBtn, closeText]);

    closeBtn.on('pointerdown', () => {
      soundManager.playClick();
      this.hide();
      if (callback) callback();
    });

    // Animate in
    this.container.setAlpha(0);
    this.container.setScale(0.8);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });

    // Auto-hide after 5 seconds
    this.scene.time.delayedCall(5000, () => {
      if (this.isVisible) {
        this.hide();
        if (callback) callback();
      }
    });
  }

  /**
   * Show all achievements screen
   */
  showAll(callback?: () => void): void {
    if (this.isVisible) return;
    
    this.isVisible = true;
    soundManager.playClick();

    const achievements = AchievementManager.getAchievements();
    const unlockedCount = AchievementManager.getUnlockedCount();
    const totalCount = AchievementManager.getTotalCount();

    // Create overlay container
    this.container = this.scene.add.container(640, 360);
    this.container.setDepth(10000);

    // Background overlay
    const bg = this.scene.add.rectangle(0, 0, 1280, 720, 0x000000, 0.9);
    this.container.add(bg);

    // Title
    const title = this.scene.add.text(0, -320, 'Achievements', {
      fontSize: '40px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Progress text
    const progressText = this.scene.add.text(0, -270, `${unlockedCount} / ${totalCount} Unlocked`, {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    progressText.setOrigin(0.5);
    this.container.add(progressText);

    // Achievement grid
    const cols = 3;
    const rows = Math.ceil(achievements.length / cols);
    const cardWidth = 350;
    const cardHeight = 120;
    const spacingX = 400;
    const spacingY = 140;
    const startX = -(cols - 1) * spacingX / 2;
    const startY = -200;

    achievements.forEach((achievement, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      // Achievement card
      const cardBg = this.scene.add.rectangle(x, y, cardWidth, cardHeight, 
        achievement.unlocked ? COLORS.BG_LIGHT : COLORS.BG_DARK, 0.8);
      cardBg.setStrokeStyle(2, achievement.unlocked ? COLORS.SUCCESS : COLORS.BG_MEDIUM);
      this.container.add(cardBg);

      // Icon
      const icon = this.scene.add.text(x - 140, y, achievement.unlocked ? achievement.icon : '🔒', {
        fontSize: '50px',
        fontFamily: 'Arial'
      });
      icon.setOrigin(0.5);
      icon.setAlpha(achievement.unlocked ? 1 : 0.5);
      this.container.add(icon);

      // Name
      const name = this.scene.add.text(x + 20, y - 20, achievement.name, {
        fontSize: '18px',
        color: achievement.unlocked ? '#ffffff' : '#666666',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      name.setOrigin(0, 0.5);
      this.container.add(name);

      // Description
      const desc = this.scene.add.text(x + 20, y + 20, achievement.description, {
        fontSize: '12px',
        color: achievement.unlocked ? '#aaaaaa' : '#444444',
        fontFamily: 'Arial',
        wordWrap: { width: 200 }
      });
      desc.setOrigin(0, 0.5);
      this.container.add(desc);
    });

    // Close button
    const closeBtn = this.scene.add.rectangle(0, 300, 200, 50, COLORS.PRIMARY);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.scene.add.text(0, 300, 'Close', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    closeText.setOrigin(0.5);
    this.container.add([closeBtn, closeText]);

    closeBtn.on('pointerdown', () => {
      soundManager.playClick();
      this.hide();
      if (callback) callback();
    });

    // Animate in
    this.container.setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 300
    });
  }

  hide(): void {
    if (!this.isVisible || !this.container) return;
    
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      scaleX: 0.9,
      scaleY: 0.9,
      duration: 200,
      onComplete: () => {
        if (this.container) {
          this.container.destroy();
          this.container = undefined;
        }
        this.isVisible = false;
      }
    });
  }

  isShowing(): boolean {
    return this.isVisible;
  }
}

