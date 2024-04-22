import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getAdmins } from '../redux/reducers/adminSlice'
import { useDispatch } from 'react-redux';

export default function TeamsHook() {
    const dispatch = useDispatch()
    const [admin,setAdmin]=useState('')
    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)

    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetching Logged in Seller's Created Categories
    const getAllAdmins=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/join/get`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
            
          }
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          dispatch(getAdmins(json.adminsWithProducts))
          setAdmin(json.currentAdmin)
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       setLoading(null)
       }
    }


// Adding a new Community


  return {getAllAdmins,loading,admin}
}
