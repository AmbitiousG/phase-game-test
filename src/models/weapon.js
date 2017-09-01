const Bullet_Top = 340;
const Bullet_Left = 341;
const Bullet_Down = 342;
const Bullet_Right = 343;

export default class Weapon {
  constructor(game, tank, auto) {
    this.game = game;
    this.tank = tank;
    this.entity = this.game.add.weapon();
    this.entity.createBullets(-1, 'bullets', Bullet_Top);
    this.entity.bulletCollideWorldBounds = true;
    this.entity.bulletSpeed = 60;
    this.entity.fireRate = 300;
    this.entity.bulletLifespan = 5000;
    this.auto = auto;
    if(!auto){ // player control

    }
    //trackSprite(sprite, offsetX, offsetY, trackRotation) → {Phaser.Weapon}
    this.entity.trackSprite(this.tank);


  }

  fire(direction){
    let frame = null;
    let angle = null;
    switch(direction){
      case 1:
      frame = Bullet_Top;
      angle = Phaser.ANGLE_UP;
      break;
      case 3:
      frame = Bullet_Left;
      angle = Phaser.ANGLE_LEFT;
      break;
      case 5:
      frame = Bullet_Down;
      angle = Phaser.ANGLE_DOWN;
      break;
      case 7:
      frame = Bullet_Right;
      angle = Phaser.ANGLE_RIGHT;
      break;
    }
    this.entity.bulletFrame = frame;
    this.entity.fireAngle = angle;
    this.entity.fire();
  }
}