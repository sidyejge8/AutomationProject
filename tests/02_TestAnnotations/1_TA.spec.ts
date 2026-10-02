import {test, expect} from '@playwright/test';

test("Navigating to the tta website" , async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
});

test("BCP - 2 roles" , async({browser})=>{

    let adminContext = await browser.newContext();
    let userContext = await browser.newContext();
    let guestContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://www.google.com/");

    let userPage = await userContext.newPage();
    await userPage.goto("https://www.facebook.com/");

    let guestPage = await guestContext.newPage();
    await guestPage.goto("https://mail.google.com/");

    await adminPage.close();
    await userPage.close();
    await guestPage.close();

})