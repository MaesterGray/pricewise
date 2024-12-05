import React from 'react'
import { TemailTemplate } from './types'

const LowestPriceTemplate:React.FC<Readonly<TemailTemplate>> = ({title,url}) => {
  return (
        <div>
          <h4>Hey, {title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href={url} target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>  )
}

export default LowestPriceTemplate