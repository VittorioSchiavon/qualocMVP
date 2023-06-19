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
import checkoutRoutes from "./routes/checkout.js"
import ordersRoutes from "./routes/orders.js"
import reviewRoutes from "./routes/reviews.js"
import productRoutes from "./routes/products.js"
import StripeWebhookRoute from "./routes/stripeWebhook.js"
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
        var id= req.user?.id
        if (!id) id= req.body?.firstName + req.body?.lastName
        console.log("req.files",req.files)
        console.log("file",file)

        cb(null, id + "-" + Math.floor(Math.random()*90000)+ "-"+ file.originalname)
    },
});
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter: (req, file, cb) => {
        console.log("req.files",req.files)
        console.log("file",file)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

/* ROUTES WITH FILES */

app.post("/auth/registerUser", upload.single("picture"), registerUser);
app.post("/stores/createStore", verifyToken , upload.any("picture"), createStore);


app.post("/products/addProduct", verifyToken, upload.any("picture"), addProduct)

//app.post("/posts", verifyToken, upload.single("picture"), createPost);


app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/carts", cartRoutes);
app.use("/products", productRoutes);
app.use("/conversations", ConversationRoutes);
app.use("/messages", MessagesRoutes);
app.use("/reviews", reviewRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', ordersRoutes);
app.use('/stripe', express.raw({ type: '*/*' }), StripeWebhookRoute)

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



