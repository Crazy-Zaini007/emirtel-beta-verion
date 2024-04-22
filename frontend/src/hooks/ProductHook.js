import {useState} from 'react'
import { getAllProducts,getLatestProducts,getUserAllProducts,getUserLatestProducts } from '../redux/reducers/productSlice'
import { useDispatch } from 'react-redux';
import { useAuthContext } from './UserContextHook'

export default function CategoryHook() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(null)
    const {user}=useAuthContext()
    const gettingAllProducts=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/user/products/get/all/products`,{
           
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
       }
    }

    const gettingAllLatestProducts=async()=>{
      setLoading(true)
      
       try {
        const response=await fetch(`${apiUrl}/auth/user/products/get/all/latest_products`,{
        })
        
        const json=await response.json()
        if(response.ok){
          setLoading(null)
          dispatch(getLatestProducts(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }

    const gettingAuthAllProducts=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/user/products/auth/get/all/products`,{
            headers:{
                'Authorization': `Bearer ${user.token}`
                
              }
        })
        
        const json=await response.json()
        if(response.ok){
          setLoading(null)
          dispatch(getUserAllProducts(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }

    const gettingAuthAllLatestProducts=async()=>{
      setLoading(true)
      
       try {
        const response=await fetch(`${apiUrl}/auth/user/products/auth/get/all/latest_products`,{
            headers:{
                'Authorization': `Bearer ${user.token}`
                
              }
        })
        
        const json=await response.json()
        if(response.ok){
          setLoading(null)
          dispatch(getUserLatestProducts(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }



  return {gettingAllProducts,gettingAllLatestProducts,gettingAuthAllProducts,gettingAuthAllLatestProducts,loading}
}