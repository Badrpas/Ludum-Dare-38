import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    // Intro

    if (!__DEV__) {
      this.load.image('city', './assets/images/city.png');
      this.load.image('room', './assets/images/room.png');
      this.load.image('star', './assets/images/star.png');
    }

    // Game
    this.load.spritesheet('bacteria', './assets/images/bacteria.png', 64, 64, 4);
    this.load.spritesheet('mouth', './assets/images/mouth.png', 64, 64, 4);
    this.load.image('small-bacteria', './assets/images/small-bacteria.png');
  }

  create () {
    if (__DEV__) {
      this.state.start('Game');
    } else {
      this.state.start('Intro');
    }
  }
}
