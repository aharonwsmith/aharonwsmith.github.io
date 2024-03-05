// functions.js

exports.handler = async function(event, context) {
    const formData = JSON.parse(event.body);
    // Process the form data and save it to Google Sheets
    // Use the formData to construct the data you want to save
    // Call the Google Sheets API to save the data
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully" }),
    };
  };
  