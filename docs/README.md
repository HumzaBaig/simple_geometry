## Simple Geometry

### Background

Simple Geometry is an example of implementing the concept of **sampling** using [Bridson's Algorithm](http://www-devel.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf) to create a Poisson-Disc. The game begins with a cleared board, and as soon as the user clicks on the screen, the screen starts getting filled with circles, creating a pointillism effect. These circles begin from a random spot on the canvas, and continue to spread out almost-evenly until a picture is made. The circles will slowly have a smaller radius as time goes by, creating a clearer and clearer picture. The user may click the next or previous buttons at the top to move through different images.

### Functionality & MVP

With this simulator, users will be able to:

-[x] Start and reset the game board
-[x] Choose an image to recreate
-[x] Pause and play the background song

In addition, this project will include:

-[x] An About modal describing the background of the game
-[ ] A production README

### Wireframes

This app will consist of a single screen that will cover the entire browser window, regardless of how large or small it is. There will also be a footer with a music player to add to the tranquility of the game. In the top corner, there will be nav links for the About and Options modal. In the About modal, there will be nav links to the Github and my LinkedIn along with a description of the game and the image being recreated. The options modal will include radio buttons for which type of sampling to use, a list of images to recreate, a slider for the radius of the circles, and a reset button to clear the screen. Additionally, an image with a plus will be added to the list of images for the user to recreate an image of their choosing.

![wireframes](https://github.com/HumzaBaig/simple_geometry/tree/master/docs/wireframes)

### Architecture and Technologies

This project will be implemented with the following technologies:

-Vanilla JavaScript and `jquery` for overall structure and game logic,
-`HTML5 Canvas` for DOM manipulation and rendering,
-Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: Dedicate this day to learning the different sampling methods, their drawbacks and pros. Create the layout for the board and modals.

**Day 2**: Write out the different algorithms for sampling that will be used in the game. Implement them to fill the screen with single-colored circles.

**Day 3**: Add default images and have the circles change colors depending on the area they're located on the board.

**Day 4**: Complete all styling for the frontend, making it polished and professional.

### Bonus features

There are many directions this project could eventually go. Some anticipated updates are, but not exclusive to:

-[ ] Add the option for the user to recreate an image of their own
-[ ] Let the user choose a song of the predefined songs
-[ ] Add 'inverse' color schemes.
