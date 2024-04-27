import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useAuthContext } from '../hooks/UserContextHook'
import ordersHook from '../hooks/OrdersHook'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box ,Collapse,Table, TableBody, TableContainer, TableHead, TableRow, TableCell, IconButton,Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import ProductsHook from "../hooks/ProductsHook"
import AdminsHook from '../hooks/AdminsHook';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
export default function Overview() {
  const dispatch = useDispatch()
  const { getAllApprovedProducts, loading } = ProductsHook()
  const { getAllAdmins } = AdminsHook()
  const { getAllOrders, allOrders,getAdminOrders,myOrders } = ordersHook()
  const ordersLength = allOrders && allOrders ? allOrders.length.toString().padStart(2, '0') : '00';
  const totalSells = allOrders && allOrders.length > 0 && allOrders
    .filter(order => order.order_Status.toLowerCase() === 'delivered')
    .reduce((total, order) => total + order.totalPrice, 0);

  function formatPrice(price) { 
    if (price >= 1000) {
      const formattedPrice = price / 1000;
      if (formattedPrice % 1 === 0) {
        return formattedPrice + 'K';
      } else {
        return formattedPrice.toFixed(1) + 'K';
      }
    } else {
      return price;
    }
  }
  const formattedTotalSells = formatPrice(totalSells);


  const myTotalSells = myOrders && myOrders.length > 0 && myOrders
    .filter(order => order.order_Status.toLowerCase() === 'delivered')
    .reduce((total, order) => total + order.totalPrice, 0);

  function formatPrice(price) {
    if (price >= 1000) {
      const formattedPrice = price / 1000;
      if (formattedPrice % 1 === 0) {
        return formattedPrice + 'K';
      } else {
        return formattedPrice.toFixed(1) + 'K';
      }
    } else {
      return price;
    }
  }
  const formattedMyTotalSells = formatPrice(myTotalSells);
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const { seller } = useAuthContext()
  const [option, setOption] = useState(0)

  useEffect(() => {
    if (seller) {
      getAdminOrders()
      getAllApprovedProducts()
    }
    if (seller.role.toLowerCase() === 'super admin') {
      getAllOrders()
    }
  }, [dispatch, option]);

  const allProducts = useSelector((state) => state.allProducts.allProducts);
  const productsLength = allProducts ? allProducts.length.toString().padStart(2, '0') : '00';

  const calculateAverageRating = (product_Rating) => {
    if (product_Rating.length === 0) return 0;
    const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / product_Rating.length;
  }

  const generateMonthlySalesData = (orders, year = new Date().getFullYear()) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const data = [];
  
    // Loop through the months of the specified year
    for (let month = 0; month < 12; month++) {
      // Find orders for the current month and year with status 'delivered'
      const salesForMonth = orders.reduce((total, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getFullYear() === year && orderDate.getMonth() === month && order.order_Status.toLowerCase() === 'delivered') {
          return total + order.totalPrice;
        }
        return total;
      }, 0);
  
      // Add data for the current month to the array
      data.push({ name: months[month], Sales: salesForMonth });
    }
  
    return data;
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [mySelectedYear, setMySelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  const handleMyYearChange = (event) => {
    setMySelectedYear(parseInt(event.target.value));
  };

  // Usage
  const adminOrders = myOrders || [];
  const overAllOrders=allOrders && allOrders || []
  const mySalesData = generateMonthlySalesData(adminOrders,selectedYear);
  const totalSalesData = generateMonthlySalesData(overAllOrders,mySelectedYear);


// Filtered All Orders
  const [status,setStatus]=useState('')
  const[search,setSearch]=useState('')
  const filteredAllOrders=allOrders && allOrders.filter(order=>{
    return(
      (order.buyer_Name.toLowerCase().includes(search.toLowerCase()) || 
       order.orderId.toLowerCase().includes(search.toLowerCase()) ||
       order.address.toLowerCase().includes(search.toLowerCase()) ||
       order.city.toLowerCase().includes(search.toLowerCase()) ||
       order.payment_Type.toLowerCase().includes(search.toLowerCase()) 

    ) && 
        order.order_Status.toLowerCase().includes(status.toLowerCase())
    )
})

  // deleting a product
  const [, setNewMessage] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const deleteProduct = async (product) => {
    setDelLoading(true)
    let productId = product._id
    let sellerId = product.sellerId
    try {
      const response = await fetch(`${apiUrl}/auth/admin/product/delete/product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ productId, sellerId, categoryName: product.categoryName })
      })

      const json = await response.json()

      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setDelLoading(false)
      }
      if (response.ok) {
        getAllApprovedProducts()
        setNewMessage(toast.success(json.message));
        setDelLoading(false)

      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setDelLoading(false)
    }
  }


  const [open, setOpen] = useState(null);
  const toggleOpen = (orderId) => {
    setOpen((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const [open1, setOpen1] = useState(null);

  const [order_Status, setOrder_Status] = useState('');


const [orderId,setOrderId]=useState('')
  const handleClickOpen = (id) => {
    setOpen1(true);
    setOrderId(id)
  };

  const handleClose = () => {
    setOpen1(false);
  };


  // Handle Order Status Updation
  const updateOrderStatus=async()=>{
    if (window.confirm(`Are you sure you want to update the order status to ${order_Status} ?`)) {
      setDelLoading(true)
      try {
        const response = await fetch(`${apiUrl}/auth/admin/all_orders/update/order`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${seller.token}`,
          },
          body: JSON.stringify({order_Status,orderId})
        })
  
        const json = await response.json()
  
        if (!response.ok) {
          setNewMessage(toast.error(json.message));
          setDelLoading(false)
        }
        if (response.ok) {
          setOpen1(false);
          getAllOrders()
          setNewMessage(toast.success(json.message));
          setDelLoading(false)
        }
      }
      catch (error) {
        setNewMessage(toast.error('Server is not responding...'))
        setDelLoading(false)
      }
    }
   
  }

  return (
    <div className='main'>
      <div className="container-fluid overview">
        <div className="row row mx-lg-2 mx-sm-3 my-3">
          <div className="col-sm-12 pb-2 m-0 px-2">
            <div className="justify-content-between d-flex">
              <div className="left">
                <h4>Overview</h4>
                <p className='welcome'>Here you can observe the progress of <b>Sales</b></p>
              </div>
              <div className="right">
                <select name="" id="" value={option} onChange={(e) => setOption(parseInt(e.target.value))} className='pe-2'>
                  <option value="0" >My Sales</option>
                  {seller.role === "Super Admin" &&
                    <>
                      <option value="1">Products</option>
                      <option value="2">Orders</option>
                      <option value="3">Total Sales</option>
                    </>
                  }


                </select>
              </div>
            </div>
          </div>
          {seller.role === "Super Admin" &&
            <Paper className="col-md-12 pb-0 overview-row py-2">
              <div className="d-flex justify-content-between px-0 py-2 total mx-auto">

                <div className="first d-flex mx-auto ">
                  <Avatar className='mt-2 avatar mx-2'><i className="fas fa-coins"></i></Avatar>
                  <h5 className='ms-2 p-0 mt-0 '><span >Total Sales</span> <br />{formattedTotalSells? formattedTotalSells :0}</h5>
                </div>

                <div className="second  d-flex mx-auto">
                  <Avatar className='mt-2 avatar mx-2'><i className="fas fa-sack-dollar"></i></Avatar>
                  <h5 className='ms-2 p-0 mt-0 '><span>My Total Sales</span> <br />{formattedMyTotalSells?formattedMyTotalSells:0}</h5>

                </div>
                <div className="third d-flex mx-auto">
                  <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-money-bill-trend-up"></i></Avatar>
                  <h5 className='ms-2 p-0 mt-0 '><span>Total Orders</span> <br />{ordersLength}</h5>
                </div>

                <div className="fourth d-flex mx-auto">
                  <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-cart-shopping"></i></Avatar>
                  <h5 className='ms-2 p-0 mt-0 '><span>Total Products</span> <br />{productsLength}</h5>
                </div>


                <div className="fifth">

                </div>

              </div>

            </Paper>
          }

          {option === 0 &&
            <div className="col-md-12 pb-2 px-1 mt-3 mb-4 charts">
              <Paper c>
                <div className="total-sells pt-3 my-2 mx-1">
                  <div className="d-flex justify-content-between  px-2">
                    <div className="left ">
                      <h6 className='mb-2'>My Sales</h6>
                      <p>Total Products sold from start day</p>
                    </div>
                    <div className="right">
                    <select name="year" id="year" className='pe-2'  value={selectedYear} onChange={handleYearChange}>
                        <option value={new Date().getFullYear()}>Current Year</option>
                        {myOrders &&
                          Array.from(new Set(myOrders.map(data => data.year))).map(year => (
                            <option key={year} value={year}>Year {year}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <ResponsiveContainer className='px-0' width="100%" height={280}>
                    <BarChart className='px-0'

                      height={300}
                      data={mySalesData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 10,
                      }}
                      barSize={15}
                    >
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#C5C5C5", dy: 10 }} axisLine={false} tickLine={false} />
                      {/* <YAxis tick={{ fontSize: 10, fill: "#C5C5C5", dx: -30  }} axisLine={false} tickLine={false} /> */}
                      <Tooltip />

                      <Bar dataKey="Sales" fill="#6F47EB" background={{ fill: '#eee' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </Paper>

            </div>
          }

          {option === 1 &&
            <div className="col-md-12 pb-2 px-1 mt-3 mb-4 table">
              <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                <Table>
                  <TableHead className='thead'>
                    <TableRow >
                      <TableCell className='text-center'>#</TableCell>
                      <TableCell className='text-center'>Date</TableCell>
                      <TableCell className='text-center'>Seller</TableCell>
                      <TableCell className='text-center'>Product</TableCell>
                      <TableCell className='text-center'>Category</TableCell>
                      <TableCell className='text-center'>Quantity</TableCell>
                      <TableCell className='text-center'>Sold</TableCell>
                      <TableCell className='text-center'>Price</TableCell>
                      <TableCell className='text-center'>Rating</TableCell>
                      <TableCell className='text-center'>Status</TableCell>
                      <TableCell className='text-center'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allProducts && allProducts.length > 0 ? allProducts.map((product, index) => (
                      <TableRow>
                        <TableCell className="text-center td">{index + 1}</TableCell>
                        <TableCell className="text-center td">{product.date}</TableCell>
                        <TableCell className="text-center td">{product.sellerName}</TableCell>
                        <TableCell className="text-center td">{product.title}</TableCell>
                        <TableCell className="text-center td">{product.categoryName}</TableCell>
                        <TableCell className="text-center td">{product.quantity}</TableCell>
                        <TableCell className="text-center td">{product.soldQuantity}</TableCell>
                        <TableCell className="text-center td">{product.price}</TableCell>
                        <TableCell className='text-center td'> <Rating name="read-only" className='rating' value={calculateAverageRating(product.product_Rating)} precision={0.5} readOnly />({product.product_Rating.length})</TableCell>
                        <TableCell className='text-center td'>
                          {product.available === true ?
                            <span className='out text-success'>In Stock</span> :
                            <span className='in text-danger'>Out of Stock</span>
                          }
                        </TableCell>
                        <TableCell className="text-center td">
                          <button className='btn btn-sm del_btn' onClick={() => deleteProduct(product)} disabled={delLoading}>Delete</button>
                        </TableCell>


                      </TableRow>
                    )) :
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className='text-center td '>Products_not_found!</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>


                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }

          {option === 2 &&
            <>
              <Paper className="col-md-12 bg-white py-2 mt-1 search_box">
              <div className="row">
                <div className=" col-sm-12 col-md-6 order-last order-md-first py-0 my-1">
               <ul className='py-0'>
                <li><Link className={`all_btn me-2 `} style={status.toLowerCase()===''? {borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('')}>All</Link></li>
                <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase()==='delivered'? {borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('delivered')}>Delivered</Link></li>
                <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase()==='shipping'? {borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('shipping')}>Shipping</Link></li>
                <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase()==='pending'?{borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('pending')}>Pending</Link></li>
                <li><Link className={`delivered_btn mx-2 `} style={status.toLowerCase()==='packing'? {borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('packing')}>Packing</Link></li>
                <li><Link className={`delivered_btn mx-2 `} style={status.toLowerCase()==='cancelled'? {borderBottom:'2px solid var(--purple)',color:'var(--purple)'}:{}} onClick={()=>setStatus('cancelled')}>Cancelled</Link></li>
               </ul>
                </div>
                <div className="col-md-6 col-sm-12 py-0 input_box order-first order-md-first my-1">
                <i className="fa fa-search" aria-hidden="true"></i>
                  <input type="search" placeholder='Seacrh here...' value={search} onChange={(e)=>setSearch(e.target.value)} />
                </div>
              </div>
            </Paper>
              <div className="col-md-12 pb-2 px-1 mt-1 mb-4 table px-0">
                <TableContainer component={Paper} sx={{ maxHeight: '650px' }}>
                  <Table>
                    <TableHead className='product_content_head'>
                      <TableRow >
                        <TableCell className='text-center'>Details</TableCell>
                        <TableCell className='text-center'>#</TableCell>
                        <TableCell className='text-center'>OrderId</TableCell>
                        <TableCell className='text-center'>Date</TableCell>
                        <TableCell className='text-center'>Time</TableCell>
                        <TableCell className='text-center'>Customer</TableCell>
                        <TableCell className='text-center'>City</TableCell>
                        <TableCell className='text-center'>Shipping_Address</TableCell>
                        <TableCell className='text-center'>Payment</TableCell>
                        <TableCell className='text-center'>Products</TableCell>
                        <TableCell className='text-center'>Quantity</TableCell>
                        <TableCell className='text-center'>Total_Price</TableCell>
                        <TableCell className='text-center'>Status</TableCell>
                        <TableCell className='text-center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAllOrders && filteredAllOrders.length > 0 ? filteredAllOrders.map((order, index) => (
                        <React.Fragment key={index}>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                          <TableCell className='text-center td'>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => toggleOpen(order._id)}
                            >
                              {open === order._id ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell className='text-center td'>{index + 1}</TableCell>
                          <TableCell className='text-center td'>{order.orderId}</TableCell>
                          <TableCell className='text-center td'>{order.date}</TableCell>
                          <TableCell className='text-center td'>{order.time}</TableCell>
                          <TableCell className='text-center td'>{order.buyer_Name}</TableCell>
                          <TableCell className="text-center td">{order.city}</TableCell>
                          <TableCell className="text-center td">{order.address}</TableCell>
                          <TableCell className="text-center td">{order.payment_Type.toLowerCase() === 'cash on delivery' ? <span className='on_delivery  px-3 py-2 '>On_Delivery</span> : <span className='paid  px-3 py-2 '>Paid</span>}</TableCell>
                          <TableCell className="text-center td">{order.products.length}</TableCell>
                          <TableCell className="text-center td">{order.totalQuantity}</TableCell>
                          <TableCell className="text-center td">{order.totalPrice}</TableCell>
                          <TableCell className="text-center td ">
                            {order.order_Status.toLowerCase() === "pending" && <span className='pending  px-3 py-2 '>Pending</span>}
                            {order.order_Status.toLowerCase() === "delivered" && <span className='delivered text-success px-2 py-1'>Delivered</span>}
                            {order.order_Status.toLowerCase() === "packing" && <span className='packing   px-2 py-1'>Packing</span>}
                            {order.order_Status.toLowerCase() === "shipping" && <span className='shipping   px-2 py-1'>Shipping</span>}
                            {order.order_Status.toLowerCase()==="cancelled" &&<span className='pending  px-2 py-1'>Cancelled</span>}
                          </TableCell>
                          <TableCell className="text-center td">
                          <div className="btn-group " role="group" aria-label="Basic example">
                        <button type="button" className="btn print_btn shadow"><i className="fa-solid fa-print"></i></button>
                        <button type="button" className="btn update_btn shadow" onClick={()=>handleClickOpen(order.orderId)}><i className="fa-solid fa-pen-to-square"></i></button>
                      </div>
                          </TableCell>

                        </TableRow>
                        <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={24}>
                          <Collapse in={open === order._id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography className='product_content_head' variant="h6" gutterBottom component="div">
                                Products
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead >
                                  <TableRow className=' order_head'>
                                  <TableCell className='text-center'>#</TableCell>
                                        
                                        <TableCell  className='text-center'>Product</TableCell>
                                        <TableCell  className='text-center'>Product_Price</TableCell>
                                        <TableCell  className='text-center'>Quantity</TableCell>
                                        <TableCell  className='text-center'>Total_Price</TableCell>
                                       
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order.products.length>0 && order.products.map((order,index)=>(
                                    <TableRow key={order._id}>
                                      <TableCell  className='text-center td'>{index + 1}</TableCell>
                                            <TableCell  className='text-center td'>{order.title}</TableCell>
                                            <TableCell  className='text-center td'>{order.price}</TableCell>
                                            <TableCell  className='text-center td'>{order.quantity}</TableCell>
                                            <TableCell  className='text-center td'>{order.totalPrice}</TableCell>
                                    </TableRow>
                                  ))
                                  }
                                 

                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                        </React.Fragment>
                      )) : <>
                       <TableCell colSpan={7}></TableCell>
                                 
                                  <TableCell className='text-center td'>Orders_not_found!</TableCell>
                                  <TableCell olSpan={4}></TableCell>
                                  
                                  </>
                                  }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          }

          {option === 3 &&
            <div className="col-md-12 pb-2 px-1 mt-3 mb-4 charts">
              <Paper c>
                <div className="total-sells pt-3 my-2 mx-1">
                  <div className="d-flex justify-content-between  px-2">
                    <div className="left ">
                      <h6 className='mb-2'>Total Sales</h6>
                      <p>Total Products sold from start day</p>
                    </div>
                    <div className="right">
                    <select name="year" id="year" className='pe-2'  value={mySelectedYear} onChange={handleMyYearChange}>
                        <option value={new Date().getFullYear()}>Current Year</option>
                        {allOrders &&
                          allOrders &&
                          Array.from(new Set(allOrders.map(data => data.year))).map(year => (
                            <option key={year} value={year}>Year {year}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <ResponsiveContainer className='px-0' width="100%" height={280}>
                    <BarChart className='px-0'

                      height={300}
                      data={totalSalesData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 10,
                      }}
                      barSize={15}
                    >
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#C5C5C5", dy: 10 }} axisLine={false} tickLine={false} />
                      {/* <YAxis tick={{ fontSize: 10, fill: "#C5C5C5", dx: -30  }} axisLine={false} tickLine={false} /> */}
                      <Tooltip />

                      <Bar dataKey="Sales" fill="#6F47EB" background={{ fill: '#eee' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </Paper>

            </div>
          }
        </div>
        <Dialog className='py-2 change_status_modal'
        open={open1}
        onClose={handleClose}
      >
        <DialogContent>
        <h2 className='text-start'>Update your order status</h2>
          <p>
            You can easily update your order's status, once you receive it.
          </p>
            <FormControl sx={{ minWidth: '100%' }}>
              <label htmlFor="Status" className='mb-2'>
                Change Status
              </label>
              <select name="" id="" value={order_Status} onChange={(e)=>setOrder_Status(e.target.value)} required>
                <option value="">Choose status</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
              </select>
            </FormControl>
           
        </DialogContent>
        <DialogActions>
          <button className='btn save_btn shadow m-1' onClick={()=>updateOrderStatus()} disabled={delLoading}>{delLoading? "Saving":"Save"}</button>
          <button className='btn close_btn shadow m-1' disabled={delLoading} onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  )
}
