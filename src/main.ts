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
new Phaser.Game(config);

