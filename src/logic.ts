const changeCase = require('change-case');
const fs = require('fs-extra');


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
    find: string;
    replace: string;
}

export function patternPaste(settings: Settings) {


    return loadFiles(settings.basePath, settings.files).then((files: FileInfo[]) => {
        const patterns = generatePatterns(settings.find, settings.replace);

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
    var newFileName = file.path;

    patterns.forEach((p: SearchPattern) => {
        newContents = newContents.replace(new RegExp(p.find, 'g'), p.replace);
        newFileName = newFileName.replace(new RegExp(p.find, 'g'), p.replace);
    });

    fs.writeFileSync(newFileName, newContents, 'utf8');
}

export function loadFiles(basePath: string, files: string[]) {
    const fullFilePaths = files.map(f => basePath + f);
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