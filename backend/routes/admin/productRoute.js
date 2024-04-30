const  express = require('express');
const { addNewProduct,getAllProductsBySellerId,deleteProduct,updateProduct,getAllProducts,productApprove,updateProductImags } = require('../../controllers/adminControllers/productController');
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

router.use(adminAuth)

// For adding a new category
router.post("/add/product",addNewProduct)

router.get("/get/product",getAllProductsBySellerId)
router.get("/get/all/products",getAllProducts)


router.delete("/delete/product",deleteProduct)

router.patch("/update/product",updateProduct)

router.patch("/update/product/images",updateProductImags)

router.post("/approve/product",productApprove)



module.exports = router
