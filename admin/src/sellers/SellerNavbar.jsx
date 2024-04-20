import React,{ useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminsHook from '../hooks/AdminsHook';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import {  deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function SellerNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate=useNavigate()
  const [greeting, setGreeting] = useState(''); // Initialize the greeting state
  const {getAllAdmins,admin}=AdminsHook()

  useEffect(() => {
    getAllAdmins()
    const getGreeting = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    getGreeting(); // Call the function when the component mounts

    // Update the greeting every minute (optional)
    const interval = setInterval(getGreeting, 60000);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className='main'>
      
      <div className="container-fluid p-0">
    {/* <Link className="welcome py-2"><span>{greeting}</span></Link> */}
        
      <ul className="nav pt-3 pb-1 text-end ml-auto m-0 px-2 sticky-top">
  <li className="nav-item ">
  <Link className="welcome mx-3"><span>{greeting}, </span></Link>
  
  </li>
  
  <li className="nav-item  text-center p-0">
  {admin ? 
  <>
  <Tooltip title="Add New">
   <Link className="btn add nav-link " onClick={handleClick}><i className="fa-solid fa-plus fa-fade"></i></Link>
       
        </Tooltip>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       {admin && admin.role==="Super Admin" &&
       <>
      <MenuItem onClick={() => { handleClose(); navigate('/emirtel/admin/categories'); }} sx={{fontSize:12, color:"black",fontWeight:600}}>
        <LocalOfferIcon fontSize="small"sx={{fontSize:16, color:"black",marginRight:1,fontWeight:600}}  />
      New Category
    </MenuItem>
        <Divider className='mx-2 my-0' />
       </>}
        <MenuItem  onClick={() => { handleClose(); navigate('/emirtel/admin/products'); }} sx={{fontSize:12, color:"black",fontWeight:600}}>
            <ShoppingCartIcon fontSize="small"sx={{fontSize:16, color:"black",marginRight:1}} />
          New Product
        </MenuItem>
       
      </Menu>
      
  </>:
  <Skeleton variant="circular" width={40} height={40} />
  }
   
  </li>
  <li className="nav-item mx-2 ">
  <Link to="/emirtel/admin/notifications"><IconButton aria-label={'100'}>
      <Badge  badgeContent={admin && admin.notifications && admin.notifications.filter(n=>n.new===true).length} color="primary" >
        <NotificationsIcon />
      </Badge>
    </IconButton>
    </Link>

  {/* <Link className="bell "><i className='fa-solid fa-bell'></i></Link> */}
  </li>
  <li className="nav-item">
  
      {admin ? 
      <Avatar sx={{ bgcolor: deepPurple[300] }} >{admin && admin.userName.slice(0,1)}</Avatar>:
      <Skeleton variant="circular" width={40} height={40} />

      }
    
    
  </li>
</ul>

      </div>



    </div>
  )
}
