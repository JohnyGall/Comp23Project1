          Matt Asnes, Fury, Mike Yang, Taus, and John Gallagher

                                Proudly Present
                                   BITSHIFT 

Bitshift is a 2-D sidescrolling platformer focused around the mechanic of 
changing the resolution of the game world. You play as a troubled Tufts 
Computer Science student trying to finish your Game Development project on time.
You must exploit the resolution bug in your game in order to get to the end
and fix the bug before your Game Development project is due.

--------------------
Controls:
--------------------

Left/Right Arrow Keys — Move left or right; in the main menu and in cutscenes,
                        move forward in dialog.

Up Arrow Key — Jump; hold down for longer jumps

Down Arrow — Fast fall; press while in the air to immediately fall downwards

Spacebar — Bitshift; change between low and high resolution worlds

P - Pause/Unpause

NOTE: There are secret debug keys


--------------------
Interactables:
--------------------

Boulders — Round rocks that can be rolled up or down hills and which block 
           turret fire. In high-res, that is. In the low-res world, boulders
           are not affected by gravity, have square corners, and function as
           stable platforms.

Turrets — Enemies that fire dangerous one-hit-kill projectiles at the player.
          In high-res, the turrets fire bullets that move extremely quickly.
          The bullets are small, however, and have a visible bar showing the
          time until the next bullet is fired. In low-res, the bullets are much
          larger, and fire more rapidly. However they fire at a lower frequency,
          making low-res turrets a sort of bullet-hell obstacle.

Slopes — Slopes are hills in the game levels that, in the high-res world, can
         be used as slides.

Clouds — Clouds in the high-res world act like regular clouds: puffy little
         water friends that sit around doing nothing and not interacting with
         the world. They can be walked or jumped through. In low-res, clouds
         form solid platforms the player slowly drips through, though they 
         cannot be passed through from below, leading to timing puzzles where 
         in order to access an area the player must bitshift to pass through the
         cloud and then turn to the low-resolution world to stand on the cloud.

Spikes — Spikes are deadly in high-res, but act as useful platforms in low-res.

Checkpoints — Shaped like the outline of the player in high-res and an 
              amorphous blob in low-res, checkpoints are the places from which
              a dead player will respawn.

--------------------
Levels:
--------------------
Level 1 — Grass
Level 2 — Ice

--------------------
Compatibility:
--------------------

Bitshift was written in JavaScript using the Phaser game engine [1]. It depends
externally on Google Web Fonts, though this is not a game-making functionality.
The game should run in most modern browsers and had been tested in the most
recent versions of Chrome / Firefox / Opera, as of the due date (10/20/2015).


[1] http://phaser.io/

================================================================================
