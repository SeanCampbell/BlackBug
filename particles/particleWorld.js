/**
 * @class BBParticleWorld
 * @author Sean Campbell
 * @version 1.0
 * Keeps track of particle emitters and
 * hyper voxels.
 */
function BBParticleWorld()
{
    this.emitters = new Array();
    this.hypervoxels = new Array();
    
    this.shouldDrawParticles = false;
    this.shouldDrawEmitters = false;    
    
    /**
     * Adds an emitter to the world.
     * @param {BBParticleEmitter} emitter - emitter to add
     */
    this.addEmitter = function(emitter)
    {
        this.emitters.push(emitter);
    }
    
    /**
     * Adds hyper voxels to the world.
     * @param {BBHyperVoxelSystem} hv - hyper voxels to add
     */
    this.addHyperVoxels = function(hv)
    {
        this.hypervoxels.push(hv);
    }

    /**
     * Advances particles by a frame.
     */
    this.step = function()
    {
        // Loop through particle emitters.
        for (var i = 0; i < this.emitters.length; i++) {
                this.emitters[i].updateParticles();
        }
    }
    
    /**
     * Draws all particles, emitters, and hyper voxels.
     * @param {CanvasRenderingContext2D} ctx - the context to draw
     *      the particle world with
     */
    this.draw = function(ctx)
    {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        // Loop through particle emitters.
        for (var i = 0; i < this.emitters.length; i++) {
                // Draw particles (as dots) and emitters
                // (as boxes) if these options are set
                // to true.
                if (this.shouldDrawParticles)
                    this.emitters[i].drawParticles(tx);
                if (this.shouldDrawEmitters)
                    this.emitters[i].draw(ctx);
        }

        // Loop through hyper voxels and render them.
        for (var j = 0; j < this.hypervoxels.length; j++) {
                this.hypervoxels[j].render(ctx);
        }
    }
}
