var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var spawner = require('spawner');
//adding a comment here.
//is this

var HARVESTER_MAX = 2;
var BUILDER_MAX = 0;
var UPGRADER_MAX = 0;

module.exports.loop = function () {

    spawner.run(HARVESTER_MAX, BUILDER_MAX, UPGRADER_MAX);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            var birth = roleHarvester.run(creep);
        }
        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}