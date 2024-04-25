import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/UserContextHook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import SellerSignup from './sellers/SellerSignup';
import SellerLogin from './sellers/SellerLogin';
import Sidebar from './sellers/Sidebar';
import SellerNavbar from './sellers/SellerNavbar';
import SellerDashboard from './sellers/SellerDashboard';
import ManageAdmins from './sellers/ManageAdmins.jsx'
import Categories from './sellers/Categories.jsx';
import SellerProducts from './sellers/SellerProducts';
import Setting from './sellers/Setting.jsx'
import Notifications from './sellers/Notifications.jsx'
import Approvals from './sellers/Approvals.jsx'
import Overview from './sellers/Overview.jsx';
import Orders from './sellers/Orders.jsx';


function App() {
  const { seller } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {!seller && <Navbar></Navbar>}
        {seller && <SellerNavbar />}
        {seller && <Sidebar></Sidebar>}
        <Routes>

          <Route exact path="/" element={!seller ? <SellerSignup></SellerSignup>:<SellerDashboard></SellerDashboard>} />
          <Route exat path="/emirtel/login_admin"
            element={!seller ? <SellerLogin></SellerLogin>:<Navigate to='/'></Navigate> }
          />
          <Route
            path="/emirtel/admin/overview"
            element={
              seller && 
                <Overview></Overview>
              
            }
          />
            <Route
            path="/emirtel/admin/manage_approvals"
            element={
              seller && 
                <Approvals></Approvals>
              
            }
          />
          <Route
            path="/emirtel/admin/manage_admins"
            element={
              seller && seller.role==="Super Admin" &&
                <ManageAdmins></ManageAdmins>
            }
          />
          <Route

            path="/emirtel/admin/categories"
            element={
              seller &&
                <Categories></Categories>
              
            }
          />
          <Route

            path="/emirtel/admin/products"
            element={
              seller  && 
                <SellerProducts></SellerProducts>
              
            }
          />
            <Route

path="/emirtel/admin/notifications"
element={
  seller &&
    <Notifications></Notifications>
 
}
/>

<Route

path="/emirtel/admin/orders"
element={
  seller &&
    <Orders></Orders>
 
}
/>
           <Route
           

path="/emirtel/admin/setting"
element={
  seller &&
    <Setting></Setting>
  
}
/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="custom-toast-container"
      />
    </div>
  );
}

export default App;
