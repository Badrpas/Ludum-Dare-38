import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image('qwe', './assets/images/qwe.png');
    this.load.image('city', './assets/images/city.png');
    this.load.image('room', './assets/images/room.png');
    this.load.image('star', './assets/images/star.png');
  }

  create () {
    this.state.start('Intro');
  }
}
