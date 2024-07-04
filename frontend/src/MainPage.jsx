import React from 'react'
import {Link} from 'react-router-dom'
import emirtelLogo from './assets/mylogo.png'
import ecommLogo from '././ecomm/assets/logo.png'
export default function MainPage() {
  return (
    <>
      <div className="container-fluid pt-5 main-page">
        <div className="row justify-content-center pt-5">
            <div className="col-md-4 pt-5">
            <div className="card border-0">
  <div className="card-body">
    <h5 className="card-title"><img src={ecommLogo} alt="" /> Al Moeed <span>Technologies</span></h5>
    <p className="card-text">Your trusted partner for cutting-edge IT, telecom, structural cabling, fiber optics, and electronics repair services.</p>
    <Link to='/ecomm/' className="btn ">Visit Now</Link>
  </div>
</div>
            </div>
            <div className="col-md-4 pt-md-5 pt-1">
           
<div className="card border-0">
  <div className="card-body">
    <h5 className="card-title"><img src={emirtelLogo} alt="" /> Emirtel <span>General Trading LLC</span> امرتل</h5>
    <p className="card-text">At Emirtel, we thrive on customer trust and aim to bring products closer for a seamless shopping experience.</p>
    <Link to='/ecomm/emirtel' className="btn ">Visit Now</Link>
  </div>
</div>
            </div>
        </div>
      </div>
    </>
  )
}
