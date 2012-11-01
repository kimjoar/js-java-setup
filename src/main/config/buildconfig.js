({
    // for an explanation of these fields, you should go through
    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

    baseUrl: '${basedir}/src/main/webapp',
    inlineText: true,
    useStrict: false,
    name: '../scripts/almond',
    include: ['main'],
    insertRequire: ['main'],
    out: '${project.build.directory}/${project.build.finalName}/build/app.js',
    wrap: false,
    mainConfigFile: '${basedir}/src/main/webapp/main.js',
    preserveLicenseComments: true,
    logLevel: 0,
    stubModules: ['text', 'hgn'],
    optimize: 'closure',
    pragmasOnSave: {
        // exclude compiler logic from Hogan.js
        excludeHogan: true
    }
})
