import React from 'react'
import {Link} from 'react-router-dom'
import emirtelLogo from './assets/mylogo.png'
import ecommLogo from '././ecomm/assets/logo.png'
export default function MainPage() {
  return (
    <>
      <div className="container-fluid pt-5 main-page">
        <div className="row justify-content-center pt-5">
            <div className="col-md-3 pt-md-5 pt-1 px-1">
            <div className="card border-0 ">
  <div className="card-body py-2">
   <Link to='/ecomm/'>
   <div className="d-flex justify-content-between">
      <div className="left">
      <img src={ecommLogo} alt="" />
      </div>
      <div className="right my-auto">
      <h5 className='text-end'>المؤيد <span>للتقنيات</span></h5>
      <h5 className='text-end'>Al Moeed <span>Technologies</span></h5>
      </div>
    </div>
   </Link>
    {/* <p className="card-text">Your trusted partner for cutting-edge IT, telecom, structural cabling, fiber optics, and electronics repair services.</p> */}
   
  </div>
</div>
            </div>
            <div className="col-md-3 pt-md-5 pt-1 px-1">
           
<div className="card border-0 ">
  <div className="card-body py-2">
   <Link to='/ecomm/emirtel'>
   <div className="d-flex justify-content-between">
      <div className="left my-auto">
      <img src={emirtelLogo} alt="" />
      </div>
      <div className="right my-auto emirtle_text">
      <h5 className='text-end'>امرتل <span>للتجارة العامة ش ذ م م</span></h5>
      <h5 className='text-end'>Emirtel <span>General Trading LLC</span></h5>
      </div>
    </div>
   </Link>
    
    {/* <p className="card-text">At Emirtel, we thrive on customer trust and aim to bring products closer for a seamless shopping experience.</p> */}

  </div>
</div>
            </div>
        </div>
      </div>
    </>
  )
}
