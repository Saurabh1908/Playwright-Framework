import { LoginPage } from '../pages/LoginPage'
import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/ProductPage'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test data/products'


test.describe('Product Page Validation', () => {
    let loginPage
    let productPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test('Validate Logout Functionality', async ({ page }) => {
        await productPage.logOut()
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible()
    })

    test('Validate About Functionality', async ({ page }) => {
        await productPage.openAboutPage()
        await expect(page.locator(ProductPageLocators.requestDemo)).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(3000)
        await expect(page.locator(ProductPageLocators.tryItFree)).toBeVisible()
        await page.goBack()
        await expect(page.locator(ProductPageLocators.settingIcon)).toBeVisible()

    })

    test('Validate Product Page Details', async ({ page }) => {
        await productPage.validateAllProductDisplayed()
        // await page.waitForTimeout(4000)
        // await productPage.addFirstProductToCart()
        await page.waitForLoadState('networkidle');
        await productPage.addAllProductsToCart()
        await page.waitForTimeout(4000)

    })

    test('Adding Specific Products to Cart', async ({ page }) => {
        await productPage.addSpecificProductToCart(productsToCart)
        await page.waitForTimeout(4000)

    })

    test('Filter By Name A to Z', async () => {
        await productPage.filterByNameAtoZ()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort()
        expect(names).toEqual(sorted)

    })

    test('Filter By Name Z to A', async () => {
        await productPage.filterByNameZtoA()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort().reverse()
        expect(names).toEqual(sorted)

    })

    test('Filter By Price Low to High', async () => {
        await productPage.filterByLowtoHigh()
        const prices = await productPage.getProductPrices()
        const sortedPrices = [...prices].sort((a,b)=>a-b)
        expect(prices).toEqual(sortedPrices)

    })

    test('Filter By Price High to Low', async () => {
        await productPage.filterByHightoLow()
        const prices = await productPage.getProductPrices()
        const sortedPrices = [...prices].sort((a,b)=> b-a)
        expect(prices).toEqual(sortedPrices)

    })

})