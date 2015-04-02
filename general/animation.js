/**
 * @class BBMoveCommand
 * @author Sean Campbell
 * @version 1.0
 * Used to keep track of information for moving objects.
 */
function BBMoveCommand()
{
    this.oldX;
    this.oldY;
    this.newX;
    this.newY;
    this.pos = 0;
    this.duration = 1000;
    
    /**
     * Updates the current position.
     */
    this.step = function()
    {
        var numSteps = this.duration / 1000 * BB.fps;
        this.pos += 1.0 / numSteps;
    }
    
    /**
     * Calculates the current x position.
     * @return {int} The current x position.
     */
    this.currentX = function()
    {
        return BBMath.valueAtPos(this.oldX, this.newX, this.pos);
    }

    /**
     * Calculates the current y position.
     * @return {int} The current y position.
     */
    this.currentY = function()
    {
        return BBMath.valueAtPos(this.oldY, this.newY, this.pos);
    }
}
