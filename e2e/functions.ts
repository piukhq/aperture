import {expect} from '@playwright/test'

export async function authenticate (page) {
  await page.goto('https://portal.staging.gb.bink.com/')
  await page.getByLabel('Enter your Organization Name').click()
  await page.getByLabel('Enter your Organization Name').fill('bink')
  await page.getByRole('button', {name: 'Continue'}).click()
  await page.getByRole('button', {name: 'Continue with Bink'}).click()
  await page.getByPlaceholder('Email, phone, or Skype').fill('auth0_test2@bink.com')
  await page.getByPlaceholder('Email, phone, or Skype').press('Enter')
  await page.getByPlaceholder('Password').click()
  await page.getByPlaceholder('Password').fill('Shove9117')
  await page.getByPlaceholder('Password').press('Enter')
}

export async function login (page, email, password) {
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill(password)
}

export async function delete_cred (page) {
  for (let button_count = 3; button_count > 0; button_count--) {
    // getAllByRole
    await page.getByRole('button', {name: 'Remove Credentials'}).first()
      .click()
  }
}

export async function invalid_cred (page) {
  await login(page, 'auth0_test2@bink.com', 'Shove9117')
  await page.getByRole('button', {name: 'Verify Credentials'}).click()
  await expect(page.getByText('Failed').first()).toBeVisible()
}

export async function check_transaction (page) {
  await expect(page.getByText('Transactions', {exact: true})).toBeVisible()
  await page.getByRole('button', {name: 'Select Loyalty'}).click()
  await page.getByRole('option', {name: 'Together Rewards'}).first()
    .click()
  await page.getByRole('button', {name: 'Together Rewards'}).click()
  for (const item of await page.getByRole('option', {name: 'Together Rewards'}).all()) {
    await item.click()
    await page.getByRole('button', {name: 'Together Rewards'}).click()
  }
}

export async function check_cred (page, text) {
  await page.getByText(text).first()
    .click(text)
  if ((await page.getByLabel('Email').isVisible())) {
    await login(page, 'tviknarajah+portal@bink.com', 'Password1')
    await page.getByRole('button', {name: 'Verify Credentials'}).click()
    await delete_cred(page)
    await invalid_cred(page)
    await page.goto('https://portal.staging.gb.bink.com/')
    await check_wallet(page, 'Customer Wallets')
  }
  else if ((await page.getByRole('button', {name: 'Credentials'}).isVisible())) {
    await page.getByRole('button', {name: 'Credentials'}).click()
    await login(page, 'tviknarajah+portal@bink.com', 'Password1')
    await page.getByRole('button', {name: 'Verify Credentials'}).click()
    await delete_cred(page)
    await invalid_cred(page)
    await page.goto('https://portal.staging.gb.bink.com/')
    await check_wallet(page, 'Customer Wallets')
  }
}

export async function check_wallet (page, text) {
  await page.getByText(text).first()
    .click(text)
  if ((await page.getByLabel('Lookup').isVisible())) {
    const token01 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const token02 = 'eyJidW5kbGVfaWQiOiJjb20uYmluay53YWxsZXQiLCJ1c2VyX2lkIjoiYm1hbWlAYmluay5jb20iLCJzdWIiOjIyMTQsImlhdCI6MTY3OTY3NDk0OX0'
    const token03 = 'sr28hGwcAspaUoUfcdRyvp2c3zdjb9mWoCYeQskjo44'
    await page.getByRole('button', {name: 'Lookup:'}).click()
    await page.getByRole('option', {name: 'JWT'}).click()
    await page.getByPlaceholder('Enter JWT from Django').fill(`${token01}.${token02}.${token03}`)
    await page.getByRole('button', {name: 'Load User'}).click()
    await expect(page.getByText('Wallet', {exact: true})).toBeVisible()
    await expect(page.getByText('Together Rewards').first()).toBeVisible()
    await check_transaction(page)
    await page.getByPlaceholder('Enter JWT from Django').fill('eyabcx')
    const responsePromise = page.waitForResponse('**/ubiquity/**')
    await page.getByRole('button', {name: 'Load User'}).click()
    const response = await responsePromise
    await expect(response.status()).toBe(401)
  }
}

function makerandom (length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

async function reload_wait (page, name) {
  await page.reload()
  await page.getByText(name, {exact: true}).waitFor()
  await expect(page.locator(`text=${name}`)).toBeVisible()
}

async function delete_plan (page, name) {
  await page.getByRole('button', {name: 'Options'}).first()
    .click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await page.getByLabel('Plan Name').click()
  await page.getByLabel('Plan Name').fill(name)
  await page.getByRole('button', {name: 'Delete Plan'}).click()
}

async function add_plan (page, name) {
  await page.getByRole('button', {name: 'New Plan'}).click()
  await page.getByLabel('Name').click()
  await page.getByLabel('Name').fill(name)
  await page.getByLabel('Plan ID').click()
  await page.getByLabel('Plan ID').fill((Math.floor(Math.random() * 90000) + 10000).toString())
  await page.getByLabel('Slug').click()
  await page.getByLabel('Slug').fill(makerandom(10))
  await page.getByRole('button', {name: 'Add Plan'}).click()
  await page.getByRole('heading', {name: 'MID Directory'}).waitFor()
}

async function update_plan (page, name) {
  await page.getByRole('button', {name: 'Options'}).first()
    .click()
  await page.getByRole('button', {name: 'Edit Plan'}).click()
  await page.getByLabel('Name').click()
  await page.getByLabel('Name').fill(name)
  await page.getByRole('button', {name: 'Save Changes'}).click()
  await page.getByRole('heading', {name: 'MID Directory'}).waitFor()
}

async function add_comment (page) {
  const comment = makerandom(10)
  await page.getByRole('button', {name: 'Options'}).first()
    .click()
  await page.getByRole('button', {name: 'Comments'}).click()
  await page.getByPlaceholder('Add a comment', {exact: true}).waitFor()
  await page.getByPlaceholder('Add a comment').fill(comment)
  await page.getByLabel('Add comment button').click()
  await expect(page.getByText(comment, {exact: true})).toBeVisible()
}

async function delete_comment (page) {
  await page.getByRole('button', {name: 'Options'}).first()
    .click()
  await page.getByRole('button', {name: 'Comments'}).click()
  await page.getByPlaceholder('Add a comment', {exact: true}).waitFor()
  await page.getByLabel('Options').first()
    .click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await expect(page.getByText('This comment has been deleted', {exact: true})).toBeVisible()
}

export async function midmanagement_plan (page, text) {
  await page.getByText(text).first()
    .click(text)
  const name = makerandom(10)
  const updated_name = makerandom(10)
  await add_plan(page, name)
  await reload_wait(page, name)
  await update_plan(page, updated_name)
  await reload_wait(page, updated_name)
  await add_comment(page)
  await page.reload()
  await delete_comment(page)
  await page.reload()
  await delete_plan(page, updated_name)
}

async function add_location (page, name, location_id) {
  const location_ID = location_id || makerandom(5)
  const merch_id = makerandom(5)
  await page.getByRole('button', {name: 'Add Locations'}).click()
  await page.getByLabel('Name').click()
  await page.getByLabel('Name').fill(name)
  await page.getByLabel('Location ID').click()
  await page.getByLabel('Location ID').fill(location_ID)
  await page.getByLabel('Merchant Internal ID').click()
  await page.getByLabel('Merchant Internal ID').fill(merch_id)
  await page.getByLabel('Line 1').click()
  await page.getByLabel('Line 1').fill(makerandom(5))
  await page.getByLabel('Postcode').click()
  await page.getByLabel('Postcode').fill(makerandom(5))
  await page.getByRole('button', {name: 'Save'}).click()
}

async function delete_location (page) {
  await page.getByLabel('checkbox-0').click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await page.getByRole('button', {name: 'Delete Location'}).click()
  await page.getByRole('button', {name: 'Close'}).click()
}

async function duplicate_location_id (page) {
  const name = makerandom(5)
  const location_id = makerandom(5)
  await add_location(page, name, location_id)
  await expect(page.locator(`tr:has-text('${name}')`)).toBeVisible()
  await page.getByRole('button', {name: 'Add Locations'}).click()
  await add_location(page, name, location_id)
  await expect(page.getByText('Enter unique Location ID', {exact: true})).toBeVisible()
  await page.getByRole('button', {name: 'Close'}).click()
}

async function mandatory_location (page) {
  await page.getByRole('button', {name: 'Add Locations'}).click()
  await page.getByLabel('Merchant Internal ID').click()
  await page.getByLabel('Merchant Internal ID').fill(makerandom(5))
  await page.getByLabel('Line 1').click()
  await page.getByLabel('Line 1').fill(makerandom(5))
  await page.getByLabel('Postcode').click()
  await page.getByLabel('Postcode').fill(makerandom(5))
  await page.getByRole('button', {name: 'Save'}).click()
  await expect(page.getByText('Populate all mandatory fields', {exact: true})).toBeVisible()
  await page.getByRole('button', {name: 'Close'}).click()
}

async function add_merchant (page, merch_name) {
  await page.getByRole('button', {name: 'View'}).first()
    .click()
  await page.getByRole('button', {name: 'New Merchant'}).click()
  await page.getByLabel('Name').click()
  await page.getByLabel('Name').fill(merch_name)
  await page.getByRole('button', {name: 'Add Merchant'}).click()
}

export async function midmanagement_location (page, text) {
  await page.getByText(text).first()
    .click(text)
  const merch_name = makerandom(10)
  const name = makerandom(10)
  const location_name = makerandom(5)
  const location_id = null
  await add_plan(page, name)
  await reload_wait(page, name)
  await add_merchant(page, merch_name)
  await page.getByRole('button', {name: 'View'}).click()
  await page.getByRole('button', {name: 'Locations'}).click()
  await add_location(page, location_name, location_id)
  await expect(page.locator(`tr:has-text('${location_name}')`)).toBeVisible()
  await delete_location(page)
  await duplicate_location_id(page)
  await mandatory_location(page)
}

export async function midmanagement_mids (page, text) {
  await page.getByText(text).first()
    .click(text)
  const merch_name = makerandom(10)
  const name = makerandom(10)
  await add_plan(page, name)
  await reload_wait(page, name)
  await add_merchant(page, merch_name)
  await page.getByRole('button', {name: 'View'}).click()
  await page.getByRole('button', {name: 'MIDs'}).first()
    .click()
  await page.getByRole('button', {name: 'Add Visa MID'}).first()
    .click()
  await page.getByLabel('MID', {exact: true}).click()
  await page.getByLabel('MID', {exact: true}).fill(makerandom(5))
  await page.getByLabel('BIN').click()
  await page.getByLabel('BIN').fill((Math.floor(Math.random() * 90000) + 10000).toString())

  await page.getByRole('button', {name: 'Add MID'}).first()
    .click()
  await page.getByLabel('group-checkbox').click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await page.getByRole('button', {name: 'Delete MID'}).click()
}

export async function add_psimi (page, psimi) {
  await page.getByRole('button', {name: 'View'}).click()
  await page.getByRole('button', {name: 'PSIMIs'}).click()
  await page.getByRole('button', {name: 'Add Visa PSIMI'}).click()
  await page.getByLabel('PSIMI', {exact: true}).click()
  await page.getByLabel('PSIMI', {exact: true}).fill(psimi)
  await page.getByRole('button', {name: 'Add PSIMI'}).click()
  await expect(page.locator(`tr:has-text('${psimi}')`)).toBeVisible()
}

export async function add_secondary_mids (page, secondary_mid) {
  // await page.getByRole('button', {name: 'View'}).click()
  await page.getByRole('button', {name: 'Secondary MIDs'}).click()
  await page.getByRole('button', {name: 'Add Visa Secondary MID'}).click()
  await page.getByLabel('Secondary MID', {exact: true}).click()
  await page.getByLabel('Secondary MID', {exact: true}).fill(secondary_mid)
  await page.getByRole('button', {name: 'Add Secondary MID'}).click()
  await expect(page.locator(`tr:has-text('${secondary_mid}')`)).toBeVisible()
}

export async function delete_secondary_mids (page) {
  await page.getByLabel('group-checkbox').click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await page.getByRole('button', {name: 'Delete Secondary MID'}).click()
}

export async function delete_psimi (page) {
  await page.getByLabel('group-checkbox').click()
  await page.getByRole('button', {name: 'Delete'}).click()
  await page.getByRole('button', {name: 'Delete PSIMI'}).click()
}

export async function midmanagement_PSIMI (page, text) {
  await page.getByText(text).first()
    .click(text)
  const name = makerandom(10)
  const psimi = makerandom(10)
  await add_plan(page, name)
  await reload_wait(page, name)
  await add_merchant(page, makerandom(10))
  await add_psimi(page, psimi)
  await delete_psimi(page)
}

export async function midmanagement_secondary_mids (page, text) {
  await page.getByText(text).first()
    .click(text)
  const name = makerandom(10)
  const location_id = makerandom(10)
  const secondary_mid = makerandom(10)
  await add_plan(page, name)
  await reload_wait(page, name)
  await add_merchant(page, makerandom(10))
  await page.getByRole('button', {name: 'View'}).click()
  await page.getByRole('button', {name: 'Locations'}).click()
  await add_location(page, name, location_id)
  await add_secondary_mids(page, secondary_mid)
  await delete_secondary_mids(page)
}

// async function link_location_secondary_mid (page) {
//   const name = makerandom(10)
//   await add_plan(page, name)
// }
