document.getElementById('consultForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('text').value;
  
    console.log('Text:', text);
  
    // Display loading message
    document.getElementById('result').innerText = 'Loading...';
  
    // Make API request to the server to process the form data
    const response = await fetch('/consult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
  
    const data = await response.json();
  
    // Display the processed data from the server
    document.getElementById('result').innerText = data.processedData;
  });
  