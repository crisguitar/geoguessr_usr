const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
	const page = await browser.newPage();
	try {
		console.log('Getting a new account...');
		await page.goto('https://hostux.ninja/mailbox');
		await page.waitForSelector('.mat-button:nth-of-type(2)');
		await page.click('.mat-button:nth-of-type(2)');
		await page.waitForTimeout(1000);
		const emailBox = await page.$('#mat-input-0');
		const newEmail = await emailBox.evaluate(el => el.value);
		const fullEmail = `${newEmail}@hostux.ninja`;
		console.log('Mailbox generated!');

		await page.goto('https://www.geoguessr.com');
		await page.click('[data-qa="header-signup-button"]');
		await page.waitForSelector('[data-qa="email-field"]');
		await page.click('[data-qa="email-field"]');

		await page.keyboard.type(fullEmail);

		await page.click('[data-qa="signup-cta-button"]');

		await page.waitForTimeout(5000);

		await page.goto(`https://hostux.ninja/mailbox/${newEmail}`);

		const inbox = await page.waitForSelector('.mat-list-item-ripple:first-of-type');
		await inbox.click();

		console.log('Email received!');

		const registrationLink = await page.waitForSelector('a[clicktracking=off]');
		const url = await registrationLink.evaluate(el => el.getAttribute('href'));

		await page.goto(url);

		const passwordField = await page.waitForSelector('[name="password-1"]');
		await passwordField.click();
		await page.keyboard.type('the password');
		await page.click('[name="password-2"]');
		await page.keyboard.type('the password');

		await page.click('button[type=submit]');

		await page.waitForXPath("//div[contains(., 'Good job!')]");

		console.log('Registration finished!');

		console.log('Find your account details here:');

		console.log(`Email:    ${fullEmail}`);
		console.log('Password: the password');

		await browser.close();
	} catch (e) {
		await page.screenshot({ path: 'error.png' });
		await browser.close();
		throw new Error(e);
	}
})();
