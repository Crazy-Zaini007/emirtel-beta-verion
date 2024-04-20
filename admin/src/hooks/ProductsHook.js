import React,{useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getProduct} from '../redux/reducers/productSlice'
import { getApprovedProducts} from '../redux/reducers/allProductSlice'
import { useDispatch } from 'react-redux';

export default function ProductsHook() {
    const { seller } = useAuthContext()
    const dispatch  = useDispatch()
    const apiUrl = process.env.API_URL;
    
    // Fetching Loggedin Seller Products

    const getAllProducts = async () => {
        try {

            const response = await fetch(`${apiUrl}/auth/admin/product/get/product`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${seller.token}`

                }
            })
            const json = await response.json()
            
            if (response.ok) {
                dispatch(getProduct(json.data))
               
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [loading, setLoading] = useState(null)
    
    const getAllApprovedProducts=async()=>{
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
          dispatch(getApprovedProducts(json.approvedProducts))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       setLoading(null)
       }
    }

    return { getAllProducts,getAllApprovedProducts,loading }
}
