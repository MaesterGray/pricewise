"use server"

import {  EmailProductInfo, NotificationType } from '@/types';
import { Resend } from 'resend';
import ChangeOfStockTemplate from './ChangeOfStockTemplate';
import LowestPriceTemplate from './LowestPriceTemplate';
import ThresholdTemplate from './ThresholdTemplate';
import WelcomeTemplate from './WelcomeTemplate';
// const Notification = {
//   WELCOME: 'WELCOME',
//   CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
//   LOWEST_PRICE: 'LOWEST_PRICE',
//   THRESHOLD_MET: 'THRESHOLD_MET',
// }


export const sendEmail = async (type:NotificationType,product:EmailProductInfo,userEmails:string[]) => {
  let templateToUse;

  switch(type){
    case 'WELCOME':
      templateToUse =WelcomeTemplate({title:product.title,url:product.url,THRESHOLD_PERCENTAGE:40});
      break
      
      case 'CHANGE_OF_STOCK':
      templateToUse = ChangeOfStockTemplate({title:product.title,url:product.url,THRESHOLD_PERCENTAGE:40})
      break 
      case 'LOWEST_PRICE':
      templateToUse = LowestPriceTemplate({title:product.title,url:product.url,THRESHOLD_PERCENTAGE:40})
      break;
      case 'THRESHOLD_MET':
        templateToUse = ThresholdTemplate({title:product.title,url:product.url,THRESHOLD_PERCENTAGE:40})

      break;
      default:
        throw new Error('Invalid Notification type.')
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const {error} = await resend.emails.send({
    from:'Chike <onboarding@pricetracker.com>',
    to:userEmails,
    subject:type,
    react:templateToUse
  })

  if (error) {
console.log(error)
  }
}