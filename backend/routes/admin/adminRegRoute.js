const  express = require('express');
const { adminLogin,adminSignup,getAdmins,changeAdminStatus,updateAdmin,deleteNotify,addSecurity,updateSecurity,getSecurity } = require('../../controllers/adminControllers/adminRegController')
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

// For Registering The Admin
router.post("/register",adminSignup)

//For Login the Admin
router.post("/login",adminLogin)

router.use(adminAuth)
//For getting the Admins
router.get("/get",getAdmins)

//For updating the Admins
router.patch("/update",updateAdmin)

//For changing Admins status

router.patch("/update/status",changeAdminStatus)

//For deleting notification
router.delete("/delete/notification",deleteNotify)

// adding Security code
router.post('/add/security_code',addSecurity)

router.patch('/update/security_code',updateSecurity)

router.get('/get/security_code',getSecurity)


module.exports = router
