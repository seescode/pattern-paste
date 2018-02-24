export declare class App {
    private package;
    constructor();
    main(): void;
    loadFiles(basePath: string, files: string[]): Promise<void | {
        path: string;
        contents: any;
    }[]>;
    generatePatterns(find: string, replace: string): {
        find: any;
        replace: any;
    }[];
}
