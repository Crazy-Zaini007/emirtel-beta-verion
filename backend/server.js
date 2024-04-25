const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http');
const cors = require('cors');

//Admin Routes path
 const JoinAmdin = require('./routes/admin/adminRegRoute')
const Category=require('./routes/admin/categoryRoute')
const IndividualSellerProducts=require('./routes/admin/productRoute')
const AllOrders=require('./routes/admin/ordersRoute')

// Buyer/User Routes Path
const allCategories=require('./routes/user/getCategory_Route')
const allProducts=require('./routes/user/product_Route')
const JoinUser=require('./routes/user/user_Reg_Route')
const Wishlist=require('./routes/user/wishlist_Route')
const CategoryDetails=require('./routes/user/getCategoryProducts_Route')
const UserOrders=require('./routes/user/order_Route')




//express app
const app = express()
const server = http.createServer(app)

app.use(cors());
//set the limit to 100MB for request
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routing for Admin
// Admin Registration Route
app.use('/auth/admin/join', JoinAmdin)

// categoty Route
app.use('/auth/admin/category',Category)

// Individual Seller Product Route
app.use('/auth/admin/product',IndividualSellerProducts)

// AllOrders Route
app.use('/auth/admin/all_orders',AllOrders)


// Routing for User
app.use('/auth/user/categories',allCategories)
app.use('/auth/user/products',allProducts)
app.use('/auth/user/join',JoinUser)
app.use('/auth/user/wishlist',Wishlist)
app.use('/auth/user/category_details',CategoryDetails)
app.use('/auth/user/orders',UserOrders)


//PORT number
const PORT = process.env.PORT

//connect to mongoDB
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 50000 })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Database Connected on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

