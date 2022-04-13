// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerNumber) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        // track rocket's firing status
        this.isFiring = false;
        // movement pixels per frame
        this.moveSpeed = 2;

        this.player = playerNumber;

        // add rocket sound effect
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // movement for player 1
        if(!this.isFiring && (this.player == 1)) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } 
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;  
            } 

            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.isFiring = true;
                this.sfxRocket.play();  // play rocket sound effect
            }
        }
        // movement for player 2
        if(!this.isFiring && (this.player == 2)) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } 
            else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;  
            } 

            if (Phaser.Input.Keyboard.JustDown(keyW)) {
                this.isFiring = true;
                this.sfxRocket.play();  // play rocket sound effect
            }
        }

        // if fired, move rocket up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset rocket to bottom on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}