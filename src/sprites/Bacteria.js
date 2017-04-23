
import Phaser from 'phaser';
import { Vector } from 'simple-geometry';
import { runSpawnAnimation, getState } from '../utils';


export default class Bacteria extends Phaser.Sprite {
  constructor (x, y, speed = 300, sprite = 'bacteria') {
    super(game, x, y, sprite);
    this.anchor.setTo(0.5);

    runSpawnAnimation(this);

    this.animations.add('idle', [0, 2, 3]);
    this.animations.add('move', [0, 1]);
    this.animations.play('idle', 4, true);

    this.moveDirection = new Vector();

    this.speed = speed;

    this.initPhysics();

    this.initMouth();

    game.world.add(this);
  }

  initPhysics () {
    game.physics.arcade.enable(this);
    this.body.setCircle(27);
    this.body.collideWorldBounds = true;
  }

  initMouth () {
    this.mouth = new Phaser.Sprite(game, 0, 0, 'mouth');
    this.mouth.anchor.setTo(0.5);
    this.mouth.animations.add('idle', [0], 10, true);
    this.mouth.animations.add('nom-nom', [1, 2, 3, 4, 3, 2], 10, true);
    this.mouth.animations.play('nom-nom');
    this.addChild(this.mouth);
  }

  update () {
    this.moveDirection = this.moveDirection.normalize();
    this.body.velocity.x = this.moveDirection.x * this.speed;
    this.body.velocity.y = this.moveDirection.y * this.speed;

    if (this.moveDirection.x !== 0 || this.moveDirection.y !== 0) {
      this.rotation = this.moveDirection.angle() - Math.PI_2;
      this.animations.play('move', 4, true);
    } else {
      this.animations.play('idle', 4, true);
    }

    this.checkClosest();
  }

  onEnemyCollide (enemy) {
    enemy.destroy();

  }

  onSmallBacteriaCollide (smallBacteria) {
    smallBacteria.destroy();
  }

  checkClosest () {
    this.findClosest();
    let closest = this.findClosest();
    let angle = closest && game.physics.arcade.angleBetween(this, closest, true);
    if (closest && Math.abs(angle - this.rotation - Math.PI_2) < Math.PI_2 / 2) {
      this.mouth.animations.play('nom-nom');
    } else {
      this.mouth.animations.play('idle');
    }
  }

  findClosest () {
    let s = getState();
    let closest = null;
    let closestLength = 200;

    let predicate = (enemy) => {
      if (enemy !== this) {
        let distance = game.physics.arcade.distanceBetween(this, enemy, true);
        if (distance < closestLength) {
          closest = enemy;
          closestLength = distance;
        }
      }
    };

    s.enemies.forEach(predicate);
    s.smallBacteries.forEach(predicate);

    this.target = closest;
    return closest;
  }


}
