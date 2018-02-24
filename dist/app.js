"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require('change-case');
const fs = require('fs-extra');
const os = require('os');
class App {
    constructor() {
        this.package = require('../settings.json');
    }
    main() {
        var str = 'Life is a chicken-meat ChickenMeat chickenMeat';
        this.loadFiles(this.package.basePath, this.package.files).then((files) => {
            files.forEach((file) => {
                const patterns = this.generatePatterns(this.package.find, this.package.replace);
                var result = file.contents;
                patterns.forEach(p => {
                    result = result.replace(new RegExp(p.find, 'g'), p.replace);
                });
                console.log(result);
            });
        });
    }
    loadFiles(basePath, files) {
        const fullFilePaths = files.map(f => os.homedir() + basePath + f);
        const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));
        return Promise.all(promises).then(function (values) {
            return values.map(n => ({
                path: '',
                contents: n
            }));
        })
            .catch((err) => {
            console.error(err);
        });
    }
    generatePatterns(find, replace) {
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
}
exports.App = App;
let app = new App();
app.main();
