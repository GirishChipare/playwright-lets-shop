const {test,expect}   = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const { title } = require('process');
const { match } = require('assert');

let webContext;

test.beforeAll(async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
    
        const email = "motanshikaa@gmail.com";
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Anshika@123");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await context.storageState({path:'state.json'});
        webContext = await browser.newContext({storageState:'state.json'});       
    });

test('Validate homepage title and metadata', async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(page).toHaveTitle("Let's Shop");  
    const metaViewport = page.locator('head meta[name="viewport"]');
    // const divStyle = page.locator('div .login-section-wrapper');
    await expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1'); 
    // await expect(divStyle).toHaveAttribute('style', 'background-color: white;'); 
});

test('Login and Logo Validation', async () => {
    const page = await webContext.newPage();
    const email = "motanshikaa@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Anshika@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    expect(await page.locator('.logo').isVisible());
});

test('Search bar Validation', async() =>{
    const page = await webContext.newPage();
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

test.only('Navigation Validation',async ()=> {
    const page = await webContext.newPage();
    const email = "motanshikaa@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Anshika@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    // await page.locator("[routerlink*='myorders']").click();
    await page.getByRole("button", {name: 'ORDERS'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/myorders");

    await page.locator("[routerlink*='cart']").click();
    // await page.getByRole("button", {name: 'Cart'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/cart");

    await page.getByRole("button", {name: 'HOME'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/dash");

    await page.getByRole("button", {name: 'Sign Out'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/auth/login");
    
})

