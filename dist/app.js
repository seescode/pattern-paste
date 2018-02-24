"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var changeCase = require('change-case');
class App {
    constructor() {
        this.package = require('../settings.json');
    }
    main() {
        var str = 'Life is a chicken-meat ChickenMeat chickenMeat';
        const patterns = this.generatePatterns(this.package.find, this.package.replace);
        var result = str;
        patterns.forEach(p => {
            result = result.replace(new RegExp(p.find, 'g'), p.replace);
        });
        console.log(result);
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
