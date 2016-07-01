var CreepController = function() {}

CreepController.prototype.run = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        
        if (creep.memory.role == undefined) {
            for (var roomName in Game.rooms) {
                var room = Game.rooms[roomName];
                room.memory.sourceNodes.forEach( (node) => {
                    //if (node.harvesters)
                });
            }
        }
    }
}

module.exports = CreepController;