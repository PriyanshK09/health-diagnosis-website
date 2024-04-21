# Health Diagnosis Website

The Health Diagnosis Website is a comprehensive platform designed to assist users in self-assessing their health conditions. This project is developed as part of a college project to showcase the implementation of web technologies for healthcare applications. The website allows users to enter their symptoms, receive an analysis of potential health conditions associated with those symptoms, and obtain recommendations for further action.

## Demo

Check out the live demo of the Health Diagnosis Website at [**HERE**](https://medicareai.onrender.com/).

## Table of Contents

- [Health Diagnosis Website](#health-diagnosis-website)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features
- **Symptom Analysis**: Users can enter their symptoms and receive an analysis of potential health conditions.
- **Health Recommendations**: Based on the symptom analysis, the website provides users with recommendations for further action, such as seeking medical advice or taking specific precautions.
- **User Accounts**: Users have the option to create accounts to save their health information and track their symptoms over time. (Not Functional yet - COMING SOON)
- **Email Reports**: User reports are sent to their email IDs for reference and tracking.

## Technologies Used
- **Node.js**: Backend server environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user information and reports.
- **Render**: Deployment platform for hosting the website.
- **HTML/CSS/JavaScript**: Frontend development technologies for creating the user interface.
- **dotenv**: For loading environment variables from a .env file.

## Installation
1. Clone the repository: `git clone https://github.com/PriyanshK09/health-diagnosis-website.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following variables:
   ```
   API_KEY=your_google_genai_api_key
   MongoURI=your_mongodb_connection_uri
   PSWD=email_id_app_password
   ```
4. Start the server: `npm start`
5. Access the website at: `http://localhost:3000`

## Usage
1. Sign up for an account on the website.
2. Enter your symptoms and submit them for analysis.
3. Receive an analysis of potential health conditions and recommendations for further action.
4. Track your symptoms and health information over time.

## Contributing
Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This project is developed for educational purposes and should not be used as a substitute for professional medical advice. Always consult a healthcare professional for accurate diagnosis and treatment.