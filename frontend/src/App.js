import "./App.css";
import React, {Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/UserContextHook';
import loading from './assets/icons/loading.gif'
const MainPage = React.lazy(() => import("./MainPage.jsx"));
const Homepage = React.lazy(() => import("./components/Homepage"));
const Cart = React.lazy(() => import("./components/Cart"));
const CategoryProducts = React.lazy(() => import("./components/CategoryProducts"));
const Orders = React.lazy(() => import("./components/Orders"));

const Carousel = React.lazy(() => import("./ecomm/Carousel"));
const CloudServices = React.lazy(() => import("./ecomm/cloudServices/CloudServices"));
const ComputeCloud = React.lazy(() => import("./ecomm/cloudServices/cloudSection/ComputeCloud"));
const SecureCloud = React.lazy(() => import("./ecomm/cloudServices/cloudSection/SecureCloud"));
const HostCloud = React.lazy(() => import("./ecomm/cloudServices/cloudSection/HostCloud"));
const DriveCloud = React.lazy(() => import("./ecomm/cloudServices/cloudSection/DriveCloud"));
const ERPCloud = React.lazy(() => import("./ecomm/cloudServices/cloudSection/ERPCloud"));
const Support = React.lazy(() => import("./ecomm/cloudServices/cloudSection/Support"));
const SoftwareSolutions = React.lazy(() => import("./ecomm/softwareServices/SoftwareServices"));
const Marketing = React.lazy(() => import("./ecomm/marketing/Marketing"));
const ElectronicRepair = React.lazy(() => import("./ecomm/electronicRepair/ElectronicRepair"));
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Suspense fallback={<div className='text-center my-5'>
          <img src={loading} alt='' height='100px' width='100px'/>
          </div>}>
          <Routes>
          <Route path='/' element={<MainPage></MainPage>}/>
          <Route path='/ecomm/emirtel' element={<Homepage></Homepage>}/>
          <Route path='/ecomm/emirtel/shopping_cart' element={user && <Cart></Cart> }/>
          <Route path='/ecomm/emirtel/my_orders' element={user && <Orders></Orders> }/>
          <Route path='/ecomm/emirtel/category/products/:id' element={<CategoryProducts></CategoryProducts>}/>

          {/* Ecomm Routes */}
          <Route path="/ecomm" element={<Carousel />} />
            <Route exact path="/ecomm/cloud/services" element={<CloudServices />} />
            <Route exact path="/ecomm/cloud/services/compute" element={<ComputeCloud />} />
            <Route exact path="/ecomm/cloud/services/secure" element={<SecureCloud />} />
            <Route exact path="/ecomm/cloud/services/hosting" element={<HostCloud />} />
            <Route exact path="/ecomm/cloud/services/drive" element={<DriveCloud />} />
            <Route exact path="/ecomm/cloud/services/erp" element={<ERPCloud />} />
            <Route exact path="/ecomm/cloud/services/support" element={<Support />} />
            <Route exact path="/ecomm/software/services" element={<SoftwareSolutions />} />
            <Route exact path="/ecomm/marketing/services" element={<Marketing />} />
            <Route exact path="/ecomm/electronics_repairs" element={<ElectronicRepair />} />
        </Routes>
          </Suspense>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
