import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Store from "../models/Store.js";
import Cart from "../models/Cart.js";
import nodemailer from "nodemailer";
/* REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { firstName, lastName, email, password, phone, address, isOwner } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: req.file?.filename ? req.file?.filename : "",
      phone,
      address,
      isOwner,
      verified: false,
    });
    const savedUser = await newUser.save();

    const cart = new Cart({
      userID: savedUser._id,
      products: [],
    });
    const savedCart = await cart.save();
    sendEmail(savedUser._id, savedUser.email);
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER STORE 
export const registerStore = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      shopName,
      email,
      phone,
      tags,
      password,
      description,
      street,
      city,
      state,
      zip,
    } = req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newStore = new Store({
      firstName,
      lastName,
      shopName,
      email,
      phone,
      tags,
      description,
      street,
      city,
      state,
      zip,
      password: passwordHash,
    });
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email /*, verified: true*/ });
    if (!user) return res.status(400).json({ msg: "User do not exist. " });

    if (user != null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "scrotusauro69@gmail.com",
    pass: "hrtlrnwnytfurgyn",
  },
});
async function sendEmail(id, email) {
  console.log("sending email to user", email);

  let info = await transporter.sendMail({
    from: {
      name: "qualoc",
      address: "scrotusauro69@gmail.com",
    },
    to: "vittorioschiavon99@gmail.com", // list of receivers
    subject: "Email di conferma indizizzo email", // Subject line
    html: `<body>
      <h1>Conferma indirizzo email - Azione richiesta</h1>
      <p>Gentile utente,</p>
      <p>Grazie per esserti registrato su <strong>qualoc</strong>! Per proseguire con l'utilizzo del nostro servizio, è necessario confermare l'indirizzo email che hai fornito durante la registrazione.</p>
      <p>Ti preghiamo di cliccare sul seguente link per completare la conferma dell'indirizzo email:<br> <a href=http://localhost:3001/auth/verify/${id}> Clicca qui</a></p>
      <p>Una volta confermato l'indirizzo email, avrai accesso completo al tuo account su <strong>qualoc</strong> e potrai sfruttare tutte le sue funzionalità.</p>
      <p>Se hai bisogno di supporto o hai domande, non esitare a contattare il nostro team di assistenza clienti.</p>
      <p>Grazie per la tua collaborazione e buono shopping solidale!.</p><br>
      <p>Cordiali saluti,</p>
      <p>Il team di <strong>qualoc</strong></p>
  </body>`,
  });
  console.log("sent email to user", email);
}

export const verify = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("There is no user");
  console.log("verified user", req.params.id);

  try {
    user.verified = true;
    const userUpdated = await user.save();
    console.log("verified user", req.params.id);
    res.status(200).redirect("http://localhost:3000/login");
  } catch (err) {
    res.status(400).redirect("http://localhost:3000/login");
  }
};
