import{test, expect} from '@playwright/test'

test('TC#1 - Verify that the VWO page is loaded', async({page})=>{

    await page.goto("https://app.vwo.com" , {
        waitUntil: 'domcontentloaded',
        timeout:3000,
        referer:"https://sdet.com",
    });

    //Default locators
    // id, name, className, Tag, Custom Locator (Via CSS Selector)

    //CSS Selector -> Browser - Css Engine, Help you to find the element
    //by using default locators
    //id => #id
    //className => .
    //name => [name="value"]
    //Tag =>[tag]

    //<input type="email" 
    // class="text-input W(100%)" 
    // name="username" 
    // vwo-html-translate-attr="placeholder"
    //  vwo-html-translate-placeholder="login:enterEmailID" 
    // id="login-username" 
    // data-qa="hocewoqisi" 
    // placeholder="Enter email ID" 
    // data-gtm-form-interact-field-id="0">

    let userNameField = page.locator("#login-username");
    let password = page.locator('#login-password');
    let signIn = page.locator('#js-login-btn');

    await userNameField.fill("abc@gmail.com");
    await password.fill("123");
    await signIn.click();

    let error_msg = page.locator('#js-notification-box-msg');
    await expect(error_msg).toContainText("Your email, password, IP address or location did not match");
    
    await page.pause();
   

})