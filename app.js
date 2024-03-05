<!DOCTYPE html>
<html>
<head>
  <title>Entry Form</title>
  <script src="https://apis.google.com/js/api.js"></script>
</head>
<body>
  <h1>Home Solutions Entry Form</h1>
  <p>Enter your information:</p>
  <form id="infoForm">
    <label for="firstName">First Name:</label><br>
    <input type="text" id="firstName" name="firstName" required><br><br>

    <label for="lastName">Last Name:</label><br>
    <input type="text" id="lastName" name="lastName" required><br><br>

    <label for="phoneNumber">Phone Number:</label><br>
    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required><br><br>

    <label for="address">Address:</label><br>
    <textarea id="address" name="address" required></textarea><br><br>

    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required><br><br>

    <input type="submit" value="Submit" id="submitBtn">

  
    <input type="button" value="Save to Google Sheets" onclick="handleClientLoad()">
  </form>

  <script>
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    function initClient() {
      gapi.client.init({
        clientId: '704701761049-61hisdtrnoe5m3r7ba6lo6n0r6ut3ad7.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        var formData = {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          phoneNumber: document.getElementById('phoneNumber').value,
          address: document.getElementById('address').value,
          email: document.getElementById('email').value
        };

        gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: '1rVKEJVmU1WkhWPARRlSom3vcVdNqhcloEZ3U54hBJTc',
          range: 'Sheet1!A1',
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[formData.firstName, formData.lastName, formData.phoneNumber, formData.address, formData.email]],
          },
        }).then(function(response) {
          console.log('Data appended to spreadsheet');
          // Optionally, you can display a confirmation message to the user
          alert('Data saved to Google Sheets');
        }).catch(function(error) {
          console.error('Error appending data: ' + error);
          // Optionally, you can display an error message to the user
          alert('Error saving data');
        });
      } else {
        // User is not signed in, show the sign-in button.
        gapi.auth2.getAuthInstance().signIn();
      }
    }
  </script>
</body>
</html>
