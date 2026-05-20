import { page } from '@playwright/test'
import { CheckoutOverviewLocators } from '../locators/checkoutOverviewLocators'


export class CheckoutPageOverview
{
    constructor(page)
    {
        this.page = page
    }

    async getCheckoutOverviewElements()
    {
        return{
            pageInfo : this.page.locator(CheckoutOverviewLocators.pageInfo),
            cancelButton : this.page.locator(CheckoutOverviewLocators.cancelButton),
            finishButton : this.page.locator(CheckoutOverviewLocators.finishButton)

        }
    }

    async getOverviewProducts()
    {
        const allNames = await this.page.locator(CheckoutOverviewLocators.productNames).allTextContents()
                const allDescriptions = await this.page.locator(CheckoutOverviewLocators.productDescription).allTextContents()
                const allPrices = await this.page.locator(CheckoutOverviewLocators.productPrices).allTextContents()
        
                const allCartProducts = allNames.map((_, i) =>
                ({
                    name : allNames[i].trim(),
                    description : allDescriptions[i].trim(),
                    price : allPrices[i].trim()
                }))
                return allCartProducts
    }

    // async getItemtotal()
    // {
    //     const text = await this.page.locator(CheckoutOverviewLocators.itemTotal).textContent()
    //     // return parseFloat(text.replace("Item total: $","").trim())
    //     return parseFloat(text.replace(/[^0-9.]/g, "").trim());

    // }
    async getItemtotal() 
    {
        const text = await this.page.locator(CheckoutOverviewLocators.itemTotal).textContent();
        console.log("DEBUG ItemTotal text:", text); // 👀 check actual string
        return parseFloat(text.replace(/[^0-9.]/g, ""));
    }


    async getItemTax()
    {
        const text = await this.page.locator(CheckoutOverviewLocators.tax).textContent()
        // return parseFloat(text.replace("Tax: $","").trim())
        return parseFloat(text.replace(/[^0-9.]/g, "").trim());
    }

    async getTotal()
    {
        const text = await this.page.locator(CheckoutOverviewLocators.total).textContent()
        // return parseFloat(text.replace("Total: $","").trim())
        return parseFloat(text.replace(/[^0-9.]/g, "").trim());
    }

    async clickOnCancel()
    {
        await this.page.locator(CheckoutOverviewLocators.cancelButton).click()
    }

    async clickOnFinish()
    {
        await this.page.locator(CheckoutOverviewLocators.finishButton).click()
    }


}