
var $$tp = new (require("./testpilot-node.js"))(global, "$");

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

$UnitTest("test2 - prototype - should fail");
function test2() {
}

$RegisterUnitTest(test2);

$BeforeClass("initial class");
test2.prototype.test2_runBeforeClass = function() {
}

$AfterClass("tear down class");
test2.prototype.test2_runAfterClass = function() {
}

$Before("initialize test 1");
test2.prototype.test2_runBefore1 = function() {
}

$Before("initialize test 2");
test2.prototype.test2_runBefore2 = function() {
}

$After("clean up test");
test2.prototype.test2_runAfter = function() {
}

$Test("test #2.1");
test2.prototype.test2_test1 = function() {
	$AssertEquals(1, 1);
}

$Test("test #2.2");
test2.prototype.test2_test2 = function() {
	$Message("test2_test2 message");
	$AssertEquals(2, 3);
}

var test3 = {

	test3_unused1: function() {
		console.log("should not see this - unused 1");
	},

	test3_runBeforeClass: function() {
	},

	test3_runAfterClass: function() {
	},

	test3_unused2: function() {
		console.log("should not see this - unused 2");
	},

	test3_runBefore1: function() {
	},

	test3_runBefore2: function() {
	},

	test3_runAfter: function() {
	},

	test3_test1: function() {
		$AssertEquals(1, 1);
	},

	test3_test2: function() {
		$Message("object_literal_test_test2 message");
		$AssertEquals(2, 3);
	}

}

$Annotate(test3, $UnitTest("test3 - object literal - should fail"));
$Annotate(test3.test3_runBeforeClass, $BeforeClass());
$Annotate(test3.test3_runAfterClass, $AfterClass());
$Annotate(test3.test3_runBefore1, $Before());
$Annotate(test3.test3_runBefore2, $Before());
$Annotate(test3.test3_runAfter, $After());
$Annotate(test3.test3_test1, $Test());
$Annotate(test3.test3_test2, $Test());

$UnitTest("test4 - internal method - no errors");
function test4() {

	$Ignore();
	this.test4_unused1 = function() {
		console.log("should not see this - test4 unused 1");
	}

	$BeforeClass();
	this.test4_runBeforeClass = function() {
	}

	$AfterClass();
	this.test4_runAfterClass = function() {
	}

	this.test4_unused2 = function() {
		console.log("should not see this - test4 unused 2");
	}

	$Before();
	this.test4_runBefore1 = function() {
	}

	$Before();
	this.test4_runBefore2 = function() {
	}

	$After();
	this.test4_runAfter = function() {
	}

	$Test();
	this.test4_test1 = function() {
		$AssertEquals(1, 1);
	}

	$Test();
	this.test4_test2 = function() {
		$Message("test4_test2 message");
		$AssertEquals(3, 3);
	}
}

$RegisterUnitTest(test4);

$$tp.runUnitTests();
console.log("\n" + $$tp.getReport());
process.exit($$tp.getSummary().getUnitTestSummary().failed == 3 ? 0 : 1);
