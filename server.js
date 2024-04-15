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
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const path = require("path");
const req = require("express/lib/request");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: 'gmail'
    auth: {
        user: 'priyanshkhare0908@gmail.com',
        pass: 'ljgy gxio lzvc fkoe '
    }
});

// Send Email function
function sendEmail(receiverName, receiverEmail, diagnosisHTML) {
    const mailOptions = {
        from:'priyanshkhare0908@gmail.com' ,
        to: receiverEmail ,
        subject: 'Diagnosis-Report for ' + receiverName,
        html: diagnosisHTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

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
    const { name, age, gender, symptoms, country, language, email } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Imagine you are a medical professional tasked with diagnosing a patient. Here are the patient's details:
    Name: ${name}
    Age: ${age}
    Gender: ${gender}
    Symptoms: ${symptoms}

    Make sure all diagnosis and recommendation must be relevant to patient's country of residence i.e. : ${country}
    Your task is to provide a detailed diagnosis and treatment plan in HTML format. The diagnosis should include all relevant details, discussions, and recommendations. The output should be in ${language} language, structured as follows:
    1. Start with an HTML document structure.
    2. Include a heading with the patient's name and a brief introduction.
    3. Create a table with the patient's details (name, age, gender, symptoms).
    4. Provide a detailed diagnosis including possible conditions, explanations, and reasoning.
    5. Outline a treatment plan with specific recommendations. Every text must be written like a professional doctor and you must write in descriptive manner all total diagnosis should be a minimum of 3000 words.
    6. Use proper HTML elements and formatting also remember that all headings must be distinguishable (e.g., headings, paragraphs, tables).
    7. Ensure the document is well-organized, easy to read, and professional-looking. At last also write a list of medicines that could help and why, with all possible treatment that can be done according to a professional and experienced doctor.
    
    Your final output should be an HTML file with inline CSS for styling, presenting the diagnosis report as if it were from a real doctor.
    IF a symptom is not a recognized medical condition or seems misguiding such as off-topic just give error dont give any output or any heading of diagnosis and just give a Well Formatted (Error code in RED, BOLD, CENTER; then error message with all details) error message in HTML with Error Code : Re-write your Symptoms correctly as they are either wrong or mis-guiding for doctors to process it.
    `;
    // const prompt = `Imagine you are an expert doctor and here is your patient details:\nName: ${name}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n Diagnose this patient in ${language} language with minimum of 1000 words/points with output in HTML format with inline CSS (Patient details are in a row table format (Plain Table not much styling)); Also remember if symptoms are not correct or seems misguiding such as off-topic, give out Re-write your symptoms correctly as output in HTML in tabular form start and proper formatted headings.`;
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
            sendEmail(name, email, diagnosis);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
