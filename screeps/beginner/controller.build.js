var SourceNode = require('source.node');


//Constructor
var BuildController = function() {}


//The BuildController runs this loop in every game tick.
BuildController.prototype.run = function() {
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];

        if (room.sourceNodes === undefined) {
            this.createSourceNodes(room);
        }
        this.buildSourceNodeContainers(room);
    }
}


//Create a SourceNode object for every source in the room.
BuildController.prototype.createSourceNodes = function(room) {
    room.memory.sourceNodes = [];
    var sources = room.find(FIND_SOURCES);
    for (var node in sources) {
        var sourceNode = new SourceNode(sources[node]);
        var accessiblePoints = sourceNode.findAccessiblePoints();
        sourceNode.setMaxWorkers(accessiblePoints.length);
        room.memory.sourceNodes.push(sourceNode);
    }
}


//Build a container for harvesters to dropoff source at each SourceNode.
BuildController.prototype.buildSourceNodeContainers = function(room) {
        //Create container for harvester dropoff if required
        for (var nodeName in room.memory.sourceNodes) {
            var node = room.memory.sourceNodes[nodeName];
            //Do not attempt to make/set container if already set
            if (node.container != undefined) { continue }
            
            if (node.constructionSite === undefined) {
                var optimalLoc = {reachedBy: 0};
                var reachablePoints = node.findAccessiblePoints();
                reachablePoints.forEach( (point) => {
                    var x = point.x;
                    var y = point.y;
                    var count = 0;
                    for (var pointName in reachablePoints) {
                        var curr = reachablePoints[pointName];
                        if (point.x - curr.x < -1 || point.x - curr.x > 1) {
                            continue;
                        }
                        else if (point.y - curr.y < -1 || point.y - curr.y > 1) {
                            continue;
                        }
                        count++;
                        if (count > optimalLoc.reachedBy) {
                            optimalLoc.reachedBy = count;
                            optimalLoc.x = point.x;
                            optimalLoc.y = point.y;
                        }
                    }
                });
                var containerPos = new RoomPosition(optimalLoc.x, optimalLoc.y, node.source.room.name);
                containerPos.createConstructionSite(STRUCTURE_CONTAINER);
                node.constructionSite = containerPos;
            }

            var found = node.source.room.lookForAt(LOOK_CONSTRUCTION_SITES, node.constructionSite);
            if (found.length == 0) {
                var container = node.source.room.lookForAt(LOOK_STRUCTURES, node.constructionSite);
                if (container.length) {
                    node.container = container[0];
                    delete node.constructionSite;
                }
                else {
                    console.log('Error: Container expected at (' + node.constructionSite.pos.x + ', ' + node.constructionSite.pos.y + ')');
                    delete node.constructionSite;
                }
            }
        }
}


module.exports = BuildController;
