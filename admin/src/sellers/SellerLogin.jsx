import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import LoginHook from '../hooks/LoginHook';
import RiseLoader from "react-spinners/RiseLoader";


export default function SellerSignup() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {isLoading,error,success,emptyFields,sellerLogin}=LoginHook()
    // fetching Signup hook to register a new seller
    
    const handleSignup=async(e)=>{
        e.preventDefault()

        sellerLogin(email, password)
        
       
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
                        <form onSubmit={handleSignup} className='mt-3 py-md-3 pt-3'>
                            <h4 className='my-3 text-center'>Login Now</h4>
                            <p className='text-center'>Not a seller? <Link to='/'>Register Now</Link></p>

                            <div className="images">
                          
                            </div>
            
                                        {success && <p className='text-center success-m mt-1'>{success}</p> }
                                        {error && <p className='text-center error-m mt-1'>{error}</p>}

                                    <div className="mb-1">
                                        <label htmlFor="" >Email</label>
                                        <input type="email"  className={Array.isArray(emptyFields) && emptyFields.includes('email') ? 'error' : ''} aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    
                                    
                                    <div className="mb-0">
                                       
                                       <label htmlFor="">Password</label>
                                       <input type="password"  className={Array.isArray(emptyFields) && emptyFields.includes('password') ? 'error' : ''} id='password-input' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                       <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                           <p className='text-end my-0 forgot'> <Link>Forgot Password?</Link></p>
                                   </div>

                                   
                                   
                                     <div className='text-end'>
                                        <button type='submit' disabled={isLoading} className="btn my-3 shadow px-3 mx-1" >{isLoading ? <RiseLoader  color="#FFFFFF" size={6} /> : <>Login to your account</>}</button>
                                        </div>
                                

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
