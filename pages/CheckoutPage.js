import { page } from '@playwright/test'
import { CheckoutPageLocators } from '../locators/checkoutPageLocators'


export class CheckoutPage 
{
    constructor(page)
    {
        this.page = page
    }

    async getCheckoutElements()
    {
        return {
            pageInfo : this.page.locator(CheckoutPageLocators.pageInfo),
            cancel   : this.page.locator(CheckoutPageLocators.cancelButton),
            continue : this.page.locator(CheckoutPageLocators.continueButton)

        }
    }

    async fillCheckoutDetails(firstName,lastName,postalCode)
    {
        await this.page.fill(CheckoutPageLocators.firstName,firstName)
        await this.page.fill(CheckoutPageLocators.lastName,lastName)
        await this.page.fill(CheckoutPageLocators.postalCode,postalCode)

    }

    async clickCancalButton()
    {
        await this.page.click(CheckoutPageLocators.cancelButton)
    }

    async clickContinueButton()
    {
        await this.page.click(CheckoutPageLocators.continueButton)
    }

    async getErrorMessage()
    {
        return await this.page.locator(CheckoutPageLocators.errorMesg).textContent();
    }


}