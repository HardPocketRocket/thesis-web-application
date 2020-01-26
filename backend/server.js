const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

const http = require("http").createServer(app);
const socket = require("socket.io")(http);

const connectedUsers = {};

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful");
});

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const searchRouter = require("./routes/search");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/search", searchRouter);

socket.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });

    socket.on("login", username => {
        console.log("A user has logged in: " + username);
        connectedUsers[username] = socket;
    });

    socket.on("private", data => {
        const receiver = data.receiver;
        const message = data.message;
        
        console.log(connectedUsers[receiver]);
        
        if(connectedUsers.hasOwnProperty(receiver)){
            connectedUsers[receiver].emit("private", {
                message : message
            })
        }
    })
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
