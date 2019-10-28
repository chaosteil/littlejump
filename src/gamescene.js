import {Scene} from 'phaser';

export default class GameScene extends Scene {
  constructor(config) {
    super(config);

    this.walkspeed = 0.5;
    this.jump = -100;
    this.gravity = 1;
  }

  preload() {
    this.load.path = "src/assets/"
    this.load.spritesheet('character',
      'Tilesheet/platformerPack_character@2.png',
      { frameWidth: 768/4, frameHeight: 384/2 }
    );
    this.load.spritesheet('tiles',
      'Tilesheet/platformPack_tilesheet@2.png',
      { frameWidth: 1792/14, frameHeight: 896/7 }
    );
  }

  create() {
    this.anims.create({
      key: 'char_walk',
      frames: this.anims.generateFrameNumbers('character', {frames:[2,3]}),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'char_idle',
      frames: [{key:'character', frames: 0}],
      frameRate: 10,
    });
    this.anims.create({
      key: 'char_jump',
      frames: [{key:'character', frame: 1}],
      frameRate: 10,
    });

    this.cameras.main.setBackgroundColor('#eeeeee');
    this.player = this.add.sprite(100, 500, 'character')
    this.player.velocityY = 0;
    this.player.anims.play('char_idle');
  }

  update(time, delta) {
    let {
      player,
      walkspeed,
      jump,
      gravity,
      input,
    } = this;
    let cursors = input.keyboard.createCursorKeys();

    player.velocityY += gravity * delta;
    player.y += player.velocityY;
    player.y = Phaser.Math.Clamp(player.y, 0, 500);

    let jumping = player.y < 500;
    if (jumping) {
      if (cursors.left.isDown) {
        player.scaleX = -1;
        player.x -= walkspeed * delta;
      } else if (cursors.right.isDown) {
        player.scaleX = 1;
        player.x += walkspeed * delta;
      }
    } else {
      if (cursors.up.isDown) {
        player.anims.play('char_jump', true);
        player.velocityY = jump;
      }  else if (cursors.left.isDown) {
        player.anims.play('char_walk', true);
        player.scaleX = -1;
        player.x -= walkspeed * delta;
      } else if (cursors.right.isDown) {
        player.anims.play('char_walk', true);
        player.scaleX = 1;
        player.x += walkspeed * delta;
      } else {
        player.anims.play('char_idle');
      }
    }
  }
}
