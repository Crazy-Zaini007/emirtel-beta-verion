import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import SignupHook from '../hooks/SignupHook';
import RiseLoader from "react-spinners/RiseLoader";
// import logo from '../assets/images/logo.png'
export default function SellerSignup() {


    const [userName,setUserName]=useState('')
    const [code,setCode]=useState('')
    const [role,setRole]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')

    const {isLoading,error,success,emptyFields,sellerSignup}=SignupHook()
    // fetching Signup hook to register a new seller
    
    const handleSignup=async(e)=>{
        e.preventDefault()
            sellerSignup( email,role, userName, password,cpassword,code)
        
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
            <div className='container mt-5'>
                <div className="row justify-content-center mt-5">
                    <div className='col-lg-6 col-md-7 py-md-2 my-md-2 signup_form  px-md-5'>
                        <form onSubmit={handleSignup}>
                            <h4 className='my-3 text-center'>Signup Now</h4>
                            <p className='text-center'>Already have an account? <Link to='/emirtel/login_admin'>Login</Link></p>

                            
                                        {success && <p className='text-center success-m'>{success}</p> }
                                        {error && <p className='text-center error-m '>{error}</p>}

                                        <div className="mb-1">
                                        <label htmlFor="" >Username</label>
                                        <input type="text" value={userName}  className={Array.isArray(emptyFields) && emptyFields.includes('userName') ? 'error' : ''} onChange={(e)=>setUserName(e.target.value)} />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="" >Email</label>
                                        <input type="email"  className={Array.isArray(emptyFields) && emptyFields.includes('email') ? 'error' : ''} aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="">Role</label>
                                        <select  className={Array.isArray(emptyFields) && emptyFields.includes('role') ? 'error' : ''} value={role} onChange={(e)=>setRole(e.target.value)} >
                                            <option value="">Select your Role</option>
                                            <option value="Super Admin">Super Admin</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="" >Security Code</label>
                                        <input type="text"  className={Array.isArray(emptyFields) && emptyFields.includes('code') ? 'error' : ''} placeholder='Enter Security code provided by Super Admin'  value={code} onChange={(e)=>setCode(e.target.value)}/>
                                    </div>
                                    
                                    <div className="mb-1">
                                       
                                       <label htmlFor="">Password</label>
                                       <input type="password"  className={Array.isArray(emptyFields) && emptyFields.includes('password') ? 'error' : ''} id='password-input' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                       <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                                   </div>
                                   <div className="mb-1">
                                       <label htmlFor="" >Confirm Password</label>
                                       <input type="password" id='confirm-password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)}/>
                                   </div>
                                   
                                   <div className='text-end'>
                                        <button type='submit' disabled={isLoading} className="btn my-3 shadow px-3 mx-1" >{isLoading ? <RiseLoader  color="#FFFFFF" size={6} /> : <>Create Account</>}</button>
                                        </div>
                                

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
