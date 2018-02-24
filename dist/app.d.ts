export declare class App {
    private package;
    constructor();
    main(): void;
    loadFiles(basePath: string, files: string[]): void;
    generatePatterns(find: string, replace: string): {
        find: any;
        replace: any;
    }[];
}
