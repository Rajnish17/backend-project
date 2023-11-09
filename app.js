const express = require("express");
const app = express();
const cors =require("cors");
const authroutes =require("./routes/auth.routes");
const otproutes =require("./routes/otp.routes");
const customerRoutes =require("./routes/customer.routes")
app.use(express.json());
app.use(cors());




app.use("/auth",authroutes);
app.use("/otp",otproutes);
app.use(customerRoutes);

app.get("/",(req,res)=>{
    res.send("server is up and running")
})






module.exports=app;
