import {useState} from 'react'
import { useAuthContext } from './UserContextHook'

export default function NotifyHook() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const { seller } = useAuthContext()
    const [loading, setLoading] = useState(null)
    const [notifications,setNotifications]=useState('')
    // Fetching Logged in Seller's Created Categories
    const getNotifications=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/admin/join/get/notifications`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
          }
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          setNotifications(json.data)
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       setLoading(null)
       }
    }


  return {getNotifications,loading,notifications}
}
