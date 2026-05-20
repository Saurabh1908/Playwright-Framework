import { ProductPageLocators } from "../locators/ProductPageLocators";
import { page } from '@playwright/test'


export class ProductPage
{
   constructor(page)
   {
    this.page = page
   }

   async logOut()
   {
    await this.page.click(ProductPageLocators.settingIcon)
    await this.page.click(ProductPageLocators.logoutLink)
   }

   async openAboutPage()
   {
    await this.page.click(ProductPageLocators.settingIcon)
    await this.page.click(ProductPageLocators.aboutLink)
   }

   async validateAllProductDisplayed()
   {
      const name = await this.page.locator(ProductPageLocators.productNames).allTextContents()
      const description = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
      const price = await this.page.locator(ProductPageLocators.productPrices).allTextContents()
      const buttonCount = await this.page.getByText(ProductPageLocators.addToCartButton).count()

      console.log(name.length)
      console.log(description.length)
      console.log(price.length)
      console.log(buttonCount)
      if(names.length ===0)
       throw new Error('No Product Found')
      
      if(name.length !== description.length || name.length !== price.length || name.length !== buttonCount)
         throw new Error('Product Details Mismatch')
   }

   async addFirstProductToCart()
   {
      await this.page.locator(ProductPageLocators.addToCartButton).first().click()
   }

   async addAllProductsToCart()
   {
      const buttons = await this.page.locator(ProductPageLocators.addToCartButton)
   
      const count = await buttons.count()
      console.log(count)
      


      // for(let i=0;i<count;i++)
      // {
      //    await buttons.nth(i).click()
      //    await this.page.waitForTimeout(7000)
         
      // }
       while (await buttons.count() > 0) 
         {
            await buttons.first().click();
         }
      
   }

   async addSpecificProductToCart(productName)
   {
      const addProducts = await this.page.locator(ProductPageLocators.productNames)
      const count = await addProducts.count()

      for(let i=0;i<count;i++)
      {
         const name = await addProducts.nth(i).textContent()
         if(name?.trim().includes(productName))
         {
            await this.page.locator(ProductPageLocators.addToCartButton).nth(i).click()
            await this.page.waitForTimeout(7000)
         }
      }
   }

   async filterByNameAtoZ()
   {
      await this.page.selectOption(ProductPageLocators.filterDropDown,"az")
   }
   async filterByNameZtoA()
   {
      await this.page.selectOption(ProductPageLocators.filterDropDown,"za")
      
   }
   async filterByLowtoHigh()
   {
      await this.page.selectOption(ProductPageLocators.filterDropDown,"lohi")
   
   }
   async filterByHightoLow()
   {
      await this.page.selectOption(ProductPageLocators.filterDropDown,"hilo")
      await this.page.waitForTimeout(3000)
   }

   async getProductNames()
   {
      return this.page.locator(ProductPageLocators.productNames).allTextContents()
   }

   async getProductPrices()
   {
      const prices = await this.page.locator(ProductPageLocators.productPrices).allTextContents()
      return prices.map(price =>parseFloat(price.replace('$','')))
   }

   async clickOnCartLink()
   {
      await this.page.locator(ProductPageLocators.cartLink).click()
   }

   async getFirstProductDetails()
   {
      const name = await this.page.locator(ProductPageLocators.productNames).first().textContent()
      const description = await this.page.locator(ProductPageLocators.productDescription).first().textContent()
      const price = await this.page.locator(ProductPageLocators.productPrices).first().textContent()
      
      return {
         name : name.trim(),
         description : description.trim(),
         price : price.trim()
      }
   }

   async getAllProductDetails()
   {
      const allNames = await this.page.locator(ProductPageLocators.productNames).allTextContents()
      const allDescriptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
      const allPrices = await this.page.locator(ProductPageLocators.productPrices).allTextContents()

      const allProducts =allNames.map((_,i)=>
      ({
         name : allNames[i].trim(),
         description : allDescriptions[i].trim(),
         price : allPrices[i].trim()
      }))
      return allProducts
   }

   
   async getSpecificProductDetails(productName)
   {
      const allNames = await this.page.locator(ProductPageLocators.productNames).allTextContents()
      const allDescriptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents()
      const allPrices = await this.page.locator(ProductPageLocators.productPrices).allTextContents()

      const allProducts =allNames.map((_,i)=>
      ({
         name : allNames[i].trim(),
         description : allDescriptions[i].trim(),
         price : allPrices[i].trim()
      }))
      return allProducts.filter(p => p.name.includes(productName))
   }

}

