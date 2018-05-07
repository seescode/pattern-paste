import { patternPaste, Settings } from '../../logic';
import { expect } from 'chai';
const fs = require('fs-extra');

describe('Rename Directory', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.removeSync('temp');
            fs.copySync('src/test/rename-directory/inputs', 'temp');
        } catch (err) {
            console.error(err);
        }

        const settings: Settings = {
            find: 'category',
            replace: 'expected',
            basePath: '',
            files: [
                'temp',
            ]
        };

        // Act
        return patternPaste(settings).then(() => {

            // Assert
            const generatedFile = fs.readFileSync('temp/expected/expected.tss', 'utf8');
            const expectedFile = fs.readFileSync('src/test/rename-directory/expected/expected/expected.tss', 'utf8');

            expect(generatedFile).to.equal(expectedFile);
            expect(generatedFile).to.not.equal(null);


            const generatedFile2 = fs.readFileSync('temp/expected/expected.1.tss', 'utf8');
            const expectedFile2 = fs.readFileSync('src/test/rename-directory/expected/expected/expected.1.tss', 'utf8');

            expect(generatedFile2).to.equal(expectedFile2);
            expect(generatedFile2).to.not.equal(null);            
        });
    });
});
