import { useAuthContext } from './UserContextHook'
import { useNavigate } from 'react-router-dom'

export default function LogoutHook() {
const {dispatch}=useAuthContext()
const navigate = useNavigate()

// learner logout
const userLogout=()=>{
  if (window.confirm('Are you sure you want to Logout from your Account?')){
  
      setTimeout(() => {
        localStorage.removeItem('user')
      }, 10);
      dispatch({ type: "USER_LOGOUT" });
  }
    }
  return {userLogout}
}
