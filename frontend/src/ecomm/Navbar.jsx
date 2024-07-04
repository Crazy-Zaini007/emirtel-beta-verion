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
  
const actions = [
  { icon: <a href="https://wa.me/+971501440101" target="_blank" rel="noreferrer" ><WhatsAppIcon sx={{ background: "green", color: "white", borderRadius: "100%", fontSize: "45px",padding:"10px" }} /></a>, name: 'Whatsapp' },
  { icon: <a href="mailto:osmanrasheed@gmail.com"><MailIcon sx={{background:"blue",color:"white",borderRadius:"100%",fontSize:"45px" ,padding:"5px"}}/></a>, name: 'Email' },
  // { icon: <ConnectWithoutContactIcon sx={{background:"#6F47EB",color:"white",borderRadius:"100%",fontSize:"28px" ,padding:"5px"}}/>, name: 'Inquiry' },
];

  return (
    <>
       <ul className='nav-ul text-start px-2 py-1 m-0'>
        <li className='mx-1'><a href="tel:+971501440101"><i className="fa-solid fa-phone me-1"></i>Tel: +971501440101  </a>|</li>
        <li className='mx-1'><a href="mailto:info@ecomm.ae"><i className="fa-solid fa-envelope me-1"></i>Email: info@ecomm.ae</a></li>
      </ul>
      <nav class="navbar navbar-expand-lg sticky-top bg-white py-md-2 ">
  <div class="container-fluid">
    <Link class="navbar-brand py-1" to="/ecomm"><img src={logo} alt="" /> Al Moaeed <span>Technologies</span></Link>
   
  </div>
</nav>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 50 }}
        icon={<AddIcCallIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction sx={{height:"60px", width:"60px"}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

    </>
  )
}
