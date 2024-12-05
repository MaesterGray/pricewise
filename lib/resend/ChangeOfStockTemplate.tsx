import React from 'react'
import { TemailTemplate } from './types'
const ChangeOfStockTemplate:React.FC<Readonly<TemailTemplate>> = ({title,url}) => {
  return (
    <div>
    <h4>Hey, {title} is now restocked! Grab yours before they run out again!</h4>
    <p>See the product <a href={url} target="_blank" rel="noopener noreferrer">here</a>.</p>
  </div>
  )
}

export default ChangeOfStockTemplate