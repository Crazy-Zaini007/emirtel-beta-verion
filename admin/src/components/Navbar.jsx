import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import logo from '../assets/images/logo.png'
export default function Navbar() {
    const navigate=useNavigate()
   const handleNavigate=(route)=>{
    navigate(route)
   }

    return (
        <>
            <nav className="my_navbar fixed-top mb-5">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <div className="left d-flex">
                        <Link className="navbar-brand" to='/'><img src={logo} alt="" /></Link>

                        </div>
                        <div className="right my-auto">
                      
                                <button className="btn rounded m-1 px-3 signup_btn btn-sm" onClick={()=>handleNavigate('/')}>Signup</button>
                     
                          
                                <button className="btn rounded m-1 px-3 login_btn btn-sm" onClick={()=>handleNavigate('/emirtel/login_admin')}>Login</button>

                     
                        </div>
                    </div>
                    
                </div>
            </nav>


        </>
    )
}
