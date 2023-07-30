import { Selector, t } from 'testcafe';

class PracticePage {
  constructor() {
    this.radioButton1 = Selector(`#radio-btn-example input[type='radio'][value='radio1']`);
    this.radioButton2 = Selector(`#radio-btn-example input[type='radio'][value='radio2']`);
    this.radioButton3 = Selector(`#radio-btn-example input[type='radio'][value='radio3']`);

    this.suggestionInput = Selector('#autocomplete');
    this.suggestionList = Selector('#ui-id-1 li.ui-menu-item');

    this.checkboxes = Selector('#checkbox-example input[type="checkbox"]');

    this.hideButton = Selector('#hide-textbox');
    this.showButton = Selector('#show-textbox');
    this.hiddenElement = Selector('#displayed-text');

    this.nameColumn = Selector('[class="tableFixHead"] #product tr td');
    this.amounts = Selector('[class="tableFixHead"] #product tr td:nth-child(4)');
    this.totalText = Selector('[class="tableFixHead"]').child('[class="totalAmount"]');
    this.iframe = Selector('iframe');
    this.iframeElement = Selector('div div.navbar-collapse.collapse.clearfix > ul > li > a', { timeout: 5000 });
  }

  // Select a specific radio button based on the given button number
  async selectRadioButton(button) {
    try {
      if (button === 1) {
        await t.click(this.radioButton1);
        await t.expect(this.radioButton1.checked).ok();
        await t.expect(this.radioButton2.checked).notOk();
        await t.expect(this.radioButton3.checked).notOk();
      } else if (button === 2) {
        await t.click(this.radioButton2);
        await t.expect(this.radioButton2.checked).ok();
        await t.expect(this.radioButton1.checked).notOk();
        await t.expect(this.radioButton3.checked).notOk();
      } else if (button === 3) {
        await t.click(this.radioButton3);
        await t.expect(this.radioButton3.checked).ok();
        await t.expect(this.radioButton1.checked).notOk();
        await t.expect(this.radioButton2.checked).notOk();
      }
    } catch (err) {
      throw err;
    }
  }

  // Type in the suggestion field and select the suggestion from the list
  async typeInSuggestionField(textInput, checkText, abs = false) {
    try {
      await t.typeText(this.suggestionInput, textInput, { replace: true });
      if (abs) {
        await t.click(this.suggestionList.withText(checkText));
        await t.expect(this.suggestionInput.value).eql(checkText);
      } else {
        await t.click(this.suggestionList.nth(0));
        await t.expect(this.suggestionInput.value).contains(textInput);
      }
    } catch (err) {
      throw err;
    }
  }

  // Select a checkbox and return its checked state
  async selectCheckBoxes(option, mark = true) {
    try {
      const checkBoxSelector = this.checkboxes.nth(option - 1);
      const element = await checkBoxSelector();
      let check = element.checked;

      if (check === mark) {
        // Checkbox state matches the desired state, return its checked state
        return check;
      } else {
        // Checkbox state doesn't match the desired state, click to toggle its state
        await t.click(checkBoxSelector);
        // Return the updated checked state after the click action
        return await checkBoxSelector.checked;
      }
    } catch (err) {
      throw err;
    }
  }

  // Show or hide the element and return its current style state
  async showHide(show) {
    try {
      show ? await t.click(this.showButton) : await t.click(this.hideButton);
      return await this.hiddenElement.withAttribute('style', 'display: none;');
    } catch (err) {
      throw err;
    }
  }

  // Get the amount for a specific name, position, and city from the web table
  async getAmountForNameAndCity(name, position, city) {
    try {
      const rows = this.nameColumn.parent('tr');

      for (let i = 0; i < (await rows.count); i++) {
        const nameText = await rows.nth(i).child('td').nth(0).innerText;
        const positionText = await rows.nth(i).child('td').nth(1).innerText;
        const cityText = await rows.nth(i).child('td').nth(2).innerText;
        const amountText = await this.amounts.nth(i).innerText;
        if (nameText === name && positionText === position && cityText === city) {
          return Number(amountText);
        }
      }

      throw new Error(`Data not found for name: ${name}, position: ${position}, and city: ${city}`);
    } catch (err) {
      throw err;
    }
  }

  // Get the total amount collected from the web table
  async getTotalAmount() {
    try {
      let sum = 0;
      for (let i = 0; i < (await this.amounts.count); i++) {
        const amountText = await this.amounts.nth(i).innerText;
        const amount = Number(amountText);
        sum += amount;
      }

      return sum;
    } catch (err) {
      throw err;
    }
  }

  // Select a link inside the iframe
  async selectInframeLink(linkText) {
    try {
      await t.scrollIntoView(this.iframe);
      await t.expect(this.iframe.exists).ok();
      await t.switchToIframe(this.iframe);
      await t.click(this.iframeElement.withText(linkText));
      await t.switchToMainWindow();
    } catch (err) {
      throw err;
    }
  }
}

export default new PracticePage();
