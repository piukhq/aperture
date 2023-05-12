import {test as setup} from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({page}) => {
  // // Perform authentication steps. For example:
  // await page.goto('http://localhost:3000/')
  // console.log('authenticating')
  // await page.getByLabel('Enter your Organization Name').click()
  // await page.getByLabel('Enter your Organization Name').fill('bink')
  // await page.getByRole('button', {name: 'Continue'}).click()
  // await page.getByRole('button', {name: 'Continue with Bink'}).click()
  // await page.getByPlaceholder('Email, phone, or Skype').fill('xxxxink.com')
  // await page.getByPlaceholder('Email, phone, or Skype').press('Enter')
  // await page.getByPlaceholder('Password').click()
  // await page.getByPlaceholder('Password').fill('xxxx')
  // await page.getByPlaceholder('Password').press('Enter')
  // await page.goto('http://localhost:3000/')

  // End of authentication steps.

  await page.context().storageState({path: authFile})
})
