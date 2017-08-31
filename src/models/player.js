import * as utils from './utils'
import _ from 'lodash'

export default class Player {
  constructor(game, options) {
    let x, y;
    this.game = game;

    x = game.rnd.integerInRange(0, game.world.width - 65);
    y = game.rnd.integerInRange(0, game.world.height - 65);
    if(options){
      x = options.x;
      y = options.y;
    }
    this.player = this.game.add.sprite(200, 200, 'woman', utils.ACTION_WALK_LEFT_FRAME_IDLE);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    //add animations
    this.player.animations.add(utils.ACTION_WALK_UP, utils.ACTION_WALK_UP_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.player.animations.add(utils.ACTION_WALK_LEFT, utils.ACTION_WALK_LEFT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.player.animations.add(utils.ACTION_WALK_DOWN, utils.ACTION_WALK_DOWN_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.player.animations.add(utils.ACTION_WALK_RIGHT, utils.ACTION_WALK_RIGHT_FRAMES, utils.ACTION_WALK_FRAMERATE, true);
    this.player.animations.add(utils.ACTION_SC_UP, utils.ACTION_SC_UP_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(() => {
      this.specialCasting = false;
    });
    this.player.animations.add(utils.ACTION_SC_LEFT, utils.ACTION_SC_LEFT_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(() => {
      this.specialCasting = false;
    });
    this.player.animations.add(utils.ACTION_SC_DOWN, utils.ACTION_SC_DOWN_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(() => {
      this.specialCasting = false;
    });
    this.player.animations.add(utils.ACTION_SC_RIGHT, utils.ACTION_SC_RIGHT_FRAMES, utils.ACTION_SC_FRAMERATE, false).onComplete.add(() => {
      this.specialCasting = false;
    });
    this.keys = this.game.input.keyboard.addKeys({
      'up': Phaser.KeyCode.UP,
      'down': Phaser.KeyCode.DOWN,
      'left': Phaser.KeyCode.LEFT,
      'right': Phaser.KeyCode.RIGHT,
      'sc': Phaser.KeyCode.J
    });

    this.specialCasting = false;
  }

  update() {
    //walking player
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if(this.keys.up.isDown ){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = -80;
        if(this.player.body.touching.up){
          this.player.body.reset(this.player.x, this.player.y);
        }
        this.player.animations.play(utils.ACTION_WALK_UP);
        this.currentDirection = utils.ACTION_WALK_UP_FRAME_IDLE;
    }
    else if(this.keys.left.isDown){
        this.player.body.velocity.x =  -80;
        this.player.body.velocity.y = 0;
        if(this.player.body.touching.left){
          this.player.reset(this.player.x, this.player.y);
        }
        this.player.animations.play(utils.ACTION_WALK_LEFT);
        this.currentDirection = utils.ACTION_WALK_LEFT_FRAME_IDLE;
    }
    else if(this.keys.down.isDown){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y =  80;
        if(this.player.body.touching.down){
          this.player.reset(this.player.x, this.player.y);
        }
        this.player.animations.play(utils.ACTION_WALK_DOWN);
        this.currentDirection = utils.ACTION_WALK_DOWN_FRAME_IDLE;
    }
    else if(this.keys.right.isDown){
        this.player.body.velocity.x =  80;
        this.player.body.velocity.y = 0;
        if(this.player.body.touching.right){
          this.player.reset(this.player.x, this.player.y);
        }
        this.player.animations.play(utils.ACTION_WALK_RIGHT);
        this.currentDirection = utils.ACTION_WALK_RIGHT_FRAME_IDLE;
    }
    else if(this.keys.sc.isDown || this.specialCasting){
      this.specialCasting = true;
      this.player.animations.play(this.getSpecialCastName());
    }
    else{
        this.player.frame = this.currentDirection;
    }
  }

  getSpecialCastName() {
    if(this.currentDirection == utils.ACTION_WALK_UP_FRAME_IDLE){
      return utils.ACTION_SC_UP;
    }
    else if(this.currentDirection == utils.ACTION_WALK_LEFT_FRAME_IDLE){
      return utils.ACTION_SC_LEFT;
    }
    else if(this.currentDirection == utils.ACTION_WALK_DOWN_FRAME_IDLE){
      return utils.ACTION_SC_DOWN;
    }
    else if(this.currentDirection == utils.ACTION_WALK_RIGHT_FRAME_IDLE){
      return utils.ACTION_SC_RIGHT;
    }
  }
}