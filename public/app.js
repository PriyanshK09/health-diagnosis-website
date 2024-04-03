// app.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form form');
    const signupForm = document.querySelector('.signup-form form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
  
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          window.location.href = '/dashboard.html'; // Redirect to the dashboard
        } else {
          const data = await response.json();
          alert(data.errors.join('\n')); // Display validation errors
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
  
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (response.ok) {
          window.location.href = '/dashboard.html'; // Redirect to the dashboard
        } else {
          const data = await response.json();
          alert(data.errors.join('\n')); // Display validation errors
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });