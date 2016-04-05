// testpilot.js/src/test/javascript/test3.js

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
