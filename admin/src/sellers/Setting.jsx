import React,{useState,useEffect} from 'react'
import { Paper,Avatar } from '@mui/material';
import AdminsHook from '../hooks/AdminsHook';
import ContentHook from '../hooks/ContentHook';
import { useAuthContext } from '../hooks/UserContextHook'
import {useDispatch,useSelector } from 'react-redux';
import {  deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Person3Icon from '@mui/icons-material/Person3';
import LockClockIcon from '@mui/icons-material/LockClock';
import SecurityHook from '../hooks/SecurityHook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function Setting() {

  const securityCode = useSelector((state) => state.security.securityCode);
  const content = useSelector((state) => state.content.contentImages);

  const apiUrl = process.env.REACT_APP_API_URL;

    const [current,setCurrent]=useState(0)
    const {getAllAdmins,admin}=AdminsHook()
    const {getAllContentImages}=ContentHook()
    const {getSecurity}=SecurityHook()

  const { seller } = useAuthContext()
  const dispatch = useDispatch()
    
  useEffect(() => {
    if(seller){
      getAllAdmins()
      getSecurity()
      getAllContentImages()
    }
  }, [dispatch]);

  const [editedEntry, setEditedEntry] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleClickOpen = (admin) => {
    setEditedEntry(admin);
    setEditMode(!editMode);

  }

  const handleClose = () => {
    setEditMode(!editMode);
    setEditedEntry({});
  };

  const handleInputChange = (e, field) => {
    setEditedEntry({
      ...editedEntry,
      [field]: e.target.value,
    });

  };

  const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
}

  const [, setNewMessage] = useState('')
  const [updateLoading, setUpdateLoading] = useState(false)
  const updateAdmin = async () => {
    setUpdateLoading(true)
    try {
      const response = await fetch(`${apiUrl}/auth/admin/join/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ userName: editedEntry.userName, email: editedEntry.email, originalPassword: editedEntry.originalPassword,role:editedEntry.role })
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setUpdateLoading(false)
       

      }
      if (response.ok) {
        getAllAdmins()
        setNewMessage(toast.success(json.message));
        setUpdateLoading(null)
        setEditMode(!editMode);
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setUpdateLoading(false)
  

    }
  }

const [showPassword1, setShowPassword1] = useState(false);
const togglePasswordVisibility1=()=>{
    setShowPassword1(!showPassword1)
}

const [editedEntry1, setEditedEntry1] = useState({});
  const [editMode1, setEditMode1] = useState(false);

  const handleClickOpen1 = (code) => {
    setEditedEntry1(code);
    setEditMode1(!editMode1);

  };

  const handleClose1 = () => {
    setEditMode1(!editMode1);
    setEditedEntry1({});
  };

  const handleInputChange1 = (e, field) => {
    setEditedEntry1({
      ...editedEntry1,
      [field]: e.target.value,
    });

  };
  
  const [updateLoading1, setUpdateLoading1] = useState(false)
  const updateSecurity = async () => {
    setUpdateLoading1(true)
    try {
      const response = await fetch(`${apiUrl}/auth/admin/join/update/security_code`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({ codeId:editedEntry1._id,code: editedEntry1.code})
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setUpdateLoading1(false)
      }
      if (response.ok) {
        getSecurity()
        setNewMessage(toast.success(json.message));
        setUpdateLoading1(null)
        setEditMode1(!editMode1);
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setUpdateLoading1(false)
  

    }
  }

  const [addImage,setAddImage]=useState(0)
  const [image,setImage]=useState('')

  const handleImage = (e) => {
    const file = e.target.files[0];
    TransformFile(file)
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit. Please select a smaller file.');
      } else {
        TransformFile(file);
      }
    } else {
      alert('No file selected.');
    }
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage('');
    }
  };


  // adding a background image for user side carousel
const[loading4,setLoading4]=useState(false)
  const addContentPicture = async (e) => {
    e.preventDefault()
    setLoading4(true)
    try {
      const response = await fetch(`${apiUrl}/auth/admin/page_content/add/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({image})
      })

      const json = await response.json()


      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setLoading4(false)
      }
      if (response.ok) {
        setAddImage(0)
        getAllContentImages()
        setImage('')
        setNewMessage(toast.success(json.message));
        setLoading4(null)
      }
    }
    catch (error) {
      setNewMessage(toast.error('Server is not responding...'))
      setLoading4(false)
    }
  }

// deleting content image
  const [delLoading, setDelLoading] = useState(false)
  const deleteImage = async (imageUrl) => {

    setDelLoading(true)
    try {
      const response = await fetch(`${apiUrl}/auth/admin/page_content/delete/image`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${seller.token}`,
        },
        body: JSON.stringify({imageUrl})
      })

      const json = await response.json()

      if (!response.ok) {
        setNewMessage(toast.error(json.message));
        setDelLoading(false)
      }
      if (response.ok) {
        getAllContentImages()
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
        <div className="container-fluid setting">
        {current===2 &&
        <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="wrap" id="add">
              {addImage===0 ? <Link onClick={() => setAddImage(1)} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><AddIcon></AddIcon></Avatar></Link> : <Link onClick={() => setAddImage(0)} className='add_communi'><Avatar sx={{ width: 50, height: 50 }}><CloseIcon></CloseIcon></Avatar></Link>}
            </div>
          </div>
        </div>
      </div>
        }
            <div className='row mx-lg-2 mx-sm-3 mt-3 mb-5'>
                <div className="col-md-12 pb-2 m-0 px-2 mb-3">
                    <h4>Manage Setting</h4>
              <p className='welcome'>See,and update your personal details easily !</p>
              <button className="profile_btn btn mx-1" onClick={()=>setCurrent(0)} style={current === 0 ? { backgroundColor: 'var(--purple)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
                Profile
              </button>
             {seller.role==='Super Admin' &&
              <button className="security_btn btn mx-1" onClick={()=>setCurrent(1)} style={current === 1 ? { backgroundColor: 'var(--purple)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
              Security
            </button>
             }
             {seller.role==='Super Admin' &&
              <button className="security_btn btn mx-1" onClick={()=>setCurrent(2)} style={current === 2 ? { backgroundColor: 'var(--purple)', borderRadius: '4px', fontWeight: '600', color: 'var(--white)', transition: 'background-color 0.3s', transform: '0.3s' } : {}}>
              Content
            </button>
             }
                </div>
                <div className="col-xl-5 col-lg-7 col-md-10 col-sm-12 pb-2 m-0 px-2">
                    {current===0 &&

                    <Paper className="card border-0" >
                    <div className="card-body ">
                        <div className="top justify-content-between d-flex">
                            <div className="left">
                            <h5 className='card-title mt-2'>{!editMode ? `${seller.role} Profile`:"Update Profile"}</h5>
                            </div>
                            <div className="right">
                            <div className="dropdown dropstart">
                            <Link type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fas fa-ellipsis-h ms-2"></i>
                            </Link>
                            <ul className="dropdown-menu border-0 shadow " aria-labelledby="dropdownMenuButton1">
                           {!editMode &&   <li onClick={()=>handleClickOpen(admin && admin)}><Link className="dropdown-item pe-2 edit_btn" ><i className="far fa-edit"></i> edit</Link></li>}
                             {editMode && !updateLoading && <li onClick={() => handleClose()}><Link className="dropdown-item pe-2 del_btn" ><i className="fas fa-times me-2"></i>cancel</Link></li>}
                              
                            </ul>
                          </div>
                            </div>
                        </div>
                       
                        {!admin &&
                <div className="col-md-12  pb-2 m-0 px-2 text-center loading my-5">
                  <i className="fas fa-spinner fa-spin "></i>
                </div>
              }
              {admin &&
              <>
               <div className="image mt-3">
                        <Avatar sx={{ bgcolor: deepPurple[300] }} className='mx-auto avatar'>{seller.role==="Super Admin" ? <AdminPanelSettingsIcon sx={{ width: 40, height: 40 }}/>:<Person3Icon sx={{ width: 40, height: 40 }}/>}</Avatar>

                        </div>
               {!editMode && 
                    <>
                    <label htmlFor="" className='my-1'>Name:</label>
                    <input type="text" className='my-1' value={admin && admin.userName} readOnly/>
                    <label htmlFor="" className='my-1'>Email:</label>
                    <input type="email" className='my-1' value={admin && admin.email} readOnly/>
                    <label htmlFor="" className='my-1'>Role:</label>
                    <input type="text" className='my-1' value={admin && admin.role} readOnly/>
                    <label htmlFor="" className='my-1'>Password:</label>
                    <input type={showPassword ? "text":'password'} className='my-1' value={admin && admin.originalPassword} readOnly/>
                    <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                    </>
                    }
                    {editMode && 
                    <>
                    <label htmlFor="" className='my-1'>Name:</label>
                    <input type="text" className='my-1' value={editedEntry.userName} required onChange={(e) => handleInputChange(e, 'userName')}/>
                    <label htmlFor="" className='my-1'>Email:</label>
                    <input type="email" className='my-1' value={editedEntry.email} required onChange={(e) => handleInputChange(e, 'email')}/>
                    <label htmlFor="" className='my-1'>Role:</label>
                    <input type="text" className='my-1' value={editedEntry.role} placeholder='not editable' readOnly/>
                    <label htmlFor="" className='my-1'>Password:</label>
                    <input type={showPassword ? "text":'password'} className='my-1' value={editedEntry.originalPassword} required onChange={(e) => handleInputChange(e, 'originalPassword')}/>
                    <Link onClick={togglePasswordVisibility} className='mt-4'>
                            {showPassword ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                    <button type="button" className='my-1 save_btn' disabled={updateLoading} onClick={()=>updateAdmin()}>{updateLoading ?"Saving..." :"Save"} </button>

                    </>
                    }
              </>
              }
                   
                    </div>
                  </Paper>
                    }
                    
                    {current===1 &&
                    <Paper className="card border-0">
                      <div className="card-body pb-5">
                      <div className="top justify-content-between d-flex">
                            <div className="left">
                            <h5 className='card-title mt-2'>{!editMode1 ? `Security Code`:"Update Security Code"}</h5>
                            </div>
                            <div className="right">
                            <div className="dropdown dropstart">
                            <Link type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fas fa-ellipsis-h ms-2"></i>
                            </Link>
                            <ul className="dropdown-menu border-0 shadow " aria-labelledby="dropdownMenuButton1">
                           {!editMode1 &&   <li onClick={()=>handleClickOpen1(securityCode && securityCode)}><Link className="dropdown-item pe-2 edit_btn" ><i className="far fa-edit"></i> edit</Link></li>}
                             {editMode1 && !updateLoading && <li onClick={() => handleClose1()}><Link className="dropdown-item pe-2 del_btn" ><i className="fas fa-times me-2"></i>cancel</Link></li>}
                              
                            </ul>
                          </div>
                            </div>
                        </div>
                        {securityCode &&
              <>
               <div className="image mt-3">
                        <Avatar sx={{ bgcolor: deepPurple[300] }} className='mx-auto avatar'><LockClockIcon sx={{ width: 40, height: 40 }}></LockClockIcon></Avatar>

                        </div>
               {!editMode1 && 
                    <>
                    <label htmlFor="" className='my-1'>Security Code:</label>
                    <input type={showPassword1 ? "text":'password'} className='my-1' value={securityCode && securityCode.code} readOnly/>
                    <Link onClick={togglePasswordVisibility1} className='mt-4'>
                            {showPassword1 ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                    </>
                    }
                    {editMode1 && 
                    <>
                    
                    <label htmlFor="" className='my-1'>Security Code:</label>
                    <input type={showPassword1 ? "text":'password'} className='my-1' value={editedEntry1.code} required onChange={(e) => handleInputChange1(e, 'code')}/>
                    <Link onClick={togglePasswordVisibility1} className='mt-4'>
                            {showPassword1 ?<span className="fa-solid fa-eye-slash passsword-icon "></span>: <i className="fa-solid fa-eye passsword-icon"></i>  }
                           </Link>
                    <button type="button" className='my-1 save_btn' disabled={updateLoading} onClick={()=>updateSecurity()}>{updateLoading1 ?"Saving..." :"Save"} </button>

                    </>
                    }
              </>
              }

                      </div>
                    </Paper>
                    }
                </div>

                <div className="row">
                {current===2 &&
                    <>
                    {addImage===1 && 
                    <form className='add_content' onSubmit={addContentPicture} disabled={updateLoading1}>
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                          <label htmlFor="">Select image</label>
                          <div class="input-group mb-3">
                          <input type="file" onChange={handleImage} aria-describedby="button-addon2" />
                          <button className="btn add_btn btn-sm" type="submit" id="button-addon2"disabled={loading4} >{loading4?"Adding...":"Add"}</button>
                        </div>
                         
                        </div>
                        <div className="mb-1 image">
                          
                          <img src={image} alt="" />
                        </div>
                        </div>
                      
                       
                      </div>
                    </form>
                    }
                 <div className="row content">
  {addImage === 0 && content && content.map((data, index) => (
    <div key={index} className='col-md-3 p-1 content_view'>
      <div className="image-wrapper">
        <img src={data} alt="" className="image" />
        <div className="delete-icon">
          <span className="fas fa-trash-alt" disabled={delLoading} onClick={()=>deleteImage(data)}></span>
        </div>
      </div>
    </div>
  ))}
</div>

                    
                    </>
                   
                    }
                </div>
            </div>
           
        </div>
    </div>
      
    </>
  )
}
