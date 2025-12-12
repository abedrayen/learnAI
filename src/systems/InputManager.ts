import Phaser from 'phaser';

/**
 * Centralized input management for consistent controls
 */
export class InputManager {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
  };
  private spaceKey?: Phaser.Input.Keyboard.Key;
  private blocked: boolean = false;

  constructor(scene: Phaser.Scene) {
    if (scene.input.keyboard) {
      try {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Add WASD keys individually for better control
        const keys = scene.input.keyboard.addKeys('W,S,A,D') as any;
        if (keys && keys['A'] && keys['D'] && keys['W']) {
          this.wasd = {
            left: keys['A'] as Phaser.Input.Keyboard.Key,
            right: keys['D'] as Phaser.Input.Keyboard.Key,
            up: keys['W'] as Phaser.Input.Keyboard.Key
          };
        }
      } catch (error) {
        console.warn('Error initializing keyboard input:', error);
      }
    }
  }

  isLeftPressed(): boolean {
    if (this.blocked) return false;
    return (this.cursors?.left?.isDown) || (this.wasd?.left?.isDown) || false;
  }

  isRightPressed(): boolean {
    if (this.blocked) return false;
    return (this.cursors?.right?.isDown) || (this.wasd?.right?.isDown) || false;
  }

  isJumpJustPressed(): boolean {
    if (this.blocked) return false;
    return (this.spaceKey && Phaser.Input.Keyboard.JustDown(this.spaceKey)) || 
           (this.cursors?.up && Phaser.Input.Keyboard.JustDown(this.cursors.up)) ||
           (this.wasd?.up && Phaser.Input.Keyboard.JustDown(this.wasd.up)) || false;
  }

  isJumpPressed(): boolean {
    if (this.blocked) return false;
    return (this.spaceKey?.isDown) || (this.cursors?.up?.isDown) || (this.wasd?.up?.isDown) || false;
  }

  setBlocked(blocked: boolean): void {
    this.blocked = blocked;
  }
}

