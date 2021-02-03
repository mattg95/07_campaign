const { expect } = require('chai');

const LIST_ITEMS_SELECTOR = 'li';

const getTypeformFrame = (page) => {
  for (const frame of page.frames()) {
    if (frame.url().includes("typeform.com")) {
      return frame;
    }
  }
}

describe('Puppeteer tests', function () {
  // Increase timeout from default of 2s to allow time for page to load.
  this.timeout(5000);
  let page;

  before (async function () {
    page = await browser.newPage();
  });

  beforeEach(async function () {
    await page.goto('http://localhost:3000');
  })

  after (async function () {
    await page.close();
  })

  it('should have a heading that says 0.7% Campaign', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;

    await page.waitForSelector(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql('0.7% Campaign');
  });

  it('should stop the survey if the user answers No to the first question', async function () {
    const THANK_YOU_SPAN_SELECTOR = '[data-qa="thank-you-screen-wrapper"] span';
    const typeformFrame = getTypeformFrame(page);

    await typeformFrame.$$eval(LIST_ITEMS_SELECTOR, (listItems) => {
      for (listItem of listItems) {
        if (listItem.innerText.includes("No")) {
          listItem.click();
          return;
        }
      }
    });
    
    await typeformFrame.waitForSelector(THANK_YOU_SPAN_SELECTOR, {timeout: 3000});
    text = await typeformFrame.$eval(THANK_YOU_SPAN_SELECTOR, span => {
      return span.innerHTML
    });
    expect(text).to.contain("Thanks for taking this survey.");
  });

  it('should continue the survey if the user answers Yes to the first question', async function () {
    const NEXT_QUESTION_SELECTOR = 'div[tabindex="0"]';
    const typeformFrame = getTypeformFrame(page);

    await typeformFrame.waitForSelector(LIST_ITEMS_SELECTOR, { timeout: 3000 });

    await typeformFrame.$$eval(LIST_ITEMS_SELECTOR, (listItems) => {
        for (listItem of listItems) {
          if (listItem.innerText.includes("Yes")) {
            listItem.click();
            return;
          }
        }
      });
    
    await typeformFrame.waitForSelector(NEXT_QUESTION_SELECTOR, {timeout: 3000});
    text = await typeformFrame.$eval(NEXT_QUESTION_SELECTOR, span => {
      return span.innerText
    });
    expect(text).to.contain("Question 2");
  });
});