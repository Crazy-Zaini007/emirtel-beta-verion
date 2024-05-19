const User = require("../../database/user/userModel");
const Admin = require("../../database/admin/adminModel");
const AllOrders = require("../../database/admin/allOrdersModel");
const mongoose = require("mongoose");
const crypto = require('crypto');

// generating a unique id for each order

const generateOrderID = async () => {
  try {
      const currentYear = new Date().getFullYear().toString();

      // Generate 4 random digits
      const generateRandomDigits = () => {
          return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      };

      const randomDigits = generateRandomDigits();

      // Retrieve the next index number from the AllOrders schema
      const nextIndex = await AllOrders.countDocuments() + 1;

      // Combine components to form the order ID
      const orderId = `${currentYear}${randomDigits}${nextIndex}`;

      return orderId;
  } catch (error) {
      throw new Error("Unable to generate order ID");
  }
};


// placing a new order by Buyer/User

const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      let {
        totalQuantity,
        totalPrice,
        deliveryType,
        choice,
        city,
        address,
        cardFName,
        cardLName,
        cardNumber,
        securityCode,
        expDate,
        orders,
      } = req.body;
      if(choice.toLowerCase()==='yes' && !city){
        return res.status(400).json({ message: "City name is required" });
      }
      if(choice.toLowerCase()==='yes' && !address){
        return res.status(400).json({ message: "Shipping address is required" });
      }
      const productTitles = [];
      let products = [];
      const orderId = await generateOrderID();
      console.log(choice,city,address,orderId)

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
          "Dec",
        ];
        const today = new Date();
        const monthIndex = today.getMonth();
        const monthName = months[monthIndex];
        return monthName;
      }
      const month = getMonthName();
      const time = today.toLocaleTimeString("en-US", { hour12: false });

      for (const order of orders) {
        const newOrder = {
          productId: order._id,
          sellerId: order.sellerId,
          title: order.title,
          quantity: order.quantity,
          price: order.price,
          totalPrice: order.totalPrice,
        };
        products.push(newOrder)
        productTitles.push(order.title)
        const admins = await Admin.find()
        for (const admin of admins) {
          if (admin._id.toString() === order.sellerId.toString()) {
            const myOrder = {
              orderId: orderId,
              productId: order._id,
              sellerId: order.sellerId,
              buyer_Name: user.name,
              buyer_Email: user.email,
              buyer_Phone: user.contact,
              title: order.title,
              price: order.price,
              totalPrice: order.totalPrice,
              quantity: order.quantity,
              payment_Type: deliveryType,
              address:choice.toLowerCase()==='yes' ? address : user.address,
              city: choice.toLowerCase()==='yes' ? city : user.city,
              order_Status: "Pending",
              date: todayDate,
              month: month,
              year: year,
              time: time,
            };
            admin.orders.push(myOrder);
            const newNotification = {
              type: "New Order",
              content: `You got an order from ${user.name} for your product: ${order.title} on ${todayDate}`,
              date: todayDate,
            };
            admin.notifications.push(newNotification);
            await admin.save();
          }
        }
      }

      const superAdmin = await Admin.findOne({ role: "Super Admin" });
      const allOrders = new AllOrders({
        orderId: orderId,
        buyer_Name: user.name,
        buyer_Email: user.email,
        buyer_Phone: user.contact,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        payment_Type: deliveryType,
        address: user.address,
        city: user.city,
        order_Status: "Pending",
        date: todayDate,
        month: month,
        year: year,
        time: time,
        products: products,
      });

      if (superAdmin) {
        await allOrders.save();
        const newNotification = {
          type: "New Order",
          content: `${user.name} placed an order of Total Price: ${totalPrice} for ${orders.length} products having Total Quantity: ${totalQuantity}.`,
          date: todayDate,
        };
        superAdmin.notifications.push(newNotification);
        await superAdmin.save();
      }

      const userOrder = {
        orderId: orderId,
        buyer_Name:user.name,
        buyer_Email: user.email,
        buyer_Phone: user.contact,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        payment_Type: deliveryType,
        address: user.address,
        city: user.city,
        order_Status: "Pending",
        date: todayDate,
        month: month,
        year: year,
        time: time,
        products: products,
      };
      user.orders.push(userOrder);
      const newNotification={
        type: "New Order",
        content: `Your placed an order for ${orders.length} Products with Total Quantity of ${totalQuantity} and Total Price ${totalPrice} on ${todayDate}`,
        date: todayDate
    }
    user.notifications.push(newNotification)
      await user.save();
    }

    return res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Order Status

const updateOrderStatus=async(req,res)=>{
  try{
      const userId = req.user._id;
      const{orderId}=req.body
      const productTitles = [];
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (user) {
          const order=await AllOrders.findOne({orderId})

          if(!order){
          res.status(404).json({ message:`Order not found`});

          }
          if(order){
          const todayDate = new Date().toISOString().split("T")[0];

              let orderToUpdate=user.orders.find((order)=>order.orderId.toString()===orderId.toString())
                  orderToUpdate.order_Status="Cancelled"
                

          const admins=await Admin.find({})
          for (const admin of admins){
              let orderToUpdate=admin.orders.find((order)=>order.orderId.toString()===orderId.toString())
              if(orderToUpdate){
                  orderToUpdate.order_Status="Cancelled"
                  const newNotification={
                      type: "Order Cancelled",
                      content: `Customer: ${order.buyer_Name} cancelled his order having order Id: ${order.orderId} of ${orderToUpdate.quantity} Products (${productTitles.join(', ')}) with Total Price of ${order.totalPrice} on ${todayDate}`,
                      date: todayDate
                  }
                  admin.notifications.push(newNotification)
                  await admin.save()
                productTitles.push(orderToUpdate.title)
              }
          }

          const superAdmin=await Admin.findOne({role:"Super Admin"})

          if(superAdmin){
              const newNotification={
                  type: "Order Cancelled",
                  content: `Customer: ${order.buyer_Name} cancelled his order having order Id: ${order.orderId} of for ${order.products.length} Products (${productTitles.join(', ')}) with Total Price of ${order.totalPrice} and Total Quanity ${order.totalQuantity} on ${todayDate}`,
                  date: todayDate
              }
              superAdmin.notifications.push(newNotification)
              await superAdmin.save()
          }
          order.order_Status="Cancelled"
          await order.save()

          const myNotification={
            type: "Order Cancelled",
            content: `You cancelled your order having orderId: ${order.orderId} for ${order.products.length} Products  with Total Price of ${order.totalPrice} and Total Quantiy ${order.totalQuantity} on ${todayDate}`,
            date: todayDate
        }
        user.notifications.push(myNotification)
          await user.save()
          return res.status(200).json({
             message:`Order cancelled successfully`
            })
          }
      }
  }
  catch(error){
      console.error(err);
      res.status(500).json({ message: "Internal Server error" });
  }
}

module.exports = { placeOrder,updateOrderStatus,updateOrderStatus };
