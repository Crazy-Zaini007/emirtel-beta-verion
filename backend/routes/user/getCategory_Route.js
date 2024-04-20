const  express = require('express');
const { getCategories } = require('../../controllers/userControllers/getcategoriesController')

const router=express.Router()

router.get('/get/all/categories',getCategories)

module.exports = router
