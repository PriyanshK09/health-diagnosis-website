// Validate login credentials
exports.validateLogin = (email, password) => {
    const errors = [];
  
    if (!email) {
      errors.push('Email is required');
    }
  
    if (!password) {
      errors.push('Password is required');
    }
  
    return errors;
  };
  
  // Validate signup credentials
  exports.validateSignup = (name, email, password) => {
    const errors = [];
  
    if (!name) {
      errors.push('Name is required');
    }
  
    if (!email) {
      errors.push('Email is required');
    }
  
    if (!password) {
      errors.push('Password is required');
    }
  
    return errors;
  };