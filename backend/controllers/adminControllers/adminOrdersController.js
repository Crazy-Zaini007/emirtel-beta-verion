const mongoose = require('mongoose');
const Admin = require('../../database/admin/adminModel');
const Users = require('../../database/user/userModel');
const AllOrders = require('../../database/admin/allOrdersModel')
const nodemailer = require("nodemailer");

//getting all Orders
const getOrders=async(req,res)=>{
    try{
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        if (admin && admin.role.toLowerCase()==="super admin") {
            const allOrders=await AllOrders.find({}).sort({ createdAt: -1 })
            return res.status(200).json({
                data: allOrders
              })
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


// Update Order Status

const updateOrderStatus=async(req,res)=>{
    try{
        const adminId = req.user._id;
        const{orderId,order_Status}=req.body
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        if (admin && admin.role.toLowerCase()==="super admin") {
            const order=await AllOrders.findOne({orderId})
            
            if(!order){
            res.status(404).json({ message:`Order not found`});

            }
            if(order){
            const todayDate = new Date().toISOString().split("T")[0];

            const users=await Users.find({})
            for (const user of users){
                let orderToUpdate=user.orders.find((order)=>order.orderId.toString()===orderId.toString())
                if(orderToUpdate){
                    orderToUpdate.order_Status=order_Status
                    const newNotification={
                        type: order_Status,
                        content: `Your order's status with orderId ${order.orderId} updated to "${order_Status}" for your product: ${orderToUpdate.title} on ${todayDate}`,
                        date: todayDate
                    }
                    user.notifications.push(newNotification)
                    await user.save()
                }
            }

            const admins=await Admin.find({})
            for (const admin of admins){
                let orderToUpdate=admin.orders.find((order)=>order.orderId.toString()===orderId.toString())
                if(orderToUpdate){
                    orderToUpdate.order_Status=order_Status
                    const newNotification={
                        type: order_Status,
                        content: `Order'status updated to "${order_Status}" for your product: ${orderToUpdate.title} By Super Admin on ${todayDate}`,
                        date: todayDate
                    }
                    admin.notifications.push(newNotification)
                    await admin.save()
                }
            }

            const superAdmin=await Admin.findOne({role:"Super Admin"})

            if(superAdmin){
                const newNotification={
                    type: order_Status,
                    content: `You have updated Order Status to "${order_Status}" of ${order.buyer_Name}'order on ${todayDate}`,
                    date: todayDate
                }
                superAdmin.notifications.push(newNotification)
                await superAdmin.save()
            }
            order.order_Status=order_Status
            await order.save()
            return res.status(200).json({
               message:`Order Status successfully updated to ${order_Status}`
              })
            }

        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


// Getting Logged in Individual Admin Orders

const getAdminOrders=async(req,res)=>{
 try{
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        if (admin) {
            const allOrders=admin.orders
            const sortedOrders = allOrders.sort((a, b) => b.createdAt - a.createdAt);
            return res.status(200).json({
                data: allOrders
              })
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


module.exports={getOrders,updateOrderStatus,getAdminOrders}