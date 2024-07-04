import React from 'react'
import MainCloud from './MainCloud'
import drive from '../../assets/icons/drive.png'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../../Navbar'
import Footer from '../../Footer'

export default function DriveCloud() {
  return (
    <>
      <Navbar></Navbar>
      <MainCloud></MainCloud>
      <div className="container my-2 drive_cloud">
        <div className="row">
        <Fade><h4 className='text-center'><img src={drive} alt="" /><span> Drive</span></h4></Fade>
        
          <h6 className='text-center mb-3'>Your Data is too precious to lose but too expensive to maintain.</h6>
        </div>
        <div className="row bottom justify-content-center py-5">
            <Slide direction="up" className="col-lg-6 col sm-12 my-auto content px-md-5 px-3 py-3 mx-md-0 mx-2">
                <div className="section my-1 py-3">
                  <h4 className='mt-2'>Storage Capacity from</h4>
                  <h3 className='mt-2 mb-4'>1 TB to 10 TB</h3>
                  <p><i className="fa-solid fa-check me-1" aria-hidden="true"></i>On Server VM Instance Backup</p>
                  <p><i className="fa-solid fa-check me-1" aria-hidden="true"></i>VM & Data Backup on a different site</p>
                  <p><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Incremental data backup (continuous/ scheduled)</p>
                </div>
            </Slide>
        </div>

        <div className="row bottom-content my-5">
            <div className="col-lg-4 col-12">
                <h3 className='text-lg-start text-center mb-lg-0 mb-4 '>Pure Storage Solution for Multiple Services:</h3>
            </div>
            <div className="col-lg-8 col-12">
                <div className="row">
                    <Slide className="col-md-4 col-6 p-4 border-end border-bottom">
                        <p>Office File Storage for Multiple User per Bucket</p>
                    </Slide>
                    <Fade direction="up" className="col-md-4 col-6 p-4 border-end border-bottom">
                        <p>Virtual/ Bare Metal Server Backup</p>
                    </Fade>
                    <Slide direction="right" className="col-md-4 col-6 p-4 border-bottom">
                        <p> Database Backup </p>
                    </Slide>
                    <Slide direction="right" className="col-md-4 col-6 p-4 border-end ">
                        <p>On-Prem Storage with Cloud Backup</p>
                    </Slide>
                    <Fade direction="down" className="col-md-4 col-6 p-4 border-end ">
                        <p>Local Sales Tax Applicable</p>
                    </Fade>
                    <Slide className="col-md-4 col-6 p-4">
                        <p>Automatic Backup</p>
                    </Slide>
                </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
