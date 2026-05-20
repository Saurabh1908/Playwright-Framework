import { LoginLocators } from "../locators/LoginLocators"
import { page } from '@playwright/test'

export class LoginPage
{
    constructor(page)
    {
        this.page = page

    }

    async login(username,password)
    {
        await this.page.fill(LoginLocators.userNameInput,username)
        await this.page.fill(LoginLocators.passwordInput,password)
        await this.page.click(LoginLocators.loginButton)
    }
}