var changeCase = require('change-case')

interface Settings {
    find: string;
    replace: string;
    basePath: string;
    files: string[];
}


export class App {
    private package: Settings;

    constructor() {
        this.package = require('../settings.json');
    }

    public main() {

        var str = 'Life is a chicken-meat ChickenMeat chickenMeat';

        const patterns = this.generatePatterns(this.package.find, this.package.replace);

        var result = str;
        patterns.forEach(p => {
            result = result.replace(new RegExp(p.find, 'g'), p.replace);
        });

        console.log(result);
    }

    public generatePatterns(find: string, replace: string) {
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

let app = new App();
app.main();
