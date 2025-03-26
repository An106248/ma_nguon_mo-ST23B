const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Cấu hình ứng dụng
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Cấu hình session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Sử dụng routes
app.use("/", bookingRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});