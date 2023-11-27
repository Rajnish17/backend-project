const express = require("express");
const app = express();
const cors = require("cors");
const otproutes = require("./routes/otp.routes");
const orderRoutes = require("./routes/order.routes")
const retailerRoutes = require("./routes/retailer.routes")
// const userDataRoutes = require("./routes/user.routes")
// const productRoutes = require("./routes/product.routes")
// const authroutes = require("./routes/auth.routes");
app.use(express.json());
app.use(cors());




app.use("/otp", otproutes);
app.use("/retailer", retailerRoutes);
app.use("/order", orderRoutes);
// app.use("/auth", authroutes);
// app.use("/user", userDataRoutes);
// app.use("/product", productRoutes);




app.get("/", (req, res) => {
    res.send("server is up and running")
})






module.exports = app;
