import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    await fixture.page
    fixture.logger.info("Navigated to the application")
});

Given('User click on the signin link', async function () {
    await fixture.page.locator(".panel > .header > .authorization-link > a").click();
});

Given('User enter the username as {string}', async function (username) {
    await fixture.page.locator('[id="email"]').type(username);
});

Given('User enter the password as {string}', async function (password) {
    await fixture.page.locator('[name="login[password]"]').type(password);
});

When('User click on the login button', async function () {
    await fixture.page.locator('[class*="login primary"]').click();
    await fixture.page.waitForLoadState();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
    await fixture.page.locator(":nth-child(2) > .customer-welcome > .customer-name > .action").click();
    const signOutButton = await fixture.page.locator("(//li[@class='authorization-link']//following-sibling::a)[1]");
    await expect(signOutButton).toBeVisible();
});

When('Login should fail', async function () {
    const failureMesssage = fixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).toBeVisible();
});
