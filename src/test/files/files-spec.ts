// import { patternPaste, Settings } from '../../src/logic';
// import { expect } from 'chai';
// const os = require('os')
// const fs = require('fs-extra')

// describe('Files', () => {
//     it('should generate expected result', () => {

//         // Arrange
//         try {
//             fs.copySync('test/files/inputs/add-budget-page.component.tss', 'temp/add-budget-page.component.tss')
//             fs.copySync('test/files/inputs/add-budget-page.component.htmll', 'temp/add-budget-page.component.htmll')
//         } catch (err) {
//             console.error(err)
//         }

//         const settings: Settings = {
//             find: 'budget',
//             replace: 'new-author',
//             basePath: '/Documents/GitHub/pattern-paste',
//             files: [
//                 'temp/add-budget-page.component.tss',
//                 'temp/add-budget-page.component.htmll'
//             ]
//         };

//         // Act
//         return patternPaste(settings).then(() => {

//             // Assert
//             const generatedFile1 = fs.readFileSync('temp/add-new-author-page.component.tss', 'utf8');
//             const expectedFile1 = fs.readFileSync('test/files/expected/add-new-author-page.component.tss', 'utf8');

//             const generatedFile2 = fs.readFileSync('temp/add-new-author-page.component.htmll', 'utf8');
//             const expectedFile2 = fs.readFileSync('test/files/expected/add-new-author-page.component.htmll', 'utf8');

//             expect(generatedFile1).to.equal(expectedFile1);
//             expect(generatedFile1).to.not.be.null; 

//             expect(generatedFile2).to.equal(expectedFile2);
//             expect(generatedFile2).to.not.be.null;             
//         });
//     });
// });
