export interface Settings {
    find: string;
    replace: string;
    basePath: string;
    files: string[];
}
export interface FileInfo {
    path: string;
    contents: string;
}
export interface SearchPattern {
    find: string;
    replace: string;
}
export declare function patternPaste(settings: Settings): any;
export declare function loadFiles(basePath: string, files: string[]): Promise<{
    path: string;
    contents: any;
}[]>;
export declare function generatePatterns(find: string, replace: string): SearchPattern[];
