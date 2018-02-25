"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require('change-case');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
function patternPaste(settings) {
    return this.loadFiles(settings.basePath, settings.files).then((files) => {
        const patterns = this.generatePatterns(settings.find, settings.replace);
        files.forEach((file) => {
            generateFile(patterns, file);
        });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.patternPaste = patternPaste;
function generateFile(patterns, file) {
    var newContents = file.contents;
    var newFileName = file.path;
    patterns.forEach((p) => {
        newContents = newContents.replace(new RegExp(p.find, 'g'), p.replace);
        newFileName = newFileName.replace(new RegExp(p.find, 'g'), p.replace);
    });
    fs.writeFileSync(newFileName, newContents, 'utf8');
}
exports.generateFile = generateFile;
function loadFiles(basePath, files) {
    const fullFilePaths = files.map(f => os.homedir() + basePath + f);
    const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));
    return Promise.all(promises).then(function (values) {
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
