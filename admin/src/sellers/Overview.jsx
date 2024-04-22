import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useAuthContext } from '../hooks/UserContextHook'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductsHook from "../hooks/ProductsHook"
import AdminsHook from '../hooks/AdminsHook';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';

export default function Overview() {
  const dispatch = useDispatch()
  const { getAllApprovedProducts, loading } = ProductsHook()
  const { getAllAdmins, admin } = AdminsHook()
  const apiUrl = process.env.REACT_APP_API_URL;

  const { seller } = useAuthContext()
  const [option, setOption] = useState(0)

  useEffect(() => {
    if (seller) {
      getAllAdmins()

      getAllApprovedProducts()
    }
  }, [dispatch, option]);

  const allProducts = useSelector((state) => state.allProducts.allProducts);
  const productsLength = allProducts ? allProducts.length.toString().padStart(2, '0') : '00';
  const admins = useSelector((state) => state.allAdmins.admins);
  const adminLength = admins ? admins.length.toString().padStart(2, '0') : '00';

  const calculateAverageRating = (product_Rating) => {
    if (product_Rating.length === 0) return 0;
    const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / product_Rating.length;
  }



  const data = [
    {
      name: 'Jan',
      Sales: 2400,
    },
    {
      name: 'Fab',
      Sales: 1398,
    },
    {
      name: 'Mar',
      Sales: 9800,
    },
    {
      name: 'Apr',
      Sales: 3908,
    },
    {
      name: 'May',
      Sales: 4800,
    },
    {
      name: 'Jun',
      Sales: 3800,
    },
    {
      name: 'Jul',
      Sales: 4300,
    },
    {
      name: 'Aug',
      Sales: 2360,
    },
    {
      name: 'Sep',
      Sales: 400,
    },
    {
      name: 'Oct',
      Sales: 6900,
    },
    {
      name: 'Nov',
      Sales: 9278,
    },
    {
      name: 'Dec',
      Sales: 2320,
    },
  ];



  // deleting a product
  const [, setNewMessage] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const deleteProduct = async (product) => {
    setDelLoading(true)

    let productId = product._id
    let sellerId=product.sellerId
    console.log(product,productId)
    try {
      const response = await fetch(`${apiUrl}/auth/admin/product/delete/product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ productId,sellerId, categoryName: product.categoryName })
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
                  {seller.role==="Super Admin" && 
                  <>
                      <option value="1" >Products</option>
                  <option value="2">Orders</option>
                  <option value="3">Total Sales</option>
                  </>
                  }
            

                </select>
              </div>
            </div>
          </div>
          {seller.role==="Super Admin" &&
          <Paper className="col-md-12 pb-0 overview-row py-2 ">
          <div className="d-flex justify-content-between px-0 pb-2 total mx-auto">
         
              <div className="fourth d-flex mx-auto">
                <Avatar className='mt-2 avatar mx-2'><i className="fas fa-coins"></i></Avatar>
                <h5 className='ms-2 p-0 mt-0'><span>Total Sales</span> <br />230K</h5>
              </div>
            
            <div className="first  d-flex mx-auto">
              <Avatar className='mt-2 avatar mx-2'><i className="fas fa-sack-dollar"></i></Avatar>
              <h5 className='ms-2 p-0 mt-0 '><span>My Total Sales</span> <br />102K</h5>

            </div>
            <div className="second d-flex mx-auto">
              <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-money-bill-trend-up"></i></Avatar>
              <h5 className='ms-2 p-0 mt-0 '><span>Total Orders</span> <br />386</h5>
            </div>
            
            <div className="third d-flex mx-auto">
              <Avatar className='mt-2 avatar mx-2'><i className="fa-solid fa-cart-shopping"></i></Avatar>
              <h5 className='ms-2 p-0 mt-0 '><span>Total Products</span> <br />{productsLength}</h5>
            </div>

           
            <div className="fourth">

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
                      <select name="" id="" className='pe-2'>
                        <option value="2021">Current Year</option>
                        <option value="2021">Year 2021</option>
                        <option value="2022">Year 2022</option>
                        <option value="2023">Year 2023</option>
                      </select>
                    </div>
                  </div>
                  <ResponsiveContainer className='px-0' width="100%" height={280}>
                    <BarChart className='px-0'

                      height={300}
                      data={data}
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
                      <select name="" id="" className='pe-2'>
                        <option value="2021">Current Year</option>
                        <option value="2021">Year 2021</option>
                        <option value="2022">Year 2022</option>
                        <option value="2023">Year 2023</option>
                      </select>
                    </div>
                  </div>
                  <ResponsiveContainer className='px-0' width="100%" height={280}>
                    <BarChart className='px-0'

                      height={300}
                      data={data}
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
      </div>
    </div>
  )
}
