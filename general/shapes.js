// Contains all shape related functions
var BBShapes = BBShapes || {};
BBShapes.shouldFill = true;
BBShapes.shouldStroke = false;

/**
 * @class BBPoint
 * @author Sean Campbell
 * @param {int} x - x coordinate of point
 * @param {int} y - y coordinate of point
 * Represents a point in 2D space.
 */
function BBPoint(x, y)
{
	this.x = typeof(x) != 'undefined' ? x : 0;
	this.y = typeof(y) != 'undefined' ? y : 0;
}

/**
 * @class BBRect
 * @author Sean Campbell
 * @version 1.0
 * @param {int} x - x coordinate of rectangle
 * @param {int} y - y coordinate of rectangle
 * @param {int} w - width of rectangle
 * @param {int} h - height of rectangle
 * Used to keep track of position and size
 * of a rectangle.
 */
function BBRect(x, y, w, h)
{
	this.x = typeof(x) != 'undefined' ? x : 0;
	this.y = typeof(y) != 'undefined' ? y : 0;
	this.width = typeof(w) != 'undefined' ? w : 0;
	this.height = typeof(h) != 'undefined' ? h : 0;
	
	/**
	 * Determines if a point is in the rectangle.
	 * @param {int} x - test x coordinate
	 * @param {int} y - test y coordinate
	 * @returns {bool} true if point is in rectangle
	 * 	and otherwise false
	 */
	this.contains = function(x, y)
	{
		if (x < this.x || x > this.x + this.width)
			return false;
		if (y < this.y || y > this.y + this.height)
			return false;
		return true;
	}
}

/**
 * @class BBStar
 * @author Sean Campbell
 * @version 1.0
 * Stores information used to create a star.
 */
function BBStar()
{
	this.innerRadius = 5;
	this.outerRadius = 10;
	this.segments = 10;
	this.x = 0;
	this.y = 0;
}

/**
 * Draws a rectangle based on a BBRect object.
 * @param {CanvasRenderingContext2D} ctx - the context with which to draw the rectangle
 * @param {BBRect} rect - the rectangle to draw
 */
BBShapes.drawRect = function(ctx, rect)
{
	if (BBShapes.shouldStroke) {
		ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	}
	if (BBShapes.shouldFill) {
		ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	}
}

/**
 * Draws a star given an optional number
 * of arguments. Depending on number of
 * arguments, either draws star from object
 * or properties.
 */
BBShapes.drawStar = function()
{
	var args = arguments;
	if (arguments.length == 2) {
		BBShapes.drawStarFromObject(args[0], args[1]);
	} else {
		BBShapes.drawStarFromProperties(args[0], args[1], args[2], args[3], args[4], args[5]);
	}
}

/**
 * Draw a star given star properties.
 * @param {CanvasRenderingContext2D} ctx - the context used to draw the star
 * @param {int} innerRadius - radius of inside of star
 * @param {int} outerRadius - radius of outside of star
 * @param {int} segments - number of segments in star
 * @param {int} xOffset - x coordinate of star
 * @param {int} yOffset - y coordinate of star
 */
BBShapes.drawStarFromProperties = function(ctx, innerRadius, outerRadius, segments, xOffset, yOffset)
{
	//var xOffset = canvas.width / 2;
	//var yOffset = canvas.height / 2;
	ctx.beginPath();
	for (var i = 0; i <= segments; i++) {
		var radians = BBMath.degToRad(360 / segments * i - 15);
		var x = Math.cos(radians);
		var y = Math.sin(radians);
		if (i % 2 == 0) {
			// Outer segment
			ctx.lineTo(x * outerRadius + xOffset, y * outerRadius + yOffset);
		} else {
			// Inner segment
			ctx.lineTo(x * innerRadius + xOffset, y * innerRadius + yOffset);
		}
	}
	ctx.closePath();
	
	if (BBShapes.shouldStroke) {
		ctx.stroke();
	}
	if (BBShapes.shouldFill) {
		ctx.fill();
	}
}
/**
 * Draw a star given a star object.
 * @param {CanvasRenderingContext2D} ctx - the context used to draw the star
 * @param {BBStar} star - the star to draw
 */
BBShapes.drawStarFromObject = function(ctx, star)
{
	BBShapes.drawStarFromProperties(ctx, star.innerRadius, star.outerRadius, star.segments, star.x, star.y);
}

/**
 * Draws a circle given x, y, and radius.
 * @param {CanvasRenderingContext2D} ctx - the ctx with which to draw this circle
 * @param {int} x - x coordinate to draw circle at
 * @param {int} y - y coordinate to draw circle at
 * @param {int} radius - radius of the circle
 */
BBShapes.drawCircle = function(ctx, x, y, radius)
{
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.closePath();
	
	if (BBShapes.shouldFill) {
		ctx.fill();
	}
	if (BBShapes.shouldStroke) {
		ctx.stroke();
	}
}

/**
 * Draws a bubble given x, y, and radius.
 * @param {CanvasRenderingContext2D} ctx - the ctx with which to draw this bubble
 * @param {int} x - x coordinate to draw bubble at
 * @param {int} y - y coordinate to draw bubble at
 * @param {int} radius - radius of the bubble
 */
BBShapes.drawBubble = function(ctx, x, y, radius)
{
	ctx.strokeStyle = "black";

	// Draw circle for bubble.
	BBShapes.drawCircle(ctx, x, y, radius);
	
	// Draw shine spot.
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, radius * 3 / 4, -Math.PI / 2.3, 0, false);
        ctx.closePath();
	
	if (BBShapes.shouldFill) {
		ctx.fill();
	}
	if (BBShapes.shouldStroke) {
		ctx.stroke();
	}
}
