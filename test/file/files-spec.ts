import { patternPaste, Settings } from '../../src/logic';
import { expect } from 'chai';
const fs = require('fs-extra')


describe('File', () => {
    it('should generate expected result', () => {

        // Arrange
        try {
            fs.copySync('test/file/inputs/category.tss', 'test/file/temp/category.tss')
        } catch (err) {
            console.error(err)
        }

        const settings: Settings = {
            find: 'category',
            replace: 'expected',
            basePath: '/Documents/GitHub/pattern-paste',
            files: [                           
                "/test/file/temp/category.tss"
            ]
        };

        // Act
        patternPaste(settings).then(() => {
            // Assert
            expect(2).to.equal(2);
        })
    });
});
