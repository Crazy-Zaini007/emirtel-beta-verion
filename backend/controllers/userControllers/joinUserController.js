const User = require('../../database/user/userModel')
const Orders=require('../../database/admin/orderModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//creating token
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1000days' });   
}

//Registration Controller
const userSignup = async (req, res) => {
    try {
        const { name, email, password,contact,city,address } = req.body;
        let emptyFields = [];

        // Validation
        if (!name) {
            emptyFields.push('name');
        }

        if (!email) {
            emptyFields.push('email');
        }
        if (!contact) {
            emptyFields.push('contact');
        }
        if (!city) {
            emptyFields.push('city');
        }
        if (!address) {
            emptyFields.push('address');
        }
        if (!password) {
            emptyFields.push('password');
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ message: 'Please fill in all the fields', emptyFields });
        }

        // Check if an admin with the role "Super Admin" already exists
       

        // Check if an admin with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: `The email: ${email} is already used !`,
            });
        }
        
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            contact,
            city,
            address,
            originalPassword:password,
            password: hashedPassword,
        });

        await newUser.save();
       
        const token = createToken(newUser._id);
        res.status(200).json({ message: `You created account successfully!`,token,name});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Logging in User Controller

const userLogin = async (req,res) => {
    
    try {
        const { email1, password1} = req.body
  let emptyFields = []

        if (!email1) {
    emptyFields.push('email1')
        }
        if (!password1) {
    emptyFields.push('password1')
      
    }
      if(emptyFields.length > 0) {
          return res.status(400).json({ message: 'Please fill in all the fields', emptyFields })
        }

        const user = await User.findOne({email:email1})
        if (!user) {
            res.status(400).json({ message: "Account not Found" })
        }
        if (user) {
            const isMatch = await bcrypt.compare(password1, user.password)
            if (isMatch) {
                const token = createToken(user._id)
                const name=user.name
              
                res.status(200).json({
                    message: `Logged in successfully !`,
                    token,name
                })
            } else {
                res.status(400).json({ message: "Invalid email OR password" })
            }
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

// Getting User Profile

const getUserProfile=async(req,res)=>{
try {
    const userId=req.user._id
    const user=await User.findById(userId)
    if(user){
       
        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));
        user.notifications = user.notifications.filter(notification => new Date(notification.createdAt) > thirtyDaysAgo);
        await user.save();
        res.status(200).json({data:user})
    }
} catch (error) {
    res.status(500).json({message:error.message})
    
}

}

module.exports={userSignup,userLogin,getUserProfile}