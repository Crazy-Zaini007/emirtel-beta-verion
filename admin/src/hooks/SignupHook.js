import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function SignupHook() {
    const navigate=useNavigate()
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])
    const apiUrl = process.env.API_URL;
    
    // fetching api end-point to register a new seller
    const sellerSignup=async( email,role, userName, password,cpassword,code)=>{
        setLoading(true)
        setSuccess(false)
        if(password===cpassword){
            try {
                const response=await fetch(`${apiUrl}/auth/admin/join/register`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ email,role, userName, password,code})
                })
        
                const json=await response.json()
                if(!response.ok){
                    setLoading(false)
                    setError(json.message)
                    setEmptyFields(json.emptyFields)
                    setSuccess(false)
                }
                if(response.ok){
                    setLoading(false)
                    setError(null)
                    setEmptyFields([' '])
                    setSuccess(json.message)
                    console.log(success)
                    setTimeout(() => {
                navigate('/emirtel/login_admin')
                        
                    }, 2000);
                }
               } catch (error) {
                setError('Server is not responding')
            setLoading(false)

               }
        
        }

        else{
            setError('Passwords do not match')
            setLoading(false)
        }
       
    }
  return {isLoading,error,success,emptyFields,sellerSignup}
}
