import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import { useAuthContext } from './hooks/UserContextHook';

import CategoryProducts from "./components/CategoryProducts";
function App() {
  const { user } = useAuthContext();
  console.log(user)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route  path='/' element={<Homepage></Homepage>}/>
          <Route path='/shopping_cart' element={user && <Cart></Cart> }/>
          <Route  path='/category/prodcuts/:id' element={<CategoryProducts></CategoryProducts>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
