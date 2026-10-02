import { test, expect} from '@playwright/test'

test.skip('Checkout with PayPal', async ({page})=>{

    //Never execute
});

test.only('login test', async ({page})=>{

    // only this test runs, everything in the file is ignored
});

test.fail('cart total is wrong, BUG-451' , async ()=>{

    expect(90).toBe(100); //actullay returns 90
});

test.fixme('upload 2GB file', async()=>{

    //skipped, but flagged as "need fixing"
});

test('Full regression suite', async()=>{

    
})