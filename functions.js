const { google } = require('googleapis');

exports.handler = async (event, context) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.home-solutions@home-solutions-416117.iam.gserviceaccount.com,
        private_key: process.env.-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfZGhwDeyzfqVu\nI4Ba0Q3Hm9uTJWzn9QBG977Ao7JV28yYKRYznOdczQrYVmgmIOL/U5Z0KXlF8sqp\nPHwkXEkQcxeFL+sYh34QHgCsNgpIq8oLEwj7u7btZCiBETy6q1qAPfJbDUjVwN73\nR0lhWQbrOuAiZVSzdRkiwaMGI5FNCe1ikdjG/Tr1MppieVffxab7woEdC9FVK7/t\njlmEf5FD+pkpfUUcY3hI8m5qBLMfnczDFWrFwhni/ojJO+QlA0zYsjF4MdWjgFjl\n9zi62k2wIH0l5poAvh1Cv3Z6dAGmIKGpB0ah7brnfxaZCb31uZvA9vIPfiCUnhx5\nf1vUbryBAgMBAAECggEAS5KxTi83w2V127PA6XhNvBh7COWhWTtmM5v+eTcnzqoE\nJfnIW/+ZuahYIeXhZ/y6Lnx9qqCZOVOwwd4HdVmPEjSNYW5bjznPKO6tdZT2l60e\nNe7jnB3d/aNjnH5TWCc9/6J1Sd5NpJqSE3+XUIqIr62EQ76aD/fuX/a4CwyfTDsM\nnahMqo4Zx//4Lb9F85SJzYwAG12a58CcwHnJ08GR5YfchIhhQdF0wUjt62Qz6yo8\nkktzwHTYpJJaq/NHCoGz0vDuuN2teRk/JBm+jXMj6eg80PKf3/lzl9qL2zGv9xcf\nxjfnDh+4rl9ejgXK22B5v5CEOoU/V99V7l3uCTJ5bQKBgQD3+5ZYFQmrlcCuPsIY\n89tKSpasjGHSJhVAaAvi1Xl+XMNKFNg6xUM2rZX1vRAGPRCjqKHJnmreT5eGKPRi\nk4/k+6JkTkgKUd/9yFcJaUwr7KLxgdISyFADEx8/Yy0fjOOTJEWBjRMHfXeoxnaw\nJWkST5FIRZ4oEkXYvbi9BbwUXwKBgQDmnUx2vl3gnRhjTclUzdep5z8MQwE9aoMo\nUgpFei6MefER/peCm4sCeRU86w1S4utKptLXpKkqlf0l6LY6ChTM7HHTE/JtWubM\njqUzOBZAMDwUUOqXy2FNVYI4bu65E3bTdCUjCTTTDQJHsOxwDOVWL+PewKHRH003\nfGjeZKXbHwKBgQCTXb1QhuACSbIBWmY6MeBlW8ICtEIFgoAqkCpQGJBkmXesdIqz\nEjsJKUruh/YX3v4eY74RdMUJa78eCQSB+DMQ3sD4XtTM3S8BP6cJfru3dp62anGO\nm9+AlEKDhspv72fmLy3m+REP6G3NrHMn5nN0YDhz/HsqUQGU9dns6pWEfQKBgQCa\n7mCZgelV5pSk2nSBKc1S0w3TcgyaMz2sT/mglaZCMAZaPX2SfGcWoTw4cf3Airzi\nqVMLFw+jkaLB3ibWtUEmL0+FLGh5OVHHaano0Cx6sS0bxQTmN/fF2cWjnjt5UW9K\nPkRY1m2LwLiga2ddG/zTO1dOpoHQGcRpm4Zkqp+WpwKBgG4WYJ//Ejk7Xby/J+rm\nLyw5MrtdkZkDY/SJbvPYneIY7zHlm9p/EmGbma6tLwGE/TArC2NnPkdOnN03+P+s\nBsn3GDA/G+x1QndT/iY0otNpXXTMf89wYK1owVTG2tLxRDjFtYQe2ZD8HknpvHjP\nF61zSwWjd9YBbIHN2SSbV1fN\n-----END PRIVATE KEY-----\.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const requestData = JSON.parse(event.body);
    const { firstName, lastName, phoneNumber, address, email } = requestData;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.1cGVnQ8WMUDEMOFjM8MXg7ekjWBLBPFGBSusQDHErxW8,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[firstName, lastName, phoneNumber, address, email]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved to Google Sheets' }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving data to Google Sheets' }),
    };
  }
};
