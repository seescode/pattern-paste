import { patternPaste, Settings } from '../../logic';
import { expect } from 'chai';
const fs = require('fs-extra');
const os = require('os');

describe('File', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.copySync('src/test/directory/inputs', 'temp');
        } catch (err) {
            console.error(err);
        }

        const settings: Settings = {
            find: 'category',
            replace: 'expected',
            basePath: os.homedir() + '/Documents/GitHub/pattern-paste',
            files: [
                '/temp',
            ]
        };

        // Act
        return patternPaste(settings).then(() => {

            // Assert
            const generatedFile = fs.readFileSync('temp/expected/expected.tss', 'utf8');
            const expectedFile = fs.readFileSync('src/test/file/expected/expected/expected.tss', 'utf8');

            expect(generatedFile).to.equal(expectedFile);
            expect(generatedFile).to.not.equal(null);


            const generatedFile2 = fs.readFileSync('temp/expected/expected.1.tss', 'utf8');
            const expectedFile2 = fs.readFileSync('src/test/file/expected/expected/expected.1.tss', 'utf8');

            expect(generatedFile2).to.equal(expectedFile2);
            expect(generatedFile2).to.not.equal(null);            
        });
    });
});
