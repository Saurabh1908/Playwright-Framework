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
import { FinalPageLocators } from '../locators/finalPageLocators'
import { FinalPage } from '../pages/FinalPage'


test.describe('CheckoutOverview Page Validation', () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage
    let checkoutPageOverview
    let finalPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutPageOverview = new CheckoutPageOverview(page)
        finalPage = new FinalPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await cartPage.clickChekoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.clickContinueButton()
        await checkoutPageOverview.clickOnFinish()
    })

    test('Validate the Final Page UI and URL',async({page})=>
    {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        const elements = await finalPage.getFinalPageElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.successMsg).toBeVisible()
        await expect(elements.backHomeButton).toBeVisible()
    })

    test('Valiadte the Success Message',async({page})=>
    {
        const message = await finalPage.getSuccessMsg()
        console.log(message)
        expect(message).toBe('Thank you for your order!')
    })

    test('Validate the Back Home Functionality',async({page})=>
    {
        await finalPage.clickonBackHomeButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })


})

    

    


