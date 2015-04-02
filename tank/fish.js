/**
 * @class BBFish
 * @author Sean Campbell
 * @version 1.0
 * Used to keep track of the position, size,
 * image, and bubbles for the fish. 
 */
function BBFish()
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.isMoving = false;
    this.isPlaying = true;
    
    this.leftFacingImage = new Image();
    this.rightFacingImage = new Image();
    
    this.moves = new Array();
    
    this.isFacingLeft = true;
    this.direction = 0;
    this.emitter;
    this.hypervoxels;
    
    this.moveTimer;
    
    /**
     * Sets up the fish object by
     * creating a bubble emitter
     * and hyper voxels.
     */
    this.init = function()
    {
        this.setupBubbleEmitter();
        this.setupBubbleHyperVoxels();
    }

    /**
     * Moves the fish to a new position with an animation.
     * @param {int} x - the x coordinate to move to
     * @param {int} y - the y coordinate to move to
     * @param {int} duration - how long it will take the fish to move
     *      to the specified position in milliseconds
     */
    this.moveTo = function(x, y, duration)
    {
        duration = typeof(duration) != 'undefined' ? duration : 1000;

        // Set the coordinates to move to.
        var move = new BBMoveCommand();
        move.newX = x;
        move.newY = y;
        move.duration = duration;

        // If there are still moves to do, the starting position
        // should be the ending position of the last move.
        // Otherwise, it's the current position. Also, orient
        // the fish in the current direction.
        if (this.moves.length > 0) {
            move.oldX = this.moves[this.moves.length - 1].newX;
            move.oldY = this.moves[this.moves.length - 1].newY;
        } else {
            move.oldX = this.x;
            move.oldY = this.y;
            this.direction = BBMath.angleTo(this.x, this.y, move.newX, move.newY);
            if (this.x > move.newX) {
                this.isFacingLeft = true;
            } else {
                this.isFacingLeft = false;
            }
        }
        
        if (this.moves.length == 0) {
            // Set up a timer to actually move the fish.
            this.isMoving = true;
            var self = this;
            function callMethod() { self.nextMoveStep(move); }
            this.moveTimer = setInterval(callMethod, 1000 / BB.fps);
        }
        
        this.moves.push(move);
    }
    
    /**
     * Perform the next step in the fish move.
     * @param {BBMoveCommand} move - contains information for movement
     */
    this.nextMoveStep = function()
    {
        var move = this.moves[0];
        
        // If the current move is done...
        if (move.pos >= 1.0) {
            this.moves.shift();
            // If we're out of moves to do, clear the
            // timer, indicate the fish isn't moving,
            // and clear the move command.
            if (this.moves.length == 0) {
                clearInterval(this.moveTimer);
                move = null;
                this.isMoving = false;
                return;
            }
            // Now we're advancing to the next move on
            // the list. Face in the right direction.
            this.direction = BBMath.angleTo(this.x, this.y, this.moves[0].newX, this.moves[0].newY);
            if (this.x > this.moves[0].newX) {
                this.isFacingLeft = true;
            } else {
                this.isFacingLeft = false;
            }
        }
        
        // Otherwise, update the current position.
        move.step();
        this.setX(move.currentX());
        this.setY(move.currentY());
    }
    
    /**
     * Sets x value for this object
     * and its emitter.
     * @param {int} x - new x value
     */
    this.setX = function(x)
    {
        this.x = x;
        this.emitter.x = x;
    }
    
    /**
     * Sets y value for this object
     * and its emitter.
     * @param {int} y - new y value
     */
    this.setY = function(y)
    {
        this.y = y;
        this.emitter.y = y;
    }
    
    /**
     * Draw the fish.
     * @param {CanvasRenderingContext2D} ctx - the canvas with which
     *      to draw the fish
     */
    this.draw = function(ctx)
    {
        // Save the state of the canvas so it can be restored later.
        ctx.save();
        // Rotate the fish. Unfortunately, the whole world is rotated,
        // too, and our x and y coordinates now do not point to the right
        // spot. So we have to do some calculations.
        ctx.rotate(BBMath.degToRad(this.direction));
        
        // Find the hypotenuse. This is needed for caclculating the angle
        // and new x and y coordinates.
        var h = Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
        // Find the angle the fish was making to the origin based on its
        // x and y coordinates.
        var theta = BBMath.radToDeg(Math.acos(this.x / h));
        
        // newTheta is the angle the fish makes to the new origin
        // now that the world is rotated.
        var newTheta = theta - this.direction;
        
        // The distance from the origin has not changed. It is
        // still the original hypotenuse. Using that distance and
        // the new angle, we can find the new x and y coordinates
        // using basic trig.
        var newX = BBMath.xValue(h, newTheta);
        var newY = BBMath.yValue(h, newTheta);

        // Move to the new spot and draw the picture.
        ctx.translate(newX, newY);

        //ctx.drawImage(this.image, 0, 0, this.width, this.height);
        if (this.isFacingLeft) {
            ctx.drawImage(this.leftFacingImage, 0, 0, this.width, this.height);
        } else {
            ctx.drawImage(this.rightFacingImage, 0, 0, this.width, this.height);
        }
        
        // Restore context to the original state.
        ctx.restore();
    }

    /**
     * Sets up the emitter to release
     * bubbles around the fish's mouth.
     */
    this.setupBubbleEmitter = function()
    {
        this.emitter = new BBParticleEmitter();
        this.emitter.x = 0;
        this.emitter.y = 0;
        this.emitter.maxParticles = 20;
        this.emitter.birthrate = 3;
        this.emitter.width = 50;
        this.emitter.height = 30;
        this.emitter.particleSpeed = 150;
        this.emitter.particleSpeedRange = 20;
        this.emitter.particleDirection = -90;
        this.emitter.particleDirectionRange = 0;
        this.emitter.particleLifetime = 4;
    }
    
    /**
     * Sets up the hypervoxels for the
     * bubble emitter.
     */
    this.setupBubbleHyperVoxels = function()
    {
        this.hypervoxels = new BBHyperVoxelSystem();
        this.hypervoxels.emitter = this.emitter;
        //this.hypervoxels.shouldStroke = true;
        this.hypervoxels.inputParameter = "y";
        this.hypervoxels.max = 800;
        this.hypervoxels.min = 70;
        this.hypervoxels.shape = "bubble";
        this.hypervoxels.radius = 10;
        this.hypervoxels.lowColor = new BBRGBA(20, 200, 230, 0.3);
        this.hypervoxels.highColor = new BBRGBA(0, 100, 150, 0.3);
    }
}
