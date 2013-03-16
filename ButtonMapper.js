
function ButtonMapper() {

    this.commands = [];

    this.buttonsCurrentlyPressed = [];

}


ButtonMapper.prototype.addCommand = function(buttonIds, commandStr) {
    var command = {command: commandStr, combination: []};
    for(var i=0; i<buttonIds.length; i++) {
        command.combination.push([
            buttonIds[i]
        ]);
    }
    command.combination.sort(this.arraySort);
}

/**
 * loop through commands to see if the buttonId is found and if it is a combination
 */
ButtonMapper.prototype.buttonPressed = function(buttonId) {
    var commandStr;
    this.buttonsCurrentlyPressed.push(buttonId);
    this.buttonsCurrentlyPressed.sort(this.arraySort);
    for( var i=0; i<this.commands.length; i++ ) {
        if(this.commands[i].combination.length != this.buttonsCurrentlyPressed.length ) break;

        var matching = true;
        for( var j=0; j<this.commands[i].combination.length; j++ ) {
             if( this.commands[i].combination[j] != this.buttonsCurrentlyPressed[j] ) {
                 matching = false;
                 break;
             }
        }
        if( matching ) {
            return this.commands[i].command;
        }
    }
    return;
}

ButtonMapper.prototype.arraySort = function(a, b) {
    return (a - b);
}


