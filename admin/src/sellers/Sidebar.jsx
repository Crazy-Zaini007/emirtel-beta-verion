import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/UserContextHook'
import LogoutHook from '../hooks/LogoutHook';
import Divider from '@mui/material/Divider';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BarChartIcon from '@mui/icons-material/BarChart';
import TocIcon from '@mui/icons-material/Toc';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ApprovalIcon from '@mui/icons-material/Approval';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LayersIcon from '@mui/icons-material/Layers';
export default function Sidebar() {

  const [value, setValue] = useState('dashboard');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };



  const [activeItem, setActiveItem] = useState(1);

  // Function to handle click event and set active item
  const handleItemClick = (index, route) => {

    setActiveItem(index);
    navigate(route)
  };
  const { seller } = useAuthContext()
  const { sellerLogout } = LogoutHook()
  const handleLogout = () => {
    if (seller) {
      sellerLogout()
    }
  }
  const navigate = useNavigate()
  const location = useLocation();

  

  useEffect(() => {
    const updateActiveItem = () => {
      const route = location.pathname;
      switch (route) {
        case '/':
          setValue('dashboard');
          setActiveItem(1);
          break;
        case '/emirtel/admin/categories':
          setValue('categories');
          setActiveItem(2);
          break;
        case '/emirtel/admin/products':
          setValue('products');
          setActiveItem(3);
          break;
        case '/emirtel/admin/orders':
          setValue('orders');
          setActiveItem(4);
          break;
        case '/emirtel/admin/manage_admins':
          setValue('admins');
          setActiveItem(5);
          break;
        case '/emirtel/admin/notifications':
          setValue('notifications');
          setActiveItem(6);
          break;
        case '/emirtel/admin/setting':
          setValue('setting');
          setActiveItem(7)
          break
          case '/emirtel/admin/manage_approvals':
            setValue('approvals');
            setActiveItem(8)
            break
            case '/emirtel/admin/overview':
              setValue('overview');
              setActiveItem(9);
              break;
        default:
          setValue('dashboard');
          setActiveItem(1);
          break;
      }
    };
    updateActiveItem();
  }, [location.pathname]);


  return (
    <>

      <div className="sidenav ">
        <div className="welcome mt-4 ">
          <h4 className='text-center px-3'>{seller.role} Panel</h4>
        </div>
        <Divider className='mx-4'></Divider>

        <ul className='pt-2 mt-2'>
          <li className=' my-2' style={activeItem === 1 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(1, `/`)}><i className="fa-solid fa-chart-line me-2"></i>Dashboard</li>
          <li className=' my-2' style={activeItem === 9 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(9, `/emirtel/admin/overview`)}><i className="fa-solid fa-layer-group me-2"></i>Overview</li>
          {seller.role ==="Super Admin" && <li className=' my-2' style={activeItem === 8 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(8, `/emirtel/admin/manage_approvals`)}><i className="fa-solid fa-question me-2"></i>Approvals</li>} 
         {seller.role==="Super Admin" &&  <li className=' my-2' style={activeItem === 2 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(2,'/emirtel/admin/categories')}><i className="fa-solid fa-list me-2"></i>Categories</li>}
          <li className=' my-2' style={activeItem === 3 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(3,'/emirtel/admin/products')}><i className="fa-solid fa-cart-shopping me-2"></i>Products </li>
          <li className=' my-2' style={activeItem === 4 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(4,'/emirtel/admin/orders')}><i className="fa-solid fa-money-check me-2"></i>Orders</li>
          {seller.role === "Super Admin" && <li className=' my-2' style={activeItem === 5 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(5,'/emirtel/admin/manage_admins')}><i className="fas fa-users-cog me-2"></i>Manage Admins</li>}
          <li className=' my-2' style={activeItem === 6 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(6,'/emirtel/admin/notifications')}><i className="fa-solid  fa-bell me-2"></i>Notification</li>
          <li className=' my-2' style={activeItem === 7 ? { backgroundColor: 'var(--accent-stonger-blue)', border: '0px', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}} onClick={() => handleItemClick(7,'/emirtel/admin/setting')}><i className="fa-solid fa-gear me-2"></i>Setting</li>
          <li className='my-2'  onClick={handleLogout}><i className="fas fa-sign-out me-2"></i>Logout</li>
        </ul>
      </div>
<div className="bottomnavbar  m-0 p-0">
      <BottomNavigation  value={value} className='px-2 bott-nav shadow' onChange={handleChange}>
     
      <BottomNavigationAction
  label="Dashboard"
  value="dashboard"
  icon={<BarChartIcon />}
  onClick={() => handleItemClick(1, '/')}
  style={activeItem === 1 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>

<BottomNavigationAction
  label="Overview"
  value="overview"
  icon={<LayersIcon />}
  onClick={() => handleItemClick(9, '/emirtel/admin/overview')}
  style={activeItem === 9 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>

{seller.role==="Super Admin" &&
<BottomNavigationAction
  label="Categories"
  value="categories"
  icon={<TocIcon />}
  onClick={() => handleItemClick(2, '/emirtel/admin/categories')}
  style={activeItem === 2 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
}
<BottomNavigationAction
  label="Products"
  value="products"
  icon={<ShoppingCartIcon />}
  onClick={() => handleItemClick(3, '/emirtel/admin/products')}
  style={activeItem === 3 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
<BottomNavigationAction
  label="Orders"
  value="orders"
  icon={<AddBusinessIcon />}
  onClick={() => handleItemClick(4, '/emirtel/admin/orders')}
  style={activeItem === 4 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
{seller.role==="Super Admin" && 

<BottomNavigationAction
  label="Approvals"
  value="approvals"
  icon={<ApprovalIcon />}
  onClick={() => handleItemClick(8, '/emirtel/admin/manage_approvals')}
  style={activeItem === 8 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
}

{seller.role==="Super Admin" && 
<BottomNavigationAction
  label="Admins"
  value="admins"
  icon={<AdminPanelSettingsIcon />}
  onClick={() => handleItemClick(5, '/emirtel/admin/manage_admins')}
  style={activeItem === 5 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
}

<BottomNavigationAction
  label="Notifications"
  value="notifications"
  icon={<NotificationsActiveIcon />}
  onClick={() => handleItemClick(6, '/emirtel/admin/notifications')}
  style={activeItem === 6 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
<BottomNavigationAction
  label="Setting"
  value="setting"
  icon={<SettingsSuggestIcon />}
  onClick={() => handleItemClick(7, '/emirtel/admin/setting')}
  style={activeItem === 7 ? { color: 'var(--purple)', fontWeight:600 } : { color: 'black' }}
/>
<BottomNavigationAction
  label="Logout"
  value="logout"
  icon={<LogoutIcon />}
  onClick={handleLogout}
  
/>
     
    </BottomNavigation>
</div>

    </>
  )
}
