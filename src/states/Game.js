import Phaser from 'phaser';
import config from '../config';
import Bacteria from '../sprites/Bacteria';
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

    this.player = new Bacteria(1024, 500);

    this.spawnEnemy();

    for (let i = 0; i < 25; i++) {
      setTimeout(() => this.spawnSmallBacteria(), i * 100);
    }


    this.cursors = this.input.keyboard.createCursorKeys();
    // this.cursors.right = this.input.keyboard.key
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
    game.physics.arcade.collide(this.enemies, null, this.enemyEnemyCollision, null, this);


    game.physics.arcade.collide(this.player, this.smallBacteries, this.playerSmallBacteriaCollision, null, this);
  }

  enemyEnemyCollision (first, second) {
    first.onEnemyCollide(second);
  }

  playerEnemyCollision (me, enemy) {
    if (!enemy.destroing) {
      this.spawnEnemy();
    }
    this.player.onEnemyCollide(enemy);
  }

  playerSmallBacteriaCollision (me, bacteria) {
    this.player.onSmallBacteriaCollide(bacteria);
    this.spawnSmallBacteria();
  }


}
