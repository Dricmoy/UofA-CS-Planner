const apiUrl = 'http://localhost:3066/Ece+212';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Data fetched:', data);
    // Now you can use the data as needed in your application
  })
  .catch(error => console.error('Error fetching data:', error));