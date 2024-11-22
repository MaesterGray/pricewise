"use client"
import { FormEvent, useState } from "react"


const Searchbar = () => {
const [searchPrompt,setSearchPrompt]= useState('')
const [isLoading,setIsLoading]= useState(false)

const isValidAmazonProductUrl = (url:string)=>{
    try{
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname

            if (hostname.includes('amazon.com')||
                hostname.includes('amazon.')||
                hostname.endsWith('amazon')
                 )  {
                       return true    
                     }
    }catch{
        return false
    }
    return false
}

const handleSubmit  = (event:FormEvent<HTMLFormElement>)=>{
event.preventDefault()

const isValidLink = isValidAmazonProductUrl(searchPrompt)

alert(isValidLink?'Valid Link':'Invalid Link')

if(!isValidLink) return alert('Please provide a valid Amazon Lnk')
try {
    setIsLoading(true)
} catch (error) {
    console.log(error)
}finally{
    setIsLoading(false)
}
}

  return (
        <form className=' flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
        >
            <input
             type="text"
             value={searchPrompt} 
             placeholder="Enter product link"
            className=" searchbar-input"
            />
            <button 
            type="submit" 
            className="searchbar-btn" 
            disabled={searchPrompt===''}
            >
                {isLoading?'Searching...':'Search'}
                </button> 
        </form>
)
}

export default Searchbar