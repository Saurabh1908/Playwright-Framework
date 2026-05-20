import { page } from '@playwright/test'
import { FinalPageLocators } from '../locators/finalPageLocators'

export class FinalPage
{
    constructor(page)
    {
        this.page = page
    }

    async getFinalPageElements()
    {
        return{
            pageInfo : this.page.locator(FinalPageLocators.pageInfo),
            successMsg : this.page.locator(FinalPageLocators.successMsg),
            backHomeButton : this.page.locator(FinalPageLocators.backHomeButton)
        }
    }

    async getSuccessMsg()
    {
        const text = await this.page.locator(FinalPageLocators.successMsg).textContent()
        return text
    }

    async clickonBackHomeButton()
    {
        await this.page.locator(FinalPageLocators.backHomeButton).click()
    }
}