import NPC from './npc'
import Player from './player'
import _ from 'lodash'
import * as utils from './utils'

export default class Game{
  constructor(){
    this.npcs = [];
    this.player = null;
    this.cursors = null;
    // this.
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
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
  }

  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.npcs = this.game.add.group();
    // this.npcs.enableBody = true;
    // this.npcs.push(new NPC(this.game,{
    //   x: 0,
    //   y: 0,
    // }));
    // this.npcs.push(new NPC(this.game,{
    //   x: this.game.world.width - 64,
    //   y: 0,
    // }));
    this.player = new Player(this.game);

    for (var i = 0; i < 8; i++) {
      this.npcs.push(new NPC(this.game));
    }

    // this.npcs.
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
    this.player.update();

  }

}