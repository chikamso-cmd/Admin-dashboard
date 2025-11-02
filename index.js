console.log ('welcome here...');
const apiUrl = 'https://simple-api-endpoints.onrender.com';
const usersTable = document.getElementById('user-table-body');


function get_users() {
    console.log('still working...');
    
fetch(`${apiUrl}/users`)
.then(response => {
    if(!response.ok) {
        throw new Error('your network is not ok!');
    }
    return response.json();
})
.then(response => {
    console.log(response);
    response = response.data;
      usersTable.innerHTML = "";
    response.forEach(response => {
        console.log(response);
        usersTable.innerHTML += `
       
     <tr>
                  <td>${response.id}</td>
                  <td>${response.name}</td>
                  <td>${response.email}</td>
                  <td>${response.age}</td>
                  <td>${response.contact}</td>
                  <td>${response.date}</td>
                  <td>${response.role}</td>
                  <td class="status status-active">${response.status }</td>
                  <td>
                    <div class="action-btn">
                      <span class="material-symbols-outlined edit" id="openEdit" onclick="editUser(${response.id})">border_color</span>
                      <span class="material-symbols-outlined delete"id="deleteUser" onclick="deleteUser(${response.id})" >delete</span>
                    </div>
                  </td>
                </tr>
    `;
    });


})
.catch(err => {
    console.log(err);

})


}
get_users()