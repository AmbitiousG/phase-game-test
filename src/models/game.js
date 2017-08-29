import NPC from './npc'

export default class Game{
  constructor(){
    this.npcs = [];
    this.game = new Phaser.Game(1024, 800, Phaser.AUTO, '', {
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
  }

  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.npcs = this.game.add.group();
    // this.npcs.enableBody = true;
    this.npcs.push(new NPC(this.game));
    this.npcs.push(new NPC(this.game));
    this.npcs.push(new NPC(this.game));
    this.npcs.push(new NPC(this.game));

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