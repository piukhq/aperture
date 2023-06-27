const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function login(page, email, password) {
    await page.getByLabel('Email').click()
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', {name: 'Verify Credentials'}).click()
    await delay(3000)
}

export async function delete_cred(page) {
    for ( const item of await page.getByRole('button', {name: 'Remove Credentials'}).all())
        await item.click();
}

export async function check_cred(page, text) {
    await page.getByText(text).click(text)
    if ((await page.getByLabel('Email').isVisible())) {
        await login(page, 'tviknarajah+portal@bink.com', 'Password1')
        // await page.getByRole('button', {name: 'Remove Credentials'}).click()
        await delete_cred(page)
    }
    else if ((await page.getByRole('button', {name: 'Credentials'}).isVisible())) {
        await page.getByRole('button', {name: 'Credentials'}).click()
        await login(page, 'tviknarajah+portal@bink.com', 'Password1')
        await delete_cred(page)

    } 
}