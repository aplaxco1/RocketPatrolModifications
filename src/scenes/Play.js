class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images and tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('player1rocket', './assets/player1rocket.png');
        this.load.image('player2rocket', './assets/player2rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('smallSpaceship', './assets/smallSpaceship.png');
        this.load.image('starfield', './assets/newStarfield.png');

        // load explosion animation spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite (starfield)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // define keyboard keys
        // player 1 keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // player 2 keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);    
        // restart game key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add rocket (player 1 and player)
        this.twoPlayers = game.settings.twoPlayer;
        if (this.twoPlayers == false) {
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, 1).setOrigin(0.5, 0);
        }
        else if (this.twoPlayers == true) {
            this.p1Rocket = new Rocket(this, game.config.width/2 + 20, game.config.height - borderUISize - borderPadding, 'player1rocket', 0, 1).setOrigin(0.5, 0);
            this.p2Rocket = new Rocket(this, game.config.width/2 - 20, game.config.height - borderUISize - borderPadding, 'player2rocket', 0, 2).setOrigin(0.5, 0);
        }

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 6 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 7 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        // add smaller/faser spaceship (x1)
        this.fastShip = new Spaceship(this, game.config.width +  borderUISize*6, borderUISize*4, 'smallSpaceship', 0, 40).setOrigin(0, 0);
        this.fastShip.moveSpeed = (this.fastShip.moveSpeed * 2);

        // explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        if (this.twoPlayers == true) {
            this.p2Score = 0;
        }
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        if (this.twoPlayers == false) {
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        }
        if (this.twoPlayers == true) {
            scoreConfig.color = '#1C19E3';
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
            scoreConfig.color = '#E31919';
            this.scoreMiddle = this.add.text(game.config.width/2 - 50, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
            scoreConfig.color = '#843605';
        }


        // Game Over flag
        this.gameOver = false;

        // display clock
        this.gameTime = (game.settings.gameTimer / 1000);
        this.gameTimeLeft = this.gameTime;
        scoreConfig.fixedWidth = 150;
        this.timeLeft = this.add.text(game.config.width - (borderUISize + borderPadding + scoreConfig.fixedWidth), borderUISize + borderPadding*2, "Time: "+this.gameTimeLeft.toString(), scoreConfig);

        // gamer timer - end game after 60/45 seconds
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.timeLeft.text = "Time: 0";
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            if (this.twoPlayers == true) {
                if (this.p1Score > this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player 1 Wins!', scoreConfig).setOrigin(0.5);
                }
                else if (this.p1Score < this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player 2 Wins!', scoreConfig).setOrigin(0.5);
                }
                else if (this.p1Score == this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player 1 and Player 2 Tied!', scoreConfig).setOrigin(0.5);
                }
            }
            this.gameOver = true;
        }, null, this);

        // speed increase event
        this.speedIncreaseEvent = this.time.delayedCall(30000, () => {
            if (this.ship01.moveSpeed == game.settings.spaceshipSpeed) {
                this.ship03.moveSpeed += 2;
                this.ship02.moveSpeed += 2;
                this.ship01.moveSpeed += 2;
                this.fastShip.moveSpeed += 2;
            }
        }, null, this);

    }

    update () {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // check key input for return to menu scene
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {

            // update clock display
            this.gameTimeLeft = (this.gameTime - Math.floor(this.clock.getElapsedSeconds()));
            this.timeLeft.text = "Time: "+this.gameTimeLeft.toString();

            // moving starfield background
            this.starfield.tilePositionX -= 3;
            
            // controllable rockets
            this.p1Rocket.update();
            if (this.twoPlayers == true) {
                this.p2Rocket.update();
            }
            
            // moving spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.fastShip.update();

        }

        // check for collisons (between rocket and spaceship)
        // for player 1
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.ship01);
            // update time
            this.clock.delay += 3000;
            this.gameTime += 3;
        }
        if (this.checkCollision(this.p1Rocket, this.fastShip)) {
            this.p1Rocket.reset();
            this.p1Score += this.fastShip.points;
            this.scoreLeft.text = this.p1Score;
            this.shipExplode(this.fastShip);
            // update time
            this.clock.delay += 5000;
            this.gameTime += 5;
        }

        // for player 2
        if (this.twoPlayers == true) {
            if (this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship03.points;
                this.scoreMiddle.text = this.p2Score;
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship02.points;
                this.scoreMiddle.text = this.p2Score;
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.p2Score += this.ship01.points;
                this.scoreMiddle.text = this.p2Score;
                this.shipExplode(this.ship01);
                // update time
                this.clock.delay += 3000;
                this.gameTime += 3;
            }
            if (this.checkCollision(this.p2Rocket, this.fastShip)) {
                this.p2Rocket.reset();
                this.p2Score += this.fastShip.points;
                this.scoreMiddle.text = this.p2Score;
                this.shipExplode(this.fastShip);
                // update time
                this.clock.delay += 5000;
                this.gameTime += 5;
            }
        }
        

    }

    checkCollision(rocket, ship) {
        // simple AABB collsion checking
        if ((rocket.x < ship.x + ship.width) && (rocket.x + rocket.width > ship.x) && (rocket.y < ship.y + ship.height) && (rocket.height + rocket.y > ship.y)) {
            return true;
        }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide the ship
        ship.alpha = 0;
        // create an explosion at the ship's position, over the hidden ship
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play the created explosion animation
        boom.on('animationcomplete', () => { // callback after the animation completes
            ship.reset(); // reset the ship's position
            ship.alpha = 1; // make the ship visible again
            boom.destroy(); // remove the explosion sprite
        });

        // score add and repaint
        let sound = (Math.floor(Math.random() * 5) + 1);
        this.sound.play('sfx_explosion'+sound.toString()); // add explosion sound effect
    }
}