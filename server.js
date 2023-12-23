require('dotenv').config();

const express =require("express");
const cors=require("cors");
const app=express();

// const BASE_URL=process.env.BASE_URL;

const PORT=process.env.PORT ;

// let's tackle cors
const corsOptions = {
    origin: 'https://www.indiherbs.com',
    // origin: 'http://localhost:5173',
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credential:true,
  };
app.use(cors(corsOptions));
app.use(express.json());
// const router=require("./router/auth-router");
const authRoute=require("./router/auth-router");

// const contactRoute = require("./routes/contact-route");
const contactRoute =require("./router/contact-router")
const connectDb=require("./utils/db")

const errorMiddleware = require("./middlewares/error-middleware");


// app.use("/api/auth",router);
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute)
// app.use("/register",router);



app.use(errorMiddleware);

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT}`);
    });
    // app.listen();
});
