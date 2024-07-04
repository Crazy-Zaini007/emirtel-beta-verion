import React from 'react'
import MainCloud from './MainCloud'
import erp from '../../assets/icons/erp.png'
import sap from '../../assets/Sap-Logo.png'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../../Navbar'
import Footer from '../../Footer'
export default function ERPCloud() {
  return (
    <>
      <Navbar></Navbar>
      <MainCloud></MainCloud>
    <div className="container-fluid my-3 erp_cloud">
        <div className="row">
          <Fade><h4 className='text-center'><img src={erp} alt="" /> <span>ERP</span></h4></Fade>
        
          <h6 className='text-center mb-3'>Draw maximum from SAP Business One ERP from Our Cloud Platform!</h6>
        </div>
        <div className="row bottom py-3">
            <div className="container my-auto content px-lg-5 ">
                <div className="row px-lg-5 px-1 justify-content-center" >
                <Slide direction="down" className="col-lg-6 col-sm-8 left order-last order-lg-first">
                <div className="inner shadow m-1 py-3 px-lg-4 px-2 rounded">
                <p>With more than 90,000 worldwide deployments</p>
                <div className="image my-md-4 my-2">
                <img className='my-md-4 my-2' src={sap} alt="" />
                </div>
                <p className='mt-5'>leading from the front to provide a truly integrated ERP platform</p>
                <p className='mt-4 high-p'>99.95% uptime  |  NVMe powered machines  |   Managed Support for Cloud & SAP</p>
                <p className="down-p mt-5">SAP <span>Business One</span> Clients, we offer Managed  Services & Cloud Infrastructure as a One Window Operation.</p>
                </div>
            </Slide>
            <Slide direction="up" className="col-lg-6 col-sm-8 right ">
                <div className="inner shadow m-1 py-3 px-lg-4 px-2 rounded">
                    <p>To gain the competitive edge, businesses need to be agile to respond to market demands at all levels of operation without increasing costs and waste or sacrificing efficiency. Adoption of ERP platform brings profound changes such as:</p>
                    <p className="high-p mt-4"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Increase productivity and lower costs</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Better Sales Channel Management</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Develop & Manage Distribution Channels</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Take control of your manufacturing operations such as:</p>
                    <ul>
                      <li className='my-2'>Reduce downtime and bottlenecks</li>
                      <li className='my-2'>Measure and improve product quality</li>
                      <li className='my-2'>Increase productivity and output</li>
                    </ul>
                </div>
            </Slide>
                </div>
            </div>
          
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}
