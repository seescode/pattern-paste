"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require('change-case');
const fs = require('fs-extra');
const os = require('os');
function patternPaste(settings) {
    return this.loadFiles(settings.basePath, settings.files).then((files) => {
        files.forEach((file) => {
            const patterns = this.generatePatterns(settings.find, settings.replace);
            var result = file.contents;
            patterns.forEach((p) => {
                result = result.replace(new RegExp(p.find, 'g'), p.replace);
            });
            console.log(result);
        });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.patternPaste = patternPaste;
function loadFiles(basePath, files) {
    const fullFilePaths = files.map(f => os.homedir() + basePath + f);
    const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));
    console.log(1, fullFilePaths, promises);
    return Promise.all(promises).then(function (values) {
        console.log(2);
        return values.map((n, index) => ({
            path: fullFilePaths[index],
            contents: n
        }));
    });
}
exports.loadFiles = loadFiles;
function generatePatterns(find, replace) {
    var methods = [
        'camelCase',
        'constantCase',
        'paramCase',
        'pascalCase',
        'sentenceCase',
        'snakeCase'
    ];
    return methods.map(m => ({
        find: changeCase[m](find),
        replace: changeCase[m](replace)
    }));
}
exports.generatePatterns = generatePatterns;
