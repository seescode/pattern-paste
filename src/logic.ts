const changeCase = require('change-case');
const fs = require('fs-extra');
const path = require('path');

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

    const files = expandFolders(settings.basePath, settings.files);

    return loadFiles(files).then((files: FileInfo[]) => {

        const patterns = generatePatterns(settings.find, settings.replace);

        files.forEach((file: FileInfo) => {
            generateFile(patterns, file);
        });
    })
    .catch((err: any) => {
        console.error(err)
    });    
}

export function expandFolders(basePath: string, files: string[]): any {
    const fullFilePaths = files.map(f => path.join(basePath, f));

    let newFiles: string[] = [];
    
    fullFilePaths.forEach(file => {

        if (fs.lstatSync(file).isDirectory()) {          
            // pull out the files from the folder
            const filesFromFolder = fs.readdirSync(file);

            // pass this to expandFolders and then return it. 
            newFiles = [...newFiles, ...expandFolders(file, filesFromFolder)];
        } else if (fs.lstatSync(file).isFile()) {
            newFiles.push(file);
        } else {
            throw new Error('Your selected file/folder is not a valid file or folder.');
        }
    });

    return newFiles;
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

export function loadFiles(files: string[]) {
    const promises = files.map(f => fs.readFile(f, 'utf8'));

    return Promise.all(promises).then(function (values) {


        return values.map((n, index) => ({
            path: files[index],
            contents: n
        }));
    });
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