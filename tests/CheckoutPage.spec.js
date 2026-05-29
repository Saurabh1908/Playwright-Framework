import { LoginPage } from '../pages/LoginPage'
import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/ProductPage'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test data/products'
import { CartPage } from '../pages/CartPage'
import { CartPageLocators }  from '../locators/cartPageLocators'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CheckoutPageLocators } from '../locators/checkoutPageLocators'
import { checkoutData } from '../test data/checkoutData'


test.describe('Cart Page Validation', () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
    })

    test('Validate Chekout page UI elements and URL',async({page})=>
    {
        await cartPage.clickChekoutButton()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        const elements = await checkoutPage.getCheckoutElements()
        expect(elements.cancel).toBeVisible()
        expect(elements.pageInfo).toBeVisible()
        expect(elements.continue).toBeVisible()
    })

    test('Validate Cancel button functionality',async({page})=>
    {
        await cartPage.clickChekoutButton()
        await checkoutPage.clickCancalButton()
        expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

    })

    test('Validate Continue button functionality',async({page})=>
    {
        await cartPage.clickChekoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode)
        await checkoutPage.clickContinueButton()
    })

    test('Validate the error when clicking on continue with no data',async({page})=>
    {
        await cartPage.clickChekoutButton()
        await checkoutPage.clickContinueButton()
        const error = await checkoutPage.getErrorMessage()
        expect(error.trim()).toBe('Error: First Name is required')
    })

    
})