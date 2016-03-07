// testpilot.js/src/main/javascript/testpilot-node-suffix.js

__TestPilot.addToNamespace = function(name, value) {
	eval(name + " = value");
}

__TestPilot.removeFromNamespace = function(name) {
}

module.exports = __TestPilot;
