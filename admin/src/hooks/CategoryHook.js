import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getCategory } from '../redux/reducers/categorySlice'
import { useDispatch } from 'react-redux';

export default function CategoryHook() {
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_API_URL;

    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)
    // Fetching Logged in Seller's Created Categories
    const getAllCategory=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/category/get/category`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
            
          }
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          dispatch(getCategory(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }


// Adding a new Community


  return {getAllCategory,loading}
}
