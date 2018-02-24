const changeCase = require('change-case')
const fs = require('fs-extra')
const os = require('os')

interface Settings {
    find: string;
    replace: string;
    basePath: string;
    files: string[];
}

interface FileInfo {
    path: string; // The original path of the file
    contents: string; // The contents of the file 
}


export class App {
    private package: Settings;

    constructor() {
        this.package = require('../settings.json');
    }

    public main() {
        this.loadFiles(this.package.basePath, this.package.files).then((files: FileInfo[]) => {
        
            files.forEach((file: FileInfo) => {
                const patterns = this.generatePatterns(this.package.find, this.package.replace);
                var result = file.contents;
                patterns.forEach(p => {
                    result = result.replace(new RegExp(p.find, 'g'), p.replace);
                });
        
                // TODO: write out to a new file instead of just console logging it
                console.log(result);
            });
        });
    }

    public loadFiles(basePath: string, files: string[]) {


        const fullFilePaths = files.map(f => os.homedir() + basePath + f);
        const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));

        return Promise.all(promises).then(function(values) {            
            return values.map((n, index) => ({
                path: fullFilePaths[index], 
                contents: n
            }));
        })
        .catch((err: any) => {
            // TODO: move this catch block to the main function since we want to 
            // catch errors at the top most level
            console.error(err)
        });            
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
