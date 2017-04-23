import Bacteria from './Bacteria';
import Phaser from 'phaser';

export default class extends Bacteria {
  constructor (x, y, speed = 200) {
    super(x, y, speed, 'bacteria');
  }

  update () {
    super.update();

    if (this.closest) {

    }
  }
  
  destroy () {
    if (!this.destroing) {
      this.destroing = true;
      this.body.enable = false;
      game.add.tween(this.scale)
        .to({x: 0, y: 0}, 400, Phaser.Easing.Exponential.Out, true)
        .onComplete.add(() => {
          super.destroy();
        });
    }
  }

}
