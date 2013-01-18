/**
 * @license
 * RequireJS Handlebars Plugin | v0.0.2
 * Author: Hans Magnus Inderberg | MIT License
 * Inspired by the RequireJS Hogan Plugin
 */

define(['handlebars', 'text'], function(handlebars, text) {

    var DEFAULT_EXTENSION = '.hb';
    var _buildMap = {};

    function registerPartial(filePath, template) {
        var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        if (fileName.charAt(0) === '_') {
            handlebars.registerPartial(filePath.replace(/\//g, '.'), template);
        }
    }

    function load(filePath, req, onLoad, config) {
        var hbConfig = config.hb || {};
        var fileName = filePath;

        if (hbConfig && hbConfig.templateExtension != null) {
            fileName += hbConfig.templateExtension;
        } else {
            fileName += DEFAULT_EXTENSION;
        }

        text.get(req.toUrl(fileName), function(data) {
            if (config.isBuild) {
                _buildMap[filePath] = handlebars.precompile(data);
            }

            var template = handlebars.compile(data);
            registerPartial(filePath, template);

            onLoad(template);
        });
    }

    var _buildTemplate = handlebars.compile(
        [
            'define("{{pluginName}}!{{moduleName}}", ["handlebars"], function(handlebars) {',
            '   var t = handlebars.template({{{fn}}});',
            '   var partialFunction = {{{partialFunction}}};',
            '   partialFunction("{{moduleName}}", t);',
            '   return t;',
            '});\n'
        ].join("\n"));

    function write(pluginName, moduleName, writeModule) {
        if (moduleName in _buildMap) {
            var fn = _buildMap[moduleName];
            writeModule(_buildTemplate({
                pluginName: pluginName,
                moduleName: moduleName,
                partialFunction: registerPartial.toString(),
                fn: fn
            }));
        }
    }

    return {
        load: load,
        write: write
    };
});