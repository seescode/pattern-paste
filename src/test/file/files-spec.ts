import { patternPaste, Settings } from '../../logic';
import { expect } from 'chai';
const fs = require('fs-extra');
const os = require('os');

describe('File', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.removeSync('temp');
            fs.copySync('src/test/file/inputs/category.tss', 'temp/category.tss');
            fs.copySync('src/test/file/inputs/category.1.tss', 'temp/category.1.tss');
        } catch (err) {
            console.error(err);
        }

        const settings: Settings = {
            find: 'category',
            replace: 'expected',
            basePath: os.homedir() + '/Documents/GitHub/pattern-paste',
            files: [
                '/temp/category.tss',
                '/temp/category.1.tss',                
            ]
        };

        // Act
        return patternPaste(settings).then(() => {

            // Assert
            const generatedFile = fs.readFileSync('temp/expected.tss', 'utf8');
            const expectedFile = fs.readFileSync('src/test/file/expected/expected.tss', 'utf8');

            expect(generatedFile).to.equal(expectedFile);
            expect(generatedFile).to.not.equal(null);


            const generatedFile2 = fs.readFileSync('temp/expected.1.tss', 'utf8');
            const expectedFile2 = fs.readFileSync('src/test/file/expected/expected.1.tss', 'utf8');

            expect(generatedFile2).to.equal(expectedFile2);
            expect(generatedFile2).to.not.equal(null);            
        });
    });
});
