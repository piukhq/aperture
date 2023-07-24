import {test} from '@playwright/test'
import {check_cred,check_wallet,midmanagement_location,midmanagement_plan} from './functions'

const authFile = 'playwright/.auth/user.json'


test('authenticate', async ({page}) => {
  // // Perform authentication steps. For example:
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('authenticating')
  await page.getByLabel('Enter your Organization Name').click()
  await page.getByLabel('Enter your Organization Name').fill('bink')
  await page.getByRole('button', {name: 'Continue'}).click()
  await page.getByRole('button', {name: 'Continue with Bink'}).click()
  await page.getByPlaceholder('Email, phone, or Skype').fill('auth0_test2@bink.com')
  await page.getByPlaceholder('Email, phone, or Skype').press('Enter')
  await page.getByPlaceholder('Password').click()
  await page.getByPlaceholder('Password').fill('Shove9117')
  await page.getByPlaceholder('Password').press('Enter')
  // End of authentication steps.

  // await page.goto('https://portal.staging.gb.bink.com/')
  // console.log('testing verification of asset comparator')
  // await check_cred(page, 'Asset Comparator')

  // await page.goto('https://portal.staging.gb.bink.com/')
  // console.log('testing verification of plan comparator')
  // await check_cred(page, 'Plan Comparator') 

  // await page.goto('https://portal.staging.gb.bink.com/')
  // console.log('testing verification of customer wallet')
  // await check_wallet(page, 'Customer Wallets') 

  // await page.goto('https://portal.staging.gb.bink.com/')
  // console.log('testing verification of midmanagement plan')
  // await midmanagement_plan(page, 'Mid Directory')

  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of midmanagement location')
  await midmanagement_location(page, 'Mid Directory')

})
