
import Phaser from 'phaser';
import { Vector } from 'simple-geometry';
import { runSpawnAnimation } from '../utils';

const MAX_SCALE = 0.6;

export default class extends Phaser.Sprite {
  constructor (x, y, isNew = true) {
    super(game, x, y, 'small-bacteria');
    this.anchor.setTo(0.5);
    this.scale.setTo(MAX_SCALE);

    runSpawnAnimation(this, MAX_SCALE, isNew);

    this.initPhysics();
    
    game.world.add(this);
  }

  initPhysics () {
    game.physics.arcade.enable(this);
    this.body.setCircle(5);
    this.body.collideWorldBounds = true;
  }
}



