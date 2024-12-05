import axios from 'axios'
import { extractCurrency, extractDescription, extractPrice } from '../utils'
import * as cheerio from 'cheerio'

export async function scrapeAmazonProduct(url:string){
    if(!url){
        return
    }

    const username = String(process.env.BRGHT_DATA_USERNAME)
    const password = String(process.env.BRGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000*Math.random())| 0

    const options = {
     auth:{ username:`${username}-session-${session_id}`,
        password,
        },
    host:'brd.superproxy.io',
    port,
    rejectUnauthorized:'false'
    }

    try {
        const response = await axios.get(url,options)
        const $ = cheerio.load(response.data)

        const title = $('#productTitle').text().trim()
        const currentPrice = $('.a-offscreen').text().trim().split('$')[1]
        
        function extractOriginalPrice (input:string){
            const listPriceIndex = input.indexOf("List Price: $");

// If "List Price:" is found in the string
if (listPriceIndex !== -1) {
    // Extract the substring starting after "List Price:"
    const listPricePart = input.substring(listPriceIndex + "List Price: $".length).trim();

    // Find the first space or end of the string after the price
    const price = listPricePart.split(" ")[0];
    return price
} else {
    return null
}
        }
        const originalPrice = extractOriginalPrice($('.aok-offscreen').text().trim())
        const outOfStock = $('#availability span').text().trim().toLowerCase() ==='currently unavailable'
        const images = $('#imgBlkFront').attr('data-a-dynamic-image')||
        $('#landingImage').attr('data-a-dynamic-image')||'{}'
        const imageUrls = Object.keys(JSON.parse(images))
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"")
        const description = extractDescription($)
        const data = {
           url,
           currency: currency||'$' ,
           image:imageUrls[0],
           title,
           currentPrice: Number(currentPrice) || Number(originalPrice),
           originalPrice: Number(originalPrice) || Number(currentPrice),        
           priceHistory:[],
           discountRate:Number(discountRate),
           category:'category',
           reviewCount:100,
           stars:4.5,
           isOutOfStock:outOfStock,
           description,      lowestPrice: Number(currentPrice) || Number(originalPrice),
           highestPrice: Number(originalPrice) || Number(currentPrice),
           averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        return data
    } catch (error:any) {
        throw new Error(`Failed to scrape product:${error.message}`)
    }
}