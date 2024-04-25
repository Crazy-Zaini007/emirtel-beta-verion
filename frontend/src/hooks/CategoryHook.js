import {useState} from 'react'
import { getCategories } from '../redux/reducers/categorySlice'
import { useDispatch } from 'react-redux';

export default function CategoryHook() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL;
    const getAllCategories=async()=>{
      setLoading(true)
       try {
        const response=await fetch(`${apiUrl}/auth/user/categories/get/all/categories`,{
        })
        
        const json=await response.json()

        if(response.ok){
          setLoading(null)
          dispatch(getCategories(json.data))
        }
        if(!response.ok){
            setLoading(null)
        }
       } catch (error) {
       console.log(error)
       }
    }


// Adding a new Community


  return {getAllCategories,loading}
}
