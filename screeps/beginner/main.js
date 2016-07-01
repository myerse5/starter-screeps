var BuildController = require('controller.build');
var CreepController = require('controller.creep');


module.exports.loop = function () {
    Memory.BuildController = new BuildController();
    Memory.CreepController = new CreepController();
    Memory.BuildController.run();
    Memory.CreepController.run();
}