import React, { useState, useEffect } from 'react'
// import CountUp from 'react-countup';
import { Slide, Fade } from "react-awesome-reveal";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentHook from '../hooks/ContentHook';
import CategoryHook from '../hooks/CategoryHook'
import { Link } from 'react-router-dom'
import ProductHook from '../hooks/ProductHook'
import { useAuthContext } from '../hooks/UserContextHook'
import carousel1 from '../assets/pic2.jpg'
import carousel2 from '../assets/pic1.jpg'
import carousel3 from '../assets/carousel6.jpg'
import carousel4 from '../assets/carousel4.jpg'
import { Rating } from '@mui/material';
import deliveryIcon from '../assets/icons/home-delivery.png'
import safePayments from '../assets/icons/safe-payment.png'
import orderTracking from '../assets/icons/order-tracking.png'
import { useSelector } from 'react-redux';
import UserProfileHook from '../hooks/UserProfileHook';
import Navbar from './Navbar'
import Footer from './Footer'
export default function Homepage() {
    const { user } = useAuthContext()

    const apiUrl = process.env.REACT_APP_API_URL;
    const categories = useSelector((state) => state.allCategories.categories);
    const allProducts = useSelector((state) => state.products.allProducts);
    const userAllProducts = useSelector((state) => state.products.userAllProducts);
    const latestProducts = useSelector((state) => state.products.latestProducts);
    const userAllLatestProducts = useSelector((state) => state.products.userAllLatestProducts);
    const userProfile = useSelector((state) => state.userProfile.userProfile);

    const content = useSelector((state) => state.content.contentImages);
    console.log('content', content)
    const [title, setTitle] = useState('');
    const filteredUserAllProducts = userAllProducts && userAllProducts.filter(product => {
        return (
            (product.title.trim().toLowerCase().includes(title.trim().toLowerCase()) ||
                product.description.trim().toLowerCase().includes(title.trim().toLowerCase())) &&
            product.isApproved === true
        );
    });

    const filteredAllProducts = allProducts && allProducts.filter(product => {
        return (
            (product.title.trim().toLowerCase().includes(title.trim().toLowerCase()) ||
                product.description.trim().toLowerCase().includes(title.trim().toLowerCase())) &&
            product.isApproved === true
        );
    });


    const { getAllCategories } = CategoryHook()
    const { gettingAllProducts, gettingAllLatestProducts, gettingAuthAllProducts, gettingAuthAllLatestProducts } = ProductHook()
    const { gettingUserProfile } = UserProfileHook()
    const { getAllContentImages } = ContentHook()
    const fetchData = async () => {
        await getAllContentImages()
        if (!user) {
            // await gettingAllLatestProducts()
            await gettingAllProducts()
        }
        if (user) {
            await gettingUserProfile()
            // await gettingAuthAllLatestProducts()
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

            setWLoading((prevState) => ({
                ...prevState,
                [product._id]: false
            }));
        }
    }



    return (
        <>
            <Navbar></Navbar>

            <div className="container-fluid">
                <div className="row p-0">
                    <div className="col-md-12 p-0">
                      
                        {content && content.length > 0 ?
                            <Carousel fade>
                                {content.map((data,index)=>(
                            <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={data}
                                alt="First slide"
                            />

                        </Carousel.Item>
                                ))}
                       
                            </Carousel>
                     :
                            <Carousel fade>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={carousel1}
                                        alt="First slide"
                                    />

                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={carousel2}
                                        alt="Second slide"
                                    />

                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={carousel3}
                                        alt="Third slide"
                                    />

                                </Carousel.Item>
                            </Carousel>
                        }

                    </div>
                </div>
            </div>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade py-0" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner carousel-fade py-0 my-0">
                    {/* <div className="carousel-caption p-0">
          <div className="row justify-content-center p-0">
            <div className="col-lg-10 col-12 p-0">
              <h1><span className='py-2 px-1 d-none d-sm-block'>Emirtel</span></h1>
              <h6>Find the best ever daily life's Products here from various categories...</h6>
              <div className="input-group mb-3 shadow">
                <input
                  type="search"
                  className="form-control shadow"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Search for product..."
                  aria-describedby="button-addon2"
                />
                <button className="btn shadow px-3" type="button" id="button-addon2">
                  <i className="fa-solid fa-magnifying-glass me-md-2 ms-md-1"></i>
                  <span className='d-none d-md-inline'>Search</span>
                </button>
              </div>
              {title && (
                <p className='text-start'>
                  <span className='total_length me-2'>
                    {filteredUserAllProducts.length || filteredAllProducts.length}
                  </span>
                  Products found for your search <span className='total_length'>" {title.toUpperCase()} "</span>
                </p>
              )}
            </div>
          </div>
        </div> */}

                </div>
            </div>
            {title &&
                <div className="container-fluid latest_products py-5">
                    <div className="row justify-content-center px-md-3 px-2">
                        <h2 className="text-center mb-4">Your Search Results</h2>
                        {!user &&
                            <>
                                {filteredAllProducts && filteredAllProducts.length > 0 ? filteredAllProducts.map((data) => (
                                    <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                        <div className="card border-0" >
                                            <Carousel >
                                                {data.images && data.images.map((image, index) => (
                                                    <Carousel.Item key={index} className='image'>
                                                        {image.imageUrl ? <a href={image.imageUrl} target="_blank" rel="noopener noreferrer"> <img src={image.imageUrl} alt='Image' className='rounded' /></a> : "No Picture"}

                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                            <div className="card-body">
                                                <h5 className="card-title">{data.title}</h5>
                                                <h6 className='text-muted'><i >from</i> {data.categoryName}</h6>
                                                <strong>${data.price}</strong> <br />
                                                <p>{data.description}</p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="left">
                                                        <p className='rating'><Rating name="half-rating-read " size="small" value={calculateAverageRating(data.product_Rating)} precision={0.5} readOnly />({data.product_Rating.length})</p>
                                                        {data.available === true || (data.quantity - data.soldQuantity === 0) ?
                                                            <small className='my-0 py-0 in_stock'>In Stock</small> :
                                                            <small className='my-0 py-0 out_of_stock'>Out of Stock</small>
                                                        }
                                                    </div>
                                                    {/* */}
                                                    {/* <div className="right">
                                           <Slide className='btn purchase_btn mx-1 py-2' data-bs-toggle="modal" data-bs-target="#join_modal">Add to Cart</Slide>
                                      </div> */}
                                                </div>
                                            </div>
                                        </div>

                                    </Fade>
                                )) : <p className='text-center my-1'>No Product found you searched for !</p>}
                            </>
                        }
                        {user &&
                            <>
                                {filteredUserAllProducts && filteredUserAllProducts.length > 0 ? filteredUserAllProducts.map((data) => (
                                    <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                        <div className="card border-0" >
                                            <Carousel >
                                                {data.images && data.images.map((image, index) => (
                                                    <Carousel.Item key={index} className='image'>
                                                        {image.imageUrl ? <a href={image.imageUrl} target="_blank" rel="noopener noreferrer"> <img src={image.imageUrl} alt='Image' className='rounded' /></a> : "No Picture"}

                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                            <div className="card-body">
                                                <h5 className="card-title">{data.title}</h5>
                                                <h6 className='text-muted'><i >from</i> {data.categoryName}</h6>
                                                <strong>${data.price}</strong> <br />
                                                <p>{data.description}</p>
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
                                )) : <p className='text-center my-1'>No Product found you searched for !</p>}
                            </>
                        }

                    </div>
                </div>
            }

            {/* Categories */}

            <div className="container-fluid all_categories py-5">
                <div className="row justify-content-center px-md-3 px-2">
                    <h2 className="text-center mb-4">Products Categories</h2>
                    {categories && categories.length > 0 ? categories.map((data) => (
                        <Slide className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                            <div className="card border-0 shadow" >
                                <div className="image">
                                    <img src={data.image} className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{data.categoryName}</h5>
                                    <strong><i>Products: </i>{data.product.filter(product => product.isApproved === true).length}</strong> <br />
                                    {data.description && <p>{data.description}</p>}

                                    {data.des_Pic &&
                                        <div className='des_Pic'>
                                            <a href={data.des_Pic} target="_blank" rel="noopener noreferrer"> <img src={data.des_Pic} alt='Description' className='rounded' /></a>
                                        </div>
                                    }


                                    <Slide direction="right" className='mt-auto'>
                                        {data.product.filter(product => product.isApproved === false).length === data.product.length ? (
                                            <span className='btn view_btn py-2 disabled mt-auto' style={{ pointerEvents: 'none', opacity: 0.5 }}>View Products</span>
                                        ) : (
                                            <Link className='btn view_btn py-2 mt-auto' to={`/ecomm/emirtel/category/products/${data._id}`}>View Products</Link>
                                        )}
                                    </Slide>

                                </div>
                            </div>
                        </Slide>
                    )) : <p className='text-center'>No product category found !</p>}
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
            {/* <div className="container-fluid latest_products py-5">
                <div className="row justify-content-center px-md-3 px-2">
                    <h2 className="text-center mb-4">Top Selling Products</h2>
                    {!user &&
                        <>
                            {allProducts && allProducts.length > 0 ? (
                                allProducts
                                    .filter(d => d.soldQuantity > 20 && d.isApproved===true)
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
                                    .filter(data => data.soldQuantity > 20 && data.isApproved===true)
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
            </div> */}



            {/* Showing Category Wise Products */}
            {/* <div className="container benefits py-3">
                <h2 className="text-center my-4">Products from all Categories</h2>
            </div> */}
            {/* {categories && categories
  .filter(category => category.product.length > 0)
  .map((category,index) => (
    <>
    <div className="container-fluid latest_products bg-white py-3">
                <div className="row justify-content-center px-md-3 px-2">
                    <h3 className="text-center mb-4">{index+1}: {category.categoryName}</h3>
                    {!user &&
                        <>
                            {category.product &&
                                category.product.map((data) => (
                                <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
                                    <div className="card border-0 shadow" >
                                    
                                        {data.soldQuantity>20 && <span className='top_rated pt-1 text-center'>Top Selling</span>}
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
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fade>
                            ))}
                        </>
                    }
                    {user &&
  <>
    {category.product &&
      category.product.map((data) => {
       
        const isWishlisted =userProfile && userProfile.wishlist && userProfile.wishlist.some(item => item.title.toLowerCase() === data.title.toLowerCase());
        return (
          <Fade className="col-xl-3 col-lg-4 col-md-6 col-sm-12 px-2 my-1" key={data._id}>
            <div className="card border-0 shadow" >
              {data.soldQuantity > 20 && <span className='top_rated pt-1 text-center'>Top Selling</span>}
              <div className="image">
                <div id="carouselExampleIndicators" className="carousel slide py-0 " data-bs-ride="carousel">
                  <div className="carousel-inner carousel-fade py-0 my-0">
                    {data.images && data.images.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
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
                    <button className='btn purchase_btn mx-1 py-2' onClick={() => addToWishlist(data)} disabled={wLoading[data._id] || isWishlisted}>
                      {wLoading[data._id] ? <i className="fa-solid fa-spinner fa-spin"></i> : (isWishlisted ? "In Cart" : "Add to Cart")}
                    </button>
                  </Slide>
                </div>
              </div>
            </div>
          </Fade>
        );
      })}
  </>
}


                </div>
            <hr className='px-5' />

            </div>
    </>
            
  ))} */}

            <Footer></Footer>

        </>
    )
}
