const {test, expect} = require('@playwright/test');
const { count } = require('console');
const { type } = require('os');

test('Browser Context Playwright Test', async ({browser})=>
{
//playwright code-
//in js execution is asynchonous
//step1- open browser
// step2- enter cred
// await //wait until step2 is completed
            // this await is of no use if you dont declare it as 'async'
            // if you dont have 'await' in code then its if you dont put 'async'
// step3-click

// If Func doesnt  habve name then its called anonymous func
// test('First Playwright Test', async ()=> )
    const context = await browser.newContext();  // creating new browser instance with proxy or any info passing as parameter;
    const page = await context.newPage();
                    // the above two lines can be replaced by another fixture - page
                    // page -  use this fixture when you dont have any args to pass xample shown in below TC
    await page.goto("https://www.google.co.in/");
});

test('Facebook Login Test', async ({page})=>
    {
        await page.goto("https://www.facebook.com/");
        // validation
        // get title - assertion
        console.log(await page.title());
      await expect(page).toHaveTitle("Facebook – log in or sign up")  ;
    //   css/ xpath can help us identify any element in the page
    // css recomended
    // to enter any value in textbox there are 2 methods
    // 1. type  |  2.fill   > type > deprecated
    await page.locator('#email').fill("samplesusername@gmail.com");
    // await page.locator('#pass').fill("password123");
    await page.locator("[id='pass']").fill("password123");
    await page.locator("[value='1']").click();
    console.log(await page.locator('div._9ay7').textContent());
      await expect(await page.locator('div._9ay7')).toContainText('connected');
    });

test('Practice Login Test', async ({page})=>
      {
          const username = page.locator('#username');
          const password = page.locator('#password');
          const signIn = page.locator('#submit');
          await page.goto("https://practicetestautomation.com/practice-test-login/");
          console.log(await page.title());
          await expect(page).toHaveTitle("Test Login | Practice Test Automation")  ;
          await page.locator('#username').fill("student1");
          await page.locator('#password').fill("Password1232");
          await page.locator('#submit').click();
          console.log(await page.locator('#error').textContent());
          await expect(await page.locator('#error')).toContainText('invalid');
          await username.fill("");
          await password.fill("");
          await username.fill("student");
          await password.fill("Password123");
          await signIn.click();


          // getting all the products on ecom website
          // await page.locator(".parentclasstagname childclasstagname").first().textContent());
          // await page.locator(".parentclasstagname childclasstagname").nth(0).textContent());
          // console.log(await page.locator(".parentclasstagname childclasstagname").allTextContents());
          // but allTextContents will fail if used directly bcz it might happen that the page has not completely loaded
          // so we have to wait till the page is completely loaded, and now explicitly put wait 
          
          //await page.waitForLoadState('networkidle');

          // or alternately you can use

          // await page.locator(".parentclasstagname childclasstagname").waitFor();
          // await page.locator(".parentclasstagname childclasstagname").first().waitFor();
          // await page.locator(".parentclasstagname childclasstagname").last().waitFor();

          // but theres a catch, this waitFor waits only for single element, and not in case of multiple elements as it doesnot know for who to wait
      });

      // const {test, expect } = require('@playwright/test');
 
 
 
 
test('Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
 
});

test('UI Controls-Dropdown', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const userName =  page.locator("#user-name");
  const password =  page.locator("#password");
  const button = page.locator("#login-button");
  await userName.fill("standard_user");
  await password.fill("secret_sauce");
  await button.click();
  const dropdown = page.locator('.product_sort_container');
  await dropdown.selectOption("za");
  // await page.pause();
});

test('UI Controls-RadioButton-CheckBox', async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  await page.locator('#bmwcheck').click();
  await page.locator('#bmwradio').click();
  console.log(await page.locator('#bmwradio').isChecked()); // not handy to check bcz this wont throw err
  await expect(page.locator('#bmwradio')).toBeChecked(); //assertion
  await page.locator('#bmwcheck').uncheck();  // for uncheck we dont have assertion toBeChecked()
  expect(await page.locator('#bmwcheck').isChecked()).toBeFalsy(); //so we do workaround for assertion
// await is reqd only when you are performing actual action
  // await page.pause();
});

test('ChildWindows-Blinking text', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.route('**/*.css', route => route.abort());
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // await page.pause();
  const link = page.locator("[href*='documents-request']");
  await expect(link).toHaveAttribute("class", "blinkingText");
  const [newPage] = await Promise.all([    
    context.waitForEvent('page'), // listening any new page is opened
    // as the above line is necessary before clicking/opening new page to listen or it will wait for next event
    // promise pending, rejected, fulfilled
  await link.click(),
])

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await  page.locator("#username").fill(domain);
  await  page.locator("#password").fill("learning");

  // await page.pause();
  console.log(await page.locator("#username").textContent());
  

});

// record and playback codegen example
test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('dialog').locator('div').filter({ hasText: 'Sign in to GoogleGet the most' }).nth(1).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('facebook');
  await page.goto('https://www.google.com/');
  await page.locator('div').filter({ hasText: 'Choose what you’re giving feedback onSee moreDeleteDelete Google Search I\'m' }).nth(3).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('facebook login');
  await page.locator('iframe[name="a-6ojqluqs4kio"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-6ojqluqs4kio"]').contentFrame().locator('td:nth-child(2)').first().click();
  await page.locator('iframe[name="c-6ojqluqs4kio"]').contentFrame().locator('tr:nth-child(3) > td').first().click();
  await page.locator('iframe[name="c-6ojqluqs4kio"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(3)').click();
  await page.locator('iframe[name="c-6ojqluqs4kio"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'Facebook - log in or sign up' }).click();
});


test('E2E-Ecommerce', async ({page}) =>{
  const prdName = 'Sauce Labs Onesie';
  await page.goto("https://www.saucedemo.com/");
  const userName =  page.locator("#user-name");
  const password =  page.locator("#password");
  const button = page.locator("#login-button");
  await userName.fill("standard_user");
  await password.fill("secret_sauce");
  await button.click();
  await page.waitForLoadState('networkidle');
  const prdList = await page.locator(".inventory_item");
  const products = await page.locator(".inventory_item .inventory_item_name").allTextContents();
  console.log(products);
  const count = await prdList.count();
  for(let i=0; i < count; i++)
  {
      if (await prdList.nth(i).locator(".inventory_item_name").textContent() === prdName)
      {
        await prdList.nth(i).locator("text=Add to cart").click(); //this also works
        // await prdList.nth(i).locator(".btn").click();
        break;
      }
  }
  await page.locator('.shopping_cart_badge').click();
  await page.locator(".cart_contents_container").waitFor();
  // const bool = page.locator("div:has-text('Sauce Labs Onesie')").isVisible();
  const bool = page.locator("text=Sauce Labs Onesie").isVisible();

  expect(bool).toBeTruthy();
  await page.locator("#checkout").click();
  // await page.pause();
  await page.locator("#first-name").fill("John");
  await page.locator("#last-name").fill("Wick");
  await page.locator("#postal-code").fill("12345");
  await page.locator("#continue").click();
  await page.locator("#finish").click();
    // const bool1 = page.locator("h2:has-text('Thank you for your order!')").isVisible();
  await expect(await page.locator('.complete-header')).toContainText('Thank you for your order!');
  await page.locator("#back-to-products").click();
  // await page.pause();

});

test('AutoSuggestive-Dropdown', async ({page}) =>{
  await page.goto("https://practice.expandtesting.com/autocomplete");
  await page.locator("#country").pressSequentially("ind"); //press keys one by one
  const dropdown = page.locator("#countryautocomplete-list");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("div").count();

  for(let i=0; i < optionsCount; ++i)
  {
    const text = await dropdown.locator("div").nth(i).textContent();
    if(text === "India")
    {
      await dropdown.locator("div").nth(i).click();
      break;
    }
  }
  await page.locator("[onclick='displayResult()']").click();
  await expect(await page.locator("#result")).toContainText('You selected: India');
});

test('Special Locators', async ({page}) =>{
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();   //checkbox
  await page.getByLabel("Employed").check(); //radiobutton   check()/click() both can be used
  // getByLabel() inefficient for typing purpose but good for selecting at checkboxes, radiobuttons, dropdowns
  await page.getByLabel("Gender").selectOption("Male");
  await page.getByPlaceholder("Password").fill("passwordispassword");
  await page.getByRole("button", {name: 'Submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link", {name: 'Shop'}).click();
  await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add'}).click();

});


test('@Web New Client App 1', async ({ page }) => {
  const email = "motanshikaa@gmail.com";
  const productName = 'zara coat 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Anshika@123");
  await page.getByRole("button", {name: 'Login'}).click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: 'Add To Cart'}).click();
  await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", {name: "Checkout"}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", {name: "India"}).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});

test('Disable CSS', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
// page.route('**/*.css', route => route.abort());  //block ccs files to speed up testing where ccs is not involvd
page.route('**/*.{jpg,png,jpeg}', route => route.abort());        //block images files to speed up testing where images is not involvd
page.on('request',request=> console.log(request.url()));   //on() is a listner, it will invoke when any event occurs,  so that event has to be 1st argument and 2nd argument  will be the action
page.on('response', response=> console.log(response.url(), response.status()));
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await  page.locator("#username").fill("rahulshettyacademy");
await  page.locator("#password").fill("learning");
await page.locator("[type='checkbox']").click();
const signIn = page.locator('#signInBtn');
await signIn.click();
// await page.pause();
});
