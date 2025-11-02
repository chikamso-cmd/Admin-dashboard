console.log("Working...")
const BaseUrl = 'https://simple-api-endpoints.onrender.com'

const usersTable = document.getElementById('tableBody')
// get all users
function get_users() {
    fetch(`${BaseUrl}/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(respData => {
            console.log(respData)
            data = respData.data
            usersTable.innerHTML = ""
            data.forEach(element => {
                console.log(element)
                usersTable.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td>${element.age}</td>
                        <td>
                            <button onclick="editUser(${element.id})" class="btn-warning">Edit</button>
                            <button onclick="deleteUser(${element.id})" class="btn-danger">Delete</button>
                        </td>
                    </tr>
                `
            });
        }).catch(err => {
            console.log(err)
        })
}
// call the function when page loads
get_users()

// add user 
const submitBtn = document.getElementById("addForm")
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("addName").value.trim()
    const email = document.getElementById("addEmail").value.trim()
    const age = document.getElementById("addAge").value.trim()

    // send the data to the create endpoint
    fetch(`${BaseUrl}/users`, {
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
            throw new Error('Network response was not ok')
        };
        return response.json();
    }).then(respData => {
        console.log(respData)
        get_users()
    }).catch(err => {
        console.log(err)
        alert(err)
    })

})


//edit user clickBtn
function editUser(id) {
    let user;
    console.log("123")
    // fetch the user with this id
    fetch(`${BaseUrl}/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(respData => {
            console.log("Hello123")
            console.log(respData)
            user = respData.data
            if (user) {
                console.log(user)
                document.getElementById('editName').value = user.name;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editAge').value = user.age;
                document.getElementById('editId').value = user.id;

                document.getElementById('editForm').style.display = 'block';
                document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
            }
        }).catch(err => {
            console.log(err)
        })
    console.log("www")

}
// update user
const updateForm = document.getElementById("updateForm")
updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const id = document.getElementById("editId").value.trim()
    const name = document.getElementById("editName").value.trim()
    const email = document.getElementById("editEmail").value.trim()
    const age = document.getElementById("editAge").value.trim()

    // send the data to the create endpoint
    fetch(`${BaseUrl}/users/${id}`, {
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
        if (!response.ok) {
            throw new Error('Network response was not ok')
        };
        return response.json();
    }).then(respData => {
        console.log(respData)
        get_users()
    }).catch(err => {
        console.log(err)
        alert(err)
    })

})

// delete user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        // make the delete call
        fetch(`${BaseUrl}/users/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            response.json()
        }).then(respData => {
            console.log(respData)
            get_users()
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }
}