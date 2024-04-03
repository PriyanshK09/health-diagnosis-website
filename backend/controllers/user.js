const User = require('../models/user');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.register = async (req, res) => {
  // Your registration logic here
};

exports.login = async (req, res) => {
  // Your login logic here
};

exports.addMedicalIssues = async (req, res) => {
  // Your medical issues logic here
};

exports.addConsultationDetails = async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Save generated text to user's consultationDetails
  // Yourlogic here
};

exports.getUserInfo = async (req, res) => {
  // Your user info logic here
};