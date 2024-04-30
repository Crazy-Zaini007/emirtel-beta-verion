import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Tooltip from '@mui/material/Tooltip';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { useAuthContext } from '../hooks/UserContextHook'
import card_bg_image from '../assets/card_bg.jpg'
import SignupHook from '../hooks/SignupHook';
import LoginHook from '../hooks/LoginHook';
import LogoutHook from '../hooks/LogoutHook';
import { useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Fade } from "react-awesome-reveal";

export default function Navbar() {
  const { user } = useAuthContext()
  const [option, setOption] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [email1, setEmail1] = useState('')
  const [password1, setPassword1] = useState('')

  const { isLoading, error, mySuccess, success, setSuccess, emptyFields, userSignup } = SignupHook()
  const { isLoading1, error1, mySuccess1, success1, setSuccess1, emptyFields1, userLogin } = LoginHook()
  const userProfile = useSelector((state) => state.userProfile.userProfile);

  useEffect(() => {
    if (mySuccess) {
      setName('')
      setEmail('')
      setPassword('')
      setSuccess('')
    }
  }, [mySuccess,setSuccess])

  useEffect(() => {
    if (mySuccess1) {
      setEmail1('')
      setPassword1('')
      setSuccess1('')
    }
  }, [mySuccess1,setSuccess1])


  const handleSignup = (e) => {

    e.preventDefault()
    userSignup(name, email, password)

  }
  const handleLogin = (e) => {
    e.preventDefault()
    userLogin(email1, password1)
  }

  const { userLogout } = LogoutHook()
  const handleLogout = () => {
    if (user) {
      userLogout()
    }
  }


  const [editedEntry, setEditedEntry] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleClickOpen = (profile) => {
    setEditedEntry(profile);
    setEditMode(!editMode);

  }

  const handleClose = () => {
    setEditMode(!editMode);
    setEditedEntry({});
  };

  const handleInputChange = (e, field) => {
    setEditedEntry({
      ...editedEntry,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <div className="my_navbar d-flex justify-content-between px-md-2 py-3 px-2 sticky-top">
        <div delay='3' className="left">
          <Link className="navbar-brand" to="/"><img src={logo} alt="" /> </Link>
        </div>
        <div className="right pt-2">
          {!user && <>
            {/* <Link className="mx-md-2 mx-1"><Tooltip title="Login/Register (coming soon)"><PermIdentityIcon></PermIdentityIcon></Tooltip></Link> */}
            <Link className="mx-md-2 mx-1" data-bs-toggle="modal" data-bs-target="#join_modal"><Tooltip title="Login/Register"><PermIdentityIcon></PermIdentityIcon></Tooltip></Link>

          </>}
          {user && <>

            <div className="dropdown d-inline" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile">
              <Link className="mx-md-2 mx-1" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <Tooltip title="Profile">
                  <PersonIcon ></PersonIcon>
                </Tooltip>
              </Link>
              <ul className="dropdown-menu border-0 shadow" aria-labelledby="dropdownMenuButton1">
                <li data-bs-toggle="modal" data-bs-target="#profile_modal"><Link className="dropdown-item" ><i className="fas fa-user-circle me-1"></i> Profile</Link></li>
                <li><Link onClick={() => handleLogout()} className="dropdown-item"><i className="fas fa-sign-out-alt me-1"></i>Logout</Link></li>
              </ul>
            </div>
          </>
          }
          {user && 
          <>
          <Link className=" mx-md-2  mx-1" aria-current="page" to="/shopping_cart" ><Tooltip title="Cart"><Badge badgeContent={user &&(userProfile && userProfile.wishlist && userProfile.wishlist.length)} color="success" showZero><ShoppingCartIcon></ShoppingCartIcon></Badge></Tooltip></Link>
          <Link className=" mx-md-2  mx-1" to="/my_orders" ><Tooltip title="Orders"><Badge badgeContent={user &&(userProfile && userProfile.orders && userProfile.orders.length)} color="success" showZero><LocalMallIcon ></LocalMallIcon></Badge></Tooltip></Link>
          </>
          }
          {!user && 
          <>
           <Link className=" mx-md-2  mx-1" data-bs-toggle="modal" data-bs-target="#join_modal" ><Tooltip title="Cart"><Badge badgeContent={user &&(userProfile && userProfile.wishlist && userProfile.wishlist.length)} color="success" showZero><ShoppingCartIcon></ShoppingCartIcon></Badge></Tooltip></Link>
          <Link className=" mx-md-2  mx-1" data-bs-toggle="modal" data-bs-target="#join_modal" ><Tooltip title="Orders"><Badge badgeContent={user &&(userProfile && userProfile.orders && userProfile.orders.length)} color="success" showZero><LocalMallIcon ></LocalMallIcon></Badge></Tooltip></Link>
          </>
          }
         
        </div>
      </div>

      <div className="modal fade join_modal" id="join_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog border-0">
          <div className="modal-content border-0">

            <Fade className="modal-body border-0 p-0 ">
              <div className="card border-0 ">
                <Link className='close_btn' disabled={(isLoading || isLoading1)} data-bs-dismiss="modal"><i className="fas fa-times"></i></Link>
                <div className="image text-center ">
                  <img src={card_bg_image} className="card-img-top" alt="..." />

                </div>
                <Fade className="person_icon text-center  p-0 my-0">
                  <Avatar className='shadow avatar' sx={{ height: "70px", width: "70px" }}>
                    <PersonIcon sx={{ height: "50px", width: "50px" }} />
                  </Avatar>
                </Fade>

                <div className="card-body pt-0 mt-5">
                  {option === 1 &&
                    <form onSubmit={handleSignup}>
                      {success && <p className='text-center success-m'>{success}</p>}
                      {error && <p className='text-center error-m '>{error}</p>}
                      <div className=" innner_inputs mb-3">
                        <i className="fas fa-user pe-2 py-0 icon"></i>
                        <input type="text" placeholder='Name' className={Array.isArray(emptyFields) && emptyFields.includes('name') ? 'error' : ''} value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className=" innner_inputs mb-3 ">
                        <i className="fas fa-at pe-2 py-0 icon"></i>
                        <input type="email" placeholder='Email address' className={Array.isArray(emptyFields) && emptyFields.includes('email') ? 'error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className=" innner_inputs mb-3">
                        <i className="fas fa-lock pe-2 py-0 icon"></i>
                        <i className="fas fa-eye pe-2 py-0 show_hide_icon"></i>
                        {showPassword === true ? <i className="fas fa-eye pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fas fa-eye-slash pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i>}
                        <input type={showPassword ? 'text' : 'password'} placeholder='Password' className={Array.isArray(emptyFields) && emptyFields.includes('password') ? 'error' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>

                      <button type="submit" className="btn submit_btn" disabled={isLoading}>{isLoading ? "Creating..." : "Sign up"}</button>
                      <p className='mt-1 mb-0 '>Already an account ? <Link disabled={isLoading} onClick={() => setOption(0)}>SignIn Now</Link></p>
                    </form>
                  }
                  {option === 0 &&
                    <form onSubmit={handleLogin}>
                      {success1 && <p className='text-center success-m'>{success1}</p>}
                      {error1 && <p className='text-center error-m '>{error1}</p>}
                      <div className=" innner_inputs mb-3">
                        <i className="fas fa-at pe-2 py-0 icon"></i>
                        <input type="email" placeholder='Email address' className={Array.isArray(emptyFields1) && emptyFields1.includes('email1') ? 'error' : ''} value={email1} onChange={(e) => setEmail1(e.target.value)} />
                      </div>
                      <div className=" innner_inputs mb-3">
                        <i className="fas fa-lock pe-2 py-0 icon"></i>
                        {showPassword1 === true ? <i className="fas fa-eye pe-2 py-0 show_hide_icon" onClick={() => setShowPassword1(!showPassword1)}></i> : <i className="fas fa-eye-slash pe-2 py-0 show_hide_icon" onClick={() => setShowPassword1(!showPassword1)}></i>}
                        <input type={showPassword1 ? 'text' : 'password'} placeholder='Password' className={Array.isArray(emptyFields1) && emptyFields1.includes('password1') ? 'error' : ''} value={password1} onChange={(e) => setPassword1(e.target.value)} />
                      </div>
                      <button type="submit" className="btn submit_btn" disabled={isLoading1}>{isLoading1 ? "Signing you in..." : "Sign in"}</button>
                      <p className='mt-1 mb-0 '>Not a member ? <Link onClick={() => setOption(1)} disabled={isLoading1}>Register Now</Link></p>

                    </form>
                  }
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>


      {/* Profile Modal */}
      <div className="modal fade join_modal" id="profile_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog border-0">
          <div className="modal-content border-0">

            <Fade className="modal-body border-0 p-0 ">
              <div className="card border-0 ">
                <Link className='close_btn' disabled={(isLoading || isLoading1)} onClick={() => setEditMode(false)} data-bs-dismiss="modal" ><i className="fas fa-times"></i></Link>
                <div className="image text-center ">
                  <img src={card_bg_image} className="card-img-top" alt="..." />

                </div>
                <Fade className="person_icon text-center  p-0 my-0">
                  <Avatar className='shadow avatar' sx={{ height: "70px", width: "70px", bgcolor: green[300], fontSize: '40px' }}>
                    {userProfile && userProfile.name && userProfile.name.slice(0, 1)}
                  </Avatar>
                </Fade>

                <div className="card-body pt-0 mt-5">
                  <div className=" innner_inputs mb-3">
                    {editMode ? <>
                      <i className="fas fa-user pe-2 py-0 icon"></i>
                      <input type="text" placeholder='Name' value={editedEntry.name} required onChange={(e) => handleInputChange(e, 'name')} />
                    </> :
                      <>
                        <i className="fas fa-user pe-2 py-0 icon"></i>
                        <input type="text" placeholder='Name' value={userProfile && userProfile.name} />
                      </>
                    }
                  </div>
                  <div className=" innner_inputs mb-3 ">
                    {editMode ?
                      <>
                        <i className="fas fa-at pe-2 py-0 icon"></i>
                        <input type="email" placeholder='Email address' value={editedEntry.email} required onChange={(e) => handleInputChange(e, 'email')} />
                      </>
                      : <>
                        <i className="fas fa-at pe-2 py-0 icon"></i>
                        <input type="email" placeholder='Email address' value={userProfile && userProfile.email} />
                      </>
                    }
                  </div>
                  <div className=" innner_inputs mb-3">
                    {editMode ? <>
                      <i className="fas fa-lock pe-2 py-0 icon"></i>
                      <i className="fas fa-eye pe-2 py-0 show_hide_icon"></i>
                      {showPassword === true ? <i className="fas fa-eye pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fas fa-eye-slash pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i>}
                      <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={editedEntry.originalPassword} required onChange={(e) => handleInputChange(e, 'originalPassword')} />
                    </> : <>
                      <i className="fas fa-lock pe-2 py-0 icon"></i>
                      <i className="fas fa-eye pe-2 py-0 show_hide_icon"></i>
                      {showPassword === true ? <i className="fas fa-eye pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i> : <i className="fas fa-eye-slash pe-2 py-0 show_hide_icon" onClick={() => setShowPassword(!showPassword)}></i>}
                      <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={userProfile && userProfile.originalPassword} />
                    </>
                    }
                  </div>
                  {!editMode && <button type="submit" className="btn submit_btn" onClick={() => handleClickOpen(userProfile && userProfile)}>Edit</button>}
                  {editMode && <button type="submit" className="btn cancel_btn bg-none mb-1" onClick={() => handleClose()} disabled={isLoading}>Cancel</button>}
                  {editMode && <button type="submit" className="btn submit_btn" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</button>}
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  )
}
