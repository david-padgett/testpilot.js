// testpilot.js/src/test/javascript/test1.js

$UnitTest("test1 - internal method - should fail");
function test1() {

	$Annotate(this);

	this.test1_unused1 = function() {
		alert("should not see this - test1 unused 1");
	}

	$BeforeClass();
	this.test1_runBeforeClass = function() {
	}

	$AfterClass();
	this.test1_runAfterClass = function() {
	}

	this.test1_unused2 = function() {
		alert("should not see this - test1_unused2");
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
		$AssumeTrue(true, "some true condition");
		$AssertEquals(1, 1, "some true assertion");
	}

	$Test();
	this.test1_test2 = function() {
		$Message("test1_test1 message");
		$AssertEquals(2, 3, "some false assertion");
	}

	$Test();
	this.test1_test3 = function() {
		$AssumeTrue(false, "some false condition");
	}

	$Ignore();
	this.test1_test4 = function() {
		alert("should not see this - test1_test4");
	}

	$BindAnnotations(this);
}

$Annotate(test1);
