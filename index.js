const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  app.get('/', (req, res) => {
    res.send("Hi")
  })


  app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      await transporter.sendMail({
        from: `${email}`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Message from ${name} ans ${email}`,
        text: message,
      });
  
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})