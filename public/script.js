document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('diagnosisForm');

  form.addEventListener('submit', function(event) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const symptoms = formData.get('symptoms');
    const selfDiagnosis = formData.get('selfDiagnosis');

    // Process the form data into a chat GPT prompt
    const prompt = `Name: ${name}\nEmail: ${email}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\nSelf Diagnosis Details: ${selfDiagnosis}`;

    // Log the prompt to the console for now
    console.log(prompt);
  });
});
