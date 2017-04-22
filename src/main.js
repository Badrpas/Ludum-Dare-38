import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import LoadState from './states/Load';
import IntroState from './states/Intro';
import GameState from './states/Game';


class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement;
    const width  = docElement.clientWidth;
    const height = docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Load', LoadState, false);
    this.state.add('Intro', IntroState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }
  
  update (time) {
    let r = super.update(time);
    window.dt = this.dt = this.time.dt = this.time.elapsed / 1000;
    return r;
  }
}

window.game = new Game();
