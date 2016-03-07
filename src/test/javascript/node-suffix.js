// testpilot.js/src/test/javascript/node-suffix.js

__TestPilot.runUnitTests();
console.log(JSON.stringify(__TestPilot.getResults(), null, "  "));
console.log(JSON.stringify(__TestPilot.getSummary(), null, "  "));
process.exit(0);