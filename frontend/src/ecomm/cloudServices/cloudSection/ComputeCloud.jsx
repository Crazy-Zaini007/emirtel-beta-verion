import React from 'react'
import MainCloud from './MainCloud'
import compute from '../../assets/icons/compute.png'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../../Navbar'
import Footer from '../../Footer'
export default function ComputeCloud() {
  return (
    <>
      <Navbar></Navbar>
      <MainCloud></MainCloud>
      <div className="container my-2 compute_cloud">
        <div className="row ">
          <Fade><h4 className='text-center'><img src={compute} alt="" /> <span>Compute</span></h4></Fade>
          <h6 className='text-center mb-3'>Compute Offers Customized configuration on VM, VPS or dedicated machines.</h6>
        </div>
        <div className="row bottom justify-content-center ">
          <Slide direction="right" className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
            <h5 className='my-4'>Work from Anywhere, work from home or work on the move!</h5>
          </Slide>
          <Slide  className="col-md-7 px-md-5 px-2  my-auto">
            <div className="text  my-auto">
              <div className="row p-0 m-0 ">
                <div className="col-md-6 p-3 shadow rounded">
                  <i className="fa-solid fa-file-shield"></i>
                  <h4 className='mt-2'>Data Security</h4>
                  <p>Protection Against DDoS attacks,
                    Basic Firewall,<br />
                    VPN Connectivity
                  </p></div>
                <div className="col-md-6 p-3 ">
                <i class="fa-solid fa-globe"></i>
                  <h4 className='mt-2'>Network Availibility</h4>
                  <p>99.95% <br />20TB BW Quota <br />Shared/ Dedicated Bandwidth</p></div>
                <div className="col-md-6 p-3">
                  <i class="fa-solid fa-lock" aria-hidden="true"></i>
                  <h4 className='mt-2'>Service Security</h4>
                  <p>Failover Protection at every level <br /> Soft Raid can also be created</p></div>
                <div className="col-md-6 p-3 shadow rounded">
                <i className="fa-solid fa-headset"></i>
                  <h4 className='mt-2'>Support Service</h4>
                  <p>Support through web/ email/ phone
                    Managed/ Un-Managed Support</p></div>
              </div>
            </div>
          </Slide>
        </div>
        <div className="row pricing my-md-5 my-4 px-md-5">
          <h3 className='text-center'>Our services are driven by Customer Requirements. ? <span>Our Objectives are driven by Customer Care</span> !</h3>
          <p className='text-center my-2'>While ensuring data integrity, Our Cloud takes responsibility of capex as well as major opex, allowing <br /> our clients to focus on their core businesses!</p>
          <div className="col-lg-5 col-12 my-xl-auto text-center mt-3">
            <h5 className='mb-3'><span>Packages</span> & <span>Standard</span> Configuration</h5>
            <ul className='p-0'>
              <li className='mt-2'><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Each package has a Network Interface of 1 Gbps.</li>
              <li className='mt-2'><i className="fa-solid fa-check me-1" aria-hidden="true"></i>Each package has a bandwidth quota of 20TB.</li>
              <li className='mt-2'><i className="fa-solid fa-check me-1" aria-hidden="true"></i>We provide any configuration on VM, VPS & on Dedicated Machines on demand.</li>
            </ul>
          </div>

          <div className="col-lg-7 co-12 my-auto">
            <div className="row justify-content-center">
              <Slide className="col-auto my-auto ">
                <div className="card shadow small_card   tex-center my-3">
                  <h3 className='text-center'>Cirrus</h3>
                  <hr />
                  <h4 className='mt-2 text-center'>STORAGE UPTO</h4>
                  <h5 className='text-center'>200 GB</h5>
                  <h4 className='mt-3 text-center'>RAM</h4>
                  <h5 className='text-center'>64 GB</h5>
                  <h4 className='mt-3 text-center'>CORE</h4>
                  <h5 className='text-center'>10</h5>

                </div>
              </Slide>
              <Slide direction="up" className="col-auto my-auto">
              <div className="card  shadow large_card tex-center my-3">
                  <h3 className='text-center mb-0'>Stratus</h3>
                  <hr className=''/>
                  <h4 className='mt-2 text-center'>STORAGE UPTO</h4>
                  <h5 className='text-center'>1.5 TB</h5>
                  <h4 className='mt-3 text-center'>RAM</h4>
                  <h5 className='text-center'>192 GB</h5>
                  <h4 className='mt-3 text-center'>CORE</h4>
                  <h5 className='text-center'>18</h5>
                </div>
              </Slide>
              <Slide direction="right" className="col-auto  my-auto ">
              <div className="card shadow small_card  my-3">
                  <h3 className='text-center'>Cumulus</h3>
                  <hr />
                  <h4 className='mt-2 text-center'>STORAGE UPTO</h4>
                  <h5 className='text-center'>5 TB</h5>
                  <h4 className='mt-3 text-center'>RAM</h4>
                  <h5 className='text-center'>512 GB</h5>
                  <h4 className='mt-3 text-center'>CORE</h4>
                  <h5 className='text-center'>38</h5>
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
