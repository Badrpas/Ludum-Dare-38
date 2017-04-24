import Bacteria from './Bacteria';
import Phaser from 'phaser';

export default class extends Bacteria {

  destroy () {
    if (!this.destroing) {
      this.destroing = true;
      this.body.enable = false;
      game.add.tween(this.scale)
        .to({x: 0, y: 0}, 400, Phaser.Easing.Exponential.Out, true)
        .onComplete.add(() => {
          game.state.start('Game');
        });
    }
  }

  upgrade (c = 1) {
    super.upgrade(c * 1.3);

    this.onUpgrade();
  }

}
