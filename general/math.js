// Contains all math related functions
var BBMath = BBMath || {};

/**
 * Returns a random number in a given range.
 * @param {int} min - the smallest the number can be
 * @param {int} max - the largest the number can be
 * @returns {int} a random number in the given range
 */
BBMath.randomNumber = function(min, max)
{
	min = typeof(min) != 'undefined' ? min : 0;
	max = typeof(max) != 'undefined' ? max : 10;

	var range = max - min;

	var randNum = 0;
	var randNum = Math.floor(Math.random() * range) + min;
	return randNum;
}

/**
 * Converts degrees to radians.
 * @param {double} deg - number of degrees
 * @returns {double} the value in radians
 */
BBMath.degToRad = function(deg)
{
	var rad = deg * Math.PI / 180;
	return rad;
}

/**
 * Converts radians to degrees.
 * @param {double} rad - the number of radians
 * @returns {double} the value in degrees
 */
BBMath.radToDeg = function(rad)
{
	var deg = rad * 180 / Math.PI;
	return deg;
}

/**
 * Returns a value in a range at the given position.
 * Note: Works like a gradient.
 * @param {int} min - smallest number
 * @param {int} max - biggest number
 * @param {int} pos - position in range
 * @returns {int} value at the position
 */
BBMath.valueAtPos = function(min, max, pos)
{
	var value = (min * (1 - pos)) + (max * pos);
	return value;
}

/**
 * Calculates the x component of a line given a length
 * of a line and the angle it is drawn at
 * @param {double} value - the length of the line
 * @param {double} angle - the angle the line is at
 * @returns {double} the x component of the line
 */
BBMath.xValue = function(length, angle)
{
	return Math.cos(BBMath.degToRad(angle)) * length;
}

/**
 * Calculates the y component of a line given a length
 * of a line and the angle it is drawn at
 * @param {double} value - the length of the line
 * @param {double} angle - the angle the line is at
 * @returns {double} the y component of the line
 */
BBMath.yValue = function(length, angle)
{
	return Math.sin(BBMath.degToRad(angle)) * length;
}

/**
 * Calculates angle from one point to another, assuming
 * a triangle is drawn with a hypotenuse connecting the
 * two points and two legs that are parallel to the x axis
 * and y axis, respectively.
 * @param {int} x1 - x coordinate of the first point
 * @param {int} y1 - y coordinate of the first point
 * @param {int} x2 - x coordinate of the first point
 * @param {int} y2 - y coordinate of the first point
 * @returns {double} the angle between the two points
 */
BBMath.angleTo = function(x1, y1, x2, y2)
{
	// Calculate the length of the legs
	// of the triangle.
	var dx = x2 - x1;
	var dy = y2 - y1;
	// And the angle.
	var theta = Math.atan(dy / dx);
	return BBMath.radToDeg(theta);
}