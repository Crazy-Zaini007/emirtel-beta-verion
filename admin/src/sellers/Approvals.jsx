import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ApprovalHook from '../hooks/ApprovalHook'
import { useAuthContext } from '../hooks/UserContextHook'
import { toast } from 'react-toastify';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';

export default function Approvals() {
  const { getProductApprovals, loading } = ApprovalHook()
  const { seller } = useAuthContext()
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (seller) {
      getProductApprovals()
    }
  }, [seller])

  const[view,setView]=useState('')
  const handleView=(product)=>{
    setView(product)

  }
  const approvals = useSelector((state) => state.productsApprovals.approvals);

  const calculateAverageRating = (product_Rating) => {
    if (product_Rating.length === 0) return 0;
    const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / product_Rating.length;
  }

  const[isLoading,setIsLoading]=useState(null)
  const[isApproved,setIsApproved]=useState(false)
  const[reason,setReason]=useState('')
  const[message,setMessage]=useState(false)

  const [, setNewMessage] = useState('')
  const productApproval=async(e)=>{
   
    e.preventDefault()
    setIsLoading(true)
      
    let productId = view._id
    try {
      const response = await fetch(`${apiUrl}/auth/admin/product/approve/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({productId,reason,categoryName:view.categoryName,isApproved,sellerId:view.sellerId})
      })

      const json = await response.json()

      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setIsLoading(false)
      }
      if (response.ok) {
        setMessage(!message)
        setReason('')
        setView('')
        getProductApprovals()
        setNewMessage(toast.success(json.message));
        setIsLoading(false)
        
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setIsLoading(false)
    }
  }
  


  return (
    <div className='main'>
      <div className="container-fluid approvals">
        <div className="row mx-lg-2 mx-sm-3 my-3 ">
          <div className="col-md-12 pb-2 m-0 px-2">
            <h4>Manage Products Approvals </h4>
            <p className='welcome'>Welcome to your Products Approvals Management !</p>
          </div>
          {(loading) &&
                <div className="col-md-12  pb-2 m-0 px-2 text-center loading">
                  <i className="fas fa-spinner fa-spin "></i>
                </div>

              }

         {!loading &&
          <>
          {!view &&
          <div className="col-md-12 pb-2 m-0 px-sm-0 my-3 table">
          <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
            <Table >
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
                  <TableCell className='text-center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvals && approvals.length > 0 ? approvals.map((product, index) => (
                  <TableRow>
                    <TableCell className='text-center td'>{index + 1}</TableCell>
                    <TableCell className='text-center td'>{product.date}</TableCell>
                    <TableCell className='text-center td'>{product.sellerName}</TableCell>
                    <TableCell className='text-center td'>{product.title}</TableCell>
                    <TableCell className='text-center td'>{product.categoryName}</TableCell>
                    <TableCell className='text-center td'>{product.quantity}</TableCell>
                    <TableCell className='text-center td'>{product.soldQuantity}</TableCell>
                    <TableCell className='text-center td'>{product.price}</TableCell>
                    <TableCell className='text-center td'><button className='btn btn-sm border rounded text-white' onClick={()=>handleView(product)}>View</button></TableCell>
                  </TableRow>
                )) : <TableRow>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td">No_product_for_Approval</TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  <TableCell className="text-center td"></TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
          }
          </>
         }

         {!loading &&
         <>
         {view &&
         <Paper className='col-md-12 mb-4 rounded' component={Paper}>
          <div className="row mx-2 ">
          <div className="col-lg-6 col-md-12 p-0 py-sm-5 left-col rounded my-md-5 my-3">
          <div id="carouselExampleFade" className="carousel slide carousel-fade py-sm-5" data-bs-ride="carousel">
  <div className="carousel-inner py-sm-5">
    {view.images && view.images.map((image, index) => (
      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} p-0`}>
        <img src={image.imageUrl} className="d-block w-100 rounded" alt={`Image ${index + 1}`} />
      </div>
    ))}
  </div>
  <button className="carousel-control-prev me-5" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="fa-solid fa-arrow-left" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next ms-5" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="fa-solid fa-arrow-right" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
            </div>
            <div className="col-lg-6 col-md-12 px-md-5 py-0 right-col my-md-3 my-3">
              <p className='back' onClick={()=>setView('')}><i className='fa-solid fa-arrow-left'></i> Back to main page</p>
              <h6>{view.categoryName}</h6>
              <h5>{view.title}</h5>
              <p className='rating'><Rating name="read-only" className='rating-stars'  value={calculateAverageRating(view.product_Rating)} precision={0.5} readOnly />({view.product_Rating.length} reviews) </p>
              <p className='mt-3'>Price</p>
              <span className='border-0 px-4 py-2 me-2 rounded price-span'>{view.price}</span>
              <p className='mt-4'>Description</p>
              <span>{view.description}</span>
              <div className="text-start mt-3">
                <form className='d-inline' onSubmit={productApproval}><button className='btn  btn-sm mx-1 approve-btn py-1' disabled={isLoading}>Approve</button></form>
                <button className='btn  btn-sm mx-1 reject-btn py-1' onClick={()=>setMessage(!message)} disabled={isLoading}>Reject with a reason</button>
                {message &&
                <form onSubmit={productApproval} className='mt-2'>
                  <textarea className='p-2' value={reason} onChange={(e)=>setReason(e.target.value)} required></textarea>
                  <button className='btn  btn-sm mx-1 reject-btn py-1' disabled={isLoading}>Reject</button>
                </form>
                }
              </div>
            </div>
            
          </div>
         </Paper>
         }
         </>
         }
        </div>
      </div>
    </div>

  )
}
