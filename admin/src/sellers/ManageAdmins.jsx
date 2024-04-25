import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/UserContextHook'
import AdminsHook from '../hooks/AdminsHook';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Box ,Collapse, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Typography,Rating } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ManageAdmins() {

  const apiUrl = process.env.REACT_APP_API_URL;

  const { getAllAdmins } = AdminsHook()
  const { seller } = useAuthContext()
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (seller) {
      setLoading(true)
      getAllAdmins()
      setLoading(false)

    }
  }, [dispatch]);

  const teamDetails = (team) => {
    setDetails(team)
  };

  const admins = useSelector((state) => state.allAdmins.admins);

  const sortedAdmins = [...admins].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [name, setName] = useState('')

  const filteredAdmins = sortedAdmins && sortedAdmins.filter(admin => {
    return (
      admin.admin.userName.toLowerCase().includes(name.toLowerCase())
    )
  })

  // changing admins status
  const [isLoading, setIsLoading] = useState(false)
  const [, setNewMessage] = useState('')

  const changeStatus = async (admin) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/auth/auth/admin/join/update/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${seller.token}`

        },
        body: JSON.stringify({ adminId: admin.admin._id })

      })

      const json = await response.json()

      if (response.ok) {
        getAllAdmins()
        setIsLoading(false)
        setNewMessage(toast.success(json.message))

      }
      if (!response.ok) {
        setIsLoading(false)
        setNewMessage(toast.error(json.message))

      }
    } catch (error) {
      setIsLoading(false)
      setNewMessage(toast.error("Server is not responding..."))

    }
  }

  const [open, setOpen] = useState(null);
  const toggleOpen = (adminId) => {
    setOpen((prevAdminId) => (prevAdminId === adminId ? null : adminId));
  };
  
  const calculateAverageRating = (product_Rating) => {
    if (product_Rating.length === 0) return 0;
    const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / product_Rating.length;
  }
  

  return (
    <>
      <div className="main">
        <div className="container-fluid seller_products">

          <div className="row mx-lg-2 mx-sm-3 my-3 ">
            <div className="col-md-12 pb-2 m-0 px-2">
              <h4>Manage Admins </h4>
              <p className='welcome'>Welcome to your Admins Management !</p>
            </div>
            {details === null &&
              <>
                {(loading || isLoading) &&
                  <div className="col-md-12  pb-2 m-0 px-2 text-center loading">
                    <i className="fas fa-spinner fa-spin "></i>
                  </div>

                }
                {!loading &&
                  <div className="col-md-12 pb-2 m-0 px-sm-0 my-3">

                    <div className="row p-0 ">
                      <div className="col-md-3  px-sm-0 text-end add-new">

                        <select onChange={(e) => setName(e.target.value)}>
                          <option value="">Choose Admin</option>
                          {admins.map((admin) => (
                            <option value={admin.admin.userName} key={admin.admin._id}>{admin.admin.userName}</option>
                          )
                          )}
                        </select>
                      </div>

                      <div className="col-md-12 pb-2 m-0 px-sm-0 my-3 table">
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead className='thead'>
                              <TableRow >
                              <TableCell className='text-center'>Details</TableCell>
                                <TableCell className='text-center'>#</TableCell>
                                <TableCell className='text-center'>Admin</TableCell>
                                <TableCell className='text-center'>Email</TableCell>
                                <TableCell className='text-center'>Role</TableCell>
                                <TableCell className='text-center'>Products</TableCell>
                                <TableCell className='text-center'>Orders</TableCell>
                                <TableCell className='text-center'>Status</TableCell>
                                <TableCell className='text-center'>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredAdmins && filteredAdmins.length > 0 ? filteredAdmins.map((admin, index) => (
                                <React.Fragment key={index}>

                                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                    <TableCell className='text-center td'>
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => toggleOpen(admin.admin._id)}
                                    >
                                      {open === admin.admin._id ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>


                                    </TableCell>
                                    <TableCell  className='text-center td'>{index + 1}</TableCell>

                                    <TableCell className='text-center td'>
                                      {admin.admin.userName}
                                    </TableCell>
                                    <TableCell className='text-center td'>{admin.admin.email}</TableCell>
                                    <TableCell className='text-center td'>{admin.admin.role}</TableCell>
                                    <TableCell className='text-center td'><Link className={admin.products.length > 0 ? 'text-white px-2 py-1 rounded yes ' : 'text-white px-2 py-1 rounded no'} disabled={admin.products.length > 0 ? false : true}>{admin.products.length}</Link></TableCell>
                                    <TableCell className='text-center td'><Link className={admin.admin.orders.length > 0 ? 'text-white px-2 py-1 rounded yes' : 'text-white px-2 py-1 rounded no'} disabled={admin.admin.orders.length > 0 ? false : true}>{admin.admin.orders.length}</Link></TableCell>
                                    <TableCell className='text-center td'>
                                      {admin.admin.isActive === true ?
                                        <span className='in '>Active</span> :
                                        <span className='out'>inActive</span>
                                      }
                                    </TableCell>
                                    <TableCell className='text-center td'>
                                      <button onClick={() => changeStatus(admin)} disabled={isLoading} className={admin.admin.isActive === true ? 'btn deactive btn-sm' : 'btn active btn-sm'}>{admin.admin.isActive === true ? 'inActivate' : 'Activate'}</button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                      <Collapse in={open === admin.admin._id} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                          <Typography className='product_content_head' variant="h6" gutterBottom component="div">
                                            Products
                                          </Typography>
                                          <Table size="small" aria-label="products">
                                            <TableHead>
                                              <TableRow>
                                              <TableCell className='text-center'>#</TableCell>
                                              <TableCell className='text-center'>Date</TableCell>
                                                    <TableCell  className='text-center'>Product</TableCell>
                                                    <TableCell  className='text-center'>Category</TableCell>
                                                    <TableCell  className='text-center'>Quantity</TableCell>
                                                    <TableCell  className='text-center'>Sold</TableCell>
                                                    <TableCell  className='text-center'>Price</TableCell>
                                                    <TableCell  className='text-center'>Image</TableCell>
                                                    <TableCell  className='text-center'>Desc</TableCell>
                                                    <TableCell  className='text-center'>Rating</TableCell>
                                                    <TableCell  className='text-center'>Status</TableCell>
                                                    <TableCell  className='text-center'>Approval</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {admin.products.length>0 ? admin.products.map((product,index)=>(
                                                <TableRow key={product._id}>
                                                  <TableCell  className='text-center td'>{index + 1}</TableCell>
                                                  <TableCell  className='text-center td'>{product.date}</TableCell>
                                                        <TableCell  className='text-center td'>{product.title}</TableCell>
                                                        <TableCell  className='text-center td'>{product.categoryName}</TableCell>
                                                        <TableCell  className='text-center td'>{product.quantity}</TableCell>
                                                        <TableCell  className='text-center td'>{product.soldQuantity}</TableCell>
                                                        <TableCell  className='text-center td'>{product.price}</TableCell>
                                                        <TableCell  className='text-center td'>
                                                        {product.image && <img src={product.image} className='rounded' alt={product.title} />}
                                                        </TableCell>
                                                        <TableCell  className='text-center td'>{product.description}</TableCell>
                                                        <TableCell  className='text-center td'> <Rating name="read-only" className='rating' value={calculateAverageRating(product.product_Rating)} precision={0.5} readOnly />({product.product_Rating.length})</TableCell>

                                                        <TableCell  className='text-center td'>
                                                            {product.available===true ?
                                                                <span className='out text-success'>Available</span> :
                                                                <span className='in text-danger'>Out of Stock</span>
                                                            }
                                                        </TableCell>
                                                        <TableCell  className='text-center td'>
                                                            {product.isApproved===true ?
                                                                <span className='out text-success'><i className="fa-solid fa-circle-check me-1"></i>Approved</span> :
                                                                <span className='in text-danger'><i className="fas fa-spinner fa-spin me-1"></i>Pending</span>
                                                            }
                                                        </TableCell>
                                                     
                                                </TableRow>
                                              )):
                                              <TableRow>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell>Products_not_found!</TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                            </TableRow>
                                              }
                                             

                                            </TableBody>
                                          </Table>
                                        </Box>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                      <Collapse in={open === admin.admin._id} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                          <Typography className='order_content_head' variant="h6" gutterBottom component="div">
                                            Orders
                                          </Typography>
                                          <Table size="small" aria-label="purchases">
                                            <TableHead >
                                              <TableRow className='order_head'>
                                              <TableCell className='text-center'>#</TableCell>
                                              <TableCell className='text-center'>OrderId</TableCell>
                                                    <TableCell className='text-center'>Date</TableCell>
                                                    <TableCell className='text-center'>Customer</TableCell>
                                                    <TableCell className='text-center'>City</TableCell>
                                                    <TableCell className='text-center'>Shipping_Address</TableCell>
                                                    <TableCell  className='text-center'>Payment</TableCell>
                                                    <TableCell  className='text-center'>Product</TableCell>
                                                    <TableCell  className='text-center'>Price</TableCell>
                                                    <TableCell  className='text-center'>Quantity</TableCell>
                                                    <TableCell  className='text-center'>Total_Price</TableCell>
                                                    <TableCell  className='text-center'>Status</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {admin.admin.orders.length>0 ? admin.admin.orders.map((order,index)=>(
                                                <TableRow key={order._id}>
                                                  <TableCell  className='text-center td'>{index + 1}</TableCell>
                                                  <TableCell className="text-center td">{order.orderId}</TableCell>
                                        <TableCell className="text-center td">{order.date}</TableCell>
                                        <TableCell className="text-center td">{order.buyer_Name}</TableCell>
                                        <TableCell className="text-center td">{order.city}</TableCell>
                                        <TableCell className="text-center td">{order.address}</TableCell>
                                        <TableCell className="text-center td">{order.payment_Type.toLowerCase()==='cash on delivery' ? <span className='on_delivery  px-3 py-2 '>On_Delivery</span>:<span className='paid  px-3 py-2 '>Paid</span>}</TableCell>
                                        <TableCell className="text-center td">{order.title}</TableCell>
                                        <TableCell className="text-center td">{order.price}</TableCell>
                                        <TableCell className="text-center td">{order.quantity}</TableCell>
                                        <TableCell className="text-center td">{order.totalPrice}</TableCell>
                                        <TableCell className="text-center td ">
                                        {order.order_Status.toLowerCase()==="pending" && <span className='pending  px-3 py-2 '>Pending</span> }
                                        {order.order_Status.toLowerCase()==="delivered" &&<span className='delivered text-success px-2 py-1'><i className="fa-solid fa-truck-ramp-box me-1">Delivered</i></span> }
                                        {order.order_Status.toLowerCase()==="packing" &&<span className='packing   px-2 py-1'><i className="fa-solid fa-boxes-packing me-1">Packing</i></span>}
                                        {order.order_Status.toLowerCase()==="shipping" &&<span className='shipping   px-2 py-1'><i className="fa-solid fa-truck-fast me-1">Shipping</i></span> }

                                        
                                        </TableCell>
                                                </TableRow>
                                              )):
                                              <>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell>Orders_not_found!</TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                              
                                            </>
                                              }
                                             

                                            </TableBody>
                                          </Table>
                                        </Box>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                  
                                </React.Fragment>
                              )) : (
                                <TableRow>

                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell>Admins_not_found!</TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                  <TableCell></TableCell>
                                </TableRow>
                              )}
                            </TableBody>

                          </Table>
                        </TableContainer>

                        

                      </div>

                    </div>


                  </div>
                }
              </>}

            {/* Personnel Team Details */}

            {details &&
              <div className="col-md-10  m-0 p-2  myteam_detail">

              </div>
            }


          </div>

        </div>
      </div>
    </>
  )
}
