import {test} from '@playwright/test'
import {check_cred, check_wallet, midmanagement_location, midmanagement_plan, authenticate} from './functions'

test('asset comparator', async ({page}) => {
  await authenticate(page)
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of asset comparator')
  await check_cred(page, 'Asset Comparator')
})

test('plan comparator', async ({page}) => {
  await authenticate(page)
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of plan comparator')
  await check_cred(page, 'Plan Comparator')
})

test('customer wallet', async ({page}) => {
  await authenticate(page)
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of customer wallet')
  await check_wallet(page, 'Customer Wallets')
})

test('midmanagement plan', async ({page}) => {
  await authenticate(page)
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of midmanagement plan')
  await midmanagement_plan(page, 'Mid Directory')
})

test('midmanagement location', async ({page}) => {
  await authenticate(page)
  await page.goto('https://portal.staging.gb.bink.com/')
  console.log('testing verification of midmanagement location')
  await midmanagement_location(page, 'Mid Directory')
})
