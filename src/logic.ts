const changeCase = require('change-case')
const fs = require('fs-extra')
const os = require('os')

export interface Settings {
    find: string;
    replace: string;
    basePath: string;
    files: string[];
}

export interface FileInfo {
    path: string; // The original path of the file
    contents: string; // The contents of the file 
}

export interface SearchPattern {
    find: string,
    replace: string
}

export function patternPaste(settings: Settings) {
    return this.loadFiles(settings.basePath, settings.files).then((files: FileInfo[]) => {

        files.forEach((file: FileInfo) => {
            const patterns = this.generatePatterns(settings.find, settings.replace);
            var result = file.contents;

            patterns.forEach((p: SearchPattern) => {
                result = result.replace(new RegExp(p.find, 'g'), p.replace);
            });

            // TODO: write out to a new file instead of just console logging it
            console.log(result);
        });
    })
    .catch((err: any) => {
        console.error(err)
    });    
}

export function loadFiles(basePath: string, files: string[]) {
    const fullFilePaths = files.map(f => os.homedir() + basePath + f);
    const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));

    console.log(1, fullFilePaths, promises);

    return Promise.all(promises).then(function (values) {

        console.log(2);
        return values.map((n, index) => ({
            path: fullFilePaths[index],
            contents: n
        }));
    })
}

export function generatePatterns(find: string, replace: string): SearchPattern[] {
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