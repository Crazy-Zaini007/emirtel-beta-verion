import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getContent } from '../redux/reducers/contentSlice'
import { useDispatch } from 'react-redux';
export default function ContentHook() {
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_API_URL;

    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)
    // Fetching Logged in Seller's Created Categories
    const getAllContentImages=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/page_content/get/images`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
            
          }
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          dispatch(getContent(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }


// Adding a new Community


  return {getAllContentImages,loading}
}
