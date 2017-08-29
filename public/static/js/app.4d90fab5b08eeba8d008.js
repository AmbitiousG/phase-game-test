webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_game__ = __webpack_require__(1);


new __WEBPACK_IMPORTED_MODULE_0__models_game__["a" /* default */]();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__npc__ = __webpack_require__(2);


class Game {
  constructor() {
    this.npcs = [];
    this.game = new Phaser.Game(1024, 800, Phaser.AUTO, '', {
      preload: () => {
        this.preload();
      },
      create: () => {
        this.create();
      },
      update: () => {
        this.update();
      }
    });
  }

  preload() {
    this.game.load.spritesheet('man', 'static/character.png', 64, 64, -1, 1);
  }

  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.npcs = this.game.add.group();
    // this.npcs.enableBody = true;
    this.npcs.push(new __WEBPACK_IMPORTED_MODULE_0__npc__["a" /* default */](this.game));
    this.npcs.push(new __WEBPACK_IMPORTED_MODULE_0__npc__["a" /* default */](this.game));
    this.npcs.push(new __WEBPACK_IMPORTED_MODULE_0__npc__["a" /* default */](this.game));
    this.npcs.push(new __WEBPACK_IMPORTED_MODULE_0__npc__["a" /* default */](this.game));

    // this.npcs.
  }

  update() {
    for (var i = 0; i < this.npcs.length; i++) {
      let npc = this.npcs[i];
      npc.update();
    }
    //walking player
    // player.body.velocity.x = 0;
    // player.body.velocity.y = 0;

    // if(cursors.up.isDown){
    //     player.body.velocity.x = 0;
    //     player.body.velocity.y = -130;
    //     player.animations.play('up');
    //     currentDirection = upStart;
    // }
    // else if(cursors.left.isDown){
    //     player.body.velocity.x = -130;
    //     player.body.velocity.y = 0;
    //     player.animations.play('left');
    //     currentDirection = leftStart;
    // }
    // else if(cursors.down.isDown){
    //     player.body.velocity.x = 0;
    //     player.body.velocity.y = 130;
    //     player.animations.play('down');
    //     currentDirection = downStart;
    // }
    // else if(cursors.right.isDown){
    //     player.body.velocity.x = 130;
    //     player.body.velocity.y = 0;
    //     player.animations.play('right');
    //     currentDirection = rightStart;
    // }
    // else{
    //     player.frame = currentDirection;
    // }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);


// for (var i = 8; i < 16; i++) {
//     for (var j = 0; j < 12; j++) {

//         // players.create(0, game.world.height-64*(8-i), 'man', i);
//         if(i>12 && j> 5)
//             continue;
//         players.create((i - 8)*64, j*64, 'man', i*12 + j);
//     }
// }
function getRndDirection() {
  return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.sample([__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* ACTION_WALK_UP_FRAME_IDLE */], __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* ACTION_WALK_LEFT_FRAME_IDLE */], __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* ACTION_WALK_DOWN_FRAME_IDLE */], __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* ACTION_WALK_RIGHT_FRAME_IDLE */]]);
}

class NPC {
  constructor(game, options) {
    let x, y;
    this.game = game;

    x = game.rnd.integerInRange(0, game.world.width - 65);
    y = game.rnd.integerInRange(0, game.world.height - 65);
    this.npc = game.add.sprite(x, y, 'man', getRndDirection());

    game.physics.arcade.enable(this.npc);
    this.npc.body.collideWorldBounds = true;

    //add animations
    this.npc.animations.add(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* ACTION_WALK_UP */], __WEBPACK_IMPORTED_MODULE_0__utils__["l" /* ACTION_WALK_UP_FRAMES */], __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* ACTION_WALK_FRAMERATE */], true);
    this.npc.animations.add(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* ACTION_WALK_LEFT */], __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* ACTION_WALK_LEFT_FRAMES */], __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* ACTION_WALK_FRAMERATE */], true);
    this.npc.animations.add(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* ACTION_WALK_DOWN */], __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* ACTION_WALK_DOWN_FRAMES */], __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* ACTION_WALK_FRAMERATE */], true);
    this.npc.animations.add(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* ACTION_WALK_RIGHT */], __WEBPACK_IMPORTED_MODULE_0__utils__["i" /* ACTION_WALK_RIGHT_FRAMES */], __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* ACTION_WALK_FRAMERATE */], true);

    this.timer = this.game.time.create(false);
    this.start();
  }

  start() {
    this.playDuration = this.game.rnd.integerInRange(2000, 3500);
    let delay = this.game.rnd.integerInRange(500, 1500);
    // this.walkTimer = this.game.time.create(false);
    if (!this.game) console.log('null');
    this.game.time.events.add(delay, () => {
      this.walk();
      this.startTimer();
    });
  }

  startTimer() {
    if (this.timer) this.timer.stop(true);

    this.timer.loop(0, () => {
      this.playDuration -= 15;
      console.log(this.playDuration);
    });
    this.timer.start();
  }

  walk() {
    let animName = this.game.rnd.pick([__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* ACTION_WALK_UP */], __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* ACTION_WALK_LEFT */], __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* ACTION_WALK_DOWN */], __WEBPACK_IMPORTED_MODULE_0__utils__["h" /* ACTION_WALK_RIGHT */]]);

    let delay = this.game.rnd.integerInRange(0, 2000);
    switch (animName) {
      case __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* ACTION_WALK_UP */]:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = -130;
        break;
      case __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* ACTION_WALK_LEFT */]:
        this.npc.body.velocity.x = -130;
        this.npc.body.velocity.y = 0;
        break;
      case __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* ACTION_WALK_DOWN */]:
        this.npc.body.velocity.x = 0;
        this.npc.body.velocity.y = 130;
        break;
      case __WEBPACK_IMPORTED_MODULE_0__utils__["h" /* ACTION_WALK_RIGHT */]:
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
        case __WEBPACK_IMPORTED_MODULE_0__utils__["k" /* ACTION_WALK_UP */]:
          if (animEnd || this.npc.y == 0) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.y = 0;
            this.npc.frame = __WEBPACK_IMPORTED_MODULE_0__utils__["m" /* ACTION_WALK_UP_FRAME_IDLE */];
            this.start();
          }
          break;
        case __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* ACTION_WALK_LEFT */]:
          if (animEnd || this.npc.x == 0) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.x = 0;
            this.npc.frame = __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* ACTION_WALK_LEFT_FRAME_IDLE */];
            this.start();
          }
          break;
        case __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* ACTION_WALK_DOWN */]:
          if (animEnd || this.npc.y == this.game.world.height - this.npc.body.height) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.y = 0;
            this.npc.frame = __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* ACTION_WALK_DOWN_FRAME_IDLE */];
            this.start();
          }
          break;
        case __WEBPACK_IMPORTED_MODULE_0__utils__["h" /* ACTION_WALK_RIGHT */]:
          if (animEnd || this.npc.x == this.game.world.width - this.npc.body.width) {
            anim.stop();
            // this.timer.destroy();
            // this.game.time.events.destroy();
            this.npc.body.velocity.x = 0;
            this.npc.frame = __WEBPACK_IMPORTED_MODULE_0__utils__["j" /* ACTION_WALK_RIGHT_FRAME_IDLE */];
            this.start();
          }
          break;
      }
    } else {}
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NPC;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ACTION_WALK_UP_FRAME_IDLE = 12 * 8;
/* harmony export (immutable) */ __webpack_exports__["m"] = ACTION_WALK_UP_FRAME_IDLE;

const ACTION_WALK_LEFT_FRAME_IDLE = 12 * 9;
/* harmony export (immutable) */ __webpack_exports__["g"] = ACTION_WALK_LEFT_FRAME_IDLE;

const ACTION_WALK_DOWN_FRAME_IDLE = 12 * 10;
/* harmony export (immutable) */ __webpack_exports__["c"] = ACTION_WALK_DOWN_FRAME_IDLE;

const ACTION_WALK_RIGHT_FRAME_IDLE = 12 * 11;
/* harmony export (immutable) */ __webpack_exports__["j"] = ACTION_WALK_RIGHT_FRAME_IDLE;


let walkFrameUp = [];
let walkFrameLeft = [];
let walkFrameDown = [];
let walkFrameRight = [];
for (var i = 1; i < 9; i++) {
    walkFrameUp.push(ACTION_WALK_UP_FRAME_IDLE + i);
    walkFrameLeft.push(ACTION_WALK_LEFT_FRAME_IDLE + i);
    walkFrameDown.push(ACTION_WALK_DOWN_FRAME_IDLE + i);
    walkFrameRight.push(ACTION_WALK_RIGHT_FRAME_IDLE + i);
}

const ACTION_WALK_FRAMERATE = 10;
/* harmony export (immutable) */ __webpack_exports__["d"] = ACTION_WALK_FRAMERATE;


const ACTION_WALK_UP = 'walkUp';
/* harmony export (immutable) */ __webpack_exports__["k"] = ACTION_WALK_UP;

const ACTION_WALK_UP_FRAMES = walkFrameUp;
/* harmony export (immutable) */ __webpack_exports__["l"] = ACTION_WALK_UP_FRAMES;


const ACTION_WALK_LEFT = 'walkLeft';
/* harmony export (immutable) */ __webpack_exports__["e"] = ACTION_WALK_LEFT;

const ACTION_WALK_LEFT_FRAMES = walkFrameLeft;
/* harmony export (immutable) */ __webpack_exports__["f"] = ACTION_WALK_LEFT_FRAMES;


const ACTION_WALK_DOWN = 'walkDown';
/* harmony export (immutable) */ __webpack_exports__["a"] = ACTION_WALK_DOWN;

const ACTION_WALK_DOWN_FRAMES = walkFrameDown;
/* harmony export (immutable) */ __webpack_exports__["b"] = ACTION_WALK_DOWN_FRAMES;


const ACTION_WALK_RIGHT = 'walkRight';
/* harmony export (immutable) */ __webpack_exports__["h"] = ACTION_WALK_RIGHT;

const ACTION_WALK_RIGHT_FRAMES = walkFrameRight;
/* harmony export (immutable) */ __webpack_exports__["i"] = ACTION_WALK_RIGHT_FRAMES;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = _;

/***/ })
],[0]);