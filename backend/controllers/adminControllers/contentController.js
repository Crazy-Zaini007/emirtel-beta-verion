const mongoose = require("mongoose");
const cloudinary = require("./cloudinary");
const Admin = require("../../database/admin/adminModel");
const Contents = require("../../database/admin/pageContentModel");

// adding user home page carousel images

const addImage = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin && admin.role.toLowerCase() === "super admin") {
      const { image } = req.body;
      let content = await Contents.findOne({});

      if (!content) {
        content = new Contents();
      }
      
      let uploadImage;
      if (image) {
        try {
          uploadImage = await cloudinary.uploader.upload(image, {
            upload_preset: "rozgar",
          });
        } catch (uploadError) {
          return res.status(500).json({ message: "Error uploading image " });
        }
      }
      if (uploadImage) {
        content.images.push(uploadImage.secure_url);
        await content.save();
        res
          .status(200)
          .json({ message: "Image added successfully", data: content });
      }
    }
  } catch (error) {
    console.log('error',error)
    return res.status(500).json({ message: error.message });
  }
};

// deleting an image
const deleteImage = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.role.toLowerCase() === "super admin") {
      const { imageUrl } = req.body;

      if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required" });
      }

      let content = await Contents.findOne({});

      if (!content) {
        return res.status(404).json({ message: "No content found" });
      }

      const imageIndex = content.images.indexOf(imageUrl);

      if (imageIndex > -1) {
        // Extract the public ID from the image URL
        const publicId = imageUrl.split("/").pop().split(".")[0];

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          return res
            .status(500)
            .json({ message: "Error deleting image from Cloudinary" });
        }

        // Remove the image from the array
        content.images.splice(imageIndex, 1);
        await content.save();

        res
          .status(200)
          .json({ message: "Image deleted successfully", data: content });
      } else {
        res.status(404).json({ message: "Image not found in content" });
      }
    } else {
      res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getting images

const getImages = async (req, res) => {
  try {
      const content = await Contents.findOne({});
      if (!content) {
        return res.status(404).json({ message: "No content found" });
      }
      
      res
        .status(200)
        .json({ data: content.images });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addImage, deleteImage, getImages };
