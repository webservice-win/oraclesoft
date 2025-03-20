const { signup, login, profile_update } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const multer=require("multer")
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const nodemailer=require("nodemailer")
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

router.post('/login', loginValidation, login);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user:"shihabmoni15@gmail.com", // Your email address
    pass: "kxyb btad rldf fpsn", // Your email password or app password
  },
});
const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: 'shihabmoni15@gmail.com',
        to: email,
        subject: 'Welcome to Our Platform!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-left: 5px solid #4CAF50; border: 5px solid #4CAF50; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
                    
                    <!-- Banner Image -->
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/027/715/590/small_2x/welcome-banner-text-handwritten-art-original-typography-with-colorful-ornament-decorative-and-background-vector.jpg" alt="Welcome Banner" style="width: 100%; max-width: 600px; height: auto; margin-bottom: 20px; border-radius: 8px;" />

                    <h2 style="color: #4CAF50;">Welcome to Our Platform, ${name}!</h2>
                    <p>We're excited to have you on board. Here's what you can do next:</p>
                    <ul style="text-align: left; display: inline-block; margin: 0 auto;">
                        <li>Explore our features</li>
                        <li>Complete your profile</li>
                        <li>Start using our services</li>
                    </ul>
                    <p>If you have any questions, feel free to reach out to us.</p>
                    
                    <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc;">
                        <p>Best regards,</p>
                        <p><strong>Oracle</strong></p>
                        <p>Contact us at: <a href="mailto:support@webservice.win">support@webservice.win</a></p>
                    </footer>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, whatsapp, telegram } = req.body;
        const user = await UserModel.findOne({ email });
        console.log(name, email, password);

        if (user) {
            return res.json({ message: 'User already exists, you can login', success: false });
        }

        const userModel = new UserModel({ name, email, password, whatsapp, telegram });
        // Hash password before saving
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        // Send welcome email
        await sendWelcomeEmail(email, name);

        res.json({
            message: "Signup successful",
            success: true
        });

        console.log(userModel);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
        console.log(err);
    }
});
router.put("/update-profile",ensureAuthenticated,profile_update)
module.exports = router;