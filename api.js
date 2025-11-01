//* API call logic starts here


    const Clear_Modal = document.getElementById("closeCreate");
    const Create_User = document.getElementById("create_user");
    const create_user_form = document.getElementById('create-user-form');




 // ...existing code...
document.getElementById('create-user-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const age = document.getElementById('age').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;
  const imageInput = document.getElementById('upload-image');
  const imageFile = imageInput.files[0];

  // Basic validation
  if (!name || !email || !contact || !age || !role || !status || !imageFile) {
    alert('Please fill out all fields and upload an image.');
    return;
  }

  // creating new table rows

  
  const table = document.getElementById('mytable').querySelector('tbody');
  const row = document.createElement('tr');

  const imageCell = document.createElement('td');
  const img = document.createElement('img');
  img.src =URL.createObjectURL(imageFile);
  img.width = 50;
  imageCell.appendChild(img);

  row.appendChild(imageCell);
  row.innerHTML += `
  <td>${name}</td>
  <td>${email}</td>
  <td>${age}</td>
  <td>${contact}</td>
  <td>${new Date().toLocaleDateString()}</td>
  <td>${role}</td>
  <td>${status}</td>
  <td>
       <span class="material-symbols-outlined edit" id="openEdit">border_color</span>
       <span class="material-symbols-outlined delete" id="deleteUser">delete</span>
    </td>

  `;

  table.appendChild(row);

  const formData = new formData();
  formData.append('avatar', imageFile);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('contact', contact);
  formData.append('date', new Date().toISOString());
  formData.append('role', role);
  formData.append('age', age);
  formData.append('status', status);
  formData.append('status', status);
  

  //sending to an api

  fetch('https://simple-api-endpoints.onrender.com/users' ,{
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  then(data => {
    console.log('user created', data);
    alert('user successfully created!');
  })
  .catch((error) => {
    console.log('error', error);
    alert('failed to create user.')
  });

});

function get_users() {
  fetch('https://simple-api-endpoints.onrender.com/users')
  .then(response => {
    if(!response.ok){
      throw new Error('failed to get users');
    }
    return response.json();
  })
  .then(users => {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
       <td><div class="image-container-data"><img src="${user.avatarURL}" class="profile-pic" /></div></td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.contact}</td>
          <td>${new Date(user.date).toLocaleDateString()}</td>
          <td>${user.role}</td>
          <td>${user.status}</td>
      `
      tableBody.appendChild('row');

    });
  })
  .catch((err) => {
    console.log('error loading users:', error)
    alert('could not load users. please try again.')
  });
}