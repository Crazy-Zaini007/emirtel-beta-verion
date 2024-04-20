import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import CategoryProducts from "./components/CategoryProducts";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route exact path='/' element={<Homepage></Homepage>}/>
          {/* <Route exact path='/shopping_cart' element={<Cart></Cart>}/> */}
          <Route exact path='/category/prodcuts/:id' element={<CategoryProducts></CategoryProducts>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
