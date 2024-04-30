const mongoose = require('mongoose');
const cloudinary = require('./cloudinary');
const Admin = require('../../database/admin/adminModel');
const Products = require('../../database/admin/productModel')
const nodemailer = require("nodemailer");
const User = require("../../database/user/userModel");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user:process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
// add a new Product 
const addNewProduct = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { categoryName,title, images, price, quantity, size, color, description, keywords } = req.body;
        if(!categoryName){
            return res.status(400).json({message:'Product category is required'})
          }
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin && admin.isActive===false) {
            return res.status(404).json({ message: 'Your account is deactivated by Super Admin' });
        }

        if (admin && admin.isActive===true) {
            const existingCategory = await Products.findOne({categoryName})
            if (!existingCategory) {
                return res.status(400).json({ message: `Product Category: ${categoryName} not found !` });
            }
            if (existingCategory) {
                const existingProduct = existingCategory.product.find(product => product.title.toLowerCase() === title.toLowerCase())
                if (existingProduct) {
                    return res.status(400).json({ message: `${title} already existing !` });
                }

                if (!existingProduct) {
                    let uploadImage;
            let pictureArray=[]

                    if (images.length>0){
                        for (const image of images){
                            {
                                try {
                                    uploadImage = await cloudinary.uploader.upload(image, {
                                        upload_preset: 'rozgar',
                                    })
                                    const newObjectId = new mongoose.Types.ObjectId();
                                    pictureArray.push({ _id: newObjectId, imageUrl: uploadImage.secure_url });
                                } catch (uploadError) {
                                    console.log(uploadError)
                                    return res.status(500).json({ message: 'Error uploading image ' });
                                }
                            }
                        }
                    } 
                    const todayDate=new Date().toISOString().split("T")[0]
                    const newProduct = {
                        sellerId: adminId,
                        sellerName: admin.userName,
                        categoryName:categoryName,
                        title,
                        price,
                        quantity,
                        size,
                        color,
                        keywords,
                        description,
                        images: pictureArray,
                        date: todayDate,
                        soldQuantity:0,
                        isApproved:admin.role ==="Super Admin"? true :false
                    }
                    if(admin.role==="Admin"){
                        const superAdmin=await Admin.findOne({role:"Super Admin"})
                        if(superAdmin){
                            const newNotification={
                                type:'Product',
                                content:`${admin.userName} added a new product: ${title} to Category: ${categoryName} on ${todayDate}`,
                                date:todayDate
                            }
                            superAdmin.notifications.push(newNotification)
                            
                    //  const mailOptions = {
                    // from: 'zk013506@gmail.com', // sender address
                    // to: superAdmin.email, // list of receivers
                    // subject: "🛒 New Product Alert", // Subject line
                    // text: `<b>${admin.userName} added a new Product:${title} to the Category:${categoryName}, visit Product Approvals page to approve his product.</b>`
                    //           }
                    //    await transporter.sendMail(mailOptions);
             
                            await superAdmin.save()
                        }
                    }
                    existingCategory.product.push(newProduct)
                    await existingCategory.save()
                    const savedProduct = existingCategory.product[existingCategory.product.length - 1];
                   
                    return res.status(200).json({
                        message: `${title} added successfully to category: ${existingCategory.categoryName}!`,
                        data: savedProduct
                    })
                }
            }
        }

    } catch (error) {
        console.log('Error adding product:', error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// update a product
const updateProduct = async (req, res) => {
    try {
        const adminId = req.user._id;
        const {preCategory,date, categoryName,productId,title, images, price, quantity, size, color, description, keywords,available } = req.body;
        if(!categoryName){
            return res.status(400).json({message:'Product category is required'})
          }
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin && admin.isActive===false) {
            return res.status(404).json({ message: 'Your account is deactivated by Super Admin' });
        }
        if (admin && admin.isActive===true){
            if(categoryName !==preCategory){
                
                const preExistingCategory= await Products.findOne({categoryName:preCategory})
                if(preExistingCategory){
                    var oldProduct=preExistingCategory.product.find(product => product._id.toString() == productId)
                    preExistingCategory.product=preExistingCategory.product.filter(product => product._id.toString() !== productId)
                    await preExistingCategory.save()
                }

            const existingCategory = await Products.findOne({categoryName})

                const existingProduct = existingCategory.product.find(product => product.title.toLowerCase() === title.toLowerCase())
                if (existingProduct) {
                     res.status(400).json({ message: `${title} already existing in ${categoryName}!` });
                }
                if(!existingProduct){
                   
                    const newProduct = {
                        date:date,
                        sellerId: adminId,
                        sellerName: admin.userName,
                        categoryName:categoryName,
                        title,
                        price,
                        quantity,
                        size,
                        color,
                        keywords,
                        description,
                        available:available ==='false'?false:true,
                        images: images,
                        isApproved:admin.role ==="Super Admin"? true :false
                    }

                    existingCategory.product.push(newProduct)
                    await existingCategory.save()
                    
                    const users =await User.find({})
                    for(const user of users){
                        const products=user.wishlist
                        for (const product of products){
                            if(product.title.toLowerCase()===oldProduct.title.toLowerCase()){
                                product.date=date
                                product.sellerId=adminId
                                product.sellerName=admin.userName
                                product.categoryName=categoryName
                                product.title=title
                                product.price=price
                                product.size=size
                                product.color=color
                                product.keywords=keywords
                                product.description=description
                                product.available=available ==='false'?false:true
                                await user.save()
                            }
                        }
                    }
                    return res.status(200).json({
                        message: `Product updated successfully of category: ${categoryName}!`,
                    })
                }

            }

            else{
                const existingCategory = await Products.findOne({categoryName:preCategory})
                if (!existingCategory) {
                     res.status(400).json({ message: `Product Category: ${categoryName} not found !` });
                }
                if (existingCategory) {
                    const existingProduct = existingCategory.product.find(product => product._id.toString() === productId.toString())
                    if (!existingProduct) {
                         res.status(400).json({ message: `Product not found in ${categoryName}!` });
                    }
    
                    if (existingProduct) {
                       
                        const users =await User.find({})
                        for(const user of users){
                            const products=user.wishlist
                            for (const product of products){
                                if(product.title.toLowerCase()===existingProduct.title.toLowerCase()){
                                    product.date=date
                                    product.sellerId=adminId
                                    product.sellerName=admin.userName
                                    product.categoryName=categoryName
                                    product.title=title
                                    product.price=price
                                    product.size=size
                                    product.color=color
                                    product.keywords=keywords
                                    product.description=description
                                    product.available=available ==='false'?false:true
                                    await user.save()
                                }
                            }
                        }

                        existingProduct.title=title
                        existingProduct.categoryName=categoryName
                        // existingProduct.images = uploadImage?.secure_url || newImage; 
                        existingProduct.price=price
                        existingProduct.quantity=quantity
                        existingProduct.size=size
                        existingProduct.color=color
                        existingProduct.description=description
                        existingProduct.keywords=keywords
                        existingProduct.available=available ==='false'?false:true
                        await existingCategory.save()
                        return res.status(200).json({
                            message: `Product updated successfully of category: ${categoryName}!`,
                           
                        })
                    }
                }
            }
          
        }

    } catch (error) {
        console.log('Error adding product:', error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


    // delete a product
    const deleteProduct = async (req, res) => {
        try {
            const adminId = req.user._id;
            const { categoryName,productId,sellerId } = req.body;
           
            if(!categoryName){
                return res.status(400).json({message:'Product category is required'})
            }
            const admin = await Admin.findById(adminId);

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            if (admin && admin.isActive===false) {
                return res.status(404).json({ message: 'Your account is deactivated by Super Admin' });
            }

            if (admin && admin.isActive===true) {
                const existingCategory = await Products.findOne({categoryName})
                if (!existingCategory) {
                    return res.status(400).json({ message: `Category: ${categoryName} not found !` });
                }
                if (existingCategory) {
                    const productToDelete = existingCategory.product.find(product => product._id.toString() === productId.toString())

                    if (!productToDelete) {
                        res.status(404).json({message:`Product not found in category: ${categoryName}`})
                    }
                    if (productToDelete) {
                        if (productToDelete.images.length > 0) {
                            for (const image of productToDelete.images) {
                                
                                const imageURL = image.imageUrl;
                                if (typeof imageURL === 'string') {
                                    try {
                                        // Extract the public ID of the image from the Cloudinary URL
                                        const publicId = imageURL.split('/').pop().split('.')[0];
                        
                                        // Use the Cloudinary API to delete the image by its public ID
                                        await cloudinary.uploader.destroy(publicId);
                                    } catch (deleteError) {
                                        console.log('Error deleting image from Cloudinary:', deleteError);
                                    }
                                }
                            }
                        }
                        
                        existingCategory.product = existingCategory.product.filter(product => product._id.toString() !== productId)
                        if(admin.role==="Admin"){
                            const todayDate=new Date().toISOString().split("T")[0]
                            const superAdmin=await Admin.findOne({role:"Super Admin"})
                            if(superAdmin){
                                const newNotification={
                                    type:'Delete Product',
                                    content:`${admin.userName} delete a product: ${productToDelete.title} from Category: ${categoryName} on ${todayDate}`,
                                    date:todayDate
                                }
                                superAdmin.notifications.push(newNotification)
                                await superAdmin.save()
                            }
                        }
                        if(admin.role==="Super Admin" && sellerId){
                            const simpleAdmin=await Admin.findById(sellerId)
                            if(!simpleAdmin){
                             return res.status(404).json({ message: 'Product Admin not found' });

                            }
                            // const info = await transporter.sendMail({
                            //     from: '"Emirtel Platform"', // sender address
                            //     to: `${simpleAdmin.email}`, 
                            //     subject: `Product Deletion`, // Subject line
                            //     html: `<b>Super Admin deleted your Product :${productToDelete.title} from Category : ${categoryName}.</b>`
                            //   })
                    
                        }
                        // update the avaiable status of product added in cart of user

                        const users=await User.find({})
                        for(const user of users){
                            const allProducts=user.wishlist
                            for (const product of allProducts){
                                if(product.title.toLowerCase()===productToDelete.title.toLowerCase()){
                                    product.available=false
                                    await user.save()
                                }
                            }
                        }

                    await existingCategory.save()
                    res.status(200).json({data:productToDelete,message:`${productToDelete.title} deleted successfuly from Category: ${categoryName}`})
                    }
                
                }
            }

        } catch (error) {
            console.log('Error adding product:', error)
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


const getAllProductsBySellerId = async (req, res) => {
    try {
        const adminId = req.user._id;

        // Check if admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Find all products with the given sellerId
        const allCategories = await Products.find({});
        let flattenedProducts=[]
        if(allCategories.length>0){
            for (const category of allCategories){
                if(category && category.product){
                    const allProducts=category.product
                    for (const product of allProducts){
                        if (product.sellerId.toString()===adminId.toString()){
                            flattenedProducts.push(product)
                        }
                    }
                }
            }
        }
        return res.status(200).json({
            message: 'All products retrieved successfully!',
            data: flattenedProducts,
        });
    } catch (error) {
        console.log('Error retrieving products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// getting all products
const getAllProducts=async(req,res)=>{
    const adminId = req.user._id;

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    if(admin && admin.role==="Super Admin"){
        const categories=await Products.find({})

        let productArray=[]
        let approvedProducts=[]
        for (const category of categories){
            const products=category.product
            for (const product of products){
                if(product.isApproved===false){
                    productArray.push(product)
                }
                if(product.isApproved===true){
                    approvedProducts.push(product)
                }
            }
        }
        res.status(200).json({data:productArray,approvedProducts})

    }
}


// Approve / Reject Product

 const productApprove = async (req, res) => {
        try {
            const adminId = req.user._id;
            let { categoryName,productId,reason,sellerId,isApproved } = req.body;
            if(!reason){
                isApproved=true
            }
            if(!categoryName){
                return res.status(400).json({message:'Product category is required'})
            }
            const admin = await Admin.findById(adminId);

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
          

            if (admin && admin.role==="Super Admin") {
                const todayDate=new Date().toISOString().split("T")[0]
                const existingCategory = await Products.findOne({categoryName})
                if (!existingCategory) {
                    return res.status(400).json({ message: `Product Category: ${categoryName} not found !` });
                }
                if (existingCategory) {
                    const productToApprove = existingCategory.product.find(product => product._id.toString() === productId.toString())

                    if (!productToApprove) {
                        res.status(404).json({message:`Product not found in category: ${categoryName}`})
                    }
                    if (productToApprove) {
                        const productAdmin=await Admin.findById(sellerId)
                       
                        if(isApproved===false){
                            if(productToApprove.images.length>0){
                                for(const image of productToApprove.images){
                                    const imageURL =image
                                    if (imageURL) {
                                        try {
                                            // Extract the public ID of the image from the Cloudinary URL
                                            const publicId = imageURL.split('/').pop().split('.')[0];
                                            
                                            // Use the Cloudinary API to delete the image by its public ID
                                            await cloudinary.uploader.destroy(publicId);
                                        } catch (deleteError) {
                                            console.log('Error deleting image from Cloudinary:', deleteError);
                                        }
                                    }
                                }
                            }
                           
                        const newNotification={
                            type:'Rejected',
                            content:`Super Admin rejected your product: ${productToApprove.title} from Category: ${categoryName}, due to the following Reason: ${reason}.`,
                            date:todayDate
                        }
                        productAdmin.notifications.push(newNotification)
                        // const info = await transporter.sendMail({
                        //     from: '"Emirtel Platform"', // sender address
                        //     to: `${productAdmin.email}`, // list of receivers
                        //     subject: "🛒Product Rejection", // Subject line
                        //     html: `<b>Super Admin rejected your product: ${productToApprove.title} from Category: ${categoryName}, due to the following Reason: ${reason}.</b>`
                        //   })
                        await productAdmin.save()

                        const superAdminNotification={
                            type:'Rejected',
                            content:`You rejected ${productAdmin.userName}'s product: ${productToApprove.title} from Category: ${categoryName}, due to the following Reason: ${reason}.`,
                            date:todayDate
                        }
                        admin.notifications.push(superAdminNotification)
                        await admin.save()
                        existingCategory.product = existingCategory.product.filter(product => product._id.toString() !== productId)
                        await existingCategory.save()
                      res.status(200).json({message:`You rejected  product successfuly`})

                        }

                        if(isApproved===true){
                            
                        const newNotification={
                            type:'Approved',
                            content:`Super Admin approved your product: ${productToApprove.title} from Category: ${categoryName}.`,
                            date:todayDate
                        }
                        productAdmin.notifications.push(newNotification)
                        await productAdmin.save()

                        const superAdminNotification={
                            type:'Approved',
                            content:`You approved ${productAdmin.userName}'s product: ${productToApprove.title} from Category: ${categoryName}.`,
                            date:todayDate
                        }
                        admin.notifications.push(superAdminNotification)
                        // const info = await transporter.sendMail({
                        //     from: '"Emirtel Platform"', // sender address
                        //     to: `${productAdmin.email}`, // list of receivers
                        //     subject: "🎉 Product Approval", // Subject line
                        //     html: `<b>Super Admin approved your product: ${productToApprove.title} from Category: ${categoryName}.</b>`
                        //   })
                        await admin.save()
                        const productToUpdate = existingCategory.product.find(product => product._id.toString() === productId)
                        productToUpdate.isApproved=true
                        await existingCategory.save()

                    res.status(200).json({message:`You approved product successfuly`})

                        }

                    }
                
                }
            }

        } catch (error) {
            console.log('Error Updating product:', error)
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Update images product

const updateProductImags=async(req,res)=>{
    const adminId = req.user._id;
    const { categoryName,images,productId } = req.body;
    const admin = await Admin.findById(adminId);
    if (admin && admin.isActive===false) {
        return res.status(404).json({ message: 'Your account is deactivated by Super Admin' });
    }
    if (admin && admin.isActive===true) {
        const existingCategory = await Products.findOne({categoryName})
        if (!existingCategory) {
            return res.status(400).json({ message: `Product Category: ${categoryName} not found !` });
        }
        if (existingCategory) {
            const existingProduct = existingCategory.product.find(product => product._id.toString() === productId.toString())
            if (!existingProduct) {
                return res.status(400).json({ message: `Product not found !` });
            }
            if (existingProduct) {
                let uploadImage;
                let pictureArray=[]
                let allImages=existingProduct.images
                    for (const image of images){
                       let imageToUpdate=allImages.find(i=>i._id.toString()===image._id)
                       if (imageToUpdate) {
                        if (!image.imageUrl.startsWith("https://res.cloudinary.com")) {
                            const publicId = imageToUpdate.imageUrl.split('/').pop().split('.')[0];
                            await cloudinary.uploader.destroy(publicId);
                    
                            uploadImage = await cloudinary.uploader.upload(image.imageUrl, {
                                upload_preset: 'rozgar',
                            });
                            // Update the imageUrl of imageToUpdate
                            imageToUpdate.imageUrl = uploadImage.secure_url;
                        }
                        // Push the updated or original image object to pictureArray
                        pictureArray.push(imageToUpdate);
                    }
                    
                    }
    
                    existingProduct.images=pictureArray
                    await existingCategory.save()

                    res.status(200).json({message:`Images updated successfully`})

            }

        }

    }
}
module.exports = { addNewProduct,getAllProductsBySellerId,deleteProduct,updateProduct,getAllProducts,productApprove,updateProductImags }
