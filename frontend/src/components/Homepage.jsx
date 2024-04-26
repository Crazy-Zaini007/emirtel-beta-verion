import React, { useState, useEffect } from 'react'
// import CountUp from 'react-countup';
import { Slide, Fade } from "react-awesome-reveal";
import CategoryHook from '../hooks/CategoryHook'
import { Link } from 'react-router-dom'
import ProductHook from '../hooks/ProductHook'
import { useAuthContext } from '../hooks/UserContextHook'
import carousel5 from '../assets/carousel5.jpg'
import carousel6 from '../assets/carousel6.jpg'
import carousel7 from '../assets/carousel7.jpg'
import { Rating } from '@mui/material';
import deliveryIcon from '../assets/icons/home-delivery.png'
import safePayments from '../assets/icons/safe-payment.png'
import orderTracking from '../assets/icons/order-tracking.png'
import { useSelector } from 'react-redux';
import UserProfileHook from '../hooks/UserProfileHook';

export default function Homepage() {
    const { user } = useAuthContext()

    const apiUrl = process.env.REACT_APP_API_URL;
    const categories = useSelector((state) => state.allCategories.categories);
    const allProducts = useSelector((state) => state.products.allProducts);
    const userAllProducts = useSelector((state) => state.products.userAllProducts);
    const latestProducts = useSelector((state) => state.products.latestProducts);
    const userAllLatestProducts = useSelector((state) => state.products.userAllLatestProducts);
    // const userProfile = useSelector((state) => state.userProfile.userProfile);
    const [title, setTitle] = useState('');
    const filteredUserAllLatestProducts = userAllLatestProducts && userAllLatestProducts.filter(product => {
        return (
            (product.title.trim().toLowerCase().includes(title.trim().toLowerCase()) ||
            product.description.trim().toLowerCase().includes(title.trim().toLowerCase())) &&
            product.isApproved === true
        );
    });
    
    const filteredLatestProducts = latestProducts && latestProducts.filter(product => {
        return (
            (product.title.trim().toLowerCase().includes(title.trim().toLowerCase()) ||
            product.description.trim().toLowerCase().includes(title.trim().toLowerCase())) &&
            product.isApproved === true
        );
    });
    

    const { getAllCategories } = CategoryHook()
    const { gettingAllProducts, gettingAllLatestProducts, gettingAuthAllProducts, gettingAuthAllLatestProducts } = ProductHook()
    const { gettingUserProfile } = UserProfileHook()

    const fetchData = async () => {
        if (!user) {
            await gettingAllLatestProducts()
            await gettingAllProducts()
        }
        if (user) {
            await gettingUserProfile()
            await gettingAuthAllLatestProducts()
            await gettingAuthAllProducts()
        }

        await getAllCategories()
    }
    useEffect(() => {
        fetchData()
    }, [user])

    const calculateAverageRating = (product_Rating) => {
        if (product_Rating.length === 0) return 0;
        const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
        return totalRating / product_Rating.length;
    }

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
                gettingUserProfile()
                gettingAuthAllLatestProducts()
                gettingAuthAllProducts()
                setWLoading((prevState) => ({
                    ...prevState,
                    [product._id]: false
                }));

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
        <>

            <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">

                <div className="carousel-inner carousel-fade py-0 my-0">
                <div class="carousel-caption p-0">
                            <div className="row justify-content-center p-0">
                                <div className="col-lg-10 col-12 p-0">
                                <h1><span className='py-2 px-1 d-none d-sm-block'>Emirtel online</span></h1>
                                <h6>Find the best ever daily life's Products here from variouse categories...</h6>
                           <div className="input-group mb-3 shadow">
                                    <input type="search" className="form-control shadow" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Search for product..." aria-describedby="button-addon2" />
                                    <button className="btn shadow px-3" type="button" id="button-addon2"><i className="fa-solid fa-magnifying-glass me-md-2 ms-md-1 "></i><span className='d-none d-md-inline '>Search</span></button>
                                    </div>
                                    {title &&<p className='text-start'>    
                                        <span className='total_length me-2'>{filteredLatestProducts.length}</span>Products found for your search <span className='total_length' >"{title.toUpperCase()}"</span>
                                        
                                        </p>}
                                </div>
                            </div>
                        </div>
                    <div className="carousel-item active p-0">
                        <img src={carousel5} className="d-block w-100" alt="..." />
                       
                    </div>
                    <div className="carousel-item">
                        <img src={carousel6} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel7} className="d-block w-100" alt="..." />
                    </div>
                </div>

            </div>

            <div className="container-fluid latest_products py-5">
                <div className="row justify-content-center px-md-3 px-2">
                    <h2 className="text-center mb-4">Our latest products</h2>
                    {!user &&
                        <>
                            {filteredLatestProducts && filteredLatestProducts.length > 0 ? filteredLatestProducts.map((data) => (
                                <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                    <div className="card border-0" >

                                        <div className="image">
                                            <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                                <div className="carousel-inner carousel-fade py-0 my-0">
                                                    {data.images && data.images.map((image, index) => (
                                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
                                                <div className="right">
                                                  
                                                    <Slide className='btn purchase_btn mx-1 py-2' data-bs-toggle="modal" data-bs-target="#join_modal">Add to Cart</Slide>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fade>
                            )) : <p className='text-center my-1'>No new Product found yet !</p>}
                        </>
                    }
                    {user &&
                        <>
                            {filteredUserAllLatestProducts && filteredUserAllLatestProducts.length > 0 ? filteredUserAllLatestProducts.map((data) => (
                                <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                    <div className="card border-0" >
                                        <div className="image">
                                            <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                                <div className="carousel-inner carousel-fade py-0 my-0">
                                                    {data.images && data.images.map((image, index) => (
                                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
                                                <Slide className="right">
                                                    
                                                <button className='btn purchase_btn mx-1 py-2' onClick={() => addToWishlist(data)} disabled={wLoading[data._id] || data.wishlisted}>
                                                            {wLoading[data._id] ? <i className="fa-solid fa-spinner fa-spin"></i> : (data.wishlisted ? "In Cart" : "Add to Cart")}
                                                        </button>
                                                </Slide>
                                            </div>
                                        </div>
                                    </div>

                                </Fade>
                            )) : <p className='text-center my-1'>No new Product found yet !</p>}
                        </>
                    }

                </div>
            </div>

            {/* Categories */}

            <div className="container-fluid all_categories py-5">
                <div className="row justify-content-center px-md-3 px-2">
                    <h2 className="text-center mb-4">Products Categories</h2>
                    {categories && categories.length > 0 && categories.map((data) => (
                        <Slide className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                            <div className="card border-0 shadow" >

                                <div className="image">
                                    <img src={data.image} className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.categoryName}</h5>
                                    <strong><i className="fas fa-tags"></i> {data.product.filter(product=>product.isApproved===true).length}</strong> <br />
                                    <p>{data.description}</p>
                                    <Slide direction="right" > <Link className='btn view_btn  py-2' to={`/category/prodcuts/${data._id}`}>View Products</Link></Slide>
                                </div>
                            </div>
                        </Slide>
                    ))}
                </div>
            </div>

            {/* Benefites */}
            <div className="container benefits py-3">
                <h2 className="text-center my-4">What We offer !</h2>
                <div className="row justify-content-center">
                    <Slide direction="left" className="col-md-4 ">
                        <div className="benefit text-center m-1 bg-white rounded p-4">
                            <img src={deliveryIcon} alt="Benefit" />

                            <h3 className='my-2'>Delivery</h3>
                            <p>Place orders, we will deliver it to you with extra safety and assurance!</p>
                        </div>
                    </Slide>
                    <Fade className="col-md-4 ">
                        <div className="benefit text-center m-1 bg-white rounded p-4">

                            <img src={safePayments} alt="Benefit" />

                            <h3 className='my-2'>Safe Payments</h3>
                            <p>Make purchases and pay securely using your credit cards, ensuring safe transactions!</p>
                        </div>
                    </Fade>
                    <Slide direction="right" className="col-md-4 ">
                        <div className="benefit text-center m-1 bg-white rounded p-4">

                            <img src={orderTracking} alt="Benefit" />

                            <h3 className='my-2'>Order Tracking</h3>
                            <p>Stay updated with real-time tracking of your orders, ensuring you know exactly when to expect your delivery!</p>
                        </div>
                    </Slide>
                </div>
            </div>

            {/* Testimonials */}
            {/* <div className="container-fluid testimonials py-5">

                <div className="row justify-content-center px-md-3 px-2">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1 ">
                        <div className="content text-center p-5  shadow rounded">
                            <h2><CountUp start={0} end={categories && categories.length} /> +</h2>
                            <p>Products categories</p>
                        </div>

                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1">
                        <div className="content text-center p-5 shadow rounded">
                            <h2><CountUp start={0} end={allProducts && allProducts.length} /> +</h2>
                            <p>Products</p>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1">
                        <div className="content text-center p-5 shadow rounded">
                            <h2><CountUp start={0} end={20} /> +</h2>
                            <p>New products daily</p>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1">
                        <div className="content text-center p-5 shadow rounded">
                            <h2>24 /7</h2>
                            <p>Support</p>
                        </div>
                    </div>
                </div>
            </div> */}


            {/* Top Selling Products */}
            <div className="container-fluid latest_products py-5">
                <div className="row justify-content-center px-md-3 px-2">
                    <h2 className="text-center mb-4">Top Selling Products</h2>
                    {!user &&
                        <>
                            {allProducts && allProducts.length > 0 ? (
                                allProducts
                                    .filter(d => d.soldQuantity === 0 && d.isApproved===true)
                            ).map((data) => (
                                <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                    <div className="card border-0" >
                                        <span className='top_rated pt-1 text-center'>Top Selling</span>

                                        <div className="image">
                                            <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                                <div className="carousel-inner carousel-fade py-0 my-0">
                                                    {data.images && data.images.map((image, index) => (
                                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
                                                <div className="right">
                                                    <Slide className='btn purchase_btn mx-1 py-2'>Add to Cart</Slide>
                                                    {/* <button className='btn purchase_btn mx-1 py-2' data-bs-toggle="modal" data-bs-target="#join_modal">Add to Cart</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fade>
                            )) : <p className='text-center my-1'>No Top Selling Product yet !</p>}
                        </>
                    }
                    {user &&
                        <>
                            {userAllProducts && userAllProducts.length > 0 ? (
                                userAllProducts
                                    .filter(data => data.soldQuantity === 0 && data.isApproved===true)
                            ).map((data) => (
                                <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                    <div className="card border-0" >
                                        <span className='top_rated pt-1 text-center'>Top Selling</span>

                                        <div className="image">
                                            <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                                                <div className="carousel-inner carousel-fade py-0 my-0">
                                                    {data.images && data.images.map((image, index) => (
                                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
                                                <Slide className="right">
                                                <button className='btn purchase_btn mx-1 py-2' onClick={() => addToWishlist(data)} disabled={wLoading[data._id] || data.wishlisted}>
                                                            {wLoading[data._id] ? <i className="fa-solid fa-spinner fa-spin"></i> : (data.wishlisted ? "In Cart" : "Add to Cart")}
                                                        </button>

                                                </Slide>
                                            </div>
                                        </div>
                                    </div>

                                </Fade>
                            )) : <p className='text-center my-1'>No Top Selling Product yet !</p>}
                        </>
                    }

                </div>
            </div>
        </>
    )
}
