// testpilot.js/src/test/javascript/test2.js

$UnitTest("test2 - prototype - should fail");
function test2() {
}

$RegisterUnitTest(test2);

$BeforeClass("initial class");
test2.prototype.test2_runBeforeClass = function() {
};

$AfterClass("tear down class");
test2.prototype.test2_runAfterClass = function() {
};

$Before("initialize test 1");
test2.prototype.test2_runBefore1 = function() {
};

$Before("initialize test 2");
test2.prototype.test2_runBefore2 = function() {
};

$After("clean up test");
test2.prototype.test2_runAfter = function() {
};

$Test("test #2.1");
test2.prototype.test2_test1 = function() {
	$AssertEquals(1, 1);
};

$Test("test #2.2");
test2.prototype.test2_test2 = function() {
	$Message("test2_test2 message");
	$AssertEquals(2, 3);
};
