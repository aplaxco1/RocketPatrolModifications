class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/SFX/blip_select12.wav');
        this.load.audio('sfx_explosion1', './assets/SFX/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/SFX/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/SFX/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/SFX/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/SFX/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/SFX/rocket_shot.wav');
      }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '22px';
        menuConfig.align = 'center';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'In One Player Mode:\nUse ←→ arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'In Two Player Mode:\n(Player 1) Use ←→ arrows to move & ↑ to fire\n(Player 2) Use (A)+(D) to move & (W) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding, 'Press ← for Novice or → for Expert\nPress ↓ for Two Player', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // select easy mode
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            twoPlayer: false   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // select hard mode
            game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            twoPlayer: false   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // select two player mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 60000,
            twoPlayer: true
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');
        }

      }
}