import {useState} from 'react'
import { useAuthContext } from "./UserContextHook";

export default function SignupHook() {
    const [isLoading1,setLoading]=useState(false)
    const [error1,setError1]=useState(null)
    const [success1,setSuccess1]=useState(null)
    const [mySuccess1,setMySuccess1]=useState(null)
    const[emptyFields1,setEmptyFields1]=useState([])
    const {dispatch}=useAuthContext()
    
    const apiUrl = process.env.API_URL;

    const userLogin=async( email1, password1)=>{
        setLoading(true)
        setSuccess1(false)
        setMySuccess1(false)
            try {
                const response=await fetch(`${apiUrl}/auth/user/join/login`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ email1,password1})
                })
        
                const json=await response.json()
                if(!response.ok){
                    setLoading(false)
                    setError1(json.message)
                    setEmptyFields1(json.emptyFields)
                    setSuccess1(false)
                    setMySuccess1(false)

                }
                if(response.ok){
                    setLoading(false)
                    setError1(null)
                    setEmptyFields1([' '])
                    setSuccess1(json.message)
                    setMySuccess1(true)
                     // save the user to the local Storage
                     localStorage.setItem('user', JSON.stringify(json))
                     // update the auth Context
                     dispatch({type: 'USER_LOGIN', payload:json})
                }
               } catch (error) {
                setError1('Server is not responding')
                setLoading(false)
               }
       
    }
  return {isLoading1,error1,mySuccess1,success1,setSuccess1,emptyFields1,userLogin}
}
