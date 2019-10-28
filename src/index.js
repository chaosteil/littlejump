import Phaser from 'phaser';

import GameScene from './gamescene.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  scene: GameScene,
});
