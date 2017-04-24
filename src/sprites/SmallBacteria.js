
import Phaser from 'phaser';
import { Vector } from 'simple-geometry';
import { runSpawnAnimation } from '../utils';

const MAX_SCALE = 0.6;

export default class extends Phaser.Sprite {
  constructor (x, y, isNew = true) {
    super(game, x, y, 'small-bacteria');
    this.anchor.setTo(0.5);
    this.scale.setTo(MAX_SCALE);
    this.speed = 10;

    this.moveDirection = new Vector(game.rnd.integerInRange(-100, 100), game.rnd.integerInRange(-100, 100));

    runSpawnAnimation(this, MAX_SCALE, isNew);

    this.initPhysics();
    
    game.world.add(this);
  }

  initPhysics () {
    game.physics.arcade.enable(this);
    this.body.setCircle(5);
    this.body.collideWorldBounds = true;
  }

  update () {
    this.moveDirection = this.moveDirection.normalize();
    this.body.velocity.x = this.moveDirection.x * this.speed;
    this.body.velocity.y = this.moveDirection.y * this.speed;
  }
}



