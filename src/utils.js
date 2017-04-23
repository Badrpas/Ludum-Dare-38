import Phaser from 'phaser';

export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

export const runSpawnAnimation = function (sprite, scale = 1, isNew = true) {
  if (isNew) {
    sprite.scale.setTo(0);
    game.add.tween(sprite.scale).to({x: scale, y: scale}, 500, Phaser.Easing.Exponential.In, true);
  }
};


let state;
export const getState = function () {
  return state || (state = game.state.getCurrentState());
};