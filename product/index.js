const express = require("express");

const rootRouter = require("./routes/root");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Server Started!!!");
});
