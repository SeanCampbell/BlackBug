/**
 * @class BBHyperVoxelSystem
 * @author Sean Campbell
 * @version 1.0
 * Renders hypervoxels of a given particle emitter.
 */
function BBHyperVoxelSystem()
{
        this.emitter;
        this.inputParameter = "speed()";
	// Possible shapes
	// (1) square (2) star (3) circle (4) octagon (5) snowflake (6) bubble
	this.shape = "square";
	this.lowColor = new BBRGBA(0, 0, 0);
	this.highColor = new BBRGBA(255, 255, 255);
	this.min = 0;
	this.max = 20;
	this.radius = 10;
	this.image = new Image();
	
	this.shouldStroke = false;
	this.shouldFill = true;
	
	/**
	 * Given a value, determines the color of the hyper voxel
	 * based on the system's min and max values.
	 * @param {int} value - position in the gradient
	 * @returns {String} color of the particle at the given value
	 */
        this.color = function(value)
        {
                var startValue = this.min;
                var endValue = this.max;
                
                var curPos = value / (endValue - startValue);
                
		return BBColor.gradientAtPosRGBA(this.lowColor, this.highColor, curPos).toFillStyle();
        }
	
	/**
	 * Renders all hyper voxels.
	 * @param {CanvasRenderingContext2D} ctx - context with which
	 * 	to draw hyper voxels
	 */
        this.render = function(ctx)
        {
		// Loop through all particles in the emitter.
                for (var i = 0; i < this.emitter.particles.length; i++) {
			// Get the current particle.
                        var part = this.emitter.particles[i];
			// Save fill style so it can be restored after
			// drawing is complete.
                        var fill = ctx.fillStyle;
			// Set the color based on a given input parameter.
                        ctx.fillStyle = this.color(eval("part." + this.inputParameter));
			
			var oldShouldStroke = BBShapes.shouldStroke;
			var oldShouldFill = BBShapes.shouldFill;
			BBShapes.shouldStroke = this.shouldStroke;
			BBShapes.shouldFill = this.shouldFill;
			
			// Draw the particle depending on the shape.
			switch (this.shape) {
				case "square":
					ctx.fillRect(part.x - this.radius / 2, part.y - this.radius / 2, this.radius, this.radius);
					break;
				case "star":
					BBShapes.drawStar(ctx, this.radius / 2, this.radius, 10, part.x, part.y);
					break;
				case "circle":
					BBShapes.drawStar(ctx, this.radius, this.radius, 50, part.x, part.y);
					break;
				case "octagon":
					BBShapes.drawStar(ctx, this.radius, this.radius, 8, part.x, part.y);
					break;
				case "snowflake":
					BBShapes.drawStar(ctx, this.radius / 10, this.radius, 20, part.x, part.y);
					break;
				case "bubble":
					BBShapes.drawBubble(ctx, part.x, part.y, this.radius);
					break;
				case "image":
					ctx.drawImage(this.image, part.x, part.y);
					break;
				default:
					ctx.fillRect(part.x - 5, part.y - 5, 10, 10);
					break;
			}
                        ctx.fillStyle = fill;
			
			BBShapes.shouldStroke = oldShouldStroke;
			BBShapes.shouldFill = oldShouldFill;
                }
        }
}