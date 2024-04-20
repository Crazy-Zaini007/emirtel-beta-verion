import {useState} from 'react'
import { useAuthContext } from "./UserContextHook";

export default function LoginHook() {
    const apiUrl = process.env.API_URL;

    const {dispatch}=useAuthContext()
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    
    // fetching api end-point to register a new seller
    const sellerLogin=async(email,password)=>{
        
        setLoading(true)
        setSuccess(false)
            try {
                const response=await fetch(`${apiUrl}/auth/admin/join/login`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({email,password})
                })
        
                const json=await response.json()
                if(!response.ok){
                    setLoading(false)
                    setError(json.message)
                    setEmptyFields(json.emptyFields)
                    setSuccess(false)
                }
                if(response.ok){    
                    // save the user to the local Storage
                    localStorage.setItem('seller', JSON.stringify(json))
                    // update the auth Context
                    dispatch({type: 'SELLER_LOGIN', payload:json})
                   
                    setLoading(false)
                    setError(null)
                    setEmptyFields([' '])
                    setSuccess(json.message)
                }
               } catch (error) {
                setError('Server is not responding')
            setLoading(false)

               }
        
        

       
    }
  return {isLoading,error,success,emptyFields,sellerLogin}
}
