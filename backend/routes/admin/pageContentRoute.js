const  express = require('express');
const { addImage, deleteImage, getImages } = require('../../controllers/adminControllers/contentController');
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

router.get('/get/images',getImages)
router.use(adminAuth)
//adding a new image
router.post('/add/image',addImage),

// deleting an existing image
router.delete('/delete/image',deleteImage)

// getting all images contents

module.exports = router
