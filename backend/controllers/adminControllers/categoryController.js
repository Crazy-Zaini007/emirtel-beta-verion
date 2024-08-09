const mongoose = require('mongoose');
const cloudinary = require('./cloudinary');
const Admin = require('../../database/admin/adminModel');
const Products = require('../../database/admin/productModel')


// Adding a new category
const addNewCategory = async (req, res) => {
  try {
    const adminId = req.user._id;
    const { categoryName, description, image,des_Pic } = req.body;
    if(!categoryName){
      return res.status(400).json({message:'category title is required'})
    }
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.role !== 'Super Admin') {
      return res.status(400).json({ message: 'Only Super Admin can add category' });
    }

    if (admin && admin.role === "Super Admin") {

      const existingCategory =await Products.findOne({ categoryName: categoryName.toLowerCase() })
      if (existingCategory) {
        return res.status(400).json({ message: `${categoryName} already existing!` });

      }
      if (!existingCategory) {
        let uploadImage;
        if (image) {
          try {
            uploadImage = await cloudinary.uploader.upload(image, {
              upload_preset: 'rozgar',
            });
          } catch (uploadError) {
            return res.status(500).json({ message: 'Error uploading image ' });
          }
        }

        let uploadDescImage;
        if (des_Pic) {
          try {
            uploadDescImage = await cloudinary.uploader.upload(des_Pic, {
              upload_preset: 'rozgar',
            });
          } catch (uploadError) {
            return res.status(500).json({ message: 'Error uploading image ' });
          }
        }
        const newCategory = new Products({
          categoryName,
          description,
          image: uploadImage?.secure_url || '',
          des_Pic: uploadDescImage?.secure_url || ''

        })


        // Save the admin (assuming your Admin schema has a 'Products' field)
        await newCategory.save();
        return res.status(200).json({
          message: `${categoryName} added successfully!`,
          data: newCategory
        });
      }

    }

  } catch (error) {
    console.log('Error adding category:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// deleting the category
const deleteCategory = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.role !== 'Super Admin') {
      return res.status(400).json({ message: 'Only Super Admin can delete category' });
    }

    if (admin && admin.role === "Super Admin") {
      const { categoryId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(404).json({ message: 'No such category in Category list !' });
      }

      const categoryToDelete = await Products.findById(categoryId);

      if (!categoryToDelete) {
        return res.status(400).json({ message: `Category not found !` });
      }

      const imageURL = categoryToDelete.image;
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

      const desImageURL = categoryToDelete.des_Pic;
      if (categoryToDelete.des_Pic && desImageURL) {
          try {
              // Extract the public ID of the image from the Cloudinary URL
              const desPublicId = desImageURL.split('/').pop().split('.')[0];
              
              // Use the Cloudinary API to delete the image by its public ID
              await cloudinary.uploader.destroy(desPublicId);
          } catch (deleteError) {
              console.log('Error deleting image from Cloudinary:', deleteError);
          }
      }

      await Products.findByIdAndDelete(categoryId);

      return res.status(200).json({
        message: `Category: ${categoryToDelete.categoryName} deleted successfully!`,
        data: categoryToDelete
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};


// Updating Category

const updateCategory = async (req, res) => {

  try {

    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.role !== 'Super Admin') {
      return res.status(400).json({ message: 'Only Super Admin can delete category' });
    }

    if (admin && admin.role === "Super Admin") {
      const { categoryId, categoryName, description, image,des_Pic } = req.body
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(404).json({ message: 'No such category in Category list !' })
      }
      const categoryToUpdate =await Products.findById(categoryId)
      if (!categoryToUpdate) {
        return res.status(400).json({ message: `Category not found !` });

      }
      if (categoryToUpdate) {
        const newImage=categoryToUpdate.image
        const descImage=categoryToUpdate.des_Pic


        let uploadImage;
        let uploadDescImage;

                        if (image && !image.startsWith("https://res.cloudinary.com")) {
                           
                            // If the image is not a secure URL, upload it to Cloudinary
                            try {
                              uploadImage = await cloudinary.uploader.upload(image, {
                                  upload_preset: 'rozgar',
                              });
                          } catch (uploadError) {
                              return res.status(500).json({ message: 'Error uploading image' });
                          }
                        }
                        
                        if (des_Pic && !des_Pic.startsWith("https://res.cloudinary.com")) {
                           
                          // If the image is not a secure URL, upload it to Cloudinary
                          try {
                            uploadDescImage = await cloudinary.uploader.upload(des_Pic, {
                                upload_preset: 'rozgar',
                            });
                        } catch (uploadError) {
                            return res.status(500).json({ message: 'Error uploading image' });
                        }
                      }

        categoryToUpdate.categoryName = categoryName;
        categoryToUpdate.description = description;
          categoryToUpdate.image = uploadImage?.secure_url || newImage; 
          categoryToUpdate.des_Pic = uploadDescImage?.secure_url || descImage; 
         // Update categoryName for each product inside the product array
    categoryToUpdate.product.forEach((product) => {
      product.categoryName = categoryName;
    });

        await categoryToUpdate.save()

        return res.status(200).json({
          message: `Category updated successfully!`,
          data: categoryToUpdate
        });
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
}


// getting all Categories
const getCategory = async (req, res) => {

  try {

    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin) {

      const allProducts = await Products.find({}).sort({ createdAt: -1 })

      return res.status(200).json({
        data: allProducts
      })
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

module.exports = { addNewCategory, deleteCategory, updateCategory, getCategory };
