import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { query } from './database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';


const app = express();
app.use(bodyParser.json());
// Enable CORS
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 8001;
const CHAPA_AUTH_KEY = '    '; //Put Your Chapa Secret Key


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE "email" = $1', [email]);
    if (result.rows.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = result.rows[0];
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful, generate JWT token
    const payload = { userId: user.username }; // Include relevant user data in the payload
    const secret = 'a9D&*#gL3j5!pX@zUq8B#M7*E2vR$yTjKw9hS4rPfNz%8a6H'; // Replace with a strong secret key
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set token expiration

    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      'INSERT INTO users (email, password, username,roles) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, username, role]
    );

    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error creating user:', error.message);
    // Consider more specific error messages based on the error type
    return res.status(500).json({ message: 'Error creating user' });
  }
});



// Routes and API implementations


app.post("/accept-payment", async (req, res) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
  } = req.body;
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      return_url: "http://localhost:8001/", // Set your return URL
    };
    let resp = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(400).json({
          message: error,
        });
      });
    res.status(200).json(resp.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});



app.listen(PORT, () => {
  //const localIPAddresses = getLocalIPAddresses();
  console.log(`Server running on port ${PORT}`);
  // console.log('Server IP Address: '+localIPAddresses)
  const serverDateTime = new Date().toISOString();
  console.log('Server Date And Time: ' + serverDateTime)
});
