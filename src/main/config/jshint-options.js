// Have no mercy (this option let's you specify how many JSHint errors
// are allowed before the build breaks)
var JSHINT_MERCY = 0;

// You'll find the allowed options at http://www.jshint.com/docs/
var JSLINT_OPTIONS = {

    // Environments

    browser     : true,     // assume browser global variables (document, window...)
    jquery      : true,     // assume jQuery global variables
    es5         : true,     // assume EcmaScript 5 compatibility (we use a shim for old browsers)

    // Options

    curly       : true,     // if curly braces around blocks should be required (even in if/for/while)
    debug       : false,    // if debugger statements should be allowed
    eqeqeq      : true,     // if === should be required
    evil        : false,    // if eval should be allowed
    forin       : false,    // if for in statements must filter
    immed       : true,     // if immediate invocations must be wrapped in parens
    noarg       : true,     // if arguments.caller and arguments.callee should be disallowed
    noempty     : true,     // if empty blocks should be disallowed
    onevar      : false,    // if only one var statement per function should be allowed
    undef       : true,     // if variables should be declared before used
    predef      : ['define', 'require', 'requirejs']     // pre defined variables, functions, objects

};
