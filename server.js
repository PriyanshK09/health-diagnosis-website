const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/diagnose', (req, res) => {
  const { name, email, age, gender, symptoms, selfDiagnosis } = req.body;

  // Process the form data into a chat GPT prompt
  const prompt = `Name: ${name}\nEmail: ${email}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\nSelf Diagnosis Details: ${selfDiagnosis}`;

  // Write the processed query to a text file
  fs.writeFile(__dirname + '/query.txt', prompt, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else{
      console.log('Query saved to query.txt');
      res.json({ message: 'Query received and saved' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
