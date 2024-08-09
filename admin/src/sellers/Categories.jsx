import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RiseLoader from "react-spinners/RiseLoader";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuthContext } from '../hooks/UserContextHook'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import CategoryHook from '../hooks/CategoryHook'
import { addCategory } from '../redux/reducers/categorySlice'

export default function Categories() {

  const { loading, getAllCategory } = CategoryHook()
  const { seller } = useAuthContext()

  const dispatch = useDispatch()

  const categories = useSelector((state) => state.getCategories.categories);
  const sortedCategories = [...categories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const apiUrl = process.env.REACT_APP_API_URL
  useEffect(() => {
    if (seller) {
      getAllCategory()
    }
  }, [dispatch]);

  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [des_Type, setDes_Type] = useState('')

  const [des_Pic, setDes_Pic] = useState('')

  const handleImage = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit. Please select a smaller file.');
      } else {
        TransformFile(file, field);
      }
    } else {
      if (field === 'image') {
        setImage('');
      } else if (field === 'des_Pic') {
        setDes_Pic('');
      }
    }
  };

  const TransformFile = (file, field) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (field === 'image') {
          setImage(reader.result);
        } else if (field === 'des_Pic') {
          setDes_Pic(reader.result);
        }
      };
    } else {
      if (field === 'image') {
        setImage('');
      } else if (field === 'des_Pic') {
        setDes_Pic('');
      }
    }
  }
  
  // for category Details
  const [details,setDetails]=useState()

  const viewDetails=(category)=>{
    setDetails(category)
  }

  const exitDetails=()=>{
    setDetails()
  }


  const [current, setCurrent] = useState(1)
  const addNew = () => {
    setCurrent(0)
  }

  const remove = () => {
    setCurrent(1)
  }

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    // Check if the current step is completed before moving to the next step

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  // Submitting Form Data
  const [loading1, setLoading1] = useState(null)
  const [, setNewMessage] = useState('')

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const response = await fetch(`${apiUrl}/auth/admin/category/add/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${seller.token}`,
        },
        body: JSON.stringify({
          categoryName,
          description,
          image,
          des_Pic
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setLoading1(false)

      }
      if (response.ok) {
        dispatch(addCategory(json.data))
        setCurrent(1)
        setNewMessage(toast.success(json.message));
        setCategoryName('')
        setDescription('')
        setImage('')
        setLoading1(false)
        setActiveStep(0);
      }

    } catch (error) {

      setNewMessage(toast.error('Server is not Responding...'));
      setLoading1(false);
    }
  };

  // deleting a product
  const [delLoading, setDelLoading] = useState(false)
  const deleteCategory = async (category) => {
    setDelLoading(true)

    let categoryId = category._id
    try {
      const response = await fetch(`${apiUrl}/auth/admin/category/delete/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        }
      })

      const json = await response.json()

      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setDelLoading(false)
      }
      if (response.ok) {
        getAllCategory()
        setNewMessage(toast.success(json.message));
        setDelLoading(false)
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setDelLoading(false)
    }
  }

  const steps = [
    {
      label: 'Step 1: Category Title',
      content: (
        <div>
          <label>
            Title:
          </label>
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />

        </div>
      ),
    },
    {
      label: 'Step 2:Add Description ',
      content: (
        <div>
            <label>
            Description Type:
          </label>
         <select name="" value={des_Type} onChange={(e)=>setDes_Type(e.target.value)} id="">
          <option value="">choose type</option>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
         </select>

         {des_Type === "Text" &&
         <>
          <label>
            Description Text:
          </label>
          <textarea required={des_Type==="Text"} className='py-2' value={description} onChange={(e) => setDescription(e.target.value)} />
         </>
         }
          {des_Type === "Image" &&
         <>
          <label>
            Description Image:
          </label>
          <input type='file' accept='image/*' className='py-2' onChange={(e) => handleImage(e, 'des_Pic')} />
         
         </>
         }
          {des_Pic &&
            <div className='col-md-12 image'>
              <img src={des_Pic} className='py-2 rounded' />
            </div>
          }
        </div>
      ),
    },
    {
      label: 'Step 3:Add Media ',
      content: (
        <>
          <div>
            <label>
              Thumbnail:
            </label>
            <input type='file' accept='image/*' className='py-2' onChange={(e) => handleImage(e, 'image')} />
          </div>
          {image &&
            <div className='col-md-12 image'>
              <img src={image} className='py-2 rounded' />
            </div>
          }
        </>

      ),
    }
  ];


  const [openModal, setOpenModal] = useState(false);
  const [editedEntry, setEditedEntry] = useState({});
  const handleClickOpen = (category) => {
    setOpenModal(true);
    setEditedEntry(category);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditedEntry({});
  };

  const handleInputChange = (e, field) => {
    setEditedEntry({
      ...editedEntry,
      [field]: e.target.value,
    });

  };
  const handleImageChange = (e, field) => {
    if (field === 'image' || field === 'des_Pic') {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditedEntry({
            ...editedEntry,
            [field]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        setEditedEntry({
          ...editedEntry,
          [field]: '',
        });
      }
    }
  }

  const handleDeleteImage = () => {
    setEditedEntry((prevState) => ({
      ...prevState,
      des_Pic: '',
    }));
  };

  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateContent, setUpdateContent] = useState('Update')

  const updateCategory = async () => {
    setUpdateLoading(true)
    setUpdateContent('Updating...')

    
    try {
      const response = await fetch(`${apiUrl}/auth/admin/category/update/category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ categoryId:editedEntry._id,categoryName: editedEntry.categoryName, description: editedEntry.description, image: editedEntry.image,des_Pic:editedEntry.des_Pic })
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setUpdateLoading(false)
        setUpdateContent('Update')
      }
      if (response.ok) {
        getAllCategory()
        setNewMessage(toast.success(json.message));
        setUpdateLoading(null)
        setUpdateContent('Update')
        setOpenModal(false);


      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setUpdateLoading(false)
    setUpdateContent('Update')

    }
  };


  return (
    <>
      <div className="main">
        <div className="container-fluid categories">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wrap" id="add">
                  
                  {!details &&
                  <>
                  {current === 1 ? <Link onClick={() => addNew()} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><AddShoppingCartIcon></AddShoppingCartIcon></Avatar></Link> : current !==1 && <Link onClick={() => remove()} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><CloseIcon></CloseIcon></Avatar></Link>}
                  </>
                  }


                </div>
              </div>
            </div>
          </div>

          <div className="row mx-lg-2 mx-sm-3 my-3">
            
            {current === 1 && <>
              <div className="col-md-12 pb-2 m-0 px-2">
                <div className="d-flex justify-content-between">
                  <div className="left">
                  <h4>{details ? "See Ctaegory Details": "Add Product Categories"}</h4>
                <p className='welcome'>{!details ? 'Add products categories to help your customer to find best products.' : `See the products added to the Category: ${details.categoryName}`}</p>
                  </div>
                  <div className="right">
                    {details && 
                    <button className='btn exit py-1' onClick={()=>exitDetails()}><i class="fas fa-times"></i></button>
                    }
                  </div>
                </div>
              </div>

              {(delLoading) &&
                <div className="col-md-12  pb-2 m-0 px-2 text-center loading">
                  <i className="fas fa-spinner fa-spin "></i>
                </div>

              }

{details && 
           <div className="col-md-12 pb-2 m-0 px-sm-0 my-3 table">
           <TableContainer component={Paper}>
              <Table >
                  <TableHead className='thead'>
                      <TableRow >
                          <TableCell className='text-center'>#</TableCell>
                          <TableCell className='text-center'>Date</TableCell>
                          <TableCell className='text-center'>Seller</TableCell>
                          <TableCell  className='text-center'>Product</TableCell>
                          <TableCell  className='text-center'>Category</TableCell>
                          <TableCell  className='text-center'>Quantity</TableCell>
                          <TableCell  className='text-center'>Sold</TableCell>
                          <TableCell  className='text-center'>Price</TableCell>
                          <TableCell  className='text-center'>Desc</TableCell>
                          <TableCell  className='text-center'>Status</TableCell>
                          
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {details && details.product.length>0 ? details.product.map((product,index)=>(
                      <React.Fragment key={index}>
                        <TableRow key={product?.productId} >
                         
                            <>
                             <TableCell  className='text-center td'>{index + 1}</TableCell>
                             <TableCell  className='text-center td'>{product.date}</TableCell>
                             <TableCell  className='text-center td'>{product.sellerName}</TableCell>
                              <TableCell  className='text-center td'>{product.title}</TableCell>
                              <TableCell  className='text-center td'>{product.categoryName}</TableCell>
                              <TableCell  className='text-center td'>{product.quantity}</TableCell>
                              <TableCell  className='text-center td'>{product.soldQuantity}</TableCell>
                              <TableCell  className='text-center td'>{product.price}</TableCell>
                              
                              <TableCell  className='text-center td'>{product.description}</TableCell>
                              <TableCell  className='text-center td'>
                                  {product.available===true ?
                                      <span className='out text-success'>Available</span> :
                                      <span className='in text-danger'>Out of Stock</span>
                                  }
                              </TableCell>
                             
                            </>
                         
                        </TableRow>
                      </React.Fragment>
                    )):(
                      <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Products not found!</TableCell>
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
            }

              {!details &&
              <>
              {sortedCategories && sortedCategories.map((category) => (
                <div className="col-lg-4 col-md-6 mb-4" key={category._id}>
                  <Paper className="card" >
                    <div className="card-body p-2 m-0">
                      <div className="d-flex justify-content-between p-0 m-0">
                        <div className="first">
                          <h6 className="d-flex">
                            <img className="d-flex" src={category.image} alt="" />
                            <span className="mt-2 ms-2">{category.categoryName}</span>
                          </h6>
                          <p>
                            <i className="fas fa-tags me-2"></i>
                            {category.product.length} Products
                          </p>
                        </div>
                        <div className="right">
                          <div className="dropdown dropstart">
                            <Link type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fas fa-ellipsis-h ms-2"></i>
                            </Link>
                            <ul className="dropdown-menu border-0 shadow " aria-labelledby="dropdownMenuButton1">
                              <li onClick={()=>handleClickOpen(category)}><Link className="dropdown-item pe-2 edit_btn" ><i className="far fa-edit"></i> edit</Link></li>
                              <li onClick={() => deleteCategory(category)}><Link className="dropdown-item pe-2 del_btn" disabled={delLoading}><i className="fas fa-trash me-2"></i>delete</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="text-end m-0 p-0">
                        <Link className="detail_btn btn btn-sm px-3" onClick={()=>viewDetails(category)}>
                          View
                        </Link>
                      </div>
                    </div>
                  </Paper>

                </div>
              ))}
              </>
              }
            </>
            }
          </div>

          {current === 0 &&
            <div className='row row mx-lg-5 mx-sm-1 my-3 new-category'>
              <div className="col-md-12 pb-2 m-0 px-2">
                <h4>Create a new Category</h4>
                <form onSubmit={addNewCategory}>
                  <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel>
                            {step.label}
                          </StepLabel>
                          <StepContent>
                            <div className="col-md-12">
                              {step.content}
                            </div>
                            <Box sx={{ mb: 2 }}>
                              <div>
                                <Button
                                  className='continue_btn btn'
                                  onClick={handleNext}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button className='back_btn btn'
                                  disabled={index === 0}
                                  onClick={handleBack}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  Back
                                </Button>
                              </div>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === steps.length && (
                      <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <button className='submit btn mt-3' disabled={loading1} >
                          {loading1 ? <RiseLoader color="#FFFFFF" size={6} /> : <>Add Category</>}
                        </button>
                        {!loading && <Button onClick={handleReset} className='back_btn btn mt-3 ms-1'>
                          Cancel
                        </Button>}
                      </Paper>
                    )}
                  </Box>
                </form>
              </div>
            </div>
          }
        </div>
      </div>

      <Dialog className='edit_modal'
        open={openModal}
        onClose={handleClose}
        disableBackdropClick={true}

      >
        <DialogTitle className='header'>Update the Category</DialogTitle>
        <DialogContent>
          <p>
            Update the category details as you want. 
          </p>
          <label htmlFor="" className='my-1'>Name:</label>
         <input type="text" className='my-1' value={editedEntry.categoryName} onChange={(e) => handleInputChange(e, 'categoryName')}/>
         <label htmlFor="" className='my-1'>Description:</label>
         <textarea  className='my-1 py-2' value={editedEntry.description}disabled={editedEntry.des_Pic} onChange={(e) => handleInputChange(e, 'description')}/>
         <label htmlFor="" className='my-1'>Image:</label>
         <input type="file" className='my-1' accept='image/*' required onChange={(e) => handleImageChange(e, 'image')}/>
         <div className='row justify-content-center'>
          <div className='col-md-12 image'>
          {editedEntry.image && 
         <img src={editedEntry.image} className='rounded' alt={editedEntry.image}/>
         }
          </div>
         </div>

         <label htmlFor="" className='my-1'>Desc Image:</label>
         <input type="file" className='my-1' accept='image/*'disabled={editedEntry.description}  required onChange={(e) => handleImageChange(e, 'des_Pic')}/>
         <div className='row justify-content-center'>
          <div className='col-md-12 image'>
          {editedEntry.des_Pic && 
          <div style={{
            position: 'relative',
          }}>
         <img src={editedEntry.des_Pic} className='rounded' alt={editedEntry.des_Pic}/>
         <i className="fa-solid fa-trash-can" onClick={handleDeleteImage}  style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  cursor: 'pointer',
                  color: 'red',
                }} ></i>
          </div>
         }

          </div>
         </div>
        </DialogContent>
        <DialogActions>
          <button className='btn cancel_btn' onClick={handleClose}>Cancel</button>
          <button type="submit" className='btn update_btn' onClick={()=>updateCategory()} disabled={updateLoading}>{updateContent}</button>
        </DialogActions>
      </Dialog>
    </>
  );
}
