import Phaser from 'phaser';
import { GameConfig } from './GameConfig';
import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import Level1_AI_Jungle from './scenes/Level1_AI_Jungle';
import Level2_ML_Basics from './scenes/Level2_ML_Basics';
import Level3_First_Model from './scenes/Level3_First_Model';
import Level4_Neural_Temple from './scenes/Level4_Neural_Temple';
import Level5_Teachable_Ritual from './scenes/Level5_Teachable_Ritual';
import Level6_Final_Artifact from './scenes/Level6_Final_Artifact';

// Register all scenes
const config: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [
    BootScene,
    MenuScene,
    Level1_AI_Jungle,
    Level2_ML_Basics,
    Level3_First_Model,
    Level4_Neural_Temple,
    Level5_Teachable_Ritual,
    Level6_Final_Artifact
  ]
};

// Start the game
const game = new Phaser.Game(config);

// Handle window resize for responsive scaling
window.addEventListener('resize', () => {
  if (game.scale) {
    game.scale.refresh();
  }
});

// Handle fullscreen changes
document.addEventListener('fullscreenchange', () => {
  if (game.scale) {
    game.scale.refresh();
  }
});

document.addEventListener('webkitfullscreenchange', () => {
  if (game.scale) {
    game.scale.refresh();
  }
});

document.addEventListener('mozfullscreenchange', () => {
  if (game.scale) {
    game.scale.refresh();
  }
});

document.addEventListener('MSFullscreenChange', () => {
  if (game.scale) {
    game.scale.refresh();
  }
});

