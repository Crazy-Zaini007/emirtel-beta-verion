import React, { useState, useEffect } from 'react'
import { Collapse, IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux';
import { useAuthContext } from '../hooks/UserContextHook'
import UserProfileHook from '../hooks/UserProfileHook';
import Box from '@mui/material/Box';
import { Fade } from "react-awesome-reveal";
import Typography from '@mui/material/Typography';
import emptycart from '../assets/icons/empty_cart-icon.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import neworder from '../assets/icons/neworder.gif'
import ordercancel from '../assets/icons/ordercancel.png'
import empty from '../assets/icons/empty.png'
import delivered from '../assets/icons/delivered.gif'
import shipping from '../assets/icons/shipping.gif'
import packing from '../assets/icons/packing.png'
export default function Orders() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const { gettingUserProfile } = UserProfileHook()
  const { user } = useAuthContext()
  const fetchData = async () => {
    await gettingUserProfile()
  }
  useEffect(() => {
    fetchData()
  }, [user])

  const [open, setOpen] = useState(null);
  const toggleOpen = (orderId) => {
    setOpen((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  const filteredOrders = userProfile && userProfile.orders && userProfile.orders.filter(order => {
    return (
      (order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.address.toLowerCase().includes(search.toLowerCase()) ||
        order.buyer_Name.toLowerCase().includes(search.toLowerCase()) ||
        order.city.toLowerCase().includes(search.toLowerCase()) ||
        order.payment_Type.toLowerCase().includes(search.toLowerCase())
      ) &&
      order.order_Status.toLowerCase().includes(status.toLowerCase())
    )
  })

  const [open1, setOpen1] = useState(null);
  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const [current, setCurrent] = useState(0)

  const todayDate = new Date(); // Current date
  const sevenDaysAgo = new Date(todayDate); // Create a new date object
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Subtract 7 days

  const recentNotifications = userProfile && userProfile.notifications && userProfile.notifications
    .filter(notification => {
      const notificationDate = new Date(notification.createdAt);
      return notificationDate >= sevenDaysAgo && notificationDate <= todayDate;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt date



  const [wLoading, setWLoading] = useState(false)

  const cancelOrder = async (order) => {
    if (window.confirm(`Are you sure to cancel your order?`)) {
      setWLoading((prevState) => ({
        ...prevState,
        [order._id]: true
      }));
      let orderId = order.orderId
      try {
        const response = await fetch(`${apiUrl}/auth/user/orders/cancel/order`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`

          },
          body: JSON.stringify({ orderId })
        })
        if (response.ok) {
          fetchData()
          setWLoading((prevState) => ({
            ...prevState,
            [order._id]: false
          }));
        }
        if (!response.ok) {
          setWLoading((prevState) => ({
            ...prevState,
            [order._id]: false
          }));
        }
      } catch (error) {
        setWLoading((prevState) => ({
          ...prevState,
          [order._id]: false
        }));
      }
    }

  }

  return (
    <div>
      <div className="container-fluid my_orders py-md-4 py-3">
        <div className="container px-md-2">
          <div className="row px-xl-2 justify-content-center">
            <h2 className='text-center mb-4'>My Orders</h2>
            <Fade className="col-md-12 bg-white pt-2">
              <div className="row search_box" >
                <div className="col-sm-12 col-md-6 order-last order-md-first py-0 my-1">
                  <ul className='py-0'>
                    <li><Link className={`all_btn me-2 `} style={status.toLowerCase() === '' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('')}>All</Link></li>
                    <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase() === 'delivered' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('delivered')}>Delivered</Link></li>
                    <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase() === 'shipping' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('shipping')}>Shipping</Link></li>
                    <li><Link className={`delivered_btn mx-2`} style={status.toLowerCase() === 'pending' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('pending')}>Pending</Link></li>
                    <li><Link className={`delivered_btn mx-2 `} style={status.toLowerCase() === 'packing' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('packing')}>Packing</Link></li>
                    <li><Link className={`delivered_btn mx-2 `} style={status.toLowerCase() === 'cancelled' ? { borderBottom: '2px solid var(--cool-Green)', color: 'var(--cool-Green)' } : {}} onClick={() => setStatus('cancelled')}>Cancelled</Link></li>
                  </ul>
                </div>
                <div className="col-md-6 col-sm-12 py-0 input_box order-first order-md-first my-1 text-md-end d-flex">
                  <i className="fa fa-search search_icon" aria-hidden="true"></i>
                  <input type="search" placeholder='Seacrh here...' value={search} onChange={(e) => setSearch(e.target.value)} />
                  <Link className='notification_icon ms-2 me-1 mt-1' onClick={() => handleClickOpen()}><Badge badgeContent={recentNotifications && recentNotifications.length} color="success" showZero><NotificationsIcon></NotificationsIcon></Badge></Link>
                </div>
              </div>
            </Fade>
            <Fade direction='up' className="col-md-12 bg-white pt-2 pb-4 content my-1">
              <TableContainer >
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell className='text-center'>Details</TableCell>
                      <TableCell className='text-center'>#</TableCell>
                      <TableCell className='text-center'>OrderId</TableCell>
                      <TableCell className='text-center'>Date</TableCell>
                      <TableCell className='text-center'>Time</TableCell>
                      <TableCell className='text-center'>Receiver_Name</TableCell>
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
                    {filteredOrders && filteredOrders.length > 0 && filteredOrders.map((order, index) => (
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
                          <TableCell className="text-center td">{order.payment_Type.toLowerCase() === 'cash on delivery' ? <span className='on_delivery  px-3 py-1 '>On_Delivery</span> : <span className='paid  px-3 py-1 '>Paid</span>}</TableCell>
                          <TableCell className="text-center td">{order.products.length}</TableCell>
                          <TableCell className="text-center td">{order.totalQuantity}</TableCell>
                          <TableCell className="text-center td price">{order.totalPrice}</TableCell>
                          <TableCell className="text-center td ">
                            {order.order_Status.toLowerCase() === "pending" && <span className='pending  px-3 py-1 '>Pending</span>}
                            {order.order_Status.toLowerCase() === "delivered" && <span className='delivered text-success px-2 py-1'>Delivered</span>}
                            {order.order_Status.toLowerCase() === "packing" && <span className='packing   px-2 py-1'>Packing</span>}
                            {order.order_Status.toLowerCase() === "shipping" && <span className='shipping  px-2 py-1'>Shipping</span>}
                            {order.order_Status.toLowerCase() === "cancelled" && <span className='pending  px-2 py-1'>Cancelled</span>}
                          </TableCell>
                          <TableCell className="text-center td price"><button className='btn' disabled={order.order_Status.toLowerCase() !== 'pending' || wLoading[order._id]} onClick={() => cancelOrder(order)} >
                            {wLoading[order._id] ? <i className="fa-solid fa-spinner fa-spin"></i> : "Cancel"}
                          </button></TableCell>


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

                                      <TableCell className='text-center'>Product</TableCell>
                                      <TableCell className='text-center'>Product_Price</TableCell>
                                      <TableCell className='text-center'>Quantity</TableCell>
                                      <TableCell className='text-center'>Total_Price</TableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {order.products.length > 0 && order.products.map((order, index) => (
                                      <TableRow key={order._id}>
                                        <TableCell className='text-center td'>{index + 1}</TableCell>
                                        <TableCell className='text-center td'>{order.title}</TableCell>
                                        <TableCell className='text-center td'>{order.price}</TableCell>
                                        <TableCell className='text-center td'>{order.quantity}</TableCell>
                                        <TableCell className='text-center td price'>{order.totalPrice}</TableCell>
                                      </TableRow>
                                    ))
                                    }
                                    <TableRow>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                    }
                  </TableBody>

                </Table>

              </TableContainer>
              {filteredOrders && filteredOrders.length < 1 &&
                <div className='row'>
                  <div className='col-md-2 col-sm-12 text-center mx-auto my-4 empty_cart '>

                    <Fade direction='up' className='p-0'>

                      <Link className='btn find_btn px-2' to='/' ><img src={emptycart} alt="" /></Link>
                    </Fade>
                  </div>
                </div>
              }
            </Fade>
          </div>
        </div>
      </div>
      <Dialog className='py-2 notification_modal'
        open={open1}
        onClose={handleClose}
      >
        <DialogContent>
          <h2 className='text-start'>Notifications</h2>
          <div className="row">
            <div className="col-md-12 px-2 top mb-2">
              <p>Check notifications to get updated with your order's status!</p>
              <button className="btn mx-1 border" onClick={() => setCurrent(0)} style={current === 0 ? { backgroundColor: 'var(--cool-Green)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
                Recents
              </button>
              <button className="btn mx-1 border" onClick={() => setCurrent(1)} style={current === 1 ? { backgroundColor: 'var(--cool-Green)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
                All
              </button>

            </div>
            <hr />
            <div className="col-md-12">
              {current === 0 &&

                <>

                  {userProfile && userProfile.notifications && userProfile.notifications.filter(n => n.new === true).length === 0 ? (
                    <div className="text-center image">
                      <img src={empty} alt="" />
                    </div>
                  ) : (
                    userProfile && recentNotifications && recentNotifications
                      .map((data) => (
                        <div className="rounded border my-1 px-1" key={data._id}>
                          <div className="toast-header">
                            <img src={data.type === 'New Order' ? neworder : data.type === 'Delivered' ? delivered : data.type === 'Shipping' ? shipping : data.type === 'Packing' ? packing : data.type === 'Order Cancelled' && ordercancel} className="rounded me-2" alt="..." />
                            <div className={`me-auto ${(data.type === 'Activated' || data.type === 'Approved' || data.type === 'Product' || data.type === 'New Account' || data.type === 'New Order' || data.type === 'Delivered' || data.type === 'Packing' || data.type === 'Shipping') ? "success" : 'danger'}`}>
                              {data.type === "New Order" ? "New Order" :
                                data.type === "Delivered" ? "Order Delivered" :
                                  data.type === "Packing" ? "Order Packing" :
                                    data.type === "Shipping" ? "Order Shipping" :
                                      data.type === 'Order Cancelled' ? "Order Cancelation" :
                                        data.type === "Order Delivery" && "Order delivered"}
                            </div>
                            <small>
                              {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                            </small>
                            {/* <button type="button" className="btn-close btn-sm" aria-label="Close" /> */}
                          </div>
                          <div className="toast-body pb-1">
                            <p> {data.content}</p>
                          </div>
                        </div>
                      ))
                  )}    </>
              }
              {current === 1 &&

                <>

                  {userProfile && recentNotifications && recentNotifications.length > 0 ? recentNotifications
                    .map((data) => (
                      <div className="rounded my-1 px-1 border" key={data._id}>
                        <div className="toast-header">
                          <img src={data.type === 'New Order' ? neworder : data.type === 'Delivered' ? delivered : data.type === 'Shipping' ? shipping : data.type === 'Packing' ? packing : data.type === 'Order Cancelled' && ordercancel} className="rounded me-2" alt="..." />
                          <div className={`me-auto ${(data.type === 'Activated' || data.type === 'Approved' || data.type === 'Product' || data.type === 'New Account' || data.type === 'New Order' || data.type === 'Delivered' || data.type === 'Packing' || data.type === 'Shipping') ? "success" : 'danger'}`}>
                            {data.type === "New Order" ? "New Order" :
                              data.type === "Delivered" ? "Order Delivered" :
                                data.type === "Packing" ? "Order Packing" :
                                  data.type === "Shipping" ? "Order Shipping" :
                                    data.type === 'Order Cancelled' ? "Order Cancelation" :
                                      data.type === "Order Delivery" && "Order delivered"}
                          </div>
                          <small>
                            {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                          </small>
                          {/* <button type="button" className="btn-close btn-sm" aria-label="Close" /> */}
                        </div>
                        <div className="toast-body pb-1">
                          <p> {data.content}</p>
                        </div>
                      </div>
                    )) :

                    <div className="text-center image">
                      <img src={empty} alt="" />
                    </div>
                  }

                </>

              }
            </div>
          </div>
        </DialogContent>
        <hr />
        <DialogActions>
          <button className='btn close_btn shadow m-1' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
