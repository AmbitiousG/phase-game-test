const Bullet_Top = 340;
const Bullet_Left = 341;
const Bullet_Down = 342;
const Bullet_Right = 343;

export default class Bullet {
  constructor(game, options) {
    let {direction, x, y} = options;
    this.vx = this.vy = 0;
    switch(direction) {
      case 'top':
      this.direction = Bullet_Top;
      this.vy = -60;
      break;
      case 'left':
      this.direction = Bullet_Left;
      this.vx = -60;
      break;
      case 'down':
      this.direction = Bullet_Down;
      this.vy = 60;
      break;
      case 'right':
      this.direction = Bullet_Right;
      this.vx = 60;
      break;
      default:
      this.direction = Bullet_Right;
      this.vx = 60;
    }
    // this.direction = direction;
    this.game = game;
    this.entity = this.game.add.sprite(150, 50, 'bullets', this.direction);
    // this.entity.scale.set(2, 2);

    this.game.physics.arcade.enable(this.entity);
    this.entity.body.collideWorldBounds = true;
    this.entity.lifespan = 10000;

    this.entity.body.velocity.x = this.vx;
    this.entity.body.velocity.y = this.vy;
  }
}