import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

/**
 * Helper functions for creating game objects without requiring loaded images
 */
export class SceneHelpers {
  /**
   * Creates a player sprite with physics
   */
  static createPlayer(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Arcade.Sprite {
    // Create a simple texture for the player if it doesn't exist
    if (!scene.textures.exists('player')) {
      const graphics = scene.add.graphics();
      graphics.fillStyle(COLORS.PRIMARY);
      graphics.fillRect(0, 0, 40, 40);
      graphics.generateTexture('player', 40, 40);
      graphics.destroy();
    }
    
    const player = scene.physics.add.sprite(x, y, 'player');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    return player;
  }

  /**
   * Creates a platform with physics
   */
  static createPlatform(
    scene: Phaser.Scene,
    group: Phaser.Physics.Arcade.StaticGroup,
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ): void {
    const platform = scene.add.rectangle(x, y, width, height, color);
    scene.physics.add.existing(platform, true);
    group.add(platform);
  }
}

