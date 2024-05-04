const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.get("/", (req, res) => {
//   //root route
//   res.send("hello guggu!");
// });

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/swipes", require("./routes/swipeRoutes"));
app.use("/api/date", require("./routes/dateRoutes"));
//app.use("/api/matches", require("./routes/matchRoutes")); //show (single or multiple) matches

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
