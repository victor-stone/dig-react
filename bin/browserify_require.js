(function uberRequire(dictionary, moduleCache, registry) {
    function outerRequire(module_name, u) {
        if (!moduleCache[module_name]) {
          console.log('importing:',module_name);
            if (!dictionary[module_name]) {
                var customRequire = typeof require == "function" && require;
                if (!u && customRequire) 
                    return customRequire(module_name, !0);
                if (customRequire2) 
                    return customRequire2(module_name, !0);
                var f = new Error("Cannot find module '" + module_name + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var _module = moduleCache[module_name] = {
                exports: {}
            };
            function innerRequire(modRequest) {
                var fullName = dictionary[module_name][1][modRequest];
                return outerRequire(fullName ? fullName : modRequest);
            }
            dictionary[module_name][0].call( _module.exports, 
                                    innerRequire, 
                                    _module, 
                                    _module.exports, 
                                    uberRequire, 
                                    dictionary, 
                                    moduleCache, 
                                    registry)
        }
        return moduleCache[module_name].exports
    }
    var customRequire2 = typeof require == "function" && require;
    for (var i = 0; i < registry.length; i++) 
        outerRequire(registry[i]);
    return outerRequire;
})
