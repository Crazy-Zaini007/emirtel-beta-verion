import {useState} from 'react'
import { useAuthContext } from "./UserContextHook";

export default function SignupHook() {
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const [mySuccess,setMySuccess]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])
    const {dispatch}=useAuthContext()
    const apiUrl = process.env.REACT_APP_API_URL;

    const userSignup=async( name, email,contact,city,address, password)=>{
        setLoading(true)
        setSuccess(false)
        setMySuccess(false)
            try {
                const response=await fetch(`${apiUrl}/auth/user/join/register`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ name, email,contact,city,address, password})
                })
        
                const json=await response.json()
                if(!response.ok){
                    setLoading(false)
                    setError(json.message)
                    setEmptyFields(json.emptyFields)
                    setSuccess(false)
                    setMySuccess(false)
                }
                if(response.ok){
                    alert(json.message)
                    setLoading(false)
                    setError(null)
                    setEmptyFields([' '])
                    setSuccess(json.message)
                    setMySuccess(true)
                      localStorage.setItem('user', JSON.stringify(json))
                     
                      dispatch({type: 'USER_LOGIN', payload:json})
                }
               } catch (error) {
                setError('Server is not responding')
                setLoading(false)
               }
       
    }
  return {isLoading,error,success,setSuccess,mySuccess,emptyFields,userSignup}
}
