console.log('i am working');
const apiUrl = 'https://simple-api-endpoints.onrender.com';
const usersTable = document.getElementById('tableBody');

// fetch users and render them on the website

function get_users() {
fetch(`${apiUrl}/users`)
.then(response => {
    if(!response.ok) {
        throw new Error('your network is not ok!');
    }
    return response.json()
})
.then(response => {
    console.log(response);
    data = response.data
    usersTable.innerHTML = "";
    data.forEach(data => {
        console.log(data) 
        usersTable.innerHTML += `
        <tr>
        <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.age}</td>
            <td>
                <button class="btn-warning" onclick="editUser(${data.id})" >Edit</button>
                <button class="btn-danger" onclick="deleteUser(${data.id})">Delete</button>
            </td>
        </tr>
        `;
    })
      
})
.catch(err => {
    console.log(err);

})
}
//calls the function when the page loads
get_users()

// add user
const submitBtn = document.getElementById("addForm")
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("addName").value.trim();
    const email = document.getElementById("addEmail").value.trim();
    const age = document.getElementById("addAge").value.trim();


    //send the data to the create endpoint
    fetch(`${apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            age: age
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        }).then(response => {
            if (!response.ok) {
                throw new Error("your network response was not ok");
                
            };
            return response.json();
        }).then(respData => {
            console.log(respData);
            get_users();
            submitBtn.reset();
        }).catch(err => {
            console.log(err);
            alert(err);
        })
});

//edit user
function editUser(id){
    console.log(" i also work...")
    let user;
//fetch the user with their id
    fetch(`${apiUrl}/users/${id}`)
    .then( response => {
        if (!response.ok) {
            throw new Error("network response was not ok");
        }
        return response.json()
    })
    .then(response => {
        console.log(response);
        user = response.data;
        if(user){
            console.log(user);
            document.getElementById('editName').value = user.name
            document.getElementById('editEmail').value = user.email
            document.getElementById('editAge').value = user.age
            document.getElementById('editId').value = user.id
           
            document.getElementById('editForm').style.display = "block";
            document.getElementById('editForm').scrollIntoView({behavior: "smooth"})
            
        }
        
    })
    .catch(err => {
        console.log(err);
    })
}

//update user information
const updateForm = document.getElementById("updateForm");
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value.trim();
    const name = document.getElementById("editName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const age = document.getElementById("editAge").value.trim();

    //send the data to the create endpoint
    fetch(`${apiUrl}/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            email: email,
            age: age
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        }).then(response => {
            if(!response.ok) {
                throw new Error("network response was not ok");
                
            }return response.json();
            
        }).then(respData => {
            console.log(respData);
            get_users();
            updateForm.reset();
        }).catch(err => {
            console.log(err);
            alert(err);
        })
        
});



//delete user
function deleteUser(id) {
    if(confirm ("Are you sure you want to delete this user?")) {
        //make the delete call
fetch(`${apiUrl}/users/${id}`, {
    method: "DELETE",
}).then(response => {
    if (!response.ok) {
        throw new Error("network response was not ok");
        
    }return response.json();
    
}).then(response => {
    console.log(response);
    get_users()
})
.catch(err => {
    console.log(err);
    alert(err);
})
    }
}
