const User = require('../../database/user/userModel');
const Admin = require('../../database/admin/adminModel');
const AllOrders = require('../../database/admin/allOrdersModel');
const mongoose = require('mongoose');

// placing a new order by Buyer/User

const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (user) {
            const {totalQuantity,totalPrice, deliveryType, fName, lName, phone, city, address, cardFName, cardLName, cardNumber, securityCode, expDate, orders } = req.body;
            
            let products = [];
            const orderId = new mongoose.Types.ObjectId();
            const todayDate = new Date().toISOString().split("T")[0];
            const today = new Date();
            const year = today.getFullYear();
            function getMonthName() {
                const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ];
                const today = new Date();
                const monthIndex = today.getMonth();
                const monthName = months[monthIndex];
                return monthName;
              }

            const month = getMonthName();
            const time = today.toLocaleTimeString('en-US', { hour12: false });

            for (const order of orders) {
                const newOrder = {
                    productId: order._id,
                    sellerId: order.sellerId,
                    title: order.title,
                    quantity: order.quantity,
                    price: order.price,
                    totalPrice:order.totalPrice
                }
              
                products.push(newOrder);

                const admins = await Admin.find();
                for (const admin of admins){

                    if(admin._id.toString()===order.sellerId.toString()){
                            const myOrder = {
                                orderId: orderId,
                                productId: order._id,
                                sellerId: order.sellerId,
                                buyer_Name: fName + ' ' + lName,
                                buyer_Email: user.email,
                                buyer_Phone: phone,
                                title: order.title,
                                price: order.price,
                                totalPrice:order.totalPrice,
                                quantity: order.quantity,
                                payment_Type: deliveryType,
                                address: address,
                                city: city,
                                order_Status: "Pending",
                                date: todayDate,
                                month: month,
                                year: year,
                                time: time
                            };
                            admin.orders.push(myOrder);
                            const newNotification = {
                                type: 'New Order',
                                content: `You got an order from ${user.name} for your product: ${order.title} on ${todayDate}`,
                                date: todayDate
                            };
                            admin.notifications.push(newNotification);
                            await admin.save();
                        
                    }
                }
               
            }

            const superAdmin = await Admin.findOne({ role: "Super Admin" });
            const allOrders = new AllOrders({
                orderId: orderId,
                buyer_Name: fName.concat(' ', lName), 
                buyer_Email: user.email,
                buyer_Phone: phone,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                payment_Type: deliveryType,
                address: address,
                city: city,
                order_Status: "Pending",
                date: todayDate,
                month: month,
                year: year,
                time: time,
                products: products
            })
            
            if (superAdmin) {
                await allOrders.save()
                const newNotification = {
                    type: 'New Order',
                    content: `${user.name} placed an order of Total Price: ${totalPrice} for ${orders.length} products having Total Quantity: ${totalQuantity}.`,
                    date: todayDate
                };
                superAdmin.notifications.push(newNotification);
                await superAdmin.save();
            }   
    
            const userOrder = {
                orderId: orderId,
                buyer_Name: fName.concat(' ', lName), 
                buyer_Email: user.email,
                buyer_Phone: phone,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                payment_Type: deliveryType,
                address: address,
                city: city,
                order_Status: "Pending",
                date: todayDate,
                month: month,
                year: year,
                time: time,
                products: products
            }
            user.orders.push(userOrder);
            await user.save();
        }
        
        return res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports={placeOrder}