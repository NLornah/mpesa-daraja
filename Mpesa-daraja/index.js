const express = require("express");

const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");


app.listen(5000, () => {
  console.log("SERVER RUNNING ON PORT 5000");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const TokenRoute= require("./routes/token") 
app.use("/token", TokenRoute)




app.get("/", (req, res) => {
  res.send("Mpesa backend Running on PORT 5000");
});



// app.post("/stk", genateToken, async (req, res) => {
//   const phone = req.body.phone.substring(1);
//   const amount = req.body.amount;
//   const shortcode = process.env.MPESA_PAYBILL;
//   const passkey = process.env.MPESA_PASSKEY;
//   const password = new Buffer.from(shortcode + passkey + timestamp).toString(
//     "base64"
//   );
//   const timestamp =
//     date.getFullYear() +
//     ("0" + (date.getMonth() + 1).slice(-2)) +
//     ("date" + date.getDate()).slice(-2);

//   await axios
//     .post(
//       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",

//       {
//         BusinessShortCode: "shortcode",
//         Password: password,
//         Timestamp: "timestamp",
//         TransactionType: "CustomerPayBillOnline",
//         Amount: "amount",
//         PartyA: `254${phone}`,
//         PartyB: "shortcode",
//         PhoneNumber: `254${phone}`,
//         CallBackURL: "https://mydomain.com/pat",
//         AccountReference: `254${phone}`,
//         TransactionDesc: "Test",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res.status(400).json(err.message);
//     });

//   res.json({ phone, amount });
// });
