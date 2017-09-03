import NPC from './npc'
import Player from './player'
import Tank from './tank'
import Bullet from './bullet'
import _ from 'lodash'
import * as utils from './utils'

export default class Game{
  constructor(){
    this.npcs = [];
    this.player = null;
    this.cursors = null;
    this.tank = null;
    this.bullets = [];
    // this.
    this.game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
      preload: () => {
        this.preload()
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
    this.game.load.spritesheet('woman', 'static/woman.png', 64, 64, -1, 1);
    this.game.load.tilemap('mapConfig', 'static/map3.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('map', 'static/General Sprites.png');
    this.game.load.spritesheet('general', 'static/General Sprites.png', 16, 16);
    this.game.load.spritesheet('bullet', 'static/bullet.png', 8, 16);
  }

  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    // this.game.world.scale.set(2, 2);

    this.map = this.game.add.tilemap('mapConfig');
    this.map.addTilesetImage('map');
    // this.map.addTilesetImage('bullets');


    //add fluid water
    this.waterBg = this.game.add.tileSprite(16 * 10, 16 * 7, 16 * 11, 16 * 1, 'general', 91);
    // this.waterBg.tileScale.x = 2;
    // this.waterBg.tileScale.y = 2;

    this.game.physics.arcade.enable(this.waterBg);
    this.waterBg.animations.add('wave', [91, 92]);
    this.waterBg.animations.play('wave', 5, true);
    this.waterBg.body.immovable = true;

    this.layer = this.map.createLayer('brick');
    // this.layer.setScale(2,2);
    // this.layer3 = this.map.createLayer('water');

    this.tank = new Tank(this.game);
    this.map.setCollision([17, 66, 92, 93, 70]);

    this.layer.resizeWorld();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.Bullets = this.game.add.group();
    this.count = 0;
    let direction = 'right';
    // this.game.time.events.loop(1000, () => {
    //   if(this.count > 3){
    //     this.count = 0
    //   }
    //   switch(this.count) {
    //     case 0:
    //     direction = 'right'
    //     break;
    //     case 1:
    //     direction = 'down'
    //     break;
    //     case 2:
    //     direction = 'left'
    //     break;
    //     case 3:
    //     direction = 'top'
    //     break;
      // }
      // this.count++;
      // this.bullets.push(new Bullet(this.game, {x: 0, y: 0, direction}));
      // this.Bullets.add(_.last(this.bullets).entity);
    // })




    // this.npcs.push(new NPC(this.game,{
    //   x: 0,
    //   y: 0,
    // }));
    // this.npcs.push(new NPC(this.game,{
    //   x: this.game.world.width - 64,
    //   y: 0,
    // }));
    this.player = new Player(this.game);

    // for (var i = 0; i < 8; i++) {
      this.npcs.push(new NPC(this.game));
    // }

    // this.layer2 = this.map.createLayer('grass');
    this.createBounds();
  }

  update() {
    for (var i = 0; i < this.npcs.length; i++) {
      let npc = this.npcs[i];
      npc.update();
      this.game.physics.arcade.collide(this.player.player, npc.npc, (player, n1) => {
        let n = _.find(this.npcs, {npc: n1});
        n.restart();
      });
      this.game.physics.arcade.collide(npc.npc, _.map(this.npcs, 'npc'), (npc1, npc2) => {
        let n1 = _.find(this.npcs, {npc: npc1})
        n1 && n1.restart();
        let n2 = _.find(this.npcs, {npc: npc2})
        n2 && n2.restart();
        // npc.update()
      });

    }
    this.game.physics.arcade.collide(this.tank.entity, _.map(this.npcs, 'npc'), (tank, npc1) => {
      let n1 = _.find(this.npcs, {npc: npc1})
      n1 && n1.restart();
    })
    this.game.physics.arcade.collide(this.tank.entity, [this.layer, this.waterBg], (tank, tile) => {
    });
    this.game.physics.arcade.collide(this.tank.weapon.entity.bullets, this.layer, (bullet, tile) => {
      this.map.removeTile(tile.x, tile.y);
      bullet.kill();
    }, null, this);
    this.game.physics.arcade.overlap(this.waterBg, this.tank.weapon.entity.bullets, (tile, bullet) => {
      // debugger;
      // console.log(bullet)
      // bullet.parent.addChild(bullet);//bring to top
    }, null, this);

    this.game.physics.arcade.overlap(this.bounds, this.tank.weapon.entity.bullets, (tile, bullet) => {
      // debugger;
      bullet.kill();
    }, null, this);




    // this.game.physics.arcade.collide(this.Bullets, [this.layer, this.tank.entity], (bullet, obj) => {
    //   // debugger;
    //   if(bullet.key == 'bullets'){
    //     bullet.kill();
    //   }
    //   else {
    //     obj.kill();
    //   }
    // })

    this.tank.update();
    this.player.update();

  }

  createBounds() {
    this.bounds = [];
    _.each(['up', 'left', 'down', 'right'], direction => {
      this.createBound(direction)
    })
  }

  createBound(direction){
    let bound = this.game.add.sprite(0, 0, null);
    this.bounds.push(bound);
    this.game.physics.arcade.enable(bound);
    switch(direction){
      case 'up':
      bound.body.setSize(this.game.world.width, 0.1, 0, 0);
      break;
      case 'left':
      bound.body.setSize(0.1, this.game.world.height, 0, 0);
      break;
      case 'down':
      bound.body.setSize(this.game.world.width, 0.1, 0, this.game.world.height - 0.1);
      break;
      case 'right':
      bound.body.setSize(0.1, this.game.world.height, this.game.world.width - 0.1, 0);
      break;
    }
    return bound
  }

}