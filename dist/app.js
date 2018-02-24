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
        this.loadFiles(this.package.basePath, this.package.files);
        const patterns = this.generatePatterns(this.package.find, this.package.replace);
        var result = str;
        patterns.forEach(p => {
            result = result.replace(new RegExp(p.find, 'g'), p.replace);
        });
        console.log(result);
    }
    loadFiles(basePath, files) {
        files.forEach(f => {
            fs.readFile(os.homedir() + basePath + f, 'utf8')
                .then((data) => {
                console.log(data);
            })
                .catch((err) => {
                console.error(err);
            });
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
