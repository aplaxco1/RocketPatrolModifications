// Autumn Plaxco
// CMPM 120 - Game Development Experience
// Rocket Patrol Modifications
// Started Project: Sunday, April 10 at 5:00 PM
// Time to Complete Project: 11 hrs

// Modifications Made (Point Breakdown):
// 1. Implement a simultaneous two-player mode (30 pts) (3 hours + 30 mins)
//    - On the Main Menu Scene, the player now has the option to choose a two player mode by pressing the DOWN key
//      on the keyboard. This will take the player to the play screen, now with two rocket sprites (one that is
//      blue for player 1 and one that is red for player 2) and two distinct scores reserved for each player 
//      (where the score written in blue is for player 1 and the red score is for player 2). Each player has 
//      different controls for their own spaceship sprite where player 1 uses the LEFT, RIGHT, and UP keys while
//      player two uses the A, D, and W keys. Once time runs out in the game, the winner will be displayed on 
//      the screen depending upon which player resulting in the most overall points.
// 2. Display the time remaining (in seconds) on the screen (10 pts) (2 hrs)
//    - Now on the Play Scene, in all three modes of the game (Novice, Expert and Two-Player), the remaining time until
//      the game ends is displayed on the upper right corner of the screen, and decreases each time a second passes
//      in the game. The seconds displayed on the on-screen timer starts at the time indicated for the mode selected
//      on the Main Menu scene and slowly decreases until it reaches 0 when the game ends. 
// 3. Create a new scrolling tile sprite for the background (5 pts) (30 Minutes)
//    - I created a new scrolling tile sprite, titled "newStarfield.png" in the assets folder that displays a somewhat
//      similar scene to the original, but with differently shaped stars and with more adundance of them throughout
//      the image. In all modes of the game, it has been updated to display this new title sprite in the background instead
//      of the old one.
// 4. Create a new Spaceship type (w/ new artwork) thats smaller, moves faster, and is worth more points (20 pts) (1 hr)
//    - I created a new sprite for a smaller spaceship, instead with the dimensions of 32 by 16 pixels, and with a slightly
//      different design, titled "smallSpaceship.png" in the assets folder. I then added this spaceship as another Spaceship
//      class within the Play Scene with the updated artwork called fastShip, increased its movement speed to be double of 
//      whatever speed was indicated by the particular mode that the player chose on the title screen, increased its point 
//      value to 40 (while the other three spaceships had point values of 30, 20, and 10), and placed it towards the very top 
//      of the screen to make it the most difficult to shoot. I also made sure to check for collisions for this particular spaceship
//      and increase the players points by 40 if their rocket successfully collides with the smaller spaceship.
// 5. Implement the speed increase that happens after 30 seconds in the original game (5 pts) (20 mins)
//    - In order to do this I added another delayedCall() function to the Play scene called speedIncreaseEvent, which, after 30 seconds
//      has passed, increases the movement speeds of all of the Spaceships by 2. In order to do this, it adds 2 to the moveSpeed property
//      of all four spaceship, including ship01, ship02, ship03, and also fastShip.
// 6. Create 4 new explosion SFX and randomize which one plays on impact (10 pts) (40 mins)
//    - Using the program, Bfxr, which was reccomended in the Rocket Patrol Tutorial, I created four new explosion sound effects and
//      labeled them as "sfx_explosion(1-5)" where "sfx_explosion5" is the original explosion sound effect used in the tutorial.
//      In the shipExplode() function, I then generated a random number between 1 and 5, and played the sound effect ending with the
//      resulting number, so that a random sound effect out of the 5 total would be played each time a ship exploded.
// 7. Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20 pts) (3 hrs)
//    - For this particular mechanism, for the two ships towards the top of the screen, ship01 and fastShip, when checking for a 
//      collison, I added the functionality that would increas the delay time of the clock, which is the delayedCall() that ends the
//      game, so that the delay would be called at a further time in the run time of the game, and also updated the timer display on
//      the screen by adding the correlating number of seconds to the timer. When ship01 is hit, it adds 3 seconds to the clock, and when
//      fastShip is hit it adds 5 seconds to the clock.
// 
// Total Points: 30 pts + 10 pts + 5 pts + 20 pts + 5 pts + 10 pts + 20 pts = 100 pts


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