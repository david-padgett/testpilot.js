
var __TestPilot = require("./testpilot-node.js");
__TestPilot.setNamespace(module);

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

$UnitTest("test 2 - prototype - should fail");
function test2() {
}

$Annotate(test2);

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

$Test("test #3.1");
test2.prototype.test2_test1 = function() {
	$AssertEquals(1, 1);
}

$Test("test #3.2");
test2.prototype.test2_test2 = function() {
	$Message("test2_test2 message");
	$AssertEquals(2, 3);
}

$BindAnnotations(test2.prototype);

var test3 = {

	test3_unused1: function() {
		alert("should not see this - unused 1");
	},

	test3_runBeforeClass: function() {
	},

	test3_runAfterClass: function() {
	},

	test3_unused2: function() {
		alert("should not see this - unused 2");
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
	},

}

$Annotate(test3, $UnitTest("test 3 - object literal - should fail"));
$Annotate(test3.test3_runBeforeClass, $BeforeClass());
$Annotate(test3.test3_runAfterClass, $AfterClass());
$Annotate(test3.test3_runBefore1, $Before());
$Annotate(test3.test3_runBefore2, $Before());
$Annotate(test3.test3_runAfter, $After());
$Annotate(test3.test3_test1, $Test());
$Annotate(test3.test3_test2, $Test());

$UnitTest("test4 - internal method - no errors");
function test4() {

	$Annotate(this);

	$Ignore();
	this.test4_unused1 = function() {
		alert("should not see this - test4 unused 1");
	}

	$BeforeClass();
	this.test4_runBeforeClass = function() {
	}

	$AfterClass();
	this.test4_runAfterClass = function() {
	}

	this.test4_unused2 = function() {
		alert("should not see this - test4 unused 2");
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

	$BindAnnotations(this);
}

$Annotate(test4);

__TestPilot.runUnitTests();
console.log("\n" + __TestPilot.getReport());
process.exit(0);
