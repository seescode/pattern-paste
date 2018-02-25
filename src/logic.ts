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
        const patterns = this.generatePatterns(settings.find, settings.replace);

        files.forEach((file: FileInfo) => {
            generateFile(patterns, file);
        });
    })
    .catch((err: any) => {
        console.error(err)
    });    
}

export function generateFile(patterns: SearchPattern[], file: FileInfo) {
    var newContents = file.contents;

    patterns.forEach((p: SearchPattern) => {
        newContents = newContents.replace(new RegExp(p.find, 'g'), p.replace);
    });

    // TODO: write out to a new file instead of just console logging it
    console.log(newContents);

    var targetPath: string;

    // Take file.path and then remove the file name from it and replace with 
    // the renamed version.


    // fs.writeFileSync(targetPath, newContents, 'utf8');
}

export function loadFiles(basePath: string, files: string[]) {
    const fullFilePaths = files.map(f => os.homedir() + basePath + f);
    const promises = fullFilePaths.map(f => fs.readFile(f, 'utf8'));

    return Promise.all(promises).then(function (values) {
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