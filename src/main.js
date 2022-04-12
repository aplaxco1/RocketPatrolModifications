// Autumn Plaxco
// CMPM 120 - Game Development Experience
// Rocket Patrol Modifications
// Time to Complete Project: 

// Modifications Made (Point Breakdown):
// 1. Implement a simultaneous two-player mode (30 pts) (3 hours)
// 2. Display the time remaining (in seconds) on the screen (10 pts) (1 hr + 30 mins)
// 3. Create a new scrolling tile sprite for the background (5 pts) (30 Minutes)
// 4. Create a new Spaceship type (w/ new artwork) thats smaller, moves faster,
//    and is worth more points (20 pts) (1 hr)
// 5. Implement the speed increase that happens after 30 seconds in the original game (5 pts) (20 mins)
// 6. Create 4 new explosion SFX and randomize which one plays on impact (10 pts) (40 mins)
//
// 
// Total Points: 30 pts + 10 pts + 5 pts + 20 pts + 5 pts + 10 pts = 80 pts


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
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyA, keyD, keyW, keyR;