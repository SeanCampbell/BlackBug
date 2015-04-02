/**
 * @class BBTank
 * @author Sean Campbell
 * @version 1.0
 */
function BBTank()
{
    this.canvas;
    this.ctx;
    
    this.lowColor;
    this.highColor;
    
    this.ground;
    this.bgGradient;
    
    this.fish;
    this.bubbleWorld;
    
    /**
     * Initiates tank object by creating
     * a background.
     * @param {HTMLCanvasElement} canvas - canvas that the tank will draw on
     */
    this.init = function(canvas)
    {
        this.fish = new Array();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Create the background water gradient.
        this.lowColor = new BBRGBA(0, 40, 100);
        this.highColor = new BBRGBA(0, 70, 200);
        this.bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        this.bgGradient.addColorStop(1.0, this.lowColor.toFillStyle());
        this.bgGradient.addColorStop(0.0, this.highColor.toFillStyle());

        // Create the ground.
        this.ground = new Image();
        this.ground.src = "images/pebbles.png";

        // Create the particle world for the bubbles.
        this.bubbleWorld = new BBParticleWorld();

    }
    
    /**
     * Draws the tank.
     */
    this.draw = function()
    {
        // Draw background water gradient.
        this.ctx.fillStyle = this.bgGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground.
        this.ctx.drawImage(this.ground, 0, canvas.height * 4 / 5);
        
        // Draw fish.
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].draw(this.ctx);
        }

        this.bubbleWorld.step();
        this.bubbleWorld.draw(this.ctx);
    }
    
    /**
     * Adds a fish to the tank.
     * @param {BBFish} fish - the fish to add
     */
    this.addFish = function(fish)
    {
        // Add fish to fish list and add its bubble emitter
        // and hyper voxels to the particle world.
        this.fish.push(fish);
        this.bubbleWorld.addEmitter(fish.emitter);
        this.bubbleWorld.addHyperVoxels(fish.hypervoxels);
    }
    
}
