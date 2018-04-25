'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { patternPaste, Settings } from './logic';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hello-world" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        
        // Display a message box to the user
        vscode.window.showInformationMessage('Selected characters: ' + text.length);

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);

    let moveDisposable = vscode.commands.registerCommand('extension.patternPaste', (uri:vscode.Uri, uris:vscode.Uri[]) => {
        // if(uris && uris.length > 1) {
        //     const dir = path.dirname(uris[0].fsPath);
        //     if(uris.every(u => path.dirname(u.fsPath) == dir)) {
        //         return initialize().then(() => {
        //             return moveMultiple(importer, uris.map(u => u.fsPath));
        //         })
        //     }
        // }
        // let filePath = uri ? uri.fsPath : getCurrentPath();
        // if(!filePath){
        //     filePath = getCurrentPath();
        // }

        // vscode.window.showInformationMessage('Url: ' + uri);



        const findPattern = vscode.workspace.getConfiguration('patternpaste').get('find', '');
        const replacePattern = vscode.workspace.getConfiguration('patternpaste').get('replace', '');

        vscode.window.showInformationMessage('find: ' + findPattern);
        vscode.window.showInformationMessage('replace: ' + replacePattern);

        const settings: Settings = {
            find: findPattern,
            replace: replacePattern,
            basePath: '',
            files: uris.map(n => n.path)
        };

        // Act
        return patternPaste(settings).then(() => {
            vscode.window.showInformationMessage('Pasted');
        });
    });


    context.subscriptions.push(moveDisposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}