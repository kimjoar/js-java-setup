({
    // for an explanation of these fields, you should go through
    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

    baseUrl: '../webapp',
    inlineText: true,
    useStrict: false,
    name: '../scripts/almond',
    include: ['main'],
    insertRequire: ['main'],
    out: '../webapp/build/app.js',
    wrap: false,
    mainConfigFile: '../webapp/main.js',
    preserveLicenseComments: true,
    logLevel: 0,
    stubModules: ['text', 'hgn'],
    optimize: 'closure',
    pragmasOnSave: {
        // exclude compiler logic from Hogan.js
        excludeHogan: true
    }
})
