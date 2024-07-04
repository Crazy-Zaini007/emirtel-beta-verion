import React from 'react'
import MainCloud from './MainCloud'
import secure from '../../assets/icons/secure.png'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../../Navbar'
import Footer from '../../Footer'

export default function SecureCloud() {
  return (
    <>
      <Navbar></Navbar>
      <MainCloud></MainCloud>
      <div className="container my-2 secure_cloud">
        <div className="row">
        <Fade>
        <h4 className='text-center'><img src={secure} alt="" className='me-1'/><span>Secure</span></h4>
        </Fade>
       
          <h6 className='text-center mb-3'>Refers to a secure method in IT or data protection.</h6>
        </div>
        <div className="row bottom justify-content-end ">
            <div className="col-lg-6 col sm-12 my-auto content px-md-5 px-3">
                <Slide className="section my-1 py-3">
                  <h4 className='mt-2'>Firewalls</h4>
                  <p className=' mb-0 py-0'>Multiple level of Firewalls, VPN, IP Blacklisting, User Authentication & Policies secure platform from un authorized access and intrusions.</p>
                </Slide>
                <Slide direction="up" className="section my-1 py-3">
                  <h4 className='mt-2'>Security Alerts</h4>
                  <p className=' mb-0 py-0'>Clients can setup their own thresholds to generate alerts, System automatically triggers alarms if those thresholds are met.</p>
                </Slide>
                <Slide className="section my-1 py-3">
                  <h4 className='mt-2'>SMS & Email Alerts</h4>
                  <p className=' mb-0 py-0'>These alerts are available to the client over SMS or emails. It is a chargeable service.</p>
                </Slide>
              
            </div>
        </div>
      </div>
      <Footer></Footer>

    </>
  )
}
