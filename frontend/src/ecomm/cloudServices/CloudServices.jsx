import React from 'react'
import { Link } from 'react-router-dom'
import cloud from '../assets/cloud_5315247.png'
import compute from '../assets/icons/compute.png'
import secure from '../assets/icons/secure.png'
import host from '../assets/icons/hosting.png'
import drive from '../assets/icons/drive.png'
import support from '../assets/icons/support.png'
import erp from '../assets/icons/erp.png'
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../Navbar'
import Footer from '../Footer'
export default function CloudServices() {
    return (
        <>
      <Navbar></Navbar>
        
            <div className="container-fluid p-0 m-0 ">
                <div className="row p-0 m-0 justify-content-center">
                    <Fade className="col-md-12 text-center top_section">
                        <div className="content mx-1">
                            <img src={cloud} alt="" className='me-1' />
                           <Slide> <h2>Innovate with Cloud</h2></Slide>
                            <Slide direction="right"><p className='mt-3'>Elevate operations, scale effortlessly, and innovate seamlessly with cloud computing</p></Slide>
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                   <Fade direction="right"> <Link className='btn py-2 px-3 shadow  mt-md-3 mt-sm-1'><span className='material-icons-outlined me-1'>cloud_done</span> Cloud Computing</Link></Fade>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
            <div className="container cloud_Services">

                <div className="row solutions">
                    <Slide className=" col-md-6 m-0 p-0 ">
                        <div className="solution m-0 pt-3 pb-md-5 pb-3 px-4 " >
                            <h3 className='mt-3 mb-4'><i className="fa fa-gear fa-spin me-2" aria-hidden="true"></i><strong>Services for your Business</strong></h3>
                            <p>We offer a range of services to help your business thrive. From digital marketing to IT support, we've got you covered.</p>
                            <p className='mt-2'>Let us take care of the details so you can focus on what you do best running your business.</p>

                        </div>
                    </Slide>
                    <Slide direction="right" className=" col-md-6 m-0 p-0 ">
                        <Link to='/cloud/services/compute'>
                        <div className="service m-0 pt-3 pb-md-5 pb-3 px-4 bg-white border-bottom">
                            <h3 className='mt-3 mb-4'><img src={compute} alt="" className='me-1' />Compute</h3>
                            <p>ECommCompute offers clients opportunity to subscribe compute power as per their requirement.</p>
                            <ul className="mt-3 px-3">
                                <li >Upgrade/ Downgrade of existing plan is also possible</li>
                                <li>Managed support is your trademark</li>
                            </ul>
                        </div>
                        </Link>
                    </Slide>
                    <Slide direction="up" className=" col-md-6 m-0 p-0 ">
                       <Link to='/cloud/services/secure'>
                       <div className="service m-0 bg-white pt-3 pb-3 px-4 border-bottom">
                            <h3 className='mt-3 mb-4'><img src={secure} alt="" className='me-1' />Secure</h3>
                            <p>Multiple level of Firewalls, VPN, IP Blacklisting, User <br /> Authentication & Policies secure platform from an un authorized acsess and intrusions.</p>
                        </div>
                       </Link>
                    </Slide>
                    <Slide direction="down" className=" col-md-6 m-0 p-0">
                        <Link to='/cloud/services/hosting'>
                        <div className="service  m-0 bg-white pt-3 pb-md-5 pb-3 px-4  border-start border-bottom">
                           
                            <h3 className='mt-3 mb-4'><img src={host} alt="" className='me-1' />Host</h3>
                            <p>Businesses can host their emails & websites with us. Our services include enabling businesses for e-Commerce, Digital Marketing & Social Media Management.</p>
                        </div>
                        </Link>
                    </Slide>


                    <Slide direction="down" className=" col-md-6 m-0 p-0 ">
                      <Link to='/cloud/services/drive'>
                      <div className="service  m-0 bg-white pt-3 pb-md-5 pb-3 px-4  border-bottom">
                      <h3 className='mt-3 mb-4'><img src={drive} alt="" className='me-1' />Drive</h3>
                            <p>Your data is safeguard over geographically redundant platform for high availablity. We offer:</p>
                            <ul className="mt-3 px-3">
                                <li>Upgrade/ Downgrade of existing plan is also possible</li>
                                <li>Managed support is your trademark</li>
                            </ul>
                        </div>
                      </Link>
                    </Slide>
                    <Slide direction="up" className=" col-md-6 m-0 p-0 ">
                      <Link to='/cloud/services/support'>
                      <div className="service  m-0 bg-white  pt-3 pb-md-5 pb-3 px-4 border-start border-bottom">
                            <h3 className='mt-3 mb-4'><img src={support} alt="" className='me-1' />Support</h3>
                            <p>Managed/ Un-Managed Support is available for our clients with:</p>
                            <ul className="mt-3 px-3">
                                <li >Customer Portal</li>
                                <li>Trouble Ticketing Systems for SLAs</li>
                                <li >Monitoring & Alerting System </li>
                                <li >Contact Center/Help Desk </li>
                            </ul>
                        </div>
                      </Link>
                    </Slide>
                    <Slide direction="left" className=" col-md-6 m-0 p-0  ">
                       <Link to='/cloud/services/erp'>
                       <div className="service m-0 bg-white pt-3 pb-md-5 pb-3 px-4 border-end">     
                            <h3 className='mt-3 mb-4'><img src={erp} alt="" className='me-1' />ERP</h3>
                            <p>While implementing ERP, we focus on customer experience by understanding their needs & touching those points by adopting their operational processes accordingly that are more likely to benefit in short & long run:</p>
                            <ul className="mt-3 px-3">
                                <li >SAP Business One on the Cloud</li>
                                <li>Manage the setup 24x7 for them</li>
                            </ul>
                        </div>
                       </Link>
                    </Slide>




                </div>
            </div>
            <Footer></Footer>

        </>
    )
}
