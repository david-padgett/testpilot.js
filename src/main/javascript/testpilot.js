/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 David Padgett/Summit Street, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// testpilot.js/src/main/javascript/testpilot.js


function TestPilot(namespace, namespacePrefix, frameworkPrefix) {

	function Operation(unitTestName, unitTestDescription, operationName, category, description) {
		this.unitTestName = unitTestName;
		this.unitTestDescription = unitTestDescription;
		this.operationName = operationName;
		this.category = category;
		this.description = description;
	};

	function Result(frameworkState) {
		this.unitTestName = frameworkState.unitTestName;
		this.unitTestDescription = frameworkState.unitTestDescription;
		this.operationName = frameworkState.operationName;
		this.category = frameworkState.category;
		this.description = frameworkState.description;
		this.assertions = [];
		this.assumptions = [];
		this.messages = [];
		this.passed = true;
	};

	function Summary() {

		var members = [
			testPilotFramework.annotationTypes.UnitTestAnnotation.name,
			testPilotFramework.annotationTypes.BeforeClassAnnotation.name,
			testPilotFramework.annotationTypes.AfterClassAnnotation.name,
			testPilotFramework.annotationTypes.BeforeAnnotation.name,
			testPilotFramework.annotationTypes.AfterAnnotation.name,
			testPilotFramework.annotationTypes.TestAnnotation.name,
			testPilotFramework.annotationTypes.IgnoreAnnotation.name,
			testPilotFramework.assertions.assert.name,
			testPilotFramework.assumptions.assume.name,
			testPilotFramework.message.name
		];

		for (var i = 0; i < members.length; ++i) {
			this[members[i]] = new SummaryValue(0, 0, 0);
		};

		this.getAfterSummary = function() {
			return (this[members[4]]);
		};

		this.getAfterClassSummary = function() {
			return (this[members[2]]);
		};

		this.getAssertionSummary = function() {
			return (this[members[7]]);
		};

		this.getAssumptionSummary = function() {
			return (this[members[8]]);
		};

		this.getBeforeSummary = function() {
			return (this[members[3]]);
		};

		this.getBeforeClassSummary = function() {
			return (this[members[1]]);
		};

		this.getIgnoreSummary = function() {
			return (this[members[6]]);
		};

		this.getMessageSummary = function() {
			return (this[members[9]]);
		};

		this.getTestSummary = function() {
			return (this[members[5]]);
		};

		this.getUnitTestSummary = function() {
			return (this[members[0]]);
		};

	};

	function SummaryValue(total, passed, failed) {

		this.total = total;
		this.passed = passed;
		this.failed = failed;

		this.update = function(successful) {
			this.total++;
			this.passed += successful == true ? 1 : 0;
			this.failed += successful == false ? 1 : 0;
		};

	};

	var testPilotFramework = this;

	this.namespace = null;
	this.namespacePrefix = this.constructor.name;
	this.frameworkPrefix = this.constructor.name;
	this.annotations = null;
	this.aliasedFunctions = [];
	this.unitTests = [];
	this.unitTest = null;
	this.summary = null;

	this.annotationTypes = {

		// $MethodAnnotation();
		AfterAnnotation: function After(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		AfterClassAnnotation: function AfterClass(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		BeforeAnnotation: function Before(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		BeforeClassAnnotation: function BeforeClass(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		IgnoreAnnotation: function Ignore(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		TestAnnotation: function Test(description) {
			this.description = description;
		},

		// $TypeAnnotation(); $ObjectAnnotation();
		UnitTestAnnotation: function UnitTest(description) {
			this.description = description;
		},

		// $MethodAnnotation();
		PositiveAnnotation: function Positive() {
		},

		// $MethodAnnotation();
		NegativeAnnotation: function Negative() {
		}

	};

	this.assertions = {

		assert: function Assert(assertion, description) {
			testPilotFramework.getCurrentResult().assertions.push(assertion);
			testPilotFramework.updateSummary(this.assert.name, assertion.result);
			assertion.type = assertion.constructor.name;
			assertion.description = description;
			assertion.isFatalError = function() {
				return (true);
			};
			if (assertion.result == false) {
				var error = new Error(assertion.type + ": " + (assertion.description != null ? assertion.description : ""));
				error.cause = assertion;
				error.frameworkError = true;
				throw error;
			}
			return (assertion);
		},

		assertArrayEquals: function AssertArrayEquals(expr1, expr2, description) {
			var fn = function AssertArrayEquals(value1, value2) {
				this.result = expr1.constructor == Array && expr2.constructor == Array && expr1.length == expr2.length;
				for (var i = 0; this.result && i < expr1.length; ++i) {
					this.result = expr1[i] == expr2[i];
				}
			};
			return (this.assert(new fn(expr1, expr2), description));
		},

		assertEquals: function AssertEquals(expr1, expr2, description) {
			var fn = function AssertEquals(value1, value2) {
				this.result = value1 == value2;
			};
			return (this.assert(new fn(expr1, expr2), description));
		},

		assertFalse: function AssertFalse(expr, description) {
			var fn = function AssertFalse(value) {
				this.result = value == false;
			};
			return (this.assert(new fn(expr), description));
		},

		assertNotEquals: function AssertNotEquals(expr1, expr2, description) {
			var fn = function AssertNotEquals(value1, value2) {
				this.result = value1 != value2;
			};
			return (this.assert(new fn(expr1, expr2), description));
		},

		assertNotNull: function AssertNotNull(expr, description) {
			var fn = function AssertNotNull(value) {
				this.result = value != null;
			};
			return (this.assert(new fn(expr), description));
		},

		assertNotSame: function AssertNotSame(expr1, expr2, description) {
			var fn = function AssertNotSame(value1, value2) {
				this.result = value1 !== value2;
			};
			return (this.assert(new fn(expr1, expr2), description));
		},

		assertNull: function AssertNull(expr, description) {
			var fn = function AssertNull(value) {
				this.result = value == null;
			};
			return (this.assert(new fn(expr), description));
		},

		assertSame: function AssertSame(expr1, expr2, description) {
			var fn = function AssertSame(value1, value2) {
				this.result = value1 === value2;
			};
			return (this.assert(new fn(expr1, expr2), description));
		},

		assertTrue: function AssertTrue(expr, description) {
			var fn = function AssertTrue(value) {
				this.result = expr == true;
			};
			return (this.assert(new fn(expr), description));
		},

		error: function Error(expr, description) {
			var fn = function Error(expr) {
				try {
					expr();
					this.result = false;
				}
				catch (e) {
					this.result = true;
				}
			};
			return (this.assert(new fn(expr), description));
		},

		fail: function Fail(description) {
			var fn = function Fail() {
				this.result = false;
			};
			return (this.assert(new fn(), description));
		},

		valid: function Valid(expr, description) {
			var fn = function Error(expr) {
				try {
					expr();
					this.result = true;
				}
				catch (e) {
					this.result = false;
				}
			};
			return (this.assert(new fn(expr), description));
		}

	};

	this.assumptions = {

		assume: function Assume(assumption, description) {
			testPilotFramework.getCurrentResult().assumptions.push(assumption);
			testPilotFramework.updateSummary(this.assume.name, assumption.result);
			assumption.type = assumption.constructor.name;
			assumption.description = description;
			assumption.isFatalError = function() {
				return (false);
			}
			if (assumption.result == false) {
				var error = new Error(assumption.type + ": " + (assumption.description != null ? assumption.description : ""));
				error.cause = assumption;
				error.frameworkError = true;
				throw error;
			}
			return (assumption);
		},

		assumeFalse: function AssumeFalse(expr, description) {
			var fn = function AssumeFalse(value) {
				this.result = expr === false;
			};
			return (this.assume(new fn(expr), description));
		},

		assumeTrue: function AssumeTrue(expr, description) {
			var fn = function AssumeTrue(value) {
				this.result = expr === true;
			};
			return (this.assume(new fn(expr), description));
		}

	};

	// Adds a new Result ot the specified unit test.

	this.addResult = function(unitTest, operation) {

		// Create a new result descriptor, then add it to the results
		// descriptor attached to the current test object.

		var result = new Result(this.getFrameworkState(operation));
		this.getFrameworkState(unitTest).results.push(result);
		return (result);
	};

	this.addToNamespace = function(name, value) {
		this.namespace[name] = value;
	};

	// Retrieves the current Result object.

	this.getCurrentResult = function() {
		var results = this.getFrameworkState(this.unitTest).results;
		return (results[results.length - 1]);
	};

	// Retrieve the state attached to the specified construct or null if no
	// construct was provided.

	this.getFrameworkState = function(object) {
		return (object == null ? null : object[this.frameworkPrefix]);
	};

	// Retrieves the set of operations defined in the specified unit test that
	// match the specified criteria.

	this.getOperations = function(category, unitTest) {

		// Create a set of all operations defined in the test class that
		// that matches the specified category.

		var result = [];
		for (var name in unitTest) {
			var operation = unitTest[name];
			var state = this.getFrameworkState(operation);
			if (operation != null && operation.constructor == Function && state != null && state.category == category) {
				result.push(operation);
			}
		}
		return (result);
	};

	this.getReport = function() {
		var blankStr = new Array(51).join(' ');

		var leftJustify = function(str, width) {
			return ((str + blankStr).substr(0, width));
		}

		var rightJustify = function(str, width) {
			str = blankStr + str;
			return (str.substr(str.length - width));
		}

		var format = function(status, category, className, operationName, description) {
			var status = leftJustify(status, 10);
			var category = leftJustify(category, 15);
			var className = leftJustify(className, 20);
			var operationName = leftJustify(operationName, 35);
			return (status + " " + category + " " + className + " " + operationName + " " + description + "\n");
		}

		var report = "TestPilot Summary\n\n";
		var title = leftJustify("Category", 15);
		var total = leftJustify("Total", 10);
		var passed = leftJustify("Passed", 10);
		var failed = leftJustify("Failed", 10);
		report += title + " " + total + " " + passed + " " + failed + "\n";
		var summary = this.getSummary();
		for (var i in summary) {
			if (summary[i].constructor == SummaryValue) {
				var title = leftJustify(i, 15);
				var total = rightJustify(summary[i].total, 5);
				var passed = rightJustify(summary[i].passed, 11);
				var failed = rightJustify(summary[i].failed, 10);
				report += title + " " + total + " " + passed + " " + failed + "\n";
			}
		}

		report += "\nTestPilot Details\n\n";
		report += format("Status", "Category", "Class", "Operation", "Description");
		var successful = true;
		var unitTestName = null;
		var results = this.getResults();
		var unitTestReport = "";
		for (var i = 0; i < results.length; ++i) {
			var result = results[i];
			successful &= result.passed;

			if (unitTestName != null && unitTestName != result.unitTestName) {
				unitTestName = result.unitTestName;
				report += format(successful ? "Success" : "Failed", "Unit Test", results[i - 1].unitTestName, " ", results[i - 1].unitTestDescription) + unitTestReport;
				unitTestReport = "";
				successful = true;
			}
			unitTestName = result.unitTestName;
			unitTestReport += format(result.passed ? "Success" : "Failed", result.category, result.unitTestName, result.operationName, result.description != null ? result.description : "");
			for (var j = 0; j < result.messages.length; ++j) {
				unitTestReport += format("", "Message", result.unitTestName, result.operationName, result.messages[j]);
			}
			for (var j = 0; j < result.assumptions.length; ++j) {
				var assumption = result.assumptions[j];
				unitTestReport += format(assumption.result ? "True" : "False", "Assumption", result.unitTestName, result.operationName, "[" + assumption.type + "] " + assumption.description);
			}
			for (var j = 0; j < result.assertions.length; ++j) {
				var assertion = result.assertions[j];
				unitTestReport += format(assertion.result ? "True" : "False", "Assertion", result.unitTestName, result.operationName, "[" + assertion.type + "] " + assertion.description);
			}
			if (result.error != null && !result.error.frameworkError) {
				unitTestReport += format("Error", "Error", result.unitTestName, result.operationName, result.error.cause == null ? "" : result.error.cause.type + ": " + result.error.cause.description);
			}
		}
		var i = results.length;
		report += format(successful ? "Success" : "Failed", "Unit Test", results[i - 1].unitTestName, "", results[i - 1].unitTestDescription) + unitTestReport;
		return (report);
	};

	// Retrieves detailed unit test results for all unit tests or for only those
	// unit tests specified in the argument list.

	this.getResults = function() {
		var results = [];
		for (var i = 0; i < this.unitTests.length; ++i) {

			// If specific test classes have been requested, filter the result
			// based on the list of types present in the paramater list.

			var unitTest = this.unitTests[i];
			if (arguments.length == 0) {
				results = results.concat(this.getFrameworkState(unitTest).results);
			}
			else {
				var unitTestTypes = arguments[0].constructor == Array ? arguments[0] : arguments;
				for (var j = 0; j < unitTestTypes.length; ++j) {
					if (unitTestTypes[j] == unitTest.constructor || unitTestTypes[j] == unitTest) {
						results = results.concat(this.getFrameworkState(unitTest).results);
						break;
					}
				}
			}
		}
		return (results);
	};

	// Retrieves a summary of unit test results.

	this.getSummary = function() {
		if (this.summary == null) {
			this.summary = new Summary(this.summarySections);
		}
		return (this.summary);
	};

	// Initialize the TestPilot framework.

	this.initialize = function(namespace, namespacePrefix, frameworkPrefix) {

		if (namespace == null) {
			throw new Error("Unable to initialize " + this.constructor.name + ": No namespace provided when framework was instantiated.");
		}

		this.namespace = namespace;
		this.namespacePrefix = namespacePrefix == null ? this.namespacePrefix : namespacePrefix;
		this.frameworkPrefix = frameworkPrefix == null ? this.frameworkPrefix : frameworkPrefix;
		this.annotations = new Annotations(this.namespace, this.namespacePrefix);
		this.unitTests = [];
		this.unitTest = null;
		this.summary = null;
		this.initializeAliasedFunctions([this, this.assertions, this.assumptions], true);
		this.annotations.annotate(this.annotationTypes.AfterAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.AfterClassAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.BeforeAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.BeforeClassAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.IgnoreAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.TestAnnotation, this.annotations.addAnnotation("MethodAnnotation"));
		this.annotations.annotate(this.annotationTypes.UnitTestAnnotation, this.annotations.addAnnotation("TypeAnnotation"));
	};

	this.initializeAliasedFunctions = function(containers, addFunctions) {
		for (var i = 0; i < containers.length; ++i) {
			var container = containers[i];
			for (var j in container) {
				if (container[j] != null && container[j].constructor == Function && container[j].name != "") {
					var api = container[j];
					var namespaceName = this.namespacePrefix + container[j].name;
					if (addFunctions) {
						this.addToNamespace(namespaceName, this.initializeDispatcher(container, api));
					}
					else {
						this.removeFromNamespace(namespaceName);
					}
				}
			}
		}
	};

	// Initializes the specified construct.

	this.initializeConstruct = function(object) {
		if (object != null && object[this.frameworkPrefix] == null) {
			object[this.frameworkPrefix] = {
				results: []
			};
		}
	};

	this.initializeDispatcher = function(container, api) {
		var dispatcher = function __AnnotationApiDispatcher() {
			var args = Array.prototype.slice.call(arguments, 0);
			return (api.apply(container, args));
		};
		return (dispatcher);
	};

	this.registerUnitTest = function RegisterUnitTest(unitTest) {
		this.annotations.annotate(unitTest);
	};

	// Initialize all defined unit tests.

	this.initializeUnitTests = function() {
		var unitTestTypes = this.annotations.getAnnotatedConstructs(this.annotationTypes.UnitTestAnnotation);
		for (var i = 0; i < unitTestTypes.length; ++i) {

			// Initialize the test class, then create a new instance of it.

			var unitTestType = unitTestTypes[i];
			var unitTestDescription = this.annotations.getAnnotations(unitTestType)[0].description;
			this.initializeConstruct(unitTestType);
			var unitTest = unitTestType.constructor == Function ? this.annotations.createAnnotatedInstance(unitTestType) : unitTestType;
			this.unitTests.push(unitTest);

			// Locate the next operation without an operation descriptor, then
			// attach the current operation descriptor to the operation.

			var unitTestName = unitTestType.constructor == Function ? unitTestType.name : unitTest.constructor.name;
			for (var operationName in unitTest) {
				var operation = unitTest[operationName];
				if (operation != null && operation.constructor == Function) {
					var annotations = this.annotations.getAnnotations(operation);
					if (annotations != null && annotations.length > 0) {
						operation[this.frameworkPrefix] = new Operation(unitTestName, unitTestDescription, operationName, annotations[0].constructor.name, annotations[0].description);
					}
				}
			}
		}

		return (unitTestTypes);
	};

	// Invokes the specified operation within the specified unit test.

	this.invokeOperation = function(unitTest, operation) {

		// Create a new result, add it to the set of Result objects associated
		// with the operation, then invoke the operation.

		var result = this.addResult(unitTest, operation);
		try {
			operation.apply(unitTest, []);
		}
		catch (e) {

			// Store exceptions in the result.

			result.error = e;
			result.passed = e.cause != null ? !e.cause.isFatalError() : false;
			if (e.cause == null) {
				e.frameworkError = false;
				e.cause = {
					type: e.message,
					description: e.stack
				}
			}
		}
		finally {
			this.updateSummary(this.getFrameworkState(operation).category, result.passed);
		}
		return (result == null ? false : result.passed);
	};

	// Invoke all operations in the unit test that match the specified category.

	this.invokeOperations = function(category, unitTest) {
		var passed = true;
		var operations = this.getOperations(category, unitTest);
		for (var i = 0; i < operations.length; ++i) {
			passed &= this.invokeOperation(unitTest, operations[i]);
		}
		return (passed);
	};

	// Adds a message to the current test result.

	this.message = function Message(value) {
		this.getCurrentResult().messages.push(value);
		this.updateSummary(this.message.name, true);
	};

	this.removeFromNamespace = function(name) {
		delete this.namespace[name];
	};

	// Remove function aliases and annotations from the global namespace and
	// remove framework state from all managed object.

	this.removeTestPilotFramework = function() {

		// Delete all function aliases from the global namespace.

		this.initializeAliasedFunctions([this, this.assertions, this.assumptions], false);

		// Delete all defined annotations and remove convenience functions from
		// the global namespace.

		this.annotations.removeAnnotationsFramework();
	};

	// Run all registered unit tests.

	this.runUnitTests = function() {
		this.getSummary();
		this.initializeUnitTests();

		// For each unit test, execute all registered test functions.

		for (var i = 0; i < this.unitTests.length; ++i) {
			var unitTest = this.unitTests[i];
			this.initializeConstruct(unitTest);
			this.unitTest = unitTest;

			// Invoke the before class, before, test, after, and after class
			// operations defined in the test class.

			var passed = this.invokeOperations(this.annotationTypes.BeforeClassAnnotation.name, unitTest);
			var operations = this.getOperations(this.annotationTypes.TestAnnotation.name, unitTest);
			for (var j = 0; j < operations.length; ++j) {
				passed &= this.invokeOperations(this.annotationTypes.BeforeAnnotation.name, unitTest);
				passed &= this.invokeOperation(unitTest, operations[j]);
				passed &= this.invokeOperations(this.annotationTypes.AfterAnnotation.name, unitTest);
			}
			passed &= this.invokeOperations(this.annotationTypes.AfterClassAnnotation.name, unitTest);
			this.updateSummary(this.annotationTypes.UnitTestAnnotation.name, passed);
			this.summary[this.annotationTypes.IgnoreAnnotation.name].total += this.getOperations(this.annotationTypes.IgnoreAnnotation.name, unitTest).length;
		}
		this.unitTest = null;
	};

	// Updates the specified summary category, specifically the total, passed,
	// and failed information stored in the summary value.

	this.updateSummary = function(category, result) {
		this.summary[category].update(result);
	}

	this.initialize(namespace, namespacePrefix, frameworkPrefix);
}
