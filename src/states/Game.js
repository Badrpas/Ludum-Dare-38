/* globals __DEV__ */
import Phaser from 'phaser';
import config from '../config';

let ROTATION_SPEED = Math.PI;


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.qwe = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'qwe');
    this.qwe.anchor.setTo(0.5);
    game.world.add(this.qwe);
    this.speedX = 100;
    this.speedY = 100;
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.qwe, 32, 32);
    }
    this.qwe.rotation += ROTATION_SPEED * this.game.dt;

    if (this.qwe.x > config.width) {
      this.qwe.x = config.width;
      this.speedX = -this.speedX;
      ROTATION_SPEED = -ROTATION_SPEED;
    }
    if (this.qwe.y > config.height) {
      this.qwe.y = config.height;
      this.speedY = -this.speedY;
      ROTATION_SPEED = -ROTATION_SPEED;
    }
    if (this.qwe.x < 0) {
      this.qwe.x = 0;
      this.speedX = -this.speedX;
      ROTATION_SPEED = -ROTATION_SPEED;
    }
    if (this.qwe.y < 0) {
      this.qwe.y = 0;
      this.speedY = -this.speedY;
      ROTATION_SPEED = -ROTATION_SPEED;
    }

    this.qwe.x += this.speedX * this.game.dt;
    this.qwe.y += this.speedY * this.game.dt;
  }
}
