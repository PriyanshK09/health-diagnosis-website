const user = {
  name: '',
  email: '',
  password: '',
  medicalIssues: [],
  consultationDetails: '',
};

const setUserProperty = (key, value) => {
  user[key] = value;
};

const getUser = () => {
  return user;
};

module.exports = {
  setUserProperty,
  getUser,
};