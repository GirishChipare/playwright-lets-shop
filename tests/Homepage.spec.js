const {test,expect}   = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

test.only('Verify homepage title and metadata', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(page).toHaveTitle("Let's Shop");  

    const descriptionMeta = await page.locator('.login-title');
    const metaViewport = page.locator('head meta[name="viewport"]');
    const divStyle = page.locator('div .login-section-wrapper');
    await expect(descriptionMeta).toHaveText('Log in');
    await expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1'); 
    await expect(divStyle).toHaveAttribute('style', 'background-color: white;'); 
});

