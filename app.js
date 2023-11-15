const express = require("express");
const app = express();
const cors = require("cors");
const authroutes = require("./routes/auth.routes");
const otproutes = require("./routes/otp.routes");
const userDataRoutes = require("./routes/user.routes")
const productRoutes = require("./routes/product.routes")
const retailerRoutes =require("./routes/retailer.routes")
app.use(express.json());
app.use(cors());




app.use("/auth", authroutes);
app.use("/otp", otproutes);
app.use("/user", userDataRoutes);
app.use("/product", productRoutes);
app.use("/retailer", retailerRoutes);




app.get("/", (req, res) => {
    res.send("server is up and running")
})






module.exports = app;
