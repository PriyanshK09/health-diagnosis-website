const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const authMiddleware = require('backend/middlewares/auth.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authMiddleware);

// Setup API routes
app.use('/api/users', require('./routes/user'));

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(`${__dirname}/views/dashboard.ejs`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});