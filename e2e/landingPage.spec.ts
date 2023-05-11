import {test, expect} from '@playwright/test'

test('has title', async ({page}) => {
  // Expect a title "to contain" a substring.
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/Aperture Home/)
})


// test('get started link', async ({page}) => {
//   await page.goto('https://playwright.dev/')

//   // Click the get started link.
//   await page.getByRole('link', {name: 'Get started'}).click()

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/)
// })
