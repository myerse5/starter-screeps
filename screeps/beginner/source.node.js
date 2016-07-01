var SourceNode = function(source) {
    this.source = source;
    this.harvesters = [];
}


//returns a 3x3 grid of points around the sourceNode as an array
SourceNode.prototype.findAccessiblePoints = function findAccessiblePoints() {
    //set min and max values for a scan around the source in a 3x3 grid
    var minX = this.source.pos.x - 1;
    var maxX = this.source.pos.x + 1;
    var minY = this.source.pos.y - 1;
    var maxY = this.source.pos.y + 1;
    var accessiblePoints = [];

    //Find all points accessible to creeps in a 3x3 grid around a source
    for (var x = minX; x <= maxX; x++) {
        for (var y = minY; y <= maxY; y++) {
            var point = {x: x, y: y};
            if (this.source.room.lookForAt(LOOK_TERRAIN, point.x, point.y) != 'wall') {
                accessiblePoints.push(point);
            }
        }
    }
    return accessiblePoints;
}


SourceNode.prototype.setMaxWorkers = function setMaxWorkers(maxWorkers) {
    this.maxWorkers = maxWorkers;
}


//assign a local dropoff container to the node
SourceNode.prototype.setDropoff = function setDropoff(container) {
    this.container = container;
}


module.exports = SourceNode;