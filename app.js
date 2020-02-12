import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./router";
import cors from "cors";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import mailPassword from "./mailPassword";
const app = express();
const port = process.env.PORT || 5000;
const MongoStore = connectMongo(session);
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

console.log("mailPassword.mongo.connection", mailPassword.mongo.connection);

mongoose
  .connect(mailPassword.mongo.connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.log("Connect Error", error));

mongoose.connection
  .on("connecting", () => {
    console.log("mongoose connection is connectiog");
  })
  .on("open", () => {
    console.log("mongoose connection is open");
  })
  .on("disconnecting", () => {
    console.log("mongoose connection is disconnecting");
  })
  .on("close", () => {
    console.log("mongoose connection is close");
  })
  .on("reconnected", () => {
    console.log("mongoose connection is reconnected");
  });
app.set("views", path.join(__dirname, "./views/")); // 默認就是views目錄
app.use("/node_modules/", express.static(path.join(__dirname, "./node_modules/")));
app.use("/images", express.static(__dirname + "/images"));

app.use(cookieParser("38940293"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "youarehash", // 加密字串: 會與原密碼組合成新的字串, 在進行加密
    resave: true,
    saveUninitialized: true, // session默認直接分配給你一個加密過的key,false: server 真的存資料到 session時, 才分配cookie key
    // store: new MongoStore({ url: "mongodb://localhost:27017/sessiondb" }),
    cookie: {
      maxAge: 600 * 1000,
      httpOnly: true,
      secure: true
    }
  })
);
app.use(cors());

app.use("/", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res) => {
  res.send("404 Not found...");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err.message
  });
});

app.listen(port, () => console.log(`server is running at port ${port}...`));
module.exports = app;
