import { LoginPage } from '../pages/LoginPage'
import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/ProductPage'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test data/products'
import { CartPage } from '../pages/CartPage'
import { CartPageLocators } from '../locators/cartPageLocators'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CheckoutPageLocators } from '../locators/checkoutPageLocators'
import { checkoutData } from '../test data/checkoutData'
import { CheckoutOverviewLocators } from '../locators/checkoutOverviewLocators'
import { CheckoutPageOverview } from '../pages/CheckoutPageOverview'


test.describe('CheckoutOverview Page Validation', () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage
    let checkoutPageOverview

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutPageOverview = new CheckoutPageOverview(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await cartPage.clickChekoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.clickContinueButton()
    })

    test('Validate Checkout Overview Page UI and URL', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        const elements = await checkoutPageOverview.getCheckoutOverviewElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.cancelButton).toBeVisible()
        await expect(elements.finishButton).toBeVisible()

    })

    test('Validate the Cancel Button Functionality', async ({ page }) => {
        await checkoutPageOverview.clickOnCancel()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Validate the Item total Calculation', async ({ page }) => {
        const overviewProducts = await checkoutPageOverview.getOverviewProducts()
        // const calcultedTotal = overviewProducts.reduce((sum,{price})=> sum+parseFloat(price.replace("$","")),0)
        const calcultedTotal = overviewProducts.reduce((sum, { price }) => sum + parseFloat(price.replace(/[^0-9.]/g, "")), 0)
        const UIItemTotal = await checkoutPageOverview.getItemtotal()  
        expect(calcultedTotal).toBe(UIItemTotal)


    })

    test('Validate Final Total(Itemtotal+Tax)',async({page})=>
    {
        const itemtotal = await checkoutPageOverview.getItemtotal()
        const tax = await checkoutPageOverview.getItemTax()
        const finalTotal = await checkoutPageOverview.getTotal()

        const expectedFinalTotal = itemtotal+tax
        console.log('Expected Total is',expectedFinalTotal)
        console.log('Final Total is',finalTotal)
        await expect(finalTotal).toBe(expectedFinalTotal)
    })



})