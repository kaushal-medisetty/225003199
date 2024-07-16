const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const data = {
  companyName: "Sastra",
  clientID: "21075486-274b-4006-a4a6-37d56e65259e",
  clientSecret: "YefKHGtjvCWIJEPW",
  ownerName: "M Krishna Kaushal",
  ownerEmail: "225003199@sastra.ac.in",
  rollNo: "225003199"
};

app.get('/send-data', (req, res) => {
  axios.post('http://20.244.56.144/test/auth', data)
    .then(response => {
      console.log('Response:', response.data);
      res.send('Data sent successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    });
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});