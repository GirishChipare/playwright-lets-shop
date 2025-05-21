const {test,expect}   = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const { title } = require('process');
const { match } = require('assert');


test('Verify homepage title and metadata', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(page).toHaveTitle("Let's Shop");  

    const descriptionMeta = await page.locator('.login-title');
    const metaViewport = page.locator('head meta[name="viewport"]');
    const divStyle = page.locator('div .login-section-wrapper');
    await expect(descriptionMeta).toHaveText('Log in');
    await expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1'); 
    await expect(divStyle).toHaveAttribute('style', 'background-color: white;'); 
});

test('Login and Logo check', async ({page}) => {
    const email = "motanshikaa@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Anshika@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    expect(await page.locator('.logo').isVisible());
});

test('Search bar functionality', async({page}) =>{
    const email = "motanshikaa@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Anshika@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("section [name='search']").fill("ZARA");
    await page.locator('#products').click();
    await page.waitForLoadState('domcontentloaded');
    const productTitles = await page.locator("#products h5").allTextContents();
    console.log(productTitles);
    const matched = productTitles.some(title => title.includes('ZARA'));
    expect(match).toBeTruthy();
})

