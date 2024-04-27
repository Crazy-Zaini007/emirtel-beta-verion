import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux';
import { useAuthContext } from '../hooks/UserContextHook'
import UserProfileHook from '../hooks/UserProfileHook';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Fade } from "react-awesome-reveal";
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import emptycart from '../assets/icons/empty_cart-icon.png'
export default function Cart() {

    const apiUrl = process.env.REACT_APP_API_URL;

    const userProfile = useSelector((state) => state.userProfile.userProfile);

    const[option,setOption]=useState(0)

    const { gettingUserProfile } = UserProfileHook()

    const { user } = useAuthContext()
    const fetchData = async () => {
        await gettingUserProfile()
    }
    useEffect(() => {
        fetchData()
    }, [user])

    const [wLoading, setWLoading] = useState(false)
    const removeCart = async (product) => {
        setWLoading((prevState) => ({
            ...prevState,
            [product._id]: true
        }));
        let productId = product._id
        try {
            const response = await fetch(`${apiUrl}/auth/user/wishlist/delete/wishlist`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body: JSON.stringify({ productId })
            })
            if (response.ok) {
                fetchData()
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
    

    const [quantities, setQuantities] = useState({}); // State to track product quantities
    // Function to handle quantity increment
    const incrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }));
    };

    // Function to handle quantity decrement
    const decrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
        }));
    };

    
const [productsToCheckout, setProductsToCheckout] = useState([]);
useEffect(() => {
    if (userProfile && userProfile.wishlist && userProfile.wishlist.length > 0) {
        const updatedProducts = userProfile.wishlist.map(product => {
            const quantity = quantities[product._id] || 0;
            return {
                ...product,
                quantity: quantity,
                totalPrice: quantity * product.price
            };
        });
        const filteredProducts = updatedProducts.filter(product => product.quantity > 0);
        setProductsToCheckout(filteredProducts);
    } else {
        setProductsToCheckout([]);
    }
}, [userProfile, quantities]);


    // Calculate total quantity and total price
    let totalQuantity = 0;
    let totalPrice = 0;
    if (userProfile && userProfile.wishlist && userProfile.wishlist.length > 0) {
        userProfile.wishlist.forEach((product) => {
            const quantity = quantities[product._id] || 0;
            totalQuantity += quantity;
            totalPrice += quantity * product.price;
        });
    }


    const steps = ['Orders details', 'Address Info', 'Delivery'];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const[deliveryType,setDeliveryType]=useState('')
  const[fName,setFName]=useState('')
  const[lName,setLName]=useState('')
  const[phone,setPhone]=useState('')
  const[city,setCity]=useState('')
  const[address,setAddress]=useState('')

  const[cardFName,setCardFName]=useState('')
  const[cardLName,setCardLName]=useState('')
  const[cardNumber,setCardNumber]=useState('')
  const[securityCode,setSecurityCode]=useState('')
  const[expDate,setExpDate]=useState('')

// Placing and Order
const plceOrder=async(e)=>{
    e.preventDefault()
    setWLoading(true);
    try {
        const response = await fetch(`${apiUrl}/auth/user/orders/place/order`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({deliveryType,fName,lName,phone,city,address,cardFName,cardLName,cardNumber,securityCode,expDate,orders:productsToCheckout,totalQuantity,totalPrice})
        })
        const json=await response.json()
        if (response.ok) {
            fetchData()
            setDeliveryType('')
            setFName('')
            setLName('')
            setPhone('')
            setCity('')
            setAddress('')
            setCardFName('')
            setCardLName('')
            setCardNumber('')
            setSecurityCode('')
            setExpDate('')
            setProductsToCheckout([])
        setWLoading(false);
        alert(json.message)
        }
        if (!response.ok) {
        setWLoading(false);
        alert(json.message)
            
        }
    } catch (error) {
        setWLoading(false);
    }
}


    return (
        <div>
            <div className="container-fluid shopping_cart py-md-4 py-3">
                <div className="container px-md-2">
                    <div className="row px-md-2 justify-content-center">
                        <h2 className='text-center mb-4'>My Shopping Cart</h2>
                       {option===0 && 
                       <>
                        <Fade direction='up'  className="col-md-12 bg-white pt-2 pb-4 content">
                            <TableContainer >
                                <Table>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell className='text-center'>Items</TableCell>
                                            <TableCell className='text-center'>Product</TableCell>
                                            <TableCell className='text-center'>Stock</TableCell>
                                            <TableCell className='text-center'>Quantity</TableCell>
                                            <TableCell className='text-center'>Remove</TableCell>
                                            <TableCell className='text-center'>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userProfile && userProfile.wishlist && userProfile.wishlist.length > 0 &&
                                            userProfile.wishlist.map((data, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className='td text-center'>
                                                        <div className="image mx-auto">
                                                            <div id="carouselExampleIndicators" className="carousel slide py-0" data-bs-ride="carousel">
                                                                <div className="carousel-inner carousel-fade py-0 my-0">
                                                                    {data.images && data.images.map((image, index) => (
                                                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                            <img src={image.imageUrl} className="d-block w-100" alt="..." />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className='text-center td'>{data.title}</TableCell>

                                                    <TableCell className='text-center td'>{data.available === true || (data.quantity - data.soldQuantity === 0) ?
                                                        <small className='my-0 py-0 in_stock'>In Stock</small> :
                                                        <small className='my-0 py-0 out_of_stock'>Out of Stock</small>
                                                    }</TableCell>
                                                    <TableCell className='text-center td'>
                                                        <div className="btn-group" role="group" aria-label="">
                                                            <button className="btn px-3 py-2" onClick={() => incrementQuantity(data._id)}><i className="fas fa-plus"></i></button>
                                                            <span className="btn px-3 py-2 span_text">{quantities[data._id] || 0}</span>
                                                            <button className="btn px-3 py-2" onClick={() => decrementQuantity(data._id)}><i className="fas fa-minus"></i></button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className='text-center td '>
                                                    <button className='btn py-2 px-3' onClick={() => removeCart(data)} disabled={wLoading[data._id]}>
                                                            {wLoading[data._id] ? <i className="fa-solid fa-spinner fa-spin"></i> :<i className="fas fa-times"></i>}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell className='text-center td'>{data.price * (quantities[data._id] || 0)}$</TableCell>
                                                </TableRow>
                                            ))
                                            
                                        }
                                    </TableBody>
                                   
                                </Table>

                            </TableContainer>
                            {userProfile && userProfile.wishlist && userProfile.wishlist.length < 1 &&
                                        <div className='row'>
                                            <div className='col-md-2 col-sm-12 text-center mx-auto my-4 empty_cart '>
                                                
                                            <Fade direction='up' className='p-0'>
                                            
                                            <Link className='btn find_btn px-2' to='/' ><img src={emptycart} alt="" /></Link>
                                            </Fade>
                                    </div>
                                        </div>
                                    }
                            {userProfile && userProfile.wishlist && userProfile.wishlist.length > 0 &&
                                <div className="d-flex justify-content-md-between justify-content-center py-3 check_out">
                                    <div className="left">

                                    </div>
                                    <div className="right">
                                        <button className='quantity px-md-4 px-1 m-1'>
                                            <span>Total Qunatity:</span> {totalQuantity}
                                        </button>
                                        <button className='quantity px-md-4 px-1 m-1'>
                                            <span>Total Price:</span> {totalPrice}$
                                        </button>
                                        <button className='chech_out_btn px-md-4 px-1 mx-1' disabled={productsToCheckout.length<1} onClick={()=>setOption(1)}>
                                            Checkout <i className="fas fa-shopping-basket m-1"></i>
                                        </button>
                                    </div>
                                </div>
                            }
                         
                            
                        </Fade>
                       </>
                       }
                    {option===1 && 
                    <>
                    <div className="col-md-7 bg-white pt-2 pb-4 checkout_content">
                        <div className="d-flex justify-content-between my-3">
                            <div className="left">
                                <h4 ><i className="fas fa-receipt"></i> Checkout Summary</h4>
                                </div>
                                <div className="right">
                                    <span type='button' disabled={wLoading} onClick={()=>setOption(0)}><i className='fas fa-times-circle'></i></span>
                                </div>
                        </div>
                           
        <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}  >
            
            <StepButton disabled color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box  />
              
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            {activeStep + 1===1 && <>
              <div className="d-flex justify-content-between mt-3">
                            <div className="left ">
                                <h5 className='mb-2'><i className="fas fa-cart-arrow-down"></i> Items</h5>
                            {productsToCheckout.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.title}</p>
                                            </div>
                                        ))}
                            </div>
                            <div className="middle text-center">
                            <h5 className='mb-2'><i className="fas fa-box"></i> Quantity</h5>
                            {productsToCheckout.map((product, index) => (
                                            <div key={index}>
                                                <p>{quantities[product._id]}</p>
                                            </div>
                                        ))}
                            </div>
                            <div className="right text-center">
                            <h5 className='mb-2'><i className="fas fa-dollar-sign"></i> Price </h5>
                            {productsToCheckout.map((product, index) => (
                                            <div key={index}>
                                             <p className='price'>{product.price * quantities[product._id]}$</p>
                                            </div>
                                        ))}
                            </div>
                            
                        </div>
                        <hr />
                 <div className="d-flex justify-content-between total py-0 my-0">
                    <div className="left text-center ">
                        <h6 className='text-center'>Total :</h6>
                    </div>
                    <div className="middle text-end">
                    <p>
                        {totalQuantity}
                    </p>
                    </div>
                    <div className="right text-center">
                    <p className=' price'>
                        {totalPrice}$
                    </p>
                    </div>
                 </div>
                        <div className="buttons">
                    <button className="buy_btn btn my-1 py-2" onClick={handleNext} >Continue</button>
                    <button className="cancel_btn btn my-1" onClick={()=>setOption(0)} disabled={wLoading}>Cancel</button>
                   

                 </div>
              </> }
              {(activeStep+1===2 || activeStep+1===3)  && 
              <>   
                      <form className='px-md-4 px-3' onSubmit={plceOrder}>
                        {activeStep+1===2 && <>
                        <div className="row">
                            <div className="col-md-6 px-1">
                              <div className='my-2'>
                                 
                                <input type="text" required placeholder='Enter your first name' value={fName} onChange={(e)=>setFName(e.target.value)}/>
                              </div >
                            </div >
                            <div className="col-md-6 px-1">
                              <div className='my-2'>
                                 
                                <input type="text" required placeholder='Enter your last name' value={lName} onChange={(e)=>setLName(e.target.value)}/>
                              </div >
                            </div >
                             <div className="col-md-6 px-1">
                              <div className='my-2'>
                                  
                                <input type="number" min='0' required placeholder='Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                              </div>
                            </div>
                             <div className="col-md-6 px-1">
                              <div className='my-2'>
                                 
                                <input type="text" min='0' required placeholder='Enter your city name' value={city} onChange={(e)=>setCity(e.target.value)}/>
                              </div>
                            </div>
                             <div className="col-md-12 px-1">
                              <div className='my-2'>
                                 
                               <textarea name="" id="" required className='pt-2' placeholder='Shipping address, where to deliver' value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                                
                              </div>
                            </div>
                            <div className="buttons px-1 pt-1">
                            <button className="buy_btn btn my-1 py-2" onClick={handleNext} >Continue</button>
                            <button className="cancel_btn btn my-1"  disabled={activeStep === 0}onClick={handleBack}>Back</button>
                   

                 </div>
                        </div>
                      
                       
                        </>}
                      
                      {activeStep+1===3 &&<>
                       <div className="row">
                      <div className="col-md-12 px-1">
                      <label htmlFor="" className='py-2'>Delivery Type</label>
                       <select name="" id="" required value={deliveryType} onChange={(e)=>setDeliveryType(e.target.value)}>
                       <option value="" >Select</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Pay Online">Pay Online</option>
                       </select>
                      </div>
                      {deliveryType.toLowerCase()==='pay online' && 
                      <div className="row mt-4">
                      <h6><i className="fas fa-money-check me-1"></i> Payment Info</h6>
                      <div className="col-md-6 px-1">
                      <div className='my-2'>
                      <label htmlFor="" className='mb-1'>First Name</label>
                               
                               <input type="text" required placeholder='Enter card holder first name' value={cardFName} onChange={(e)=>setCardFName(e.target.value)}/>
                             </div >
                      </div>
                      <div className="col-md-6 px-1">
                          <div className="my-2">
                      <label htmlFor="" className='mb-1'>Last Name</label>
                               
                               <input type="text" required placeholder='Enter card holder last name' value={cardLName} onChange={(e)=>setCardLName(e.target.value)}/>
                          </div>
                      </div>

                      <div className="col-md-6 px-1">
                          <div className="my-2">
                      <label htmlFor="" className='mb-1'>Credit Card Number</label>
                               
                               <input type="text" required placeholder='Enter card number' value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}/>
                          </div>
                      </div>

                      <div className="col-md-6 px-1">
                          <div className="my-2">
                      <label htmlFor="" className='mb-1'>Security Code</label>
                               
                               <input type="number" required placeholder='CVC' value={securityCode} onChange={(e)=>setSecurityCode(e.target.value)}/>
                          </div>
                      </div>
                      <div className="col-md-6 px-1">
                          <div className="my-2">
                      <label htmlFor="" className='mb-1'>Card Expiration</label>
                               
                               <input type="number" required placeholder='MM / YY' value={expDate} onChange={(e)=>setExpDate(e.target.value)}/>
                          </div>
                      </div>
                    </div>
                      }
                       <div className="buttons px-1 pt-1">
                    <button className="buy_btn btn my-1 py-2" disabled={wLoading}>{wLoading ?"Placing":"Order Now"}</button>
                    <button className="cancel_btn btn my-1"  disabled={activeStep === 0 || wLoading}onClick={handleBack}>Back</button>
                   
                 </div>
                       </div>
         
                      </>}
                         
                      </form>
              </>
              }
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
                    </div>
                    </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
