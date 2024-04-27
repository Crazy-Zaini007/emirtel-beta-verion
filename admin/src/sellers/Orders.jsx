import React, { useEffect,useState } from 'react'
import { useAuthContext } from '../hooks/UserContextHook'
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Avatar, TablePagination } from '@mui/material';
import AdminsHook from '../hooks/AdminsHook';
import OrdersHook from "../hooks/OrdersHook"

export default function Orders() {
  const { seller } = useAuthContext()
  const {getAdminOrders,myOrders}=OrdersHook()


    useEffect(() => {
        getAdminOrders()
    }, [seller]);

    const [status,setStatus]=useState('')

    const filteredOrders=myOrders && myOrders.filter(order=>{
        return(
            order.order_Status.toLowerCase().includes(status.toLowerCase())
        )
    })
    return (
        <div className='main'>
            <div className="container-fluid seller_orders">
                <div className="row mx-lg-2 mx-sm-3 my-3">
                    <div className="col-sm-12 pb-2 m-0 px-2">
                        <h4>Orders</h4>
                        <p className='welcome'>Welcome to your Orders section!</p>
                    </div>
                    <div className="col-md-12 text-md-end pb-2 m-0 px-sm-0">
                        <ul>
                            <li><button className={`btn all_btn mx-1 ${status.toLowerCase()==='' && 'shadow'} border `} style={status.toLowerCase()===''? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('')}>All</button></li>
                            <li><button className={`btn delivered_btn mx-1 ${status.toLowerCase()==='delivered' && 'shadow'} border `} style={status.toLowerCase()==='delivered'? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('delivered')}>Delivered</button></li>
                            <li><button className={`btn delivered_btn mx-1 ${status.toLowerCase()==='shipping' && 'shadow'} border `} style={status.toLowerCase()==='shipping'? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('shipping')}>Shipping</button></li>
                            <li><button className={`btn delivered_btn mx-1 ${status.toLowerCase()==='pending' && 'shadow'} border `} style={status.toLowerCase()==='pending'? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('pending')}>Pending</button></li>
                            <li><button className={`btn delivered_btn mx-1 ${status.toLowerCase()==='packing' && 'shadow'} border `} style={status.toLowerCase()==='packing'? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('packing')}>Packing</button></li>
                            <li><button className={`btn delivered_btn mx-1 ${status.toLowerCase()==='cancelled' && 'shadow'} border `} style={status.toLowerCase()==='cancelled'? {background:'var(--purple)',color:'var(--white)'}:{}} onClick={()=>setStatus('cancelled')}>Cancelled</button></li>
                        </ul>
                    </div>
                    <div className='col-md-12 pb-2 m-0 px-sm-0 mb-3 table'>
                        <TableContainer component={Paper} sx={{maxHeight:650}}>
                        <Table>
                            <TableHead className='thead'>
                            <TableRow >
                                                    <TableCell className='text-center'>#</TableCell>
                                                    <TableCell className='text-center'>Date</TableCell>
                                                    <TableCell className='text-center'>Customer</TableCell>
                                                    <TableCell className='text-center'>City</TableCell>
                                                    <TableCell className='text-center'>Shipping_Address</TableCell>
                                                    <TableCell  className='text-center'>Payment</TableCell>
                                                    <TableCell  className='text-center'>Product</TableCell>
                                                    <TableCell  className='text-center'>Price</TableCell>
                                                    <TableCell  className='text-center'>Quantity</TableCell>
                                                    <TableCell  className='text-center'>Total_Price</TableCell>
                                                    <TableCell  className='text-center'>Status</TableCell>
                                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOrders && filteredOrders.length>0 ? filteredOrders.map((order,index)=>(
                                    <TableRow key={index}>
                                        <TableCell className="text-center td">{index+1}</TableCell>
                                        <TableCell className="text-center td">{order.date}</TableCell>
                                        <TableCell className="text-center td">{order.buyer_Name}</TableCell>
                                        <TableCell className="text-center td">{order.city}</TableCell>
                                        <TableCell className="text-center td">{order.address}</TableCell>
                                        <TableCell className="text-center td">{order.payment_Type.toLowerCase()==='cash on delivery' ? <span className='on_delivery  px-3 py-1 '>On_Delivery</span>:<span className='paid  px-3 py-2 '>Paid</span>}</TableCell>
                                        <TableCell className="text-center td">{order.title}</TableCell>
                                        <TableCell className="text-center td">{order.price}</TableCell>
                                        <TableCell className="text-center td">{order.quantity}</TableCell>
                                        <TableCell className="text-center td">{order.totalPrice}</TableCell>
                                        <TableCell className="text-center td ">
                                        {order.order_Status.toLowerCase() === "pending" && <span className='pending  px-3 py-1 '>Pending</span>}
                                        {order.order_Status.toLowerCase() === "delivered" && <span className='delivered text-success px-2 py-1'>Delivered</span>}
                                        {order.order_Status.toLowerCase() === "packing" && <span className='packing   px-2 py-1'>Packing</span>}
                                        {order.order_Status.toLowerCase() === "shipping" && <span className='shipping   px-2 py-1'>Shipping</span>}
                                        {order.order_Status.toLowerCase() === "cancelled" && <span className='pending  px-2 py-1'>Cancel</span>}
                                        
                                        </TableCell>
                                    </TableRow>
                                )):<TableRow>

                                <TableCell colSpan={5}></TableCell>
                                <TableCell className='td data_td p-1'>Orders_not_found</TableCell>
                                <TableCell colSpan={4}></TableCell>

                                </TableRow>}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
