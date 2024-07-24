const  express = require('express');
const { adminLogin,adminSignup,getAdmins,changeAdminStatus,updateAdmin,deleteNotify,addSecurity,updateSecurity,getSecurity,getAdminNotifications,forgotPassword } = require('../../controllers/adminControllers/adminRegController')
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

// For Registering The Admin
router.post("/register",adminSignup)

//For Login the Admin
router.post("/login",adminLogin)

//For forgot paswords

router.patch("/forgot_password",forgotPassword)

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

// Getting notifications
router.get('/get/notifications',getAdminNotifications)



module.exports = router
