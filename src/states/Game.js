import Phaser from 'phaser';
import config from '../config';
// import Bacteria from '../sprites/Bacteria';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import SmallBacteria from '../sprites/SmallBacteria';

function getRandomPos (padding = 300) {
  return [
    game.rnd.integerInRange(padding, config.width - padding),
    game.rnd.integerInRange(padding, config.height - padding)
  ];
}

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = 0x0d2500;
  }

  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.smallBacteries = this.add.group();
    this.enemies = this.add.group();

    this.player = new Player(1024, 500);
    this.player.onUpgrade = () => {
      this.enemies.forEach((enemy) => {
        if (enemy.power > this.player.power) {
          enemy.tint = 0x00FFFF;
        } else if (enemy.power < this.player.power) {
          enemy.tint = 0xFFFF40;
        } else {
          enemy.tint = 0xFFFFFF;
        }
      });
    };


    for (let i = 0; i < 7; i++) {
      setTimeout(() => this.spawnEnemy(), i * 50);
    }
    for (let i = 0; i < 25; i++) {
      setTimeout(() => this.spawnSmallBacteria(), i * 100);
    }

    setInterval(() => {
      if (this.smallBacteries.length < 100) {
        this.spawnSmallBacteria();
      }
    }, 1000);


    this.cursors = this.input.keyboard.createCursorKeys();
    // this.cursors.right = this.input.keyboard.key
  }

  render () {
    // game.debug.body(this.player);
  }

  spawnEnemyThrottled () {
    if (!this.throttle) {
      this.throttle = true;
      setTimeout(() => (this.throttled = false), 100);
      this.spawnEnemy();
    }
  }

  spawnEnemy () {
    let [x, y] = getRandomPos();
    this.enemies.add(new Enemy(x, y));
  }

  spawnSmallBacteria (isNew = true) {
    let [x, y] = getRandomPos(20);
    this.smallBacteries.add(new SmallBacteria(x, y, isNew));
  }

  update () {
    this.player.moveDirection.x = +this.cursors.right.isDown - this.cursors.left.isDown;
    this.player.moveDirection.y = +this.cursors.down.isDown - this.cursors.up.isDown;

    game.physics.arcade.collide(this.player, this.enemies, this.playerEnemyCollision, null, this);
    game.physics.arcade.collide(this.enemies, this.enemies, this.enemyEnemyCollision, null, this);


    game.physics.arcade.collide(this.player, this.smallBacteries, this.playerSmallBacteriaCollision, null, this);
    game.physics.arcade.collide(this.enemies, this.smallBacteries, this.enemySmallBacteriaCollision, null, this);
  }

  enemyEnemyCollision (first, second) {
    if (!second.destroing) {
      this.spawnEnemyThrottled();
    }
    first.onEnemyCollide(second);
  }

  playerEnemyCollision (me, enemy) {
    me.onEnemyCollide(enemy);
    enemy.onEnemyCollide(me);
  }

  playerSmallBacteriaCollision (me, bacteria) {
    this.player.onSmallBacteriaCollide(bacteria);
    this.spawnSmallBacteria();
  }
  enemySmallBacteriaCollision (enemy, bacteria) {
    enemy.onSmallBacteriaCollide(bacteria);
    this.spawnSmallBacteria();
  }


}
