({
    baseUrl: '../webapp',
    inlineText: true,
    useStrict: false,
    name: '../scripts/almond',
    include: ['main'],
    insertRequire: ['main'],
    out: "../webapp/build/app.js",
    wrap: false, // not needed when it's not a lib
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
