import { page } from '@playwright/test'
import { CartPageLocators } from "../locators/cartPageLocators"

export class CartPage {
    constructor(page) {
        this.page = page
    }


    async clickOnContinueShopping() {
        // console.log(CartPageLocators)
        // console.log(cartPage); // should not be undefined
        // console.log(cartPage.continueShoppingbtn)
        await this.page.locator(CartPageLocators.continueShoppingbtn).click()
        await this.page.waitForTimeout(3000)
       
    }

    async getCartPageElements() {
    return {
        cartTitle: this.page.locator(CartPageLocators.cartTitle),
        shoppingCart: this.page.locator(CartPageLocators.continueShopingbtn),
        checkoutbutton: this.page.locator(CartPageLocators.checkoutButton)
    }
}

    async getCartProducts() {
        const allNames = await this.page.locator(CartPageLocators.productNames).allTextContents()
        const allDescriptions = await this.page.locator(CartPageLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(CartPageLocators.productPrices).allTextContents()

        const allCartProducts = allNames.map((_, i) =>
        ({
            name : allNames[i].trim(),
            description : allDescriptions[i].trim(),
            price : allPrices[i].trim()
        }))
        return allCartProducts

    }

    async removeFirstproduct(){
        await this.page.locator(CartPageLocators.removeButton).first().click()
    }

    async clickChekoutButton(){
        await this.page.locator(CartPageLocators.checkoutButton).click()
    }



}



