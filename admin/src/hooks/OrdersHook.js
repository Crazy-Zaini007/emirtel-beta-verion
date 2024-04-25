import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { useDispatch } from 'react-redux';

export default function OrdersHook() {
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_API_URL;

    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)
    const [allOrders,setAllOrders]=useState('')
    // Fetching Logged in Seller's Created Categories
    const getAllOrders=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/all_orders/get/orders`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
            
          }
        })
        
        const json=await response.json()

        if(response.ok){
            setAllOrders(json.data)
          setLoading(null)
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }


// getAllOrders
  return {getAllOrders,allOrders}
}
