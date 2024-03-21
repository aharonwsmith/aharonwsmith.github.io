const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure body parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load credentials from a JSON file
const credentials = JSON.parse(fs.readFileSync('/users/aharon/Documents/cred.json'));

// Create an OAuth2 client
const { private_key, client_email, client_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, '', '');

// Set the OAuth2 client credentials
oAuth2Client.setCredentials({ private_key, client_email });

// Create a new Google Sheets instance with the OAuth2 client
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

// Define the spreadsheet ID and range
const spreadsheetId = 'y1rVKEJVmU1WkhWPARRlSom3vcVdNqhcloEZ3U54hBJTc';
const range = 'Sheet1!A1';

// Handle form submission
app.post('/submit', async (req, res) => {
  const { firstName, lastName, phoneNumber, address, email } = req.body;

  try {
    // Append the data to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[firstName, lastName, phoneNumber, address, email]],
      },
    });

    console.log('Data appended to spreadsheet');
    res.send('Data saved to Google Sheets');
  } catch (error) {
    console.error('Error appending data:', error);
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
