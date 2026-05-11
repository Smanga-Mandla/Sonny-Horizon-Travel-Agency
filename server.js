const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from web.html directory
app.use(express.static(path.join(__dirname, 'web.html')));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

// API endpoint for form submission
app.post('/api/submit-inquiry', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields.' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address.' 
      });
    }

    // Send email to company
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@sonnyhorizon.co.za',
      to: 'thandekam@sonnyhorizon.co.za',
      subject: 'New Travel Inquiry from Sonny Horizon Website',
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Trip Details:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This inquiry was submitted via the Sonny Horizon website.</small></p>
      `,
      replyTo: email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to customer
    const confirmationMail = {
      from: process.env.SMTP_USER || 'noreply@sonnyhorizon.co.za',
      to: email,
      subject: 'We Received Your Travel Inquiry - Sonny Horizon',
      html: `
        <h2>Thank You, ${name}!</h2>
        <p>We have received your travel inquiry and will contact you shortly during our business hours (Monday - Friday, 07:30 - 16:30).</p>
        <p><strong>Your inquiry details:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>If you need immediate assistance, please contact us:</p>
        <p>📱 WhatsApp: 071 640 4480<br>
        📧 Email: thandekam@sonnyhorizon.co.za</p>
        <hr>
        <p>Best regards,<br><strong>Sonny Horizon Travel Agency</strong><br>
        <em>Memories that never fade</em></p>
      `
    };

    await transporter.sendMail(confirmationMail);

    res.status(200).json({ 
      success: true, 
      message: 'Your inquiry has been submitted successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'There was an error processing your inquiry. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Sonny Horizon server running on http://localhost:${PORT}`);
  console.log('Make sure to set up your .env file with SMTP credentials');
});
