import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
export default function Navbar() {
  

  return (
    <>
     <div class="contact-us">
  <a href="https://wa.me/+971501440101" target="_blank" rel="noreferrer" class="contact-icon whatsapp">
    <i className="fab fa-whatsapp"></i>
  </a>
  <a href="mailto:osmanrasheed@gmail.com" className="contact-icon email">
    <i className="fas fa-envelope"></i>
  </a>
</div>
       <ul className='nav-ul text-start px-2 py-1 m-0'>
        <li className='mx-1'><a href="tel:+971501440101"><i className="fa-solid fa-phone me-1"></i>Tel: +971501440101  </a>|</li>
        <li className='mx-1'><a href="mailto:info@ecomm.ae"><i className="fa-solid fa-envelope me-1"></i>Email: info@ecomm.ae</a></li>
      </ul>
      <nav class="navbar navbar-expand-lg sticky-top bg-white py-md-2 ">
  <div class="container-fluid">
    <Link class="navbar-brand py-1" to="/ecomm"><img src={logo} alt="" /> Al Moaeed <span>Technologies</span></Link>
   
  </div>
</nav>
    

    </>
  )
}
