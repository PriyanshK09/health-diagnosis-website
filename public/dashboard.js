// Implement logic to switch between different sections of the dashboard
const navLinks = document.querySelectorAll('nav ul li a');
const contentSections = document.querySelectorAll('.content > div');

navLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    contentSections.forEach((section) => section.style.display = 'none');
    contentSections[index].style.display = 'block';
    navLinks.forEach((link) => link.classList.remove('active'));
    link.classList.add('active');
  });
});