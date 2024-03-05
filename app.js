const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/submit', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.aharonwsmith@gmail.com,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.1cGVnQ8WMUDEMOFjM8MXg7ekjWBLBPFGBSusQDHErxW8/edit#gid=0,
      range: 'Sheet1',
      valueInputOption: 'RAW',
      resource: {
        values: [
          [req.body.name, req.body.email]
        ]
      }
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
