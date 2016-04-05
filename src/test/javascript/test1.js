// testpilot.js/src/test/javascript/test1.js

$UnitTest("test1 - internal method - should fail");
function test1() {

	this.test1_unused1 = function() {
		console.log("test1_unused1 - an error occurred if this message is visible");
	}

	$BeforeClass();
	this.test1_runBeforeClass = function() {
	}

	$AfterClass();
	this.test1_runAfterClass = function() {
	}

	this.test1_unused2 = function() {
		console.log("test1_unused2 - an error occurred if this message is visible");
	}

	$Before();
	this.test1_runBefore1 = function() {
	}

	$Before();
	this.test1_runBefore2 = function() {
	}

	$After();
	this.test1_runAfter = function() {
	}

	$Test();
	this.test1_test1 = function() {
		$AssumeTrue(true, "this is a true assumption");
		$AssertEquals(1, 1, "this is a true assertion");
	}

	$Test();
	this.test1_test2 = function() {
		$Message("test1_test2 message");
		$AssertEquals(2, 3, "this is a false assertion");
	}

	$Test();
	this.test1_test3 = function() {
		$AssumeTrue(false, "this is a false condition");
		$AssertEquals(2, 3, "this is a false assertion");
	}

	$Test();
	this.test1_test4 = function() {
		$Message("test1_test4 message");
		throw new Error("this test function resulted in an error");
	}

	$Ignore();
	this.test1_test5 = function() {
		console.log("test1_test4 - an error occurred if this message is visible");
	}

}

$RegisterUnitTest(test1);
