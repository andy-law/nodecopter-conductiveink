

function ButtonInput (_id) {

    this.id = _id;
    this.isPressed = false;

}

ButtonInput.prototype.onPressed = function() {
    this.isPressed = true;
}

ButtonInput.prototype.onRelease = function() {
    this.isPressed = false;
}

module.exports = ButtonInput;
