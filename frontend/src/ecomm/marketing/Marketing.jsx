import React from 'react'
import {Link} from 'react-router-dom'

import shoppingicon from '../assets/icons/shopping-cart-icon.png'
import designicon from '../assets/icons/designicon.png'
import uiux from '../assets/icons/ui-ux icon.png'
import codeicon from '../assets/icons/developmenticon.png'
import integrationicon from '../assets/icons/integrationicon.png'
import conversionicon from '../assets/icons/conversionicon.png'
import supporticon from '../assets/icons/supporticon.png'
import shopifylogo from '../assets/icons/shopifylogo.png'
import woocommerecelogo from '../assets/icons/WooCommercelogo.png'
import colordesignicons from '../assets/icons/colordesignicon.png'

import logodesign from '../assets/icons/logo-design-1.png'
import printdesign from '../assets/icons/printbranding.png'
import uidesign from '../assets/icons/uilogo.png'
import socialdesignicon from '../assets/icons/share-post.png'
import goalicon from '../assets/icons/goal-icon.png'
import marketingimage from '../assets/markeitingimage.jpg'

import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function Marketing() {
  return (
   <>
      <Navbar></Navbar>
    <div className='marketing'>
     <div className="container-fluid software_solutions">
        <div className="row ">
        <div className="col-md-12 main_soft_top text-center py-5">
            <h2>Marketing</h2>     
            </div>
        </div>
        </div> 
        <div className="container">
        <div className="row pt-md-5 pt-4 main_soft_intro ">
            <h4 className='text-center'>Why Choose Our Marketing Servcies?</h4>
            <div className="col-md-6 left py-md-3 py-2 px-md-5 px-2">
                <p>Generate sales online and beat the industry, through Brand awareness, Digital Marketing & E-Commerce Solutions with us!</p>
            </div>
            <div className="col-md-6 right py-md-3 py-2">
                <p>We cares about your business, With the client first approach we are covering all aspects of business and marketing including online selling via ecommerce platforms, digital marketing through social media, enhanced web optimization for search engines and making your product ‘a brand’ by communicating to your customers through impressive design outlook.</p>
            </div>
        </div>
        <div className="row pt-md-5 pt-4 ecomm_icon justify-content-center">
               <Fade><h4 className='text-center'><img src={shoppingicon} alt="" /> <br /><span className='me-1'> Ecommerce </span>Solutions</h4></Fade>
               <h6 className='text-center'>We sell your product Globally!</h6>
           
        </div>

        
        </div>
        <div className="container-fluid">
        <div className="row bottom mt-5 justify-content-center ">
          <div className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
            <h5 className='my-4'>Sell online, <br />Sell anywhere with us!</h5>
          </div>
          <Slide direction="right" className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text  my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div direction="right" className="col-md-6 px-3 py-2 border_col">
                  <Fade direction="right">
                  <img src={designicon} alt="" />
                  <h4 className='mt-2'>Comprehensive Design</h4>
                  <p>Delivering high quality responsive designs for your ecommerce store fulfilling all business requirements to increase your ROI.
                  </p>
                  </Fade>
                </div>
                <div className="col-md-6 px-3 py-2 ">
                  <Fade direction="left">
                  <img src={uiux} alt="" />
                  <h4 className='mt-2'>Smooth User Experience</h4>
                  <p>Streamline your customer's shopping experience from search to log in, payments to order tracking with hassle free user experience.</p>
                  </Fade>
                  </div>
                  <hr className='px-5'/>
                <div className="col-md-6 px-3 pb-2 pt-0 border_col">
                  <Fade direction="up">
                  <img src={codeicon} alt="" />
                  <h4 className='mt-2'>Development Services</h4>
                  <p>Benefiting you, by our time & costing professional development services. Secure your sales by user/ mobile-friendly web store development</p>
                  </Fade>
                
                  </div>
                 
                <div className="col-md-6 px-3 pb-2 pt-0  rounded">
                  <Fade direction="down">
                  <img src={integrationicon} alt="" />
                  <h4 className='mt-2'>Integration</h4>
                  <p>Payment gateways integration for reliable and secure payments/ transactions, so you can scale up your business everywhere.</p>
                  </Fade>
                
                    </div>
                    <hr className=' px-5'/>
                    <div className="col-md-6 px-3 pb-2 pt-0 border_col">
                      <Fade  direction="right">
                      <img src={conversionicon} alt="" />
                  <h4 className='mt-2'>Higher Conversion</h4>
                  <p>Flawless navigation experiences means 'Conversion optimization', converting web traffic to your loyal customer, increasing sales revenue.</p>
                      </Fade>
                
                  </div>
                 
                <div className="col-md-6 px-3 pb-2 pt-0  rounded">
                  <Fade  direction="left">
                  <img src={supporticon} alt="" />
                  <h4 className='mt-2'>Support</h4>
                  <p>Our Marketing services includes after sales support & maintenance so you can focus and manage your on site business with no worries in mind!</p>
                  </Fade>
                
                    </div>
              </div>
            </div>
          </Slide>
        </div>  
        </div>
        <div className="container-fluid development ">
          <div className="row py-5">
            <h5 className='text-center'>Expert in <span>Custom App Store Development</span> & <span>Built in E Commerce Platforms</span></h5>
            <p className='text-center my-3'>We are fulfilling your all unique ecommerce requirements by building custom ecommerce stores here! <br /> Our development team is highly expert in platforms like Shopify & Woo Commerce as well.</p>
           <div className="images text-center">
           <img className='text-center my-1 mx-2' src={shopifylogo} alt="" />
            <img className='text-center my-1 mx-2' src={woocommerecelogo} alt="" /> <br />
            <Fade direction="down">
            <button className='btn mt-3 py-2 mb-4'>Get a Quote Now</button>
            </Fade>
           </div>
          </div>
        </div>
          <div className="container-fluid branding ">
          <div className="row pt-5 justify-content-center">
          <div className="col-md-9 text-center">
          <Fade direction="up">
          <img className='text-center' src={colordesignicons} alt="" />
          </Fade>
           <h4 className='text-center mt-2'>Branding</h4>
           <h5 className='text-center mt-2 mb-4'>Not just marketing!</h5>
            <p className='text-center my-3'>Grow your sales with significant branding image, We let your market niche prioritize you among all competitors. All you need is a Smart and Confidant brand out look which includes Logo/Identity design, Printing Material like stationary designs or packaging, a Simple but unique Website for online presence and a continues Social Media Marketing to engage customers anytime they want!</p>
           <h6 className='text-center mt-4 '>Design services you need in one place</h6>
          </div>
          </div>
        </div>
      
        <div className="container-fluid  soft_expertise">
            <div className="row justify-content-center software_row_one">
                <div className="col-md-12 text-center">
                   
                    <ul className='my-0 mx-auto'>
                        <li className='mx-md-4 mx-3 '>
                            <Fade direction="left">
                            <img src={logodesign} className='mt-3 mb-2' alt="" />
                            <h6 className='pt-3 pb-1'>Identity/ <br /> Logo Design</h6>
                            </Fade>
                        </li>
                        <li className='mx-md-4 mx-3 '>
                          <Fade direction="right">
                          <img src={printdesign} className='mt-3 mb-2' alt="" />
                            <h6 className='pt-3 pb-1'>Print <br /> Designs</h6>
                          </Fade>
                           

                        </li>
                        <li className='mx-md-4 mx-3'>
                          <Fade direction="up">
                          <img src={uidesign} className='mt-3 mb-2' alt="" />
                            <h6 className='pt-3 pb-1'>UI UX <br /> Designing</h6>
                          </Fade>
                           

                        </li>
                        <li className='mx-md-4 mx-3'>
                          <Fade direction="down">
                          <img src={socialdesignicon} className='mt-3 mb-2' alt="" />
                            <h6 className='pt-3 pb-1'>Social Media <br /> Designing</h6>
                          </Fade>
                           
                        </li>
                       
                    </ul>
                </div>
               
            </div>
            <div className="row software_row_two justify-content-center">
           <div className="row mt-5 pt-5">
           <div className="col-md-4 ">
                  <h4 className='text-md-end text-center'>Ideate Automate</h4>
                </div>
                <div className="col-md-8 text-start">
                  <Link className='mx-2'>Analyse</Link>
                  <Link className='mx-2'><i className="fas fa-circle"></i> Prototype</Link>
                  <Link className='mx-2'><i className="fas fa-circle"></i> Develop</Link>
                  <Link className='mx-2'><i className="fas fa-circle"></i> Test</Link>
                  <Link className='mx-2'><i className="fas fa-circle"></i> Deploy</Link>
                </div>
           </div>
            </div>
            <div className="row branding_bg justify-content-center">
              <div className="col-md-6 col-sm-12  text-center text_col">
                <h6 >Give your brand a boost by clear visualization, Make it Visible.</h6>
               <Fade direction="down"><button className='btn  py-2 mb-4 mt-3'>Get a Quote Now</button></Fade>
              </div>
            </div>

            <div className="row justify-content-center our_products px-md-3 px-1 mx-2 py-0">
              <div className="col-md-9">
              <div className="images text-center">
               <Fade direction="up"><img src={goalicon} alt="" /></Fade>
                <h4 className='my-2'><span>Digital </span>Marketing</h4>
                <h6 className='mt-3'>Sales growth by allowing customers to follow you everywhere!</h6>
                <p className='mt-3'>Optimize your website to get on the top of Google ranking, Our google certified professionals are expert in Search Engine Optimization following design responsiveness, keyword analysis, up to date algorithms, organic and paid search.</p>
                <p className='mt-4'>We help you to market your product by trending on social media & tailor you marketing cost by taking full advantage of digital marketing.</p>
                
              </div>
              </div>
            <div className="col-md-5 col-sm-12  px-3 my-auto">
                  <h6 className='text-start'>Marketing that let your potential customers intact with you!</h6>
                  <p className="high-p mt-4"><i className="fa-solid fa-check me-2" aria-hidden="true"></i>SEO rankings & Search engine accessibility</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-2" aria-hidden="true"></i>Paid Campaigns for Social Media Platforms</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-2" aria-hidden="true"></i><span>Pay Per Click</span> Google Marketing</p>
                    <p className="high-p mt-2"><i className="fa-solid fa-check me-2" aria-hidden="true"></i><span>Blogs</span>, Content Marketing</p>
                    <div className="text text-center">
                  <Fade direction="down">
                  <button className='btn mt-5 px-5 py-2 mb-4'>Get a Quote Now</button>
                  </Fade>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-7 px-3">
                    <Fade direction="right">
                  <img src={marketingimage} alt="" />

                    </Fade>
                  </div>
                 
            </div>

        </div>
        <div className="container-fluid">
          <div className="row justify-content-center px-2 bottom_solutions shadow py-5">
            <Fade className="col-lg-9 col-md-10 col-sm-11 bottom_col pt-md-4 pb-md-2  mx-2 my-auto">
              <div className="row py-0 justify-content-center">
                <div className="col-xl-6 col-12 order-lg-first order-last">
                  <div className="row px-2">
                    <Fade direction="left" className="col-auto col-lg-6 py-md-4 py-3 px-3 border-end border-bottom ">
                      <h5><span>Social Media Marketing</span></h5>
                    </Fade>
                    <Fade direction="right" className="col-auto col-lg-6  py-md-4 py-3 px-3 border-bottom">
                    <h5>Search Engine Optimizaion</h5>

                    </Fade>
                    <Fade direction="down" className="col-auto col-lg-6  py-md-4 py-3 px-3 border-bottom border-end">
                      <h5>PPC Marketing</h5>
                    </Fade>
                    <Fade direction="up" className="col-auto col-lg-6 py-md-4 py-3 px-3 border-bottom">
                      <h5><span>Google Adwords</span></h5>
                    </Fade>
                    <Fade direction="right" className="col-auto col-lg-6 py-md-4 py-3 px-3 border-end">
                      <h5><span>Content Marketing</span></h5>
                    </Fade>
                    <Fade direction="left" className="col-auto col-lg-6 py-md-4 py-3 px-3 px-4">
                      <h5>SEO Audit</h5>
                    </Fade>
                  </div>
                </div>
                <div className="col-xl-5 col-md-12  order-lg-last order-first text-center px-md-3 px-4">
                  <h6 className='text-start mt-3'>Go Digital, Grow Fast!</h6>
                  <p className='mt-md-3 mt-3 text-start'>Digital marketing is basically online communication that leads you to revenue generation by connecting potential customers to your brand.</p>
                 <Fade direction="down">
                 <button className='btn mt-5 px-5  py-2 mb-4'>Get a Quote Now</button>
                 </Fade>
                </div>
              </div>
            </Fade>
          </div>
         
        </div>
    </div>
    <Footer></Footer>

   </>
  )
}
