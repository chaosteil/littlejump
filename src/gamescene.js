import { Scene } from "phaser";

export default class GameScene extends Scene {
  constructor(config) {
    super(config);

    this.walkspeed = 0.5;
    this.jump = -40;
    this.gravity = 0.2;
  }

  preload() {
    this.load.path = "src/assets/";
    this.load.spritesheet(
      "character",
      "Tilesheet/platformerPack_character@2.png",
      { frameWidth: 768 / 4, frameHeight: 384 / 2 }
    );
    this.load.spritesheet("tiles", "Tilesheet/platformPack_tilesheet@2.png", {
      frameWidth: 1792 / 14,
      frameHeight: 896 / 7
    });
  }

  create() {
    this.anims.create({
      key: "char_walk",
      frames: this.anims.generateFrameNumbers("character", { frames: [2, 3] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "char_idle",
      frames: [{ key: "character", frame: 0 }],
      frameRate: 10
    });
    this.anims.create({
      key: "char_jump",
      frames: [{ key: "character", frame: 1 }],
      frameRate: 10
    });
    
    this.cameras.main.setBackgroundColor("#00BFFF");
    
    for (let i = 0; i < 10; i++) {
      this.add.sprite(i * 100 + 50, 535, "tiles", 14 * 5 + 2);
    }
    
    this.add.sprite(600 + 54, 525, "tiles", 80); //button
    // this.add.sprite(600 + 54, 525, "tiles",81); //pushed button
    this.add.sprite(780 + 54, 425, "tiles",76); //closed door
    this.add.sprite(780 + 54, 525, "tiles",90); //closed door 2
    // this.add.sprite(780 + 54, 425, "tiles",75); //open door
    // this.add.sprite(780 + 54, 525, "tiles",89); //open door 2
    
    
    this.player = this.add.sprite(100, 500, "character");
    this.player.velocityY = 0;
    this.player.jumpsCount = 0;
    this.player.anims.play("char_idle");

    for (let i = 0; i < 10; i++) {
      this.add.sprite(i * 128, 650, "tiles", 0);
    }
  }

  update(time, delta) {
    let { player, walkspeed, jump, gravity, input } = this;
    let cursors = input.keyboard.createCursorKeys();

    player.velocityY += gravity * delta;
    player.y += player.velocityY;
    player.y = Phaser.Math.Clamp(player.y, 0, 500);

    let jumping = player.y < 500;
    if (jumping) {
      if (cursors.up.isUp) {
        player.ready = true;
      } else if (player.ready && cursors.up.isDown && player.jumpsCount < 1) {
        player.velocityY = jump;
        player.ready = false;
        player.jumpsCount += 1;
      } else if (cursors.left.isDown) {
        player.scaleX = -1;
        player.x -= walkspeed * delta;
      } else if (cursors.right.isDown) {
        player.scaleX = 1;
        player.x += walkspeed * delta;
      }
    } else {
      player.jumpsCount = 0;
      player.ready = false;
      if (cursors.up.isDown) {
        player.anims.play("char_jump", true);
        player.velocityY = jump;
      } else if (cursors.left.isDown) {
        player.anims.play("char_walk", true);
        player.scaleX = -1;
        player.x -= walkspeed * delta;
      } else if (cursors.right.isDown) {
        player.anims.play("char_walk", true);
        player.scaleX = 1;
        player.x += walkspeed * delta;
      } else {
        player.anims.play("char_idle");
      }
    }
  }
}
