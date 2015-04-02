// Contains all color related functions
var BBColor = BBColor || {};

/**
 * Returns the color in a given gradient at a given position.
 * @param {int} r1 - red color of beginning of gradient
 * @param {int} g1 - green color of beginning of gradient
 * @param {int} b1 - blue color of beginning of gradient
 * @param {int} r2 - red color of end of gradient
 * @param {int} g2 - green color of end of gradient
 * @param {int} b2 - blue color of end of gradient
 * @param {double} pos - the current position in the gradient (between 0.0 and 1.0)
 * @returns {String} the color at the given position in the
 * 	format "rgba(r, g, b, a)"
 */
BBColor.gradientAtPos = function(r1, g1, b1, r2, g2, b2, pos)
{
	var curR = (r1 * (1 - pos)) + (r2 * pos);
	var curG = (g1 * (1 - pos)) + (g2 * pos);
	var curB = (b1 * (1 - pos)) + (b2 * pos);
	var color = "rgba(" + parseInt(curR) + ", " + parseInt(curG) + ", " + parseInt(curB) + ", 1.0)";
	return color;
}

/**
 * Returns the color in a given gradient at a given position
 * given two RGBA objects.
 * @param {BBRGBA} RGBA1 - the color at the beginning of the gradient
 * @param {BBRGBA} RGBA2 - the color at the end of the gradient
 * @returns {BBRGBA} the color at the given position
 */
BBColor.gradientAtPosRGBA = function(RGBA1, RGBA2, pos)
{
	var curR = (RGBA1.r * (1 - pos)) + (RGBA2.r * pos);
	var curG = (RGBA1.g * (1 - pos)) + (RGBA2.g * pos);
	var curB = (RGBA1.b * (1 - pos)) + (RGBA2.b * pos);
	var curA = (RGBA1.a * (1 - pos)) + (RGBA2.a * pos);
	return new BBRGBA(parseInt(curR), parseInt(curG), parseInt(curB), curA);
}

/**
 * @class RBBGBA
 * @author Sean Campbell
 * @version 1.0
 * Stores a color by its individual red, green,
 * and blue components.
 * @param {int} r - the red value with default 0
 * @param {int} g - the green value with default 0
 * @param {int} b - the blue value with default 0
 * @param {double} a - the alpha value with default 1
 */
function BBRGBA(r, g, b, a)
{
	this.r = typeof(r) != 'undefined' ? r : 0;
	this.g = typeof(g) != 'undefined' ? g : 0;
	this.b = typeof(b) != 'undefined' ? b : 0;
	this.a = typeof(a) != 'undefined' ? a : 1;

	this.setRGBA = function(r, g, b, a)
	{
		this.r = typeof(r) != 'undefined' ? r : 0;
		this.g = typeof(g) != 'undefined' ? g : 0;
		this.b = typeof(b) != 'undefined' ? b : 0;
		this.a = typeof(a) != 'undefined' ? a : 1;
	}
	
	/**
	 * @returns {String} the color in the format
	 * 	"rgba(r, g, b, a)"
	 */
	this.toFillStyle = function()
	{
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
	}
}
