import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import {registerUser } from "./controllers/auth.js"
import { addProduct } from "./controllers/products.js";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import storeRoutes from "./routes/stores.js"
import cartRoutes from "./routes/carts.js"
import productRoutes from "./routes/products.js"
import ConversationRoutes from "./routes/conversations.js";
import MessagesRoutes from "./routes/messages.js";
import { verifyToken } from "./middleware/auth.js";
import { createStore } from "./controllers/stores.js";

//CONFIG
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(bodyParser.json({ limit: "50mb", extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

//FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */

app.post("/auth/registerUser", upload.single("picture"), registerUser);
app.post("/stores/createStore", upload.single("picture"), verifyToken, createStore);

app.post("/products/addProduct", upload.array("pictures"), verifyToken, addProduct)

//app.post("/posts", verifyToken, upload.single("picture"), createPost);


app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/carts", cartRoutes);
app.use("/products", productRoutes);
app.use("/conversations", ConversationRoutes);
app.use("/messages", MessagesRoutes);
/* ROUTES WITH FILES 
app.use("/posts", postRoutes);
*/
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connesso con il db")
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));



