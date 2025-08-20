const bcrypt = require("bcrypt");
const status = require("http-status-codes");
const User = require("../modals/UserSchema");
const jwt = require("jsonwebtoken");
const config=require("../config")


const JWT_SECRET=config.serverConfig.jwtSecret

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

       // first Validate input
    //    console.log(email, password )
    if (!email || !password) {
      return res
        .status(status.StatusCodes.BAD_REQUEST)
        .json({ error: "Email and password are required" });
    }

    // then Check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(status.StatusCodes.BAD_REQUEST).json({ error: "User already registered" });
    }

    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword)

    // create and Save new user
    const newUser = new User({
      email,
      password: hashPassword
    });
    const savedUser = await newUser.save();

    res.status(status.StatusCodes.CREATED).json({
      email: savedUser.email,
      message: "User registered successfully"
    });

  } catch (error) {
    // console.error("Error in register:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};


// Login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
        // console.log( email, password)

        // Validate input
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(status.StatusCodes.BAD_REQUEST).json({ error: "User not found" });
    }
    // console.log(user)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(status.StatusCodes.BAD_REQUEST).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

     // Send token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,  
        secure: true, // for  http use development and for https use production
        sameSite: "strict", 
      })
      .json({
        message: "Login successful",
        user:{email:user.email,
          user_id:user._id

         }
       
      });

  } catch (error) {
    // console.error("Error in login:", error);
    res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

module.exports={
    loginUser,registerUser
}