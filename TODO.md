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
1. change the upload button to "select image" the button should be able to allow the user to first select the image first without closing the modal, the apply to "save"
2. create a modal for when the visibility, edit icon is clicked and design it to show the information of an employee.
3. update the modal form section, reduce the size "its overflowing".
4. create a modal for for when the delete button is clicked that pops up a modal to confirm if the admin wants to delete or not.
5.  
