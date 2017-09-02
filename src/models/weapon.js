const Bullet_Top = 340;
const Bullet_Left = 341;
const Bullet_Down = 342;
const Bullet_Right = 343;

export default class Weapon {
  constructor(game, tank, auto) {
    this.game = game;
    this.tank = tank;
    this.entity = this.game.add.weapon();
    this.entity.createBullets(-1, 'bullets', Bullet_Right);
    this.entity.bulletCollideWorldBounds = true;
    this.entity.bulletKillType = Phaser.Weapon.KILL_NEVER;
    this.entity.bulletSpeed = 110;
    this.entity.fireRate = 300;
    this.entity.bulletLifespan = 1000;
    this.auto = auto;
    if(!auto){ // player control

    }
    //trackSprite(sprite, offsetX, offsetY, trackRotation) → {Phaser.Weapon}
    this.entity.trackSprite(this.tank);
    this.entity.trackOffset.x = 8;
    this.entity.trackOffset.y = 8;

    this.entity.setBulletBodyOffset(4, 4, 2, 6);
    // debugger;

  }

  fire(direction){
    this.entity.trackOffset.x = 8;
    this.entity.trackOffset.y = 8;
    // let frame = Bullet_Right;
    let angle = null;
    let firePoint = {
      x: this.tank.centerX,
      y: this.tank.centerY
    };
    switch(direction){
      case 1:
      // frame = Bullet_Top;
      angle = Phaser.ANGLE_UP;
      this.entity.trackOffset.y = 0;
      break;
      case 3:
      // frame = Bullet_Left;
      angle = Phaser.ANGLE_LEFT;
      // firePoint.x -= this.tank.width / 2;
      this.entity.trackOffset.x = 0;
      break;
      case 5:
      // frame = Bullet_Down;
      angle = Phaser.ANGLE_DOWN;
      // firePoint.y = 
      this.entity.trackOffset.y = 16;
      break;
      case 7:
      // frame = Bullet_Right;
      angle = Phaser.ANGLE_RIGHT;
      this.entity.trackOffset.x = 16;
      break;
    }
    // this.entity.bulletFrame = frame;
    this.entity.fireAngle = angle;
    // this.entity.fireFrom = new Phaser.Rectangle(firePoint.x, firePoint.y, 1, 1);
    this.entity.fire();
  }
}