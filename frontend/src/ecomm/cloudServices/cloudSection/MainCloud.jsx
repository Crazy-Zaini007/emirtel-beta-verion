import React from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
export default function MainCloud() {
  return (
    <>
      <Navbar></Navbar>
    <div className="main_cloud">
    <div className="container-fluid ">
        <div className="row ">
            <div className="col-md-12 main_cloud_top text-center py-5">
            <h2>Cloud Services</h2>      
            </div>
        </div>
        </div>
        <div className="container">
        <div className="row pt-md-5 pt-4 main_cloud_intro ">
            <h4 className='text-center'>Why Choose Our Cloud Servcies?</h4>
            <div className="col-md-6 left py-md-3 py-2 px-md-5 px-2">
                <p>Small Medium Enterprise constitute 70% of market segment. We at Cloud provide tailored solutions at affordable rates.</p>
            </div>
            <div className="col-md-6 right py-md-3 py-2">
                <p>Having exposure of service industry for more than two decades. Our target is to extend benefits of IT explosion to Small & Medium Businesses like large organizations are already enjoying it. Cloud protects you from budget blow-outs, hardware and software upgrades and system crashes!</p>
            </div>
        </div>
        </div>
    </div>
    <Footer></Footer>   
    </>
  )
}
