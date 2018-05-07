import { patternPaste, Settings } from '../../logic';
import { expect } from 'chai';
const fs = require('fs-extra');

describe('twoSyllable file', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.removeSync('temp');
            fs.copySync('src/test/twoSyllable/inputs/missing-category.tss', 'temp/missing-category.tss');
            fs.copySync('src/test/twoSyllable/inputs/_missingCategory.tss', 'temp/_missingCategory.tss');
        } catch (err) {
            console.error(err);
        }

        const settings: Settings = {
            find: 'missing-category',
            replace: 'reallyExpected',
            basePath: '',
            files: [
                'temp/missing-category.tss',
                'temp/_missingCategory.tss',
            ]
        };

        // Act
        return patternPaste(settings).then(() => {

            // Assert
            const generatedFile = fs.readFileSync('temp/really-expected.tss', 'utf8');
            const expectedFile = fs.readFileSync('src/test/twoSyllable/expected/really-expected.tss', 'utf8');

            expect(generatedFile).to.equal(expectedFile);
            expect(generatedFile).to.not.equal(null);    

            const generatedFile2 = fs.readFileSync('temp/_reallyExpected.tss', 'utf8');
            const expectedFile2 = fs.readFileSync('src/test/twoSyllable/expected/_reallyExpected.tss', 'utf8');

            expect(generatedFile2).to.equal(expectedFile2);
            expect(generatedFile2).to.not.equal(null);    

        });
    });
});
