import { Selector } from 'testcafe';
import PracticePage from '../definition/practice.page';
require('dotenv').config();
fixture('Automation Practice Tests').page(process.env.BASE_URL);

// Step definitions for Radio buttons
// Click on radio button 3 and validate that only 1 radio button is checked
test('Radio buttons test 1', async (t) => {
  await PracticePage.selectRadioButton(3);
});

//Click on Radio button 2 and validate that button 2 is the only checked button
test('Radio buttons test 2', async (t) => {
  await PracticePage.selectRadioButton(2);
});

// Step definitions for Suggestion
// Type in the field ‘South’ and select ‘South Africa’ from the list of options
test('Suggestion test 1', async (t) => {
  await PracticePage.typeInSuggestionField('South', 'South Africa', true);
});

// Clear the field and type ‘Republic’ and select the first option listed
test('Suggestion test 2', async (t) => {
  await PracticePage.typeInSuggestionField('Republic', 'Republic', false);
});

// Step definitions for Checkboxes
// Check all the checkboxes and validate that they are all checked
test('Check all the checkboxes and validate that they are all checked', async (t) => {
  let result1 = await PracticePage.selectCheckBoxes(1, true);
  let result2 = await PracticePage.selectCheckBoxes(2, true);
  let result3 = await PracticePage.selectCheckBoxes(3, true);

  await t.expect(result1).ok();
  await t.expect(result2).ok();
  await t.expect(result3).ok();
});
// Uncheck the first checkbox and validate that the other two remain checked
test('Uncheck the first checkbox and validate that the other two remain checked', async (t) => {
  let result1 = await PracticePage.selectCheckBoxes(1, false);
  let result2 = await PracticePage.selectCheckBoxes(2, true);
  let result3 = await PracticePage.selectCheckBoxes(3, true);

  await t.expect(result1).notOk();
  await t.expect(result2).ok();
  await t.expect(result3).ok();
});

// Step definitions for Show
test('Show test', async (t) => {
  let result = await PracticePage.showHide(true);
  await t.expect(result.exists).notOk();
});

// Step definitions for Hide
test('Hide test', async (t) => {
  let result = await PracticePage.showHide(false);
  await t.expect(result.exists).ok();
});

// Step definitions for Web Table Fixed header
test('Web Table Fixed header test 1', async (t) => {
  const name = 'Joe';
  const position = 'Postman';
  const city = 'Chennai';
  const expectedAmount = 46;
  const amountForNameAndCity = await PracticePage.getAmountForNameAndCity(name, position, city);
  await t.expect(amountForNameAndCity).eql(expectedAmount);
});

// Validate that the total amount collected is 296
test('Validate that the total amount collected is 296', async (t) => {
  const totalAmount = await PracticePage.getTotalAmount();
  await t.expect(totalAmount).eql(296);
});

// Step definitions for iFrame
test('iFrame test', async (t) => {
  await PracticePage.selectInframeLink('Mentorship');
});
