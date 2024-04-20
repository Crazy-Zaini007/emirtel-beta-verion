const  express = require('express');
const { addNewCategory, deleteCategory, updateCategory, getCategory } = require('../../controllers/adminControllers/categoryController')
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

router.use(adminAuth)

// For adding a new category
router.post("/add/category",addNewCategory)

router.get("/get/category",getCategory)

router.delete("/delete/category/:categoryId",deleteCategory)

router.patch("/update/category",updateCategory)

module.exports = router
