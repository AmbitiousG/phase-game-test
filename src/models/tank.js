export default class Tank {
  constructor(game, type) {
    this.game = game;
    this.entity = this.game.add.sprite(100, 100, 'general', 0);
    this.game.physics.arcade.enable(this.entity);
    this.entity.body.collideWorldBounds = true;
    this.entity.body.setSize(15, 15, 0, 0);

    this.entity.animations.add('up', [0, 1], 10, true);
    this.entity.animations.add('left', [2, 3], 10, true);
    this.entity.animations.add('down', [4, 5], 10, true);
    this.entity.animations.add('right', [6, 7], 10, true);

    this.currentDirection = null;

    this.keys = this.game.input.keyboard.addKeys({
      'up': Phaser.KeyCode.W,
      'down': Phaser.KeyCode.S,
      'left': Phaser.KeyCode.A,
      'right': Phaser.KeyCode.D,
      'sc': Phaser.KeyCode.J
    });
  }

  update() {
    this.entity.body.velocity.x = 0;
    this.entity.body.velocity.y = 0;

    if (this.keys.up.isDown) {
      this.entity.body.velocity.x = 0;
      this.entity.body.velocity.y = -100;
      if (this.entity.body.touching.up) {
        this.entity.body.reset(this.entity.x, this.entity.y);
      }
      this.entity.animations.play('up');
      this.currentDirection = 1;
    } else if (this.keys.left.isDown) {
      this.entity.body.velocity.x = -100;
      this.entity.body.velocity.y = 0;
      if (this.entity.body.touching.left) {
        this.entity.reset(this.entity.x, this.entity.y);
      }
      this.entity.animations.play('left');
      this.currentDirection = 3;
    } else if (this.keys.down.isDown) {
      this.entity.body.velocity.x = 0;
      this.entity.body.velocity.y = 100;
      if (this.entity.body.touching.down) {
        this.entity.reset(this.entity.x, this.entity.y);
      }
      this.entity.animations.play('down');
      this.currentDirection = 5;
    } else if (this.keys.right.isDown) {
      this.entity.body.velocity.x = 100;
      this.entity.body.velocity.y = 0;
      if (this.entity.body.touching.right) {
        this.entity.reset(this.entity.x, this.entity.y);
      }
      this.entity.animations.play('right');
      this.currentDirection = 7;
    } else {
      this.entity.frame = this.currentDirection;
    }
  }

}