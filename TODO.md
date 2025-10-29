- [x] Update general td styles in style.css: Remove background-color: red;, add proper padding, background, and font styles to match the dashboard theme.
- [x] Add styles for .action-btn: Make it a flex container with spacing between icons, add hover effects, and cursor pointer for interactivity.

i have a dashboard for employee data to be entered, edited, deleted, i want to use an api to get user details, and i also want those details to be in a table and the javascript will render that table on the page.


async function fetchEmployees() {
  try {
    const response = await fetch('https://api.example.com/employees');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

<!-- *to append an element in javascript -->
function renderTable(employees) {
  const tbody = document.querySelector('#employeeTable tbody');
  tbody.innerHTML = ''; // Clear existing rows

  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

29/10/2025 mt todo for today

<!-- 1. change the upload button to "select image" the button should be able to allow the user to first select the image first without closing the modal, the apply to "save" -->

2. create a modal for when the visibility, edit icon is clicked and design it to show the information of an employee.
<!-- 3. update the modal form section, reduce the size "its overflowing". -->
4. create a modal for for when the delete button is clicked that pops up a modal to confirm if the admin wants to delete or not.
5.  



<script>
  let employees = [];
  let currentEditIndex = null;

  // Add employee
  document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const employee = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dateJoined: document.getElementById('dateJoined').value,
      status: document.getElementById('status').value,
      roles: document.getElementById('roles').value
    };
    employees.push(employee);
    renderTable();
    this.reset();
  });

  // Render table
  function renderTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    employees.forEach((emp, index) => {
      const row = `<tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.dateJoined}</td>
        <td>${emp.status}</td>
        <td>${emp.roles}</td>
        <td>
          <button onclick="editEmployee(${index})">Edit</button>
          <button onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }

  // Fetch employees from API (GET method)
  function fetchEmployees() {
    fetch('https://your-api.com/employees')
      .then(res => res.json())
      .then(data => {
        employees = data;
        renderTable();
      });
  }

  // Edit employee
  function editEmployee(index) {
    currentEditIndex = index;
    const emp = employees[index];
    document.getElementById('editName').value = emp.name;
    document.getElementById('editEmail').value = emp.email;
    document.getElementById('editDateJoined').value = emp.dateJoined;
    document.getElementById('editStatus').value = emp.status;
    document.getElementById('editRoles').value = emp.roles;
    document.getElementById('editModal').style.display = 'block';
  }

  // Save edited employee (PUT method)
  function saveEdit() {
    const updated = {
      name: document.getElementById('editName').value,
      email: document.getElementById('editEmail').value,
      dateJoined: document.getElementById('editDateJoined').value,
      status: document.getElementById('editStatus').value,
      roles: document.getElementById('editRoles').value
    };
    employees[currentEditIndex] = updated;
    renderTable();
    document.getElementById('editModal').style.display = 'none';

    // Optional: send update to API
    fetch(`https://your-api.com/employees/${currentEditIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  }

  // Delete employee
  function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable();
  }

  function closeModal() {
    document.getElementById('editModal').style.display = 'none';
  }
</script>
