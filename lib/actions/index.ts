"use server"

import { scrapeAmazonProduct } from "../scraper";
import { connectToDb } from "../mongoose";
import Product from "../models/prooduct.model";
import { getLowestPrice,getHighestPrice,getAveragePrice } from "../utils";
import { revalidatePath } from "next/cache";
import { User } from "@/types";
import { sendEmail } from "../mail";
export async function scrapeAndStoreProduct(productUrl:string){
    if (!productUrl) return;

    try{
        connectToDb()
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
        let product = scrapedProduct
        if(!scrapedProduct) return;

        const existingProduct = await Product.findOne({url:scrapedProduct.url});
        if(existingProduct) {
          const updatedPriceHistory= [
            ...existingProduct.priceHistory,
            { price: scrapedProduct.currentPrice }
          ]
          console.log(updatedPriceHistory)
          product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          }
        }
        const newProduct = await Product.findOneAndUpdate({  url:scrapedProduct.url},
            product,
            {upsert:true,new:true}
        )
        revalidatePath(`/products/${newProduct._id}`)
    }catch(error){
        throw new Error(`Failed to create/update :${error.message}`)

    }
}

export async function getProductById(productId:string){
try{
    connectToDb()
    const product = await Product.findOne({_id:productId})
    if(!product) return null;
    return product
}catch(err){
    console.error(err)
}
}


  export async function getSimilarProducts(productId: string) {
    try {
      connectToDb();
  
      const currentProduct = await Product.findById(productId);
  
      if(!currentProduct) return null;
  
      const similarProducts = await Product.find({
        _id: { $ne: productId },
      }).limit(3);
  
      return similarProducts;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getAllProducts() {
    try {
      connectToDb();
  
      const products = await Product.find();
  
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
      connectToDb()
      const product = await Product.findById(productId);
  
      if(!product) return;
  
      const userExists = product.users.some((user: User) => user.email === userEmail);
  
      if(!userExists) {
        product.users.push({ email: userEmail });
  
        await product.save();
      await sendEmail('WELCOME',{title:product.title,url:product.url},[userEmail]);
        
  
      }
    } catch (error) {
      console.log(error);
    }
  }
  
