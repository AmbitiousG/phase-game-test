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
    if(options){
      x = options.x;
      y = options.y;
    }
    this.npc = game.add.sprite(x, y, 'man', getRndDirection());

    // game.physics.arcade.enable(this.npc);
    this.game.physics.enable(this.npc, Phaser.Physics.ARCADE);
    this.npc.body.collideWorldBounds = true;

    //add animations
    this.npc.animations.add(utils.ACTION_WALK_UP, utils.ACTION_WALK_UP_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_LEFT, utils.ACTION_WALK_LEFT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_DOWN, utils.ACTION_WALK_DOWN_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_WALK_RIGHT, utils.ACTION_WALK_RIGHT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.npc.animations.add(utils.ACTION_SC_UP, utils.ACTION_SC_UP_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(this.restart, this);
    this.npc.animations.add(utils.ACTION_SC_LEFT, utils.ACTION_SC_LEFT_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(this.restart, this);
    this.npc.animations.add(utils.ACTION_SC_DOWN, utils.ACTION_SC_DOWN_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(this.restart, this);
    this.npc.animations.add(utils.ACTION_SC_RIGHT, utils.ACTION_SC_RIGHT_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(this.restart, this);

    this.timer = this.game.time.create(false);
    this.start()
  }

  start() {
    if (this.timer)
      this.timer.stop(true);
    let delay = this.game.rnd.integerInRange(500, 1500);
    this.playDuration = this.game.rnd.integerInRange(2000, 4000);

    this.animName = this.game.rnd.pick([
      utils.ACTION_WALK_UP,
      utils.ACTION_WALK_LEFT,
      utils.ACTION_WALK_DOWN,
      utils.ACTION_WALK_RIGHT,
      utils.ACTION_SC_UP,
      utils.ACTION_SC_LEFT,
      utils.ACTION_SC_DOWN,
      utils.ACTION_SC_RIGHT,
    ]);
    this.timer.loop(Phaser.Timer.QUARTER, () => {
      this.playDuration -= Phaser.Timer.QUARTER;
    });
    this.timer.add(delay, () => {
      this.playAnim(this.animName);
    })
    this.timer.start();
  }

  playAnim(animName) {
    switch (animName) {
      case utils.ACTION_WALK_UP:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = -230;
        break;
      case utils.ACTION_WALK_LEFT:
        this.npc.body.velocity.x = -230;
        this.npc.body.velocity.y = 0;
        break;
      case utils.ACTION_WALK_DOWN:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = 230;
        break;
      case utils.ACTION_WALK_RIGHT:
        this.npc.body.velocity.x = 230;
        this.npc.body.velocity.y = 0; 
        break;
      case utils.ACTION_SC_UP:
      case utils.ACTION_SC_LEFT:
      case utils.ACTION_SC_DOWN:
      case utils.ACTION_SC_RIGHT:
        this.npc.body.reset(this.npc.x, this.npc.y);
        break;
    }
    this.npc.play(animName);
  }

  restart() {
    let anim = this.npc.animations.currentAnim;
    anim.stop();
    // this.npc.body.velocity.x = 0;
    // this.npc.body.velocity.y = 0;
    this.npc.body.reset(this.npc.x, this.npc.y);
    switch (anim.name) {
      case utils.ACTION_WALK_UP:
        this.npc.frame = utils.ACTION_WALK_UP_FRAME_IDLE;
        break;
      case utils.ACTION_WALK_LEFT:
        this.npc.frame = utils.ACTION_WALK_LEFT_FRAME_IDLE;
        break;
      case utils.ACTION_WALK_DOWN:
        this.npc.frame = utils.ACTION_WALK_DOWN_FRAME_IDLE;
        break;
      case utils.ACTION_WALK_RIGHT:
        this.npc.frame = utils.ACTION_WALK_RIGHT_FRAME_IDLE;
        break;
      case utils.ACTION_SC_UP:
        this.npc.frame = utils.ACTION_SC_UP_FRAME_IDLE;
        break;
      case utils.ACTION_SC_LEFT:
        this.npc.frame = utils.ACTION_SC_LEFT_FRAME_IDLE;
        break;
      case utils.ACTION_SC_DOWN:
        this.npc.frame = utils.ACTION_SC_DOWN_FRAME_IDLE;
        break;
      case utils.ACTION_SC_RIGHT:
        this.npc.frame = utils.ACTION_SC_RIGHT_FRAME_IDLE;
        break;
    }

    this.start();
  }

  update() {
    let anim = this.npc.animations.currentAnim;
    let isSpecialCast = _.indexOf([utils.ACTION_SC_UP, utils.ACTION_SC_LEFT, utils.ACTION_SC_DOWN, utils.ACTION_SC_RIGHT]) != -1;
    let animEnd = this.playDuration <= 0;
    if (anim.isPlaying) {
      if((animEnd && !isSpecialCast)
        || (this.npc.x == 0 && anim.name == utils.ACTION_WALK_LEFT)
        || (this.npc.y == 0 && anim.name == utils.ACTION_WALK_UP)
        || (this.npc.y == this.game.world.height - this.npc.body.height && anim.name == utils.ACTION_WALK_DOWN)
        || (this.npc.x == this.game.world.width - this.npc.body.width && anim.name == utils.ACTION_WALK_RIGHT)
        ){
        this.restart();
      }
      else{
        this.playAnim(this.animName);
      }
    }
  }
}