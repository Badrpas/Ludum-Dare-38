import Bacteria from './Bacteria';
import Phaser from 'phaser';
import { Vector } from 'simple-geometry';
import { getState } from '../utils';

const nullVector = new Vector();

export default class extends Bacteria {
  constructor (x, y) {
    super(x, y, 'bacteria');
  }

  update () {

    super.update();

    if (!this.sleep) {
      this.checkClosest();
    }

    if (this.target && !this.sleep) {
      let {x, y} = this.target;
      this.moveDirection = new Vector(x, y).sub(this.position.x, this.position.y);
    } else {
      this.moveDirection = nullVector;
    }
  }

  checkClosest () {
    this.findClosest();
    let closest = this.findClosest();
    if (closest && this.canSee(closest)) {
      this.mouth.animations.play('nom-nom');
    } else {
      this.mouth.animations.play('idle');
    }
  }

  findClosest () {
    let s = getState();
    let closest = null;
    let closestLength = 400;

    let predicate = (enemy) => {
      if (enemy !== this && (enemy instanceof Bacteria ? enemy.power < this.power : true)) {
        if (!this.target || !(this.target instanceof Bacteria)) {
          let distance = game.physics.arcade.distanceBetween(this, enemy, true);
          if (distance < closestLength) {
            closest = enemy;
            closestLength = distance;
          }
        }
      }
    };

    s.enemies.forEach(predicate);
    s.smallBacteries.forEach(predicate);
    predicate(s.player);

    this.target = closest;
    return closest;
  }

  upgrade (c) {
    super.upgrade(c);
    let player = getState().player;
    if (this.power > player.power) {
      this.tint = 0x00FFFF;
    } else if (this.power < player.power) {
      this.tint = 0xFFFF40;
    } else {
      this.tint = 0xFFFFFF;
    }
    this.sleep = true;
    setTimeout(() => this.sleep = false, 300);
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
