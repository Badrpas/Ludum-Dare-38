/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.qwe = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'qwe');
    this.qwe.anchor.setTo(0.5);
    game.world.add(this.qwe);
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.qwe, 32, 32);
      this.game.debug.text('kek', 123, 123);
    }
    this.qwe.rotation += 0.1;
  }
}
