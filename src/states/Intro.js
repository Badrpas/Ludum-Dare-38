import Phaser from 'phaser';
import config from '../config';


const windowPos = {
  x: 420,
  y: 802
};

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#06071d';
  }
  preload () {}

  addStar () {
    let star = this.add.sprite(game.rnd.integerInRange(0, 2100), game.rnd.integerInRange(-800, 300), 'star');
    star.scale.setTo(game.rnd.realInRange(0.1, 0.5));
    this.stars.add(star);
  }

  create () {
    this.all = window.all = this.add.group();

    this.stars = this.add.group(this.all);

    this.city = this.add.sprite(game.world.centerX, game.world.centerY + 10, 'city');
    this.city.anchor.setTo(0.5);
    this.city.smoothed = false;


    this.all.add(this.city);

    for (let i = 0; i < 223; i++) {
      this.addStar();
    }


    this.all.y += 800;

    this.world.add(this.all);

    this.createTweens();
    
    this.run();
  }

  run () {
    this.movedown.start();
  }

  createTweens () {
    let scaleTo = 50;
    let time = 3700;
    let transition = Phaser.Easing.Exponential.In;

    this.movedown = game.add.tween(this.all).to({y: 0}, time);

    let zoom = game.add.tween(this.all.scale).to({x: scaleTo, y: scaleTo}, time, transition);
    let move = game.add.tween(this.all.position).to({
      x: -(windowPos.x) * scaleTo,
      y: -(windowPos.y) * scaleTo
    }, time, transition);


    this.movedown.onComplete.add(() => {
      setTimeout(() => {
        move.start();
        zoom.start();
      }, 350);
    });

    zoom.onComplete.add(() => {
      this.showRoom();
    });
  }

  showRoom () {
    this.room = window.room = this.add.sprite(game.world.centerX, game.world.centerY + 10, 'room');
    this.room.anchor.setTo(0.5);
    this.room.smoothed = false;
    this.world.add(this.room);
    this.room.sendToBack();

    let time = 4700;
    let transition = Phaser.Easing.Exponential.In;
    let scale = 1.15;
    game.add.tween(this.all).to({ alpha: 0 }, time, transition).start();
    game.add.tween(this.room.scale).to({x: scale, y:  scale}, 3700, transition)
      .start()
      .onComplete
      .add(() => this.zoomTo(this.room, 530, 142, 4)
        .onComplete
        .add(() => this.zoomTo(this.room, 800, 355, 100, 3700, Phaser.Easing.Exponential.InOut))
      );
  }

  zoomTo (sprite, x, y, scale, time = 3700, transition = Phaser.Easing.Exponential.In) {
    game.add.tween(sprite.scale).to({x: scale, y: scale}, time, transition).start();
    return game.add.tween(sprite.position).to({
      x: -(x) * scale,
      y: -(y) * scale
    }, time, transition).start();
  }

  render () {
  }
}