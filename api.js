document.getElementById('fetchData').addEventListener('click', fetchData);
function fetchData() {
  const apiUrl = 'https://simple-api-endpoints.onrender.com/users';

  fetch(apiUrl)
  .then(response => {
    if(!response.ok) {
      throw new Error("network response was not ok", response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data);
    displayData(data);
  })
  .catch(error => {
    console.log('there has been a problem with your fetch operation', error)
  })
}
function displayData(data){
const dataDiv = document.getElementById('tableContent');
dataDiv.innerHTML = ""; //this clears the previous information in the div

data.forEach(element => {
  const tbody = document.createElement('tr')
  tbody.textContent +=`
  <td>${id}</td>
  <td>${name}</td>
  <td>${email}</td>
  <td>${age}</td>
  `;
  dataDiv.appendChild('td');
});
}


// document.getElementById('fetchData').addEventListener('click', fetchData);

// function fetchData() {
//     const apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             displayData(data);
//         })
//         .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//         });
// }

// function displayData(data) {
//     const dataDiv = document.getElementById('data');
//     dataDiv.innerHTML = ''; // Clear previous data

//     Assuming data is an array of objects
//     data.forEach(item => {
//         const div = document.createElement('div');
//         div.textContent = JSON.stringify(item); // Customize how you want to display the data
//         dataDiv.appendChild(div);
//     });
// }
