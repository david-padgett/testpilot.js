#
# The MIT License (MIT)
#
# Copyright (c) 2015 David Padgett/Summit Street, Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# testpilot.js/testpilot.mak

MAKEFILE_DIR=node_modules/etc.mak/dist

include $(MAKEFILE_DIR)/javascript_vars.mak

BUILD_DEPENDENCIES=\
	github.com/david-padgett/annotations.js.git

BUILD_TARGETS=\
	testpilot.js \
	testpilot-node.js

TEST_TARGETS=\
	testpilot-node-tests.js

testpilot.js : \
	$(SOURCE_DIR)/main/javascript/testpilot.js

testpilot-node.js : \
	$(SOURCE_DIR)/main/javascript/testpilot-node-prefix.js \
	$(SOURCE_DIR)/main/javascript/testpilot.js \
	$(SOURCE_DIR)/main/javascript/testpilot-node-suffix.js

testpilot-node-tests.js : \
	$(SOURCE_DIR)/test/javascript/node-prefix.js \
	$(SOURCE_DIR)/test/javascript/test1.js \
	$(SOURCE_DIR)/test/javascript/test2.js \
	$(SOURCE_DIR)/test/javascript/test3.js \
	$(SOURCE_DIR)/test/javascript/test4.js \
	$(SOURCE_DIR)/test/javascript/node-suffix.js

#	$(SOURCE_DIR)/test/javascript/test5.js \
#	$(SOURCE_DIR)/test/javascript/test6.js \

include $(MAKEFILE_DIR)/javascript_rules.mak
