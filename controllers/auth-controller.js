const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// HOME
const home = async (req, res) => {
  try {
    res.status(200).send("welcome!!! Home");
  } catch (error) {
    res.status(400).send({ msg: "Home page Errorrrr" });
  }
};

// REGISTERATION
const register = async (req, res) => {
  try {
    // console.log(req.body)
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // hash the Password

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);
    // BUT IT IS DONE IN user-model.js file with userSchema

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      //  msg: userCreated,
       msg: "Registeration Successful",
       token:await userCreated.generateToken(),
       userId:userCreated._id.toString(), 
      });
  } catch (error) {
    console.log("error",error)
    res.status(500).send({ msg: "internal server error"});
    // next(error);
  }
};

// USER login logic:-
const login= async(req,res)=>{
  try {
     const {email,password} = req.body;

     const userExist = await User.findOne({email});
      // console.log(userExist);

     if(!userExist){
      return res.status(400).json({message:"Invalid Credentials"});
     }

    //  const user = await bcrypt.compare(password,userExist.password);
    const user = await userExist.comparePassword(password);
    // password in comparePassword(password) is from req.body 
     if(user){
      res.status(200).json({
         msg: "Login Successful",
         token:await userExist.generateToken(),
         userId:userExist._id.toString(), 
        });
     }else{
      res.status(401).json({message: "Invalid email or password"});
     }

  } catch (error) {
    res.status(500).json("login auth-controller file =>internal server error");
  }
};

// *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};   
module.exports = { home, register, login, user };
