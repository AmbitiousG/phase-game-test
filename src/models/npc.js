import * as utils from './utils'
import _ from 'lodash'
// for (var i = 8; i < 16; i++) {
//     for (var j = 0; j < 12; j++) {

//         // players.create(0, game.world.height-64*(8-i), 'man', i);
//         if(i>12 && j> 5)
//             continue;
//         players.create((i - 8)*64, j*64, 'man', i*12 + j);
//     }
// }
function getRndDirection() {
  return _.sample([
    utils.ACTION_WALK_UP_FRAME_IDLE,
    utils.ACTION_WALK_LEFT_FRAME_IDLE,
    utils.ACTION_WALK_DOWN_FRAME_IDLE,
    utils.ACTION_WALK_RIGHT_FRAME_IDLE
  ]);
}

export default class NPC {
  constructor(game, options) {
    let x, y;
    this.game = game;

    x = game.rnd.integerInRange(0, game.world.width - 65);
    y = game.rnd.integerInRange(0, game.world.height - 65);
    this.npc = game.add.sprite(x, y, 'man', getRndDirection());

    game.physics.arcade.enable(this.npc);
    this.npc.body.collideWorldBounds = true;

    //add animations
    this.npc.animations.add(utils.ACTION_WALK_UP, utils.ACTION_WALK_UP_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_LEFT, utils.ACTION_WALK_LEFT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_DOWN, utils.ACTION_WALK_DOWN_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_RIGHT, utils.ACTION_WALK_RIGHT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);

    this.timer = this.game.time.create(false);
    this.start()
  }

  start() {
    this.playDuration = this.game.rnd.integerInRange(2000, 3500);
    let delay = this.game.rnd.integerInRange(500, 1500);
    // this.walkTimer = this.game.time.create(false);
    if(!this.game)
      console.log('null');
    this.game.time.events.add(delay, () => {
      this.walk();
      this.startTimer();
    });
  }

  startTimer() {
    if(this.timer)
      this.timer.stop(true);
    
    this.timer.loop(0, () => {
      this.playDuration -= 15;
      console.log(this.playDuration);
    });
    this.timer.start();
  }

  walk() {
    let animName = this.game.rnd.pick([utils.ACTION_WALK_UP,
      utils.ACTION_WALK_LEFT,
      utils.ACTION_WALK_DOWN,
      utils.ACTION_WALK_RIGHT
    ]);

    let delay = this.game.rnd.integerInRange(0, 2000);
    switch (animName) {
      case utils.ACTION_WALK_UP:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = -130;
        break;
      case utils.ACTION_WALK_LEFT:
        this.npc.body.velocity.x = -130;
        this.npc.body.velocity.y = 0;
        break;
      case utils.ACTION_WALK_DOWN:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = 130;
        break;
      case utils.ACTION_WALK_RIGHT:
        this.npc.body.velocity.x = 130;
        this.npc.body.velocity.y = 0;
        break;
    }
    this.npc.play(animName);
  }

  update() {
    let anim = this.npc.animations.currentAnim;
    let animEnd = this.playDuration <= 0;
    if (anim.isPlaying) {
      // console.log(this.npc.body.velocity.x + '|' + this.npc.body.velocity.y)
      switch (anim.name) {
        case utils.ACTION_WALK_UP:
          if (animEnd || this.npc.y == 0) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.y = 0;
            this.npc.frame = utils.ACTION_WALK_UP_FRAME_IDLE;
            this.start();
          }
          break;
        case utils.ACTION_WALK_LEFT:
          if (animEnd || this.npc.x == 0) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.x = 0;
            this.npc.frame = utils.ACTION_WALK_LEFT_FRAME_IDLE;
            this.start();
          }
          break;
        case utils.ACTION_WALK_DOWN:
          if (animEnd || this.npc.y == this.game.world.height - this.npc.body.height) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.y = 0;
            this.npc.frame = utils.ACTION_WALK_DOWN_FRAME_IDLE;
            this.start();
          }
          break;
        case utils.ACTION_WALK_RIGHT:
          if (animEnd || this.npc.x == this.game.world.width - this.npc.body.width) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.x = 0;
            this.npc.frame = utils.ACTION_WALK_RIGHT_FRAME_IDLE;
            this.start();
          }
          break;
      }
    }
    else {

    }
  }
}