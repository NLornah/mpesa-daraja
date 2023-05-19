// const Mpesa = require('mpesa-node');

// // Set the API credentials
// const credentials = {
//   client_key: 'ACj0Wz5l7sFqSpDt',
//   client_secret: 'ACKAaYqLjpkOCZtwGxtQjN9E7Bks0gq6',
//   initiator_username: 'your_initiator_username',
//   initiator_password: 'your_initiator_password',
//   security_credential: 'your_security_credential',
//   cert_path: 'path_to_cert_file',
//   cert_key_path: 'path_to_key_file',
//   environment: 'sandbox' // or 'production'
// };

// // Initialize the M-Pesa client
// const mpesa = new Mpesa(credentials);

// // Set the payment details
// const paymentData = {
//   BusinessShortCode: 'your_business_short_code',
//   Amount: '10',
//   PartyA: '2547xxxxxxxx', // customer phone number
//   PartyB: 'your_business_short_code',
//   PhoneNumber: '2547xxxxxxxx', // customer phone number
//   CallBackURL: 'https://yourdomain.com/callback',
//   AccountReference: 'your_account_reference',
//   TransactionDesc: 'your_transaction_description'
// };

// // Initiate the payment
// mpesa
//   .lipaNaMpesaOnline(paymentData)
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const axios = require("axios");

const createToken = async (req, res, next) => {
  const secret = "ACj0Wz5l7sFqSpDt";
  const consumer = "ACKAaYqLjpkOCZtwGxtQjN9E7Bks0gq6";
  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
  let token;
  try {
    const data = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Bearer ${auth}`,
        },
      }
    );
    token = data.data.access_token;
    console.log(data.data);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

const postStk = async (req, res) => {
  const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: 174379,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

module.exports = { createToken, postStk };
