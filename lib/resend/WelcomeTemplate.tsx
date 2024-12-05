import React from 'react';
import { TemailTemplate } from './types';

export const WelcomeTemplate:React.FC<Readonly<TemailTemplate>> = ({title,url,}) => {
  return (
    <div>
    <h2>Welcome to PriceWise 🚀</h2>
    <p>You are now tracking {title}</p>
    <p>Here's an example of how you'll receive updates:</p>
    <div style={{border:'1px solid #ccc',
                padding:'10px',
                backgroundColor:'#f8f8f8'}}>
      <h3>{title} is back in stock!</h3>
      <p>We're excited to let you know that {title} is now back in stock.</p>
      <p>Don't miss out - <a href={url}  target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
      <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style={{maxWidth:100}} />
    </div>
    <p>Stay tuned for more updates on ${title} and other products you're tracking.</p>
  </div>  
  )
}

export default WelcomeTemplate