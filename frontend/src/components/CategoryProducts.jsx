import React, {useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/UserContextHook'
import {useParams}  from 'react-router-dom'
import { Rating } from '@mui/material';
import { Slide, Fade } from "react-awesome-reveal";
import UserProfileHook from '../hooks/UserProfileHook';

export default function CategoryProducts() {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const {user}=useAuthContext()
    const[products,setProducts]=useState()
    const[authProducts,setAuthProducts]=useState()
    const [loading, setLoading] = useState(null)
    const { gettingUserProfile } = UserProfileHook()
   
    const { id }=useParams()

    const calculateAverageRating = (product_Rating) => {
        if (product_Rating.length === 0) return 0;
        const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
        return totalRating / product_Rating.length;
      }
    // Getting Products when the user is not loggedIn
    const getProducts=async()=>{
        setLoading(true)
        try {
         const response=await fetch(`${apiUrl}/auth/user/category_details/get/products/`+id,{
         })
         
         const json=await response.json()
 
         if(response.ok){
           setLoading(null)
           setProducts(json.data)
         }
         if(!response.ok){
             setLoading(null)
         }
        } catch (error) {
        console.log(error)
        }
    }

    // Getting Products when the user is loggedIn
    const getAuthProducts=async()=>{
        setLoading(true)
        try {
         const response=await fetch(`${apiUrl}/auth/user/category_details/get/auth/products/`+id,{
            headers:{
                'Authorization': `Bearer ${user.token}`
                
              }
         })
         
         const json=await response.json()
 
         if(response.ok){
           setLoading(null)
           setAuthProducts(json.data)
         }
         if(!response.ok){
             setLoading(null)
         }
        } catch (error) {
        console.log(error)
        }
    }

    const fetchData=async()=>{
if(user){
    await getAuthProducts()
    await gettingUserProfile()
}
if(!user){
    await getProducts()
}
    }

    useEffect(() => {
        fetchData()
    }, [user,id])


    //   Add to Wishlist 
    const [wLoading, setWLoading] = useState(false)
    const addToWishlist = async (product) => {
        setWLoading((prevState) => ({
            ...prevState,
            [product._id]: true
        }));
        try {
            const response = await fetch(`${apiUrl}/auth/user/wishlist/add/wishlist`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body: JSON.stringify(product)
            })
            if (response.ok) {
                setWLoading((prevState) => ({
                    ...prevState,
                    [product._id]: false
                }));
                fetchData()
                gettingUserProfile()
            }
            if (!response.ok) {
                setWLoading((prevState) => ({
                    ...prevState,
                    [product._id]: false
                }));
            }
        } catch (error) {
            console.log(error)
            setWLoading((prevState) => ({
                ...prevState,
                [product._id]: false
            }));
        }
    }

  return (
    <div>
        <div className="container-fluid all_categories mt-3">
        <Slide className="row justify-content-center px-md-3 px-2">
        <h2 className="text-center mb-4">All Products from <strong><i>{!user && products && products.categoryName} {user && authProducts && Array.from(new Set(authProducts.map(item => item.categoryName)))}</i></strong></h2>
        </Slide>
        </div>
       <div className="container-fluid latest_products py-5 mb-5">
                <div className="row justify-content-center px-md-3 px-2">
                    {loading &&
                    <div className='col-md-2'>
                        <h6>Getting products...</h6>
                    </div>
                    }
                   {!loading &&
                   <>
                   {!user &&
                   <>
                    {products && products.product.length > 0 ? products.product
                     .filter(data => data.isApproved === true)
                    .map((data) => (
                        
                            <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                            <div className="card border-0" >

                                <div className="image">
                                    <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                        <div className="carousel-inner carousel-fade py-0 my-0">
                                            {data.images && data.images.map((image,index) => (
                                                <div className={`carousel-item ${index===0? "active": ""}`}>
                                                    <img src={image.imageUrl} className="d-block w-100" alt="..." />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <h6 className='text-muted'><i >from</i> {data.categoryName}</h6>
                                    <strong>${data.price}</strong> <br />
                                    <div className="d-flex justify-content-between">
                                        <div className="left">
                                            <p className='rating'><Rating name="half-rating-read " size="small" value={calculateAverageRating(data.product_Rating)} precision={0.5} readOnly />({data.product_Rating.length})</p>
                                            {data.available === true || (data.quantity - data.soldQuantity === 0) ?
                                                <small className='my-0 py-0 in_stock'>In Stock</small> :
                                                <small className='my-0 py-0 out_of_stock'>Out of Stock</small>
                                            }
                                        </div>
                                        {/* <div className="right">
                                            <Slide className='btn purchase_btn mx-1 py-2' >Add to Cart</Slide>
                                            <button className='btn purchase_btn mx-1 py-2' data-bs-toggle="modal" data-bs-target="#join_modal">Add to Cart</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                        </Fade>
                        
                    )) : <p className='text-center my-1'>No Products in this Category yet !</p>}
                   </>
                   }
                     {user &&
                   <>
                    {authProducts && authProducts.length > 0 ? authProducts
                     .filter(data => data.isApproved === true)
                    .map((data) => (
                        <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                            <div className="card border-0" >

                                <div className="image">
                                    <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                        <div className="carousel-inner carousel-fade py-0 my-0">
                                            {data.images && data.images.map((image,index) => (
                                                <div className={`carousel-item ${index===0? "active": ""}`}>
                                                    <img src={image.imageUrl} className="d-block w-100" alt="..." />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <h6 className='text-muted'><i >from</i> {data.categoryName}</h6>
                                    <strong>${data.price}</strong> <br />
                                    <div className="d-flex justify-content-between">
                                        <div className="left">
                                            <p className='rating'><Rating name="half-rating-read " size="small" value={calculateAverageRating(data.product_Rating)} precision={0.5} readOnly />({data.product_Rating.length})</p>
                                            {data.available === true || (data.quantity - data.soldQuantity === 0) ?
                                                <small className='my-0 py-0 in_stock'>In Stock</small> :
                                                <small className='my-0 py-0 out_of_stock'>Out of Stock</small>
                                            }
                                        </div>
                                        {/* <Slide className="right">
                                        <button className='btn purchase_btn mx-1 py-2' onClick={() => addToWishlist(data)} disabled={wLoading[data._id] || data.wishlisted}>
                                                            {wLoading[data._id] ? <i className="fa-solid fa-spinner fa-spin"></i> : (data.wishlisted ? "In Cart" : "Add to Cart")}
                                                        </button>
                                        </Slide> */}
                                    </div>
                                </div>
                            </div>

                        </Fade>
                     )) : <p className='text-center my-1'>No Products in this Category yet !</p>}
                   </>
                   }
                   </>
                   }

                </div>
            </div>
    </div>
  )
}
