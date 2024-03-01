const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const formData = req.body.formData;

    fs.writeFile('formData.txt', formData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred. Please try again.');
        } else {
            console.log('Form data saved successfully');
            res.status(200).send('Form data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
