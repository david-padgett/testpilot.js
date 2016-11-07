// testpilot.js/src/test/javascript/test4.js

$UnitTest("test4 - internal method - no errors");
function test4() {

	$Ignore();
	this.test4_unused1 = function() {
		console.log("should not see this - test4 unused 1");
	};

	$BeforeClass();
	this.test4_runBeforeClass = function() {
	};

	$AfterClass();
	this.test4_runAfterClass = function() {
	};

	this.test4_unused2 = function() {
		console.log("should not see this - test4 unused 2");
	};

	$Before();
	this.test4_runBefore1 = function() {
	};

	$Before();
	this.test4_runBefore2 = function() {
	};

	$After();
	this.test4_runAfter = function() {
	};

	$Test();
	this.test4_test1 = function() {
		$AssertEquals(1, 1);
	};

	$Test();
	this.test4_test2 = function() {
		$Message("test4_test2 message");
		$AssertEquals(3, 3);
	};

}

$RegisterUnitTest(test4);
