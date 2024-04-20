import {useState} from 'react'
import { useAuthContext } from './UserContextHook'
import { getSecurityCode } from '../redux/reducers/securitySlice'
import { useDispatch } from 'react-redux';

export default function SecurityHook() {
    const dispatch = useDispatch()
    const apiUrl = process.env.API_URL;

    const { seller } = useAuthContext()
    // Fetching Logged in Seller's Created Categories
    const getSecurity=async()=>{
       try {
        const response=await fetch(`${apiUrl}/auth/admin/join/get/security_code`,{
          headers:{
            'Authorization': `Bearer ${seller.token}`
          }
        })
        
        const json=await response.json()

        if(response.ok){
         
          dispatch(getSecurityCode(json.data))
        }
        if(!response.ok){
           
        }
       } catch (error) {
       console.log(error)
      
       }
    }


  return {getSecurity}
}
