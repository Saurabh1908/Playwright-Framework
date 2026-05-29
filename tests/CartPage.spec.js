import { LoginPage } from '../pages/LoginPage'
import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/ProductPage'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { LoginLocators } from '../locators/LoginLocators'
import { ProductPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test data/products'
import { CartPage } from '../pages/CartPage'
import { CartPageLocators }  from '../locators/cartPageLocators'


test.describe('Cart Page Validation', () => {
    let loginPage
    let productPage
    let cartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)

        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test('Validate Cart Page URL and UI elements',async({page})=>
    {
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        
        const ui = cartPage.getCartPageElements()
        await expect((await ui).cartTitle).toBeVisible()
        await page.waitForTimeout(2000)
        await expect((await ui).shoppingCart).toBeVisible()
        await page.waitForTimeout(2000)
        await expect((await ui).checkoutbutton).toBeVisible()
        await page.waitForTimeout(2000)
   })

    test('Validate Continue Shopping Functionality',async({page})=>
    {
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await cartPage.clickOnContinueShopping()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })

    test('Validate First Product in the cart ',async({page})=>
    {
        const firstProduct = await productPage.getFirstProductDetails()
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        const cartProducts = await cartPage.getCartProducts()
        expect(cartProducts[0]).toEqual(firstProduct)
        await page.waitForTimeout(3000)
    })

    test('Validate All Products added to the cart ',async({page})=>
    {
        const allProductDetails = await productPage.getAllProductDetails()
        await productPage.addAllProductsToCart()
        await productPage.clickOnCartLink()
        const cartProducts = await cartPage.getCartProducts()
        expect(cartProducts).toEqual(allProductDetails)
        await page.waitForTimeout(3000)
    })

    test('Validate Specific Product added to the cart ',async({page})=>
    {
        const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart)
        await productPage.addSpecificProductToCart(productsToCart)
        await productPage.clickOnCartLink()
        const cartProducts = await cartPage.getCartProducts()
        expect(cartProducts).toEqual(getSpecificProductDetails)
        await page.waitForTimeout(3000)
    })

    test('Validate Remove Functionalty',async({page})=>
    {
      await productPage.addAllProductsToCart()
      await page.waitForTimeout(4000)
      await productPage.clickOnCartLink()
      const initialProduct = await cartPage.getCartProducts()
      expect(initialProduct.length).toBeGreaterThan(0)
      await cartPage.removeFirstproduct()
      const updatedProduct = await cartPage.getCartProducts()
      expect(updatedProduct.length).toBe(initialProduct.length-1)

    })


})