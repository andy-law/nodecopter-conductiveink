
function ButtonMapper() {

    this.commands = [];

    this.buttonsCurrentlyPressed = [];

    this.currentCommand;

}


ButtonMapper.prototype.addCommand = function(data) {

    var command = {startCommand: data.startCommand, endCommand: data.endCommand, combination: []};
    for(var i=0; i<buttonIds.length; i++) {
        command.combination.push([
            data.pins[i]
        ]);
    }
    command.combination.sort(this.arraySort);
}

/**
 * loop through commands to see if the buttonId is found and if it is a combination
 */
ButtonMapper.prototype.buttonPressed = function(buttonId) {
    var returnCommands = [];
    if( this.currentCommand != undefined ) {
        if( this.currentCommand.endCommand != null ) {
            returnCommands.push(this.currentCommand.endCommand);
        }
    }
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
            this.currentCommand = this.commands[i];
            returnCommands.push(this.commands[i].startCommand)
            return returnCommands;
        }
    }
    return;
}

ButtonMapper.prototype.buttonReleased = function(buttonId) {
    var returnCommands = [];
    if( this.currentCommand != undefined ) {
        if( this.currentCommand.endCommand != null ) {
            returnCommands.push(this.currentCommand.endCommand);
        }
    }
    var i = 0;
    for( i = 0; i<this.buttonsCurrentlyPressed.length; i++ ) {
        if( this.buttonsCurrentlyPressed[i] == buttonId ) {
            this.buttonsCurrentlyPressed.splice(i, 1);
        }
    }
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
            returnCommands.push(this.commands[i].startCommand);
            return returnCommands;
        }
    }
    return;
}

ButtonMapper.prototype.arraySort = function(a, b) {
    return (a - b);
}


