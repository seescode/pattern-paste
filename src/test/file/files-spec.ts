import { patternPaste, Settings } from '../../logic';
import { expect } from 'chai';
const fs = require('fs-extra');

describe('File', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.removeSync('temp');
            fs.copySync('src/test/file/inputs/category.tss', 'temp/category.tss');
            fs.copySync('src/test/file/inputs/category.1.tss', 'temp/category.1.tss');
            fs.copySync('src/test/file/inputs/no-change.tss', 'temp/no-change.tss');            
        } catch (err) {
            console.error(err);
        }

        const settings: Settings = {
            find: 'category',
            replace: 'expected',
            basePath: '',
            files: [
                'temp/category.tss',
                'temp/category.1.tss',                
                'temp/no-change.tss'
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

            const generatedFile3 = fs.readFileSync('temp/no-change.tss', 'utf8');
            const expectedFile3 = fs.readFileSync('src/test/file/expected/no-change.tss', 'utf8');

            expect(generatedFile3).to.equal(expectedFile3);
            expect(generatedFile3).to.not.equal(null);                        
        });
    });
});
