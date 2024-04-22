import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/UserContextHook'
import ProductsHook from "../hooks/ProductsHook"
import RiseLoader from "react-spinners/RiseLoader";
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper,TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CategoryHook from '../hooks/CategoryHook'
import { addProduct} from '../redux/reducers/productSlice'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
export default function SellerProducts() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const rowsPerPageOptions = [20, 40, 100];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const calculateAverageRating = (product_Rating) => {
    if (product_Rating.length === 0) return 0;
    const totalRating = product_Rating.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / product_Rating.length;
  }
  


  const dispatch = useDispatch()
    const { seller } = useAuthContext()
    const {getAllProducts}=ProductsHook()
  const {getAllCategory}=CategoryHook()

    useEffect(() => {
      getAllProducts()
      getAllCategory()
    }, [seller]);

    const products = useSelector((state) => state.getProducts.products);
  const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const categories = useSelector((state) => state.getCategories.categories);

    const [current, setCurrent] = useState(1)
    const addNew = () => {
        setCurrent(null)
    }


    const [prodName,setProdName]=useState('')

    const filteredProducts =sortedProducts && sortedProducts.filter(product => {
      return (
        product.title.toLowerCase().includes(prodName.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(prodName.toLowerCase())
        
      )
    })


  const [, setNewMessage] = useState('')

    const[loading1,setLoading1]=useState(false)
    const [categoryName,setCategoryName]=useState('')
    const [title,setTitle]=useState('')
    const [images,setImages]=useState('')
    const [price,setPrice]=useState('')
    const [quantity,setQuantity]=useState('')
    const [sizes,setSize]=useState('')
    const [colors,setColor]=useState('')
    const [description,setDescription]=useState('')
    const [tags,setTags]=useState('')


let numPictures=4
const [selectedImageNames, setSelectedImageNames] = useState([]);

const handleImage = (e) => {
  // Check if files are selected
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    // Check if the selected image already exists in the list
    if (selectedImageNames.includes(file.name)) {
      alert('You have already selected this image.');
    } else {
      if (images.length === parseInt(numPictures)) {
        alert(`You can upload only ${numPictures} pictures.`);
      } else {
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds the 5MB limit. Please select a smaller file.');
          } else {
            TransformFile(file);
            // Add the filename to the list of selected image names
            setSelectedImageNames([...selectedImageNames, file.name]);
          }
        } else {
          alert('No file selected.');
        }
      }
    }
  } else {
    alert('No file selected.');
  }
}


const TransformFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImages([...images, reader.result]);
  };
}


const handleRemoveImage = (index) => {
  // Remove the image from the images array
  const updatedImages = images.filter((image, i) => i !== index);
  setImages(updatedImages);
  
  // Remove the image name from the selectedImageNames array
  const updatedImageNames = selectedImageNames.filter((name, i) => i !== index);
  setSelectedImageNames(updatedImageNames);
}


  // Editing Mode 
  const [editMode, setEditMode] = useState(false);
  const [editedEntry, setEditedEntry] = useState({});
  const [editedRowIndex, setEditedRowIndex] = useState(null);
const[preCategoryName,setPreCategoryName]=useState('')
  const handleEditClick = (product, index) => {
    setEditMode(!editMode);
    setEditedEntry(product);
    setPreCategoryName(product.categoryName)
    setEditedRowIndex(index); // Set the index of the row being edited
  };


  const handleInputChange = (e, field) => {
    setEditedEntry({
      ...editedEntry,
      [field]: e.target.value,
    });

  };

  const handleImageChange = (e, field) => {
    if (field === 'image') {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditedEntry({
            ...editedEntry,
            [field]: reader.result, // Use reader.result as the image data URL
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }


  const [updateLoading, setUpdateLoading] = useState(false)

  const updateProduct = async () => {
    setUpdateLoading(true)
        try {
      const response = await fetch(`${apiUrl}/auth/admin/product/update/product`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ productId:editedEntry.productId,date:editedEntry.date, preCategory: preCategoryName,categoryName: editedEntry.categoryName, title: editedEntry.title, image: editedEntry.image, price: editedEntry.price, quantity: editedEntry.quantity, size: editedEntry.size, color: editedEntry.color, description: editedEntry.description, keywords: editedEntry.keywords,available:editedEntry.available })
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setUpdateLoading(false)
      }
      if (response.ok) {
       getAllProducts()
        setNewMessage(toast.success(json.message));
        setUpdateLoading(null)
        setEditMode(!editMode)
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setUpdateLoading(false)
    }
  };


  
  const steps = [
    {
      label: 'Step 1: Select Category',
      content: (
        <div>
           <label>
            Product Category:
          </label>
          <select name="" id="" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)}>
          <option value="">Choose</option>
                  {categories && categories.map((data) => (
                    <option key={data._id} value={data.categoryName}>{data.categoryName}</option>
                  ))}
          </select>
          
        </div>
      ),
    },
    {
      label: 'Step 2: Product Intro',
      content: (
        <div>
          <label>
            Title:
          </label>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <label>
            Price: ($)
          </label>
          <input type="number" min='0' value={price} onChange={(e)=>setPrice(e.target.value)}/>
          <label>
            Quantity:
          </label>
          <input type="number" min='0' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
        </div>
      ),
    },
    {
      label: 'Step 3:More Fields ',
      content: (
        <div>
          <label>
          Sizes (if available):
          </label>
          <input type="text" placeholder='add product sizes with commas' value={sizes} onChange={(e)=>setSize(e.target.value)}/>
          <label>
          Colors (if available):
          </label>
          <input type="text" placeholder='add product colors with commas' value={colors} onChange={(e)=>setColor(e.target.value)} />
          <label>
           Product Description:
          </label>
          <textarea className='py-2' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
      ),
    },
    {
      label: 'Step 4: Media and Tags',
      content: (
        <div>
        <label >
            Keywaords/Tage
        </label>
        <input type="text" placeholder='add tags with commas' value={tags} onChange={(e)=>setTags(e.target.value)} />
        <label>
            Product Thumbnail: (max size: 5MB)
          </label>
          <input accept='image/*'  type="file" onChange={handleImage}  />
          <div className='my-2'>
  {images && images.map((image, index) => (
    <div key={index} className='col-md-6 col-sm-12' style={{ position: 'relative', display: 'inline-block' }}>
      <img src={image} className='m-1 border rounded' alt={`Picture ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }} onClick={() => handleRemoveImage(index)} />
      <button className=' p-0 rounded' onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '-2px', right: '3px', background: 'transparent', border: 'none', color: 'black', cursor: 'pointer' }}><i className="fas fa-trash-alt"></i></button>
    </div>
  ))}
</div>
          
        </div>
      ),
    },
  ];



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

  

    // Adding new product
// Splitting input values into arrays
const size = sizes.split(',').map((item) => item.trim());
const color = colors.split(',').map((item) => item.trim());
const keywords=tags.split(',').map((item) => item.trim());

    const addNewProduct=async(e)=>{
        e.preventDefault()
        setLoading1(true)
try {

  const response=await fetch(`${apiUrl}/auth/auth/admin/product/add/product`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${seller.token}`,
  },
  body: JSON.stringify({
    categoryName,
    title,
    images,
    price,
    quantity,
    size,
    color,
    description,
    keywords
  }),
  }) 

  const json=await response.json()

  if(!response.ok){
    setLoading1(false)
    setNewMessage(toast.error(json.message))
  }
  if(response.ok){
    getAllProducts()
    dispatch(addProduct(json.data))
    setNewMessage(toast.success(json.message))
    setCurrent(1)
    setTitle('')
    setImages('')
    setPrice('')
    setQuantity('')
    setSize('')
    setColor('')
    setDescription('')
    setTags('')
    setCategoryName('')
    setActiveStep(0);
  }
  
} catch (error) {
  setLoading1(false)
  setNewMessage(toast.error("Server is not responding..."))
  
}
     
    }

    // deleting a product
const[delLoading,setDelLoading]=useState(false)
    const deleteProduct = async (product) => {
      setDelLoading(true)
      
      let productId = product._id
      try {
        const response = await fetch(`${apiUrl}/auth/admin/product/delete/product`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${seller.token}`,
          },
          body: JSON.stringify({ productId,categoryName:product.categoryName })
        })
  
        const json = await response.json()
  
        if (!response.ok) {
          setNewMessage(toast.error(json.message));
          setDelLoading(false)
        }
        if (response.ok) {
           getAllProducts()
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
        <>
            <div className="main">
                <div className="container-fluid seller_products">
                <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wrap" id="add">
                  {current === 1 ? <Link onClick={() => addNew()} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><AddIcon></AddIcon></Avatar></Link> : <Link onClick={() => setCurrent(1)} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><CloseIcon></CloseIcon></Avatar></Link>}


                </div>
              </div>
            </div>
          </div>
                    <div className="row mx-lg-2 mx-sm-3 my-3">
                        

                        {current === 1 &&
                            <>
                            <div className="col-md-12 pb-2 m-0 px-2">
                            <h4>Products</h4>
                            <p className='welcome'>Welcome to your Products Dashboard !</p>
                        </div>
                                <div className="col-md-4  px-sm-0 text-end add-new">
                                    <input type="search" value={prodName} onChange={(e)=>setProdName(e.target.value)} className=' px-2' placeholder='Search by category OR name...' />
                                    
                                </div>
                                {(delLoading|| updateLoading) && 
                                <div className="col-md-12  pb-2 m-0 px-2 text-center loading">
                                  <i className="fas fa-spinner fa-spin "></i>
                                </div>

                                }

                                <div className="col-md-12 pb-2 m-0 px-sm-0 my-3 table">
                                     <TableContainer component={Paper} sx={{maxHeight:650}}>
                                        <Table >
                                            <TableHead className='thead'>
                                                <TableRow >
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
                                                    {seller.role !=="Super Admin" && <TableCell  className='text-center'>Approval</TableCell>}
                                                    <TableCell  className='text-center'>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {filteredProducts && filteredProducts.length>0 ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index)=>(
                                                <React.Fragment key={index}>
                                                  <TableRow key={product?.productId} >
                                                    {editMode && editedRowIndex === index ? (
                                                      <>
                                                      <TableCell className='border td data_td p-1 '>
                                                        <input type="number" value={index+1} readonly />
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                        <input type="text" value={editedEntry.date} readonly />
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                        <input type="text" value={editedEntry.title}  onChange={(e) => handleInputChange(e, 'title')}/>
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                        <select name="" id="" value={editedEntry.categoryName} required onChange={(e) => handleInputChange(e, 'categoryName')}>
                                                          {categories && categories.map((category)=>(
                                                            <option value={category.categoryName} key={category._id}>{category.categoryName}</option>
                                                          ))}
                                                        </select>
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                        <input type="number" min='0' value={editedEntry.quantity} required onChange={(e) => handleInputChange(e, 'quantity')}/>
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                      <input type="number" value={editedEntry.soldQuantity} readonly/>
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                      <input type="number" min='0' value={editedEntry.price} required onChange={(e) => handleInputChange(e, 'price')}/>
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                      <input type="file" accept='image/*' required onChange={(e) => handleImageChange(e, 'picture')}/>

                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                      <input type="text" value={editedEntry.description}  required onChange={(e) => handleInputChange(e, 'description')}/>
                                                        
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                      <input type="text" placeholder='Not Editable'  readonly/>
                                                        
                                                      </TableCell>
                                                      <TableCell className='border td data_td p-1 '>
                                                     <select name="" id="" value={editedEntry.available} required onChange={(e) => handleInputChange(e, 'available')}>
                                                      
                                                      <option value='false'>set as In Stock</option>
                                                      <option value='true'>set as Out of Stock</option>
                                                     </select>
                                                      </TableCell>
                                                      {seller.role !=="Super Admin" && <TableCell className='border td data_td p-1 '>
                                                      <input type="text" placeholder='Not Editable'  readonly/>
                                                        
                                                      </TableCell>}
                                                      
                                                      <TableCell  className='text-center td'>
                                                      <div className="dropdown d-inline mx-1">
                                                                <button className=" " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <ul className="dropdown-menu border-0 shadow" aria-labelledby="dropdownMenuButton1">
                                                                  
                                                                    <li onClick={() =>{ handleEditClick(product, index);setPreCategoryName('');}}><Link className="dropdown-item" ><i className="fa-solid fa-xmark me-1"></i>Cancel</Link></li>
                                                                    <li onClick={()=>updateProduct()}><Link className="dropdown-item" ><i className="fa-solid fa-pen me-1"></i>Update</Link></li>
                                                                   

                                                                </ul>
                                                            </div>
                                                            
                                                        </TableCell>
                                        
                                                      </>
                                                    ):(
                                                      <>
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
                                                                <span className='out text-success'>In Stock</span> :
                                                                <span className='in text-danger'>Out of Stock</span>
                                                            }
                                                        </TableCell>
                                                      {seller.role !=="Super Admin" &&   <TableCell  className='text-center td'>
                                                            {product.isApproved===true ?
                                                                <span className='out text-success'><i className="fa-solid fa-circle-check me-1"></i>Approved</span> :
                                                                <span className='in text-danger'><i className="fas fa-spinner fa-spin me-1"></i>Pending</span>
                                                            }
                                                        </TableCell>}
                                                        <TableCell  className='text-center td'>
                                                      <div className="dropdown d-inline mx-1">
                                                                <button className=" " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <ul className="dropdown-menu border-0 shadow" aria-labelledby="dropdownMenuButton1">

                                                                    <li><Link className="dropdown-item" ><i className="fa-solid fa-eye me-1"></i>View</Link></li>
                                                                    {product.isApproved ===true && <><li><Link className="dropdown-item" onClick={() => handleEditClick(product, index)}><i className="fa-solid fa-pen-to-square me-1"></i>Edit</Link></li>
                                                                    <li onClick={()=>deleteProduct(product)}><Link className="dropdown-item"><i className="fas fa-trash me-1" ></i>Delete</Link></li></>}
                                                                </ul>
                                                            </div>
                                                            
                                                        </TableCell>
                                                      </>
                                                    )}
                                                  </TableRow>
                                                </React.Fragment>
                                              )):(
                                                <TableRow>
                                                <TableCell></TableCell>
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
                                                <TableCell></TableCell>

                                              </TableRow>
                                              )}
                                            </TableBody>
                                          
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component='div'
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                style={{
                  color: 'blue',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
                                </div>
                            </>
                        }

                        {current === null &&
                            <>
                            <div className=" my-3 new_product">
                            <h4>Sell a new Product</h4>            
                            <form onSubmit={addNewProduct}>
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
                        {loading1 ?  <RiseLoader  color="#FFFFFF" size={6} />:<>Add Product</>}
                        </button>
                        {!loading1 && <Button onClick={handleReset} className='back_btn btn mt-3 ms-1'>
                          Cancel
                        </Button>}
                      </Paper>
                    )}
                  </Box>
                </form>
                            </div>
 
                            </>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}
