import axios from 'axios'
import { extractPrice } from '../utils'
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
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealPrice'),
            $(.a-size-basename.)
        )
        console.log( title,currentPrice)
    } catch (error:any) {
        throw new Error(`Failed to scrape product:${error.message}`)
    }
}