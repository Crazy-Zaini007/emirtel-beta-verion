import React from 'react'
import MainCloud from './MainCloud'
import support from '../../assets/icons/support.png'
import supportImage from '../../assets/support.jpg'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../../Navbar'
import Footer from '../../Footer'
export default function Support() {
  return (
    <>
      <Navbar></Navbar>
    <MainCloud></MainCloud>
      <div className="container-fluid my-2 support">
        <div className="row mx-2 mx-lg-0">
          <Fade> <h4 className='text-center'><img src={support} alt="" className='me-1'/><span>Support</span></h4></Fade>
       
          <h6 className='text-center mb-3'>Trouble Ticketing System</h6>
          <div className="col-md-6 d-lg-block d-none">
            <Fade className="image my-auto">
                <img src={supportImage} alt="" />
            </Fade>
          </div>
        <div className="col-lg-6 col-sm-12 px-md-5 px-4 py-5 content bg-white my-2 mx-lg-0 my-auto shadow">
            <h4>Managed/ Un-Managed Support is available for our clients <br />with:</h4>
            <ul className='p-0 mb-0'>
                <li className="my-3"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Customer Portal</li>
                <li className="my-3"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Contact Center/ Help Desk</li>
                <li className="my-3"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Monitoring and Alerting System</li>
                <li className="mt-3"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Trouble Ticketing System</li>
            </ul>
            <p className='mx-md-4'>allows users to report & log complaints. It allows Cloud toimprove its support service by tracking timeTrouble Ticketing System also in place to report issues related to cloud or the ERP.</p>
            <h6><span>Trouble Ticketing System</span> is a paid service as part of the Managed Support Program to resolve/ address issues within stipulated time.</h6>
          </div>
         
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
