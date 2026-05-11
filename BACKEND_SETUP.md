# Sonny Horizon Travel Agency - Backend Setup

## Email Form Submission Setup

The inquiry form now submits directly to a backend server, which sends emails to `thandekam@sonnyhorizon.co.za` without opening an email client.

### Prerequisites
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Email Settings**
   
   Edit the `.env` file with your SMTP credentials:
   
   **Option A: Using Gmail**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character app password
   - Update `.env`:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=your-gmail@gmail.com
     SMTP_PASS=your-16-char-app-password
     ```

   **Option B: Using Other Email Providers**
   - SendGrid, Mailgun, or your hosting provider's SMTP
   - Update SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS accordingly

3. **Start the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Access the Website**
   - Open your browser and go to `http://localhost:3000`
   - The website will load from the `web.html` folder
   - Test the inquiry form - it should now submit directly without opening email client

### How It Works

1. User fills out the inquiry form on the website
2. Form submits to `/api/submit-inquiry` endpoint
3. Backend server sends the inquiry email to `thandekam@sonnyhorizon.co.za`
4. Confirmation email is automatically sent to the user
5. User sees a success message (no email client opens)

### Troubleshooting

**"Please make sure the server is running" error**
- Make sure you ran `npm start` and the server is listening on port 3000
- Check that your terminal shows: "Sonny Horizon server running on http://localhost:3000"

**Emails not sending**
- Verify SMTP credentials in `.env` are correct
- For Gmail: Check that 2FA is enabled and you're using an App Password (not your regular password)
- Check server console for error messages

**Port 3000 already in use**
- Change `PORT` in `server.js` to another port (e.g., 3001)
- Update form submission URL to match the new port if needed

### File Structure
```
c:\Kayise_IT\client\
├── server.js           (Node.js/Express backend)
├── package.json        (Dependencies)
├── .env               (Email configuration - don't commit this!)
├── .gitignore         (Excludes node_modules and .env)
└── web.html/          (Website files)
    ├── index.html
    ├── about.html
    ├── services.html
    ├── contact.html
    └── ...
```

### Production Deployment

When deploying to production:
1. Use a proper hosting provider (AWS, Heroku, DigitalOcean, etc.)
2. Set environment variables on the hosting platform instead of using `.env`
3. Use a professional email service (SendGrid, Mailgun, AWS SES)
4. Enable HTTPS (SSL/TLS certificates)
5. Consider rate limiting for the form endpoint

### Support

For issues with the backend, check:
- Server is running: `npm start`
- `.env` file has correct SMTP credentials
- Port 3000 is accessible
- Node.js version: `node --version` (should be v14+)
