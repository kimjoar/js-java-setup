load("jshint.js");
load("../config/jshint-options.js");

(function rhinoJSHint(args) {

    function getErrors(file) {

        var input = readFile(file);
        if (!input) {
            print('jshint: Couldn\'t open file ' + file);
            return 1;
        }

        if (!JSHINT(input, JSLINT_OPTIONS)) {
            var shortName = (file.length <= 40) ? file : '...' + file.substring(file.length - 40);
            print('\nErrors in ' + shortName + '\n');
            JSHINT.errors.forEach(function (err) {
                print('    ' + err.reason + ' (line: ' + err.line + ', character: ' + err.character + ')');
                print('    > ' + (err.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") + '\n');
            });
            return JSHINT.errors.length;
        }

        return 0;
    }

    var totalErrors = 0;
    var files = Array.prototype.slice.call(args);
    var errors = files.forEach(function (file) {
        totalErrors += getErrors(file);
    });

    print('JsHint completed with ' + totalErrors + ' errors (mercy is ' + JSHINT_MERCY + ')');
    quit (totalErrors <= JSHINT_MERCY ? 0 : 1);

}(arguments));