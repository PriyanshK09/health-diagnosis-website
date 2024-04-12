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
    const prompt = `Imagine you are an expert doctor and here is your patient details:\nName: ${name}\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n Diagnose this patient with minimum of 1000 words/points with output in ${langCode[language]} format with inline CSS`;  
    // Log the prompt to the console for now
    console.log(prompt);
  });  
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('diagnosisForm');
  const diagnosisOutput = document.getElementById('diagnosisOutput');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const symptoms = formData.get('symptoms');

    fetch('/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptoms })
    })
    .then(response => response.json())
    .then(data => {
      diagnosisOutput.innerHTML = `<h3>Diagnosis:</h3><p>${data.diagnosis}</p>`;
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while processing your request.");
    });
  });
});