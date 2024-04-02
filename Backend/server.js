const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('Frontend'));

// Route for handling user inputs and utilizing Google Gemini's API
app.post('/consult', async (req, res) => {
  const { text } = req.body;

  // Make a request to the Gemini API
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": text
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    // Handle API request error
    res.status(response.status).json({ error: 'Failed to generate content' });
    return;
  }

  const data = await response.json();

  // Extract the generated text from the response
  const generatedText = data.candidates[0].content.parts[0].text;

  // Return the generated text to the frontend
  res.json({ processedData: generatedText });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
