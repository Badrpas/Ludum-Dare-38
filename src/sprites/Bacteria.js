
import Phaser from 'phaser';
import { Vector } from 'simple-geometry';
import { runSpawnAnimation, getState } from '../utils';


export default class Bacteria extends Phaser.Sprite {
  constructor (x, y, sprite = 'bacteria') {
    super(game, x, y, sprite);
    this.anchor.setTo(0.5);

    this.power = 1;

    runSpawnAnimation(this);

    this.animations.add('idle', [0, 2, 3]);
    this.animations.add('move', [0, 1]);
    this.animations.play('idle', 4, true);

    this.moveDirection = new Vector();

    this.speed = 300;

    this.initPhysics();

    this.initMouth();

    game.world.add(this);
  }

  upgrade (count = 1) {
    this.power += count;

    let scale = 1 + (1 - 1 / (1 + this.power / 18));
    this.scale.setTo(scale);

    let radius = 32 * scale * 0.84;
    this.body.setCircle(radius,
      (-radius + 0.5 * this.width  / this.scale.x),
      (-radius + 0.5 * this.height / this.scale.y)
    );

    this.speed = 300 - (scale - 1) * 150;
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

  }

  onEnemyCollide (enemy) {
    if (this.canSee(enemy) && enemy.power < this.power) {
      enemy.destroy();
      this.upgrade(Math.max(1, enemy.power));
    }
  }

  onSmallBacteriaCollide (smallBacteria) {
    smallBacteria.destroy();
    this.upgrade();
  }

  canSee (other) {
    let angle = game.physics.arcade.angleBetween(this, other, true) - Math.PI_2;
    let a = new Vector(Math.cos(angle), Math.sin(angle));
    let b = new Vector(Math.cos(this.rotation), Math.sin(this.rotation));

    return Math.acos(a.dot(b)) < Math.PI_2 / 2;
  }

  spawn (x, y) {
    runSpawnAnimation(this);
  }

}
