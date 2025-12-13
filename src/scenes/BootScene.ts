import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Create placeholder graphics programmatically
    // We'll use Phaser's graphics API in each scene instead of loading images
  }

  create(): void {
    this.scene.start('BuzzwordsIntroScene');
  }
}

