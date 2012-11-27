/**@license
 * RequireJS Handlebars Plugin | v0.0.1
 * Author: Hans Magnus Inderberg | MIT License
 * Inspired by the RequireJS Hogan Plugin
 */
define(['handlebars', 'text'], function (handlebars, text) {

    var DEFAULT_EXTENSION = '.hb';
    var _buildMap = {};

    function load(name, req, onLoad, config){
        var hbConfig = config.hb || {};
        var fileName = name;

        if (hbConfig && hbConfig.templateExtension != null) {
            fileName +=  hbConfig.templateExtension;
        } else {
            fileName += DEFAULT_EXTENSION;
        }

        text.get(req.toUrl(fileName), function(data){
            if (config.isBuild) {
                _buildMap[name] = handlebars.precompile(data);
            }

            var template = handlebars.compile(data);

            onLoad( template );
        });
    }

    var _buildTemplate = handlebars.compile(
        ['define("{{pluginName}}!{{moduleName}}", ["handlebars"], function(Handlebars) {',
         '   return Handlebars.template({{{fn}}});',
        '});\n'].join("\n"));

    function write(pluginName, moduleName, writeModule){
        if(moduleName in _buildMap){
            var fn = _buildMap[moduleName];
            writeModule( _buildTemplate({
                pluginName : pluginName,
                moduleName : moduleName,
                fn : fn
            }));
        }
    }

    return {
        load : load,
        write : write
    };
});
