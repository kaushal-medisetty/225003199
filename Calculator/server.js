const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TEST_SERVER_URL = 'http://20.244.56.144/test/fibo';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMTQxNTk2LCJpYXQiOjE3MjExNDEyOTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjIxMDc1NDg2LTI3NGItNDAwNi1hNGE2LTM3ZDU2ZTY1MjU5ZSIsInN1YiI6IjIyNTAwMzE5OUBzYXN0cmEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTYXN0cmEiLCJjbGllbnRJRCI6IjIxMDc1NDg2LTI3NGItNDAwNi1hNGE2LTM3ZDU2ZTY1MjU5ZSIsImNsaWVudFNlY3JldCI6IlllZktIR3RqdkNXSUpFUFciLCJvd25lck5hbWUiOiJNIEtyaXNobmEgS2F1c2hhbCIsIm93bmVyRW1haWwiOiIyMjUwMDMxOTlAc2FzdHJhLmFjLmluIiwicm9sbE5vIjoiMjI1MDAzMTk5In0.P5aUzMC65FnMAUjRgylVEZdO37RMTFokm67ABY55FKw'; // Replace with your actual access token

axios.get(TEST_SERVER_URL, {
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}` 
  }
})
.then(response => {
  
  console.log(response.data);
  return response.data.nums;
})
.catch(error => {
 
  console.error('Error:', error.message);
});

app.get('/numbers/:qualifier', async (req, res) => {
  const qualifier = req.params.qualifier;
  if (!['primes', 'fibo', 'even', 'rand'].includes(qualifier)) {
    return res.status(400).json({ error: 'Invalid qualifier' });
  }

  const numbers = await fetchNumbers(qualifier);
  
  const windowPrevState = [...window];

  const newNumbers = numbers.filter(num => !window.includes(num));
  

  window = [...window, ...newNumbers];
  if (window.length > WINDOW_SIZE) {
    window = window.slice(-WINDOW_SIZE);
  }


  const avg = window.length > 0 ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0;

  const response = {
    numbers,
    windowPrevState,
    windowCurrState: window,
    avg
  };

  res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  