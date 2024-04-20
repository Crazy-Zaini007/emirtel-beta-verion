import { useAuthContext } from './UserContextHook'
import { useNavigate } from 'react-router-dom'

export default function LogoutHook() {
const {dispatch}=useAuthContext()
const navigate = useNavigate()

// learner logout
const sellerLogout=()=>{
  if (window.confirm('Are you sure you want to Logout from your Account?')){
  
      setTimeout(() => {
        navigate("/emirtel/login_admin")
        localStorage.removeItem('seller')
      }, 10);
      dispatch({ type: "USER_LOGOUT" });
    
  }
   
    }
  return {sellerLogout}
}
