// Autumn Plaxco
// CMPM 120 - Game Development Experience
// Rocket Patrol Modifications
// Time to Complete Project: 

// Modifications Made (Point Breakdown):
// 1. Create a new scrolling tile sprite for the background (5 pts) (30 Minutes)
// 2. Display the time remaining (in seconds) on the screen (10 pts) (1 hr + 30 mins)
// 3. 
// 4. 
// 5. 
// 6.


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// keyboard keys
let keyF, keyR, keyLEFT, keyRIGHT;