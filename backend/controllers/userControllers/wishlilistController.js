const mongoose = require('mongoose');
const User = require('../../database/user/userModel');

// Adding Product To Cart
const addToCart=async(req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Your Account not found" });
      }
      
      const product=req.body
      const {sellerId,categoryName,sellerName,title,images,price,soldQuantity,size,color,status,available,description}=product
      const productToFind=user.wishlist.find(w=>w.title.toString()===title.toString())
      if(productToFind){
        return res.status(400).json({ message: "This Product already in Cart" });
      }

      const newWishlistProduct={sellerId,categoryName,sellerName,title,images,price,soldQuantity,size,color,status,available,description}
      user.wishlist.push(newWishlistProduct)
      await user.save()
      const recentWishlisted = user.wishlist[user.wishlist.length - 1];

     return res.status(200).json({ data: recentWishlisted,message:`${title} wishlisted successfully !` });
}


// Removing Product From Cart
const removeCart=async(req,res)=>{
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
      return res.status(404).json({ message: "Your Account not found" });
    }
    
    const {productId}=req.body
    const productIndex = user.wishlist.findIndex(product => product._id.toString() === productId.toString());

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist array
    const removedProduct = user.wishlist.splice(productIndex, 1)[0];
    await user.save();

   return res.status(200).json({message:"removed from Cart"});
}

module.exports={addToCart,removeCart}