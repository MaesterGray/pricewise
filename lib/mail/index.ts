"use server"

import {  EmailProductInfo, NotificationType } from '@/types';
import { MailerSend, Sender,Recipient ,EmailParams} from 'mailersend';



export const sendEmail = async (type:NotificationType,product:EmailProductInfo,userEmails:string[]) => {
 
  const THRESHOLD_PERCENTAGE = 40
  const mailerSend = new MailerSend({apiKey:process.env.MAILER_SEND_API_KEY})
  const sentFrom = new Sender('chike@trial-3vz9dle8331lkj50.mlsender.net','Chike')
  const recipients = []
  
  userEmails.forEach((email)=>{
    recipients.push(new Recipient(email))
  })
  const emailParams = new EmailParams()
    .setFrom( sentFrom)
    .setTo(recipients)
  let html
  switch(type){
    case 'WELCOME':
      html = `
        <div>
          <h2>Welcome to PriceWise 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `
      emailParams.setSubject(type)
      emailParams.setHtml(html)
      break
      
      case 'CHANGE_OF_STOCK':
      html = `
        <div>
          <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      emailParams.setSubject(type)
      emailParams.setHtml(html)
      break 
      case 'LOWEST_PRICE':
      html =  `
      <div>
        <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
        <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
      </div>
    `
      emailParams.setSubject(type)
      emailParams.setHtml(html)
      break;
      case 'THRESHOLD_MET':
        html = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `
        emailParams.setSubject(type)
        emailParams.setHtml(html)
      break;
      default:
        throw new Error('Invalid Notification type.')
  }
     
      emailParams .from.email='MS_uFLGPb@trial-3vz9dle8331lkj50.mlsender.net'
    return mailerSend.email.send(emailParams)
 

}