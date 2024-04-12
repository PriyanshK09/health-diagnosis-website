// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const app = express();
// const path = require("path");
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html')); // Use path.join to ensure correct file path
// });

// // Routes
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// // Access your API key as an environment variable
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// app.post("/diagnose", async (req, res) => {
//     const { name, age, gender, symptoms, language } = req.body;
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `Imagine you are an expert doctor and here is your patient details:\nName: ${name}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n Diagnose this patient in ${language} language with minimum of 1000 words/points with output in HTML format with inline CSS (Patient details are in a row table format (Plain Table not much styling)); Also remember if symptoms are not correct or seems misguiding such as off-topic, give out Re-write your symptoms correctly as output in HTML.`;
//     console.log(prompt);
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const diagnosis = response.text().replaceAll("```html", "\n").trim();

//     fs.readFile(__dirname + '/public/index.html', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             res.status(500).send('Internal server error');
//         } else {
//             const updatedHTML = data.replace('<!--Diagnosis Output-->', `
//                 <div class="container mt-5">
//                     <p>${diagnosis}</p>
//                 </div>
//             `);

//             res.send(updatedHTML);
//         }
//     });
// });

// // app.post('/diagnose', (req, res) => {
// //   const { name, email, age, gender, symptoms, selfDiagnosis } = req.body;

// //   // Process the form data into a chat GPT prompt
// //   const prompt = `Name: ${name}\nEmail: ${email}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\nSelf Diagnosis Details: ${selfDiagnosis}`;

// //   // Write the processed query to a text file
// //   fs.writeFile(__dirname + '/query.txt', prompt, (err) => {
// //     if (err) {
// //       console.error('Error writing to file:', err);
// //       res.status(500).json({ message: 'Internal server error' });
// //     } else{
// //       console.log('Query saved to query.txt');
// //       res.json({ message: 'Query received and saved' });
// //     }
// //   });
// // });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// LATEST UPDATE PATCH 2.0

const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require('bcrypt');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Authentication routes
// Helper function to read and parse the users.txt file
function readUsersFile() {
    try {
        const usersData = fs.readFileSync('users.txt', 'utf8');
        return JSON.parse(usersData);
    } catch (err) {
        // If the file doesn't exist or is empty, return an empty array
        return [];
    }
}

// Helper function to write to the users.txt file
function writeUsersFile(users) {
    fs.writeFileSync('users.txt', JSON.stringify(users, null, 4));
}

// Signup route
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    // Read existing user data from CSV
    fs.readFile('users.csv', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal server error');
        } else {
            let users = data ? data.split('\n').map(line => line.split(',')) : [];
            // Check if user already exists
            if (users.some(user => user[1] === email)) {
                res.status(400).send('User with this email already exists');
            } else {
                // Append new user to the CSV file
                users.push([username, email, password]);
                console.log('New user data:', [username, email, password]); // Print the new user data
                const newUserRow = users.map(user => user.join(',')).join('\n');
                fs.writeFile('users.csv', newUserRow, (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        res.status(500).send('Internal server error');
                    } else {
                        res.status(201).send('User signed up successfully');
                    }
                });
            }
        }
    });
});


// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Read user data from CSV
    fs.readFile('users.csv', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal server error');
        } else {
            const users = data ? data.split('\n').map(line => line.split(',')) : [];
            // Check if username exists and password is correct
            const user = users.find(user => user[0] === username && user[2] === password);
            if (user) {
                // Authentication successful
                res.redirect('/sdiagnose.html');
            } else {
                res.status(401).send('Invalid username or password');
            }
        }
    });
});


// Serve dashboard on default URL
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/dash.html");
});

// Diagnosis route
app.post("/diagnose", async (req, res) => {
    const { name, age, gender, symptoms, language } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Imagine you are an expert doctor and here is your patient details:\nName: ${name}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n Diagnose this patient in ${language} language with minimum of 1000 words/points with output in HTML format with inline CSS (Patient details are in a row table format (Plain Table not much styling)); Also remember if symptoms are not correct or seems misguiding such as off-topic, give out Re-write your symptoms correctly as output in HTML.`;
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const diagnosis = response.text().replaceAll("```html", "\n").trim();

    fs.readFile(__dirname + '/public/sdiagnose.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal server error');
        } else {
            const updatedHTML = data.replace('<!--Diagnosis Output-->', `
                <div class="container mt-5">
                    <p>${diagnosis}</p>
                </div>
            `);

            res.send(updatedHTML);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
