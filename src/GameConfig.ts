import Phaser from 'phaser';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: []
};

export const LEVELS = {
  LEVEL_1: 'Level1_AI_Jungle',
  LEVEL_2: 'Level2_ML_Basics',
  LEVEL_3: 'Level3_First_Model',
  LEVEL_4: 'Level4_Neural_Temple',
  LEVEL_5: 'Level5_Teachable_Ritual',
  LEVEL_6: 'Level6_Final_Artifact'
} as const;

export const COLORS = {
  PRIMARY: 0x4facfe,
  SECONDARY: 0x00f2fe,
  SUCCESS: 0x00ff88,
  ERROR: 0xff3366,
  WARNING: 0xffaa00,
  TEXT: 0xffffff,
  BG_DARK: 0x1a1a2e,
  BG_MEDIUM: 0x16213e,
  BG_LIGHT: 0x0f3460
} as const;

