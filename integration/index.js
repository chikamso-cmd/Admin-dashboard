// Initial data
let userData = [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "age": 30 },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "age": 25 }
];

let nextId = 3; // For generating new IDs

// Function to render the table
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    userData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="editUser(${user.id})" class="btn-warning">Edit</button>
                <button onclick="deleteUser(${user.id})" class="btn-danger">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add a new user
function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('addName').value;
    const email = document.getElementById('addEmail').value;
    const age = parseInt(document.getElementById('addAge').value);

    const newUser = {
        id: nextId++,
        name: name,
        email: email,
        age: age
    };

    userData.push(newUser);
    renderTable();

    // Clear form
    document.getElementById('addForm').reset();
}

// Function to delete a user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        userData = userData.filter(user => user.id !== id);
        renderTable();

        // Hide edit form if the user being edited is deleted
        const editId = document.getElementById('editId').value;
        if (editId == id) {
            cancelEdit();
        }
    }
}

// Function to edit a user
function editUser(id) {
    const user = userData.find(user => user.id === id);
    if (user) {
        document.getElementById('editId').value = user.id;
        document.getElementById('editName').value = user.name;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editAge').value = user.age;

        document.getElementById('editForm').style.display = 'block';
        document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to update a user
function updateUser(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const age = parseInt(document.getElementById('editAge').value);

    const userIndex = userData.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        userData[userIndex] = { id, name, email, age };
        renderTable();
        cancelEdit();
    }
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('updateForm').reset();
}

// Event listeners
document.getElementById('addForm').addEventListener('submit', addUser);
document.getElementById('updateForm').addEventListener('submit', updateUser);

// Initial render
renderTable();