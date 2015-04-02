/**
 * @class BBParticleEmitter
 * @author Sean Campbell
 * @version 1.0
 */
function BBParticleEmitter()
{
        // Speed in pixels per second
        // Acceleration in pixels per second squared
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.particleSpeed = 0;
        this.particleSpeedRange = 0;
        this.particleXAcceleration = 0;
        this.particleYAcceleration = 0;
        this.particleDirection = 0;
        this.particleDirectionRange = 0;
        this.maxParticles = 100;
        this.birthrate = 2;
        this.particleLifetime = 2;
        this.particleLifetimeRange = 0;

        this.particles = new Array();
        this.numberOfParticlesToMake = 0;

        /**
         * Returns a speed for a particle.
         * Implemented as a function to maximize
         * flexibility (so the algorithm can easily
         * be made more complicated in the future).
         * @returns {int} random number in the given range
         */
        this.speed = function()
        {
                return BBMath.randomNumber(this.particleSpeed - (this.particleSpeedRange / 2),
                        this.particleSpeed + (this.particleSpeedRange / 2));
        }
        
        /**
         * Returns direction for the particle to go in.
         * See comments for speed function.
         * @returns {int} random number in the given range
         */
        this.direction = function()
        {
                return BBMath.randomNumber(this.particleDirection - (this.particleDirectionRange / 2),
                        this.particleDirection + (this.particleDirectionRange / 2));
        }
        
        /**
         * Draws the bounding box of the emitter.
         * @param {CanvasRenderingContext2D} ctx - context to draw emitter with.
         */
        this.draw = function(ctx)
        {
                ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
        /**
         * Initiate all particles and store them in the particle array
         */
        this.initParticles = function()
        {
                for (var i = 0; i < this.maxParticles; i++) {
                        this.initParticle();
                }
        }
        
        /**
         * Initiate one particle and adds it to
         * the particle array.
         */
        this.initParticle = function()
        {
                var part = new BBParticle();
                part.x = BBMath.randomNumber(this.x, this.x + this.width);
                part.y = BBMath.randomNumber(this.y, this.y + this.height);
                part.lifetime = this.lifetime();
                part.setSpeed(this.speed(), this.direction());
                this.particles.push(part);
        }
        
        /**
         * Draw particles as dots at their position.
         * @param {CanvasRenderingContext2D} ctx - context to draw particles with
         */
        this.drawParticles = function(ctx)
        {
                for (var i = 0; i < this.particles.length; i++) {
                        ctx.fillRect(this.particles[i].x - 1, this.particles[i].y - 1, 2, 2);
                }
        }
        
        /**
         * Updates all particles positions, speed, and age
         * and creates more particles.
         */
        this.updateParticles = function()
        {
                // Loop through particles
                for (var i = 0; i < this.particles.length; i++) {
                        var part = this.particles[i];
                        if (part.age < part.lifetime) {
                                // If the particle has time left, update
                                // position, speed, and age of particle.
                                part.x += part.xSpeed / BB.fps;
                                part.y += part.ySpeed / BB.fps;
                                part.xSpeed += this.particleXAcceleration / BB.fps;
                                part.ySpeed += this.particleYAcceleration / BB.fps;
                                part.age += 1 / BB.fps;
                        } else {
                                // Otherwise, delete the particle.
                                delete this.particles.splice(i, 1);
                        }
                }
                
                //
                this.numberOfParticlesToMake += this.birthrate / BB.fps;
                // Create particles based on the birthrate.
                for (var j = 0; j < this.numberOfParticlesToMake; j++) {
                        // If we have reached the maximum number of particles,
                        // stop making them, even if we haven't gotten to
                        // the birthrate.
                        if (this.particles.length >= this.maxParticles)
                                break;
                        this.initParticle();
                        this.numberOfParticlesToMake -= 1;
                }
        }
        
        /**
         * Returns a lifetime for a new particle.
         * @return {int} random number in the lifetime range
         */
        this.lifetime = function()
        {
                var minLifetime = this.particleLifetime - (this.particleLifetimeRange / 2);
                var maxLifetime = this.particleLifetime + (this.particleLifetimeRange / 2);
                return BBMath.randomNumber(minLifetime, maxLifetime);
        }
}

/**
 * @class BBParticle
 * @author Sean Campbell
 * @version 1.0
 * Keeps track of information about particles in a particle emitter.
 */
function BBParticle()
{
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.age = 0;
        this.lifetime = 0;
        
        /**
         * Sets x and y components of speed given a speed
         * and a direction.
         * @param {int} speed - speed of the particle
         * @param {int} direction - direction of the speed
         */
        this.setSpeed = function(speed, direction)
        {
                this.xSpeed = Math.cos(BBMath.degToRad(direction)) * speed;
                this.ySpeed = Math.sin(BBMath.degToRad(direction)) * speed;
        }
        
        /**
         * @returns {int} speed of the particle
         */
        this.speed = function()
        {
                return Math.pow(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2), 0.5);
        }
}
