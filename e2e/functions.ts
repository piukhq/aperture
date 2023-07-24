import {expect, PlaywrightTestConfig} from '@playwright/test'
import { waitFor } from '@testing-library/react'
import dynamic from 'next/dynamic'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function login(page, email, password) {
    await page.getByLabel('Email').click()
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill(password)
}

export async function delete_cred(page) {
    for (let button_count=3; button_count>0; button_count--) {
        await page.getByRole('button', {name: 'Remove Credentials'}).first().click();
    }
}

export async function invalid_cred(page) {
    await login(page, 'auth0_test2@bink.com', 'Shove9117')
    await page.getByRole('button', {name: 'Verify Credentials'}).click()
    await expect(page.getByText('Failed').first()).toBeVisible();
}

export async function check_transaction(page) {
    await expect(page.getByText('Transactions', { exact: true })).toBeVisible()
    await page.getByRole('button', {name: 'Select Loyalty'}).click()
    await page.getByRole('option', {name: 'Together Rewards'}).first().click()
    await page.getByRole('button', {name: 'Together Rewards'}).click()
    for (var item of await page.getByRole('option', {name: 'Together Rewards'}).all()) {
        await item.click()
        await page.getByRole('button', {name: 'Together Rewards'}).click()
    }

}


export async function check_cred(page, text) {
    await page.getByText(text).first().click(text)
    if ((await page.getByLabel('Email').isVisible())) {
        await login(page, 'tviknarajah+portal@bink.com', 'Password1')
        await page.getByRole('button', {name: 'Verify Credentials'}).click()
        await delete_cred(page)
        await invalid_cred(page)
        await page.goto('https://portal.staging.gb.bink.com/')
        await check_wallet(page, "Customer Wallets")
    }
    else if ((await page.getByRole('button', {name: 'Credentials'}).isVisible())) {
        await page.getByRole('button', {name: 'Credentials'}).click()
        await login(page, 'tviknarajah+portal@bink.com', 'Password1')
        await page.getByRole('button', {name: 'Verify Credentials'}).click()
        await delete_cred(page)
        await invalid_cred(page)
        await page.goto('https://portal.staging.gb.bink.com/')
        await check_wallet(page, "Customer Wallets")
    }
}

export async function check_wallet(page, text) {
    await page.getByText(text).first().click(text)
    if ((await page.getByLabel('Lookup').isVisible())) {
        var token01 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        var token02 = "eyJidW5kbGVfaWQiOiJjb20uYmluay53YWxsZXQiLCJ1c2VyX2lkIjoiYm1hbWlAYmluay5jb20iLCJzdWIiOjIyMTQsImlhdCI6MTY3OTY3NDk0OX0"
        var token03 = "sr28hGwcAspaUoUfcdRyvp2c3zdjb9mWoCYeQskjo44"
        await page.getByRole('button', {name: 'Lookup:'}).click()
        await page.getByRole('option', {name: 'JWT'}).click()
        await page.getByPlaceholder('Enter JWT from Django').fill(`${token01}.${token02}.${token03}`)
        await page.getByRole('button', {name: 'Load User'}).click()
        await expect(page.getByText('Wallet', { exact: true })).toBeVisible()
        await expect(page.getByText('Together Rewards').first()).toBeVisible()
        await check_transaction(page)
        await page.getByPlaceholder('Enter JWT from Django').fill('eyabcx')
        const responsePromise = page.waitForResponse('**/ubiquity/**')
        await page.getByRole('button', {name: 'Load User'}).click()
        const response = await responsePromise
        await expect(response.status()).toBe(401)
    }
}

function makerandom(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

async function reload_wait(page, name) {
    await page.reload();
    await page.getByText(name, { exact: true }).waitFor()
    await expect(page.getByText(name, { exact: true })).toBeVisible()
}

async function delete_plan(page, name) {
    await page.getByRole('button', {name: 'Options'}).first().click()
    await page.getByRole('button', {name: 'Delete'}).click()
    await page.getByLabel('Plan Name').click()
    await page.getByLabel('Plan Name').fill(name)
    await page.getByRole('button', {name: 'Delete Plan'}).click()
}

async function add_plan(page, name) {
    await page.getByRole('button', {name: 'New Plan'}).click()
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill(name)
    await page.getByLabel('Plan ID').click()
    await page.getByLabel('Plan ID').fill(Math.random().toString(36).substring(2,12))
    await page.getByLabel('Slug').click()
    await page.getByLabel('Slug').fill(makerandom(10))
    await page.getByRole('button', {name: 'Add Plan'}).click()
}

async function update_plan(page, name) {
    await page.getByRole('button', {name: 'Options'}).first().click()
    await page.getByRole('button', {name: 'Edit Plan'}).click()
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill(name)
    await page.getByRole('button', {name: 'Save Changes'}).click()
}

async function add_delete_comment(page) {
    var comment = makerandom(10)
    await page.getByRole('button', {name: 'Options'}).first().click()
    await page.getByRole('button', {name: 'Comments'}).click()
    await page.getByPlaceholder('Add a comment').fill(comment)
    await page.getByRole('button', {name: 'Add comment submit-button'}).click()
    await expect(page.getByText(comment, { exact: true })).toBeVisible()
    await page.getByRole('button', {name: 'Options'}).first().click()
    await page.getByRole('button', {name: 'Delete'}).click()
    await expect(page.getByText("This comment has been deleted", { exact: true })).toBeVisible()
}

export async function midmanagement_plan(page, text) {
    await page.getByText(text).first().click(text)
    var name = makerandom(10)
    var updated_name = makerandom(10)
    await add_plan(page, name);
    await reload_wait(page, name);
    await update_plan(page, updated_name);
    await reload_wait(page, updated_name);
    await add_delete_comment(page);
    await delete_plan(page, updated_name);
}

async function location(page) {
    var name = makerandom(5)
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill(name)
    await page.getByLabel('Location ID').click()
    await page.getByLabel('Location ID').fill(makerandom(5))
    await page.getByLabel('Merchant Internal ID').click()
    await page.getByLabel('Merchant Internal ID').fill(makerandom(5))
    await page.getByLabel('Line 1').click()
    await page.getByLabel('Line 1').fill(makerandom(5))
    await page.getByLabel('Postcode').click()
    await page.getByLabel('Postcode').fill(makerandom(5))
    await page.getByRole('button', {name: 'Save'}).click();
    await expect(page.locator(`tr:has-text('${name}')`)).toBeVisible()
    await page.getByLabel('checkbox-0').click()
    await page.getByRole('button', {name: 'Delete'}).click();
}

async function add_merchant(page, merch_name) {
    await page.getByRole('button', {name: 'View'}).first().click();
    await page.getByRole('button', {name: 'New Merchant'}).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill(merch_name);
    await page.getByRole('button', {name: 'Add Merchant'}).click();
}

export async function midmanagement_location(page, text) {
    await page.getByText(text).first().click(text)
    var merch_name = makerandom(10);
    var name = makerandom(10);
    await add_plan(page, name);
    await reload_wait(page, name);
    await add_merchant(page, merch_name);
    await page.getByRole('button', {name: 'View'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await page.getByRole('button', {name: 'Add Locations'}).click();
    await location(page);
}
