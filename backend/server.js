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
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful");
});

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const searchRouter = require("./routes/search");
const mailboxRouter = require("./routes/mailbox");
const messageRouter = require("./routes/message")

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/search", searchRouter);
app.use("/mailbox", mailboxRouter);
app.use("/message", messageRouter);

socket.on("connection", socket => {
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });

    socket.on("login", username => {
        console.log("A user has logged in: " + username);
        connectedUsers[username] = socket;

        //for testing, counts the users because they are stored as object attributes
        console.log(Object.keys(connectedUsers).length);
    });

    socket.on("private", data => {
        const receiver = data.receiver;
        const message = data.message;

        if (connectedUsers.hasOwnProperty(receiver)) {
            connectedUsers[receiver].emit("private", {
                message: message
            });
        }
    });
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
