require('dotenv').config();

  
  const serverConfig={  port: process.env.PORT,

  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  cors_origin:process.env.CORS_ORIGIN
};

  module.exports=serverConfig