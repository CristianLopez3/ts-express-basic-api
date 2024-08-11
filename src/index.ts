import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
const PORT = 3002;
const MONGO_USER = "administrator"
const MONGO_PWD = "12345678"
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PWD}@localhost:27017/`;

app.use(cors({
    credentials: true,
}));


app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());


const server = http.createServer(app);

server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err) => {
    console.error(err);
})