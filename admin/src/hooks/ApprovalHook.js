import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getAllProducts } from '../redux/reducers/approvalSlice'
import { useDispatch } from 'react-redux';

export default function ApprovalHook() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch()

    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)
    // Fetching Logged in Seller's Created Categories
    const getProductApprovals=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/product/get/all/products`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
          }
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          dispatch(getAllProducts(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       setLoading(null)
       }
    }


  return {getProductApprovals,loading}
}
