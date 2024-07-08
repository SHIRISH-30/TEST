//express
const express=require("express");
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const User=require("./model/User")

const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const session = require("express-session");
//config/objects used in sessions
const sessionConfig = {
  secret: "thisisshiuldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    //by default rahta then to
    httpOnly: true,
    //expiration dates
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

//mongo DB Connection 
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
       
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
connectDB();

const path = require('path');
app.use(express.static(path.join(__dirname,"public")));

const passport = require("passport");
const LocalStragery = require("passport-local");
//to use sessions
app.use(session(sessionConfig));
//to use passport
app.use(passport.initialize());
app.use(passport.session());
//hash kar dega password using 'PBKDf2' algorithm
passport.use(new LocalStragery(User.authenticate()));
//to store in sessions
passport.serializeUser(User.serializeUser());
//to remove from session while logout
passport.deserializeUser(User.deserializeUser());

const user_routes = require("./routes/User");
app.use("/api/user", user_routes);

app.listen(5880,()=>{
    console.log("SERVER STARTED on Port 5880");
})

app.get("/api/test",(req,res)=>{
    console.log("Working");
})


