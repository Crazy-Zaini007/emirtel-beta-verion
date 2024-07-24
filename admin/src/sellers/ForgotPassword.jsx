import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import {useNavigate} from 'react-router-dom'
import RiseLoader from "react-spinners/RiseLoader";
import { useAuthContext } from '../hooks/UserContextHook'
export default function ForgotPassword() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const[loading,setLoading]=useState(false)
    const[success,setSuccess]=useState('')
    const[error,setError]=useState('')
    const apiUrl = process.env.REACT_APP_API_URL;
    const { seller } = useAuthContext()


    // fetching Signup hook to register a new seller
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(password===confirmPassword){
            setLoading(true)
            setSuccess(false)
                try {
                    const response=await fetch(`${apiUrl}/auth/admin/join/forgot_password`,{
                        method:'PATCH',
                        headers:{
                            'Content-Type':'application/json',
                           
                        },
                        body:JSON.stringify({email,password})
                    })
            
                    const json=await response.json()
                    if(!response.ok){
                        setLoading(false)
                        setError(json.message)
        
                        setSuccess(false)
                    }
                    if(response.ok){    
                        setLoading(false)
                        setError(null)
                        setSuccess(json.message)
                        alert(json.message)
                        navigate('/emirtel/login_admin')
                    }
                   } catch (error) {
                    setError('Server is not responding',error)
                setLoading(false)
                
    
                   }    
        }
        else{
            setError('Passwords are not same')
        }
    
    }



// Show and hide password
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
  const passwordInput = $('#password-input');
  if (showPassword) {
    passwordInput.attr('type', 'password');
  } else {
    passwordInput.attr('type', 'text');
  }

  const confirmPassword=$('#confirm-password')
  if (showPassword) {
    confirmPassword.attr('type', 'password');
  } else {
    confirmPassword.attr('type', 'text');
  }
}

    return (
        <>
            <div className='container  mt-5'>
                <div className="row justify-content-center  mt-5">
                    <div className='col-lg-6 col-md-8 py-md-2 col-sm-12 my-md-2 signup_form  px-md-5'>
                        <form onSubmit={handleSubmit} className='mt-3 py-md-3 pt-3'>
                            <h4 className='my-3 text-center'>Update your account password</h4>
                            <div className="images">
                          
                            </div>
            
                                        {success && <p className='text-center success-m mt-1'>{success}</p> }
                                        {error && <p className='text-center error-m mt-1'>{error}</p>}

                                    <div className="mb-1">
                                        <label htmlFor="" >Email</label>
                                        <input type="email" required aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className="mb-0">
                                       
                                       <label htmlFor="">New Password</label>
                                       <input type="password" id='password-input' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                                       <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                         
                                   </div>
                                   <div className="mb-0">
                                       
                                       <label htmlFor="">Re-enter Password</label>
                                       <input type="password"   id='confirm-password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                                       <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                         
                                   </div>
                                     <div className='text-end'>
                                        <button type='submit' disabled={loading} className="btn my-3 shadow px-3 mx-1" >{loading ? <RiseLoader  color="#FFFFFF" size={6} /> : <>Update Password</>}</button>
                                        </div>
                                

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
