import React from 'react'
import { TemailTemplate } from './types'
const ThresholdTemplate:React.FC<Readonly<TemailTemplate>> = ({title,url,THRESHOLD_PERCENTAGE}) => {
  return (
    <div>
          <h4>Hey, {title} is now available at a discount more than {THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href={url} target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>  )
}

export default ThresholdTemplate