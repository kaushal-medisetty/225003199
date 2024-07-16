const express = require('express');

const app = express();

app.use(express.json());
const axios = require('axios');

const data = {
  companyName: "Sastra",
  ownerName: "M Krishna Kaushal",
  rollNo: "225003199",
  ownerEmail: "225003199@sastra.ac.in",
  accessCode: "LGcHvG"
};

axios.post('http://20.244.56.144/test/register', data)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });





app.listen(3000);