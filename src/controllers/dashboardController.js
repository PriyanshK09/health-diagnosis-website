// Get user information controller
exports.getUserInfo = (req, res) => {
    // Retrieve user information from the database
    const userInfo = {
      name: 'John Doe',
      email: 'john@example.com',
      // Add more user information fields as needed
    };
  
    res.json(userInfo);
  };