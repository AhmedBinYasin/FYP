import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectToMongo } from './db';
import { AlarmLoop } from "./utils/Alarm";
import { createServer } from "http";
import { Server } from "socket.io";
import { connect_to_node } from "./sockets/node";


connectToMongo()

const app = express();
config();
const port = process.env.PORT || 5000;
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(express.static('public'));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/Reminders", require("./routes/reminders"));
app.use("/api/node", require("./routes/node"));
//app.use('/api/restaurant',require('./routes/restaurants'))
//app.use('/api/food',require('./routes/food'))
//app.use('/api/catalogeLists',require('./routes/catalogeLists'))
//app.use('/api/cart',require('./routes/cart'))
//app.use('/api/order',require('./routes/orders'))

export function getSocketInstanse(){
  return io
}

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setInterval(() => { AlarmLoop('Ahmed', io) }, 1000);

