import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/UserContextHook';
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import CategoryProducts from "./components/CategoryProducts";
import Orders from "./components/Orders";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage></Homepage>}/>
          <Route path='/shopping_cart' element={user && <Cart></Cart> }/>
          <Route path='/my_orders' element={user && <Orders></Orders> }/>
          <Route path='/category/products/:id' element={<CategoryProducts></CategoryProducts>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
