// testpilot.js/src/test/javascript/node-suffix.js

$$tp.runUnitTests();
console.log("\n" + $$tp.getReport());
process.exit($$tp.getSummary().getUnitTestSummary().failed == 3 ? 0 : 1);
