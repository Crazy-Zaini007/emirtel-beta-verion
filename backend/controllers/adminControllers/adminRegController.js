const Admin = require('../../database/admin/adminModel')
const Products=require('../../database/admin/productModel')
const Orders=require('../../database/admin/orderModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Security=require('../../database/admin/securityModel')
const nodemailer = require("nodemailer");
//creating token
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '100days' });
    
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
      secure: true,
    auth: {
     user: process.env.Email_Address,
      pass: process.env.Password,
    },
  })
  

//Registration Controller
const adminSignup = async (req, res) => {
    try {
        const { userName, email, role, password,code } = req.body;
        let emptyFields = [];

        // Validation
        if (!userName) {
            emptyFields.push('userName');
        }

        if (!role) {
            emptyFields.push('role');
        }
        
        if (!email) {
            emptyFields.push('email');
        }
        if (!code) {
            emptyFields.push('code');
        }
        if (!password) {
            emptyFields.push('password');
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ message: 'Please fill in all the fields', emptyFields });
        }

        // Check if an admin with the role "Super Admin" already exists
        const superAdminExists = await Admin.findOne({ role:role });
        if (superAdminExists && superAdminExists.role === "Super Admin") {
            return res.status(400).json({
                message: 'Super Admin already exists',
            });
        }

        // Check if an admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                message: `Admin with email: ${email} already exists`,
            });
        }

                // Check if the provided code matches the security code
                const securityCode = await Security.findOne({ code });
                if (!securityCode) {
                    return res.status(400).json({
                        message: 'Invalid security code',
                    });
                }
        
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Admin({
            userName,
            email,
            role,
            originalPassword:password,
            password: hashedPassword,
        });

        if(role==="Admin"){
            const todayDate=new Date().toISOString().split("T")[0]
            const superAdmin=await Admin.findOne({role:"Super Admin"})
            if(superAdmin){
                const newNotification={
                    type:'New Account',
                    content:`${userName} having Email:  ${email} created Admin account on ${todayDate}`,
                    date:todayDate
                }
                superAdmin.notifications.push(newNotification)
                await superAdmin.save()

                const info = await transporter.sendMail({
                    from: '"Emirtel Platform"', // sender address
                    to: `${superAdmin.email}`, // list of receivers
                    subject: "🔒 New Account Alert", // Subject line
                    html: `<b>${userName} registered an Admin acccount having Email: ${email}</b>`
                  })
            }
        }
        await newUser.save();

        // Creating a token
        const token = createToken(newUser._id);
        
        res.status(200).json({ message: `${userName} registered as ${role} successfully!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Login  Controller

const adminLogin = async (req,res) => {
    
    try {
        const { email, password } = req.body
  let emptyFields = []

        if (!email) {
    emptyFields.push('email')
        }
        if (!password) {
    emptyFields.push('password')
      
    }
      if(emptyFields.length > 0) {
          return res.status(400).json({ message: 'Please fill in all the fields', emptyFields })
        }

        const user = await Admin.findOne({email})
        if (!user) {
            res.status(400).json({ message: "Account not Found" })
        }
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = createToken(user._id)
                const userName=user.userName
                const role=user.role
                res.status(200).json({
                    message: `Welcome ${userName} to Emirtel ${user.role} Panel`,
                    token,userName,role
                })
            } else {
                res.status(400).json({ message: "Invalid Password" })
            }
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

// getting admins

const getAdmins = async (req, res) => {
    try {
        const adminId = req.user._id;

        // Fetch the current admin
        const currentAdmin = await Admin.findById(adminId);

        if (currentAdmin) {
            const todayDate=new Date().toISOString().split("T")[0]

            const allNotifications=currentAdmin.notifications
            for(const notification of allNotifications){
                if(notification.date !== todayDate){
                    notification.new=false
                }
                await currentAdmin .save()
            }
            // Fetch all admins
            const allAdmins = await Admin.find({ role: "Admin" });

            // Create an array to store admins with their products
            const adminsWithProducts = [];
            // Iterate over each admin
            for (const admin of allAdmins) {
                // Find products associated with the admin's sellerId
                const adminProducts = await Products.find({ 'product.sellerId': admin._id });
                const product = [].concat(...adminProducts.map(product => product.product));
                // Push the admin along with their products into the array
                adminsWithProducts.push({
                    admin: admin,
                    products: product
                })
            }
            
            res.status(200).json({ currentAdmin, adminsWithProducts });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// activate/deactivate admins

const changeAdminStatus=async(req,res)=>{
try {
    const superAdminId=req.user._id
// Fetch the current admin
const currentAdmin = await Admin.findById(superAdminId);
if(!currentAdmin){
    return res.status(404).json({ message: 'super Admin not found' });

}

if( currentAdmin.role!=="Super Admin"){
    return res.status(400).json({ message: 'Only Super Admin can add category' });
}

if(currentAdmin && currentAdmin.role === "Super Admin"){
    const {adminId}=req.body
    const admin=await Admin.findById(adminId)
    if(!admin){
      return res.status(404).json({ message: 'Admin not found to update'});
    }
    if(admin){

        admin.isActive=admin.isActive===false ?true :false
        const todayDate=new Date().toISOString().split("T")[0]
           
        let newType=admin.isActive===true ?"Activated" :"InActivated"
        const newNotification={
            type:`${newType}`,
            content:`Super Admin ${newType} your account on ${todayDate}`,
            date:todayDate
        }
        admin.notifications.push(newNotification)

        const info = await transporter.sendMail({
            from: '"Emirtel Platform"', // sender address
            to: `${admin.email}`, 
            subject: `${admin.isActive===true ? "✅" :"😔"} Account ${admin.isActive===true ? "Acivation" :"Suspension"} Alert`, // Subject line
            html: `<b>Super Admin ${admin.isActive===true ? "Activated" :"Suspended"} your account.</b>`
          })
        await admin.save()
        res.status(200).json({ message: `${admin.userName}'s status changed sucessfully!`})
    }
}
} catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
}
}

// Update profile

const updateAdmin=async(req,res)=>{

    try {
        const adminId=req.user._id
        const admin=await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({ message: 'Admin not found to update'});
          }
          if(admin && admin.isActive===true){
            const{userName,email,role,originalPassword}=req.body
            if(email!==admin.email){
                const existingEmail=await Admin.findOne({email})
                if(existingEmail){
                return res.status(400).json({ message: `${email} is used  by another admin, please choose another`});

                }
            }
            let hashedPassword
            if(originalPassword){
                 // Encrypting password
        const salt = await bcrypt.genSalt(10);
         hashedPassword = await bcrypt.hash(originalPassword, salt);
            }
            admin.userName=userName,
            admin.email=email,
            admin.password=hashedPassword ? hashedPassword:admin.password,
            admin.originalPassword=originalPassword,
            admin.role=role
            await admin.save()
            res.status(200).json({ message: `Profile updated sucessfully!`})
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}


// delting a notification

const deleteNotify = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found to update' });
        }

        if (admin && admin.isActive === true) {
            const { notifyId } = req.body;
            // Filter out the notification to delete
            const notifyToDelete = admin.notifications.filter(notify => notify._id.toString() !== notifyId);

            // Check if any notification was deleted
            if (notifyToDelete.length !== admin.notifications.length) {
                // Assign the filtered notifications back to admin.notifications
                admin.notifications = notifyToDelete;
                
                // Save the updated admin object
                await admin.save();

                return res.status(200).json({ message: `Notification removed successfully!` });
            } else {
                return res.status(404).json({ message: `Notification with id ${notifyId} not found` });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

//Security
const addSecurity=async(req,res)=>{
try {
    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found to update' });
    }
    if(admin.role !== 'Super Admin') {
        return res.status(404).json({ message: 'Only Super Admin is allowed to do that' });

    }

    if(admin && admin.role==="Super Admin"){
        const {code}=req.body
        if(!code){
        return res.status(400).json({ message: 'Security Code input is required!' });
        }
        const existingSecurityCodes = await Security.find();
        if (existingSecurityCodes.length === 1) {
          return res.status(400).json({ message: 'A security code already exists' });
        }
        const newCode=new Security({
            code
        })
       await newCode.save()
       return res.status(200).json({ message: `Security Code added Successfully!` });

    }
    
} catch (error) {
    res.status(500).json({ message: error.message });
}
}


// updating Security Code

const updateSecurity=async(req,res)=>{
    try {
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found to update' });
        }
        if(admin.role !== 'Super Admin') {
            return res.status(404).json({ message: 'Only Super Admin is allowed to do that' });
    
        }
    
        if(admin && admin.role==="Super Admin"){
            const {code,codeId}=req.body
            if(!codeId){
            return res.status(400).json({ message: 'Code Id is required!' });
            }
            
            const codeToUpdate=await  Security.findById(codeId)
            if(!codeToUpdate){
            return res.status(404).json({ message: 'Security Code not found!' });

            }
            if(codeToUpdate){
                codeToUpdate.code=code
                await codeToUpdate.save()
           return res.status(200).json({ message: `Security Code updated Successfully!` });

            }
           
    
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

    //get Security Code
const getSecurity=async(req,res)=>{
    try {
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId);
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found to update' });
        }
        if(admin.role !== 'Super Admin') {
            return res.status(404).json({ message: 'Only Super Admin is allowed to do that' });
    
        }
    
        if(admin && admin.role==="Super Admin"){
            const existingSecurityCodes = await Security.findOne();
           return res.status(200).json({data:existingSecurityCodes });
    
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
    
    
module.exports={adminSignup,adminLogin,getAdmins,changeAdminStatus,updateAdmin,deleteNotify,addSecurity,updateSecurity,getSecurity}