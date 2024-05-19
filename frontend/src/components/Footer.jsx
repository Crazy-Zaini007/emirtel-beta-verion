import React, { useState, useEffect } from 'react'
import { Slide, Fade } from "react-awesome-reveal";
import CategoryHook from '../hooks/CategoryHook'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/UserContextHook'
import { useSelector } from 'react-redux';
import logo from '../assets/mylogo.png'

export default function Footer() {
    const { user } = useAuthContext()
    const categories = useSelector((state) => state.allCategories.categories);
    const { getAllCategories } = CategoryHook()
    const fetchData=async()=>{
await getAllCategories()
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">

  <section>
    <div className="container-fluid text-center text-md-start pt-4">
      <div className="row px-md-1 px-2">
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto  mb-md-4 mb-2">
          <h6 className="text-start fw-bold mb-4 brand_name">
            <img src={logo} className='me-1' alt="" />Emirtel
          </h6>
          <p className='text-start'>We at Emirtel believe that our success is attributed to the trust our customers have put in us, With an ambition to bring products and solutions closer to our customers.</p>
        </div>
        
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto text-start mb-md-4 mb-2">
          
          <h6 className="fw-bold mb-4">
            Usefull Links
          </h6>
          <p>
            <Link to="/" className="text-reset"><i className="fa-solid fa-angles-right my-2"></i> Home</Link> <br />
            {user &&<>
                <Link to="/shopping_cart" className="text-reset text-start"><i className="fa-solid fa-angles-right my-2"></i> Shopping Cart</Link> <br />
                <Link to="/my_orders" className="text-reset text-start"><i className="fa-solid fa-angles-right my-2"></i> My Orders</Link> <br />
                {/* <Link to="/notifications" className="text-reset text-start"><i className="fa-solid fa-angles-right my-2"></i> Notifiations</Link> <br /> */}
            </>
            }
          </p>
        </div>
        
        <div className="col-md-3 col-lg-2 col-xl-2 text-start mx-auto mb-md-4 mb-2">
          
          <h6 className="fw-bold mb-4">
            Top Categories
          </h6>
          {categories && categories.filter(category=>category.product.length>0).map((category, index)=>(
            <p key={index}>
            <Link to={`/category/prodcuts/${category._id}`} className="text-reset text-start"><i className="fa-solid fa-up-right-from-square"></i> {category.categoryName}</Link>
          </p>
          ))}
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3 text-start mx-auto mb-md-4 mb-2">
          {/* Links */}
          <h6 className=" fw-bold mb-4">
            Contact Us
          </h6>
          <p> <a href="tel:+971501440101" className='my-2 text-reset text-start'><i className="fa-solid fa-phone me-1"></i>Tel:  +971501440101  </a></p>
         <p> <a href="mailto:info@emirtel.ae" className='my-2 text-reset text-start'><i className="fa-solid fa-envelope me-1"></i>Email:  info@emirtel.ae</a></p>
         <p> <a  href="https://www.google.com/maps/search/?api=1&query=Dubai%2C+Ras+Al+Khaimah%2C+UAE" target='_blank' className='my-2 text-reset text-start'><i className="fa-solid fa-map-location me-1"></i>Dubai, Ras Al Khaimah, UAE</a></p>
          
        </div>
      </div>
     
    </div>
  </section>
  <div className="text-center py-2" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    © Copyright:
    <Link className="text-reset fw-bold" to="/"> Emirtel Online</Link>
  </div>

</footer>
  )
}
