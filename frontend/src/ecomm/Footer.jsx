import React from 'react'
import logo from './assets/logo.png'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
   <footer className="text-center text-lg-start bg-body-tertiary text-muted bottom-0 ecomm_footer">

  <section className>
    <div className="container text-center text-md-start mt-5">
     
      <div className="row mt-4 pt-5">
   
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
       
          <h6 className="text-uppercase fw-bold mb-4 brand_name">
            <img src={logo} className='me-2' alt="" />AlMoeed <span>Technologies</span> 
          </h6>
         <p> <a href="tel:+971501440101" className='my-2 text-reset'><i className="fa-solid fa-phone me-1"></i>Tel:  +971501440101  </a></p>
         <p> <a href="mailto:info@ecomm.ae" className='my-2 text-reset'><i className="fa-solid fa-envelope me-1"></i>Email:  info@ecomm.ae</a></p>
         <p> <a href="https://wa.me/+971501440101" className='my-2 text-reset'><i className="fab fa-whatsapp me-1"></i>Whatsapp:  +971501440101  </a></p>

          {/* <p>
          We gives you your office on your desktop or on your mobile no matter where you are. All you need to do is to <br /><strong >STAY CONNECTED</strong>
          </p> */}
        </div>
        
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Cloud Services
          </h6>
          <p>
            <Link to="/ecomm/cloud/services/compute" className="text-reset">Compute Services</Link>
          </p>
          <p>
            <Link to="/ecomm/cloud/services/secure" className="text-reset">Secure Services</Link>
          </p>
          <p>
          <Link to="/ecomm/cloud/services/host" className="text-reset">Host Services</Link>
          </p>
          <p>
          <Link to="/ecomm/cloud/services/drive" className="text-reset">Drive Services</Link>
          </p>
          <p>
          <Link to="/ecomm/cloud/services/support" className="text-reset">Customers Support</Link>
          </p>
          <p>
          <Link to="/ecomm/cloud/services/erp" className="text-reset">ERP</Link>
          </p>
        </div>
        
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Development
          </h6>
          <p>
            <Link to='/ecomm/software/services' className="text-reset">Web Applications</Link>
          </p>
          <p>
          <Link to='/ecomm/software/services' className="text-reset">Software Development</Link>
          </p>
          <p>
          <Link to='/ecomm/software/services' className="text-reset">App Development</Link>
           
          </p>
          
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
            Marketing
          </h6>
          <p>
            <Link to='/ecomm/marketing/services' className="text-reset">Ecommerce Solutions</Link>
          </p>
          <p>
          <Link to='/ecomm/marketing/services' className="text-reset">Branding</Link>
          </p>
          <p>
          <Link to='/ecomm/marketing/services' className="text-reset">Digital Marketing</Link>
           
          </p>
          
        </div>
       
       
      </div>
     
    </div>
  </section>
  <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    © Copyright:
    <Link className="text-reset fw-bold" to="/"> AlMoeed Technologies</Link>
  </div>

</footer>

    
  )
}
