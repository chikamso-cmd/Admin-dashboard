document.addEventListener('DOMContentLoaded', () => {
  const filterInput = document.getElementById('filter');
  const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
  const uploadImageInput = document.getElementById('upload-image');
  const uploadImageEditInput = document.getElementById('upload-image-edit');
  const openEditModalButton = document.getElementById('openEdit');
  const editModal = document.getElementById('myEdit');
  const cancelEditButton = document.getElementById('cancel');
  const deleteUserButton = document.getElementById('deleteUser');
  const deleteModal = document.getElementById('myDelete');
  const cancelDeleteButton = document.getElementById('clear');

  // Filter table
  filterInput.addEventListener('input', filterTable);

  // Toggle dark mode
  toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Image preview for create modal
  uploadImageInput.addEventListener('change', (event) => {
    previewImage(event, 'preview', 'alert');
  });

  // Image preview for edit modal
  uploadImageEditInput.addEventListener('change', (event) => {
    previewImage(event, 'modalImage');
  });

  // Open edit modal
  openEditModalButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(openEditModalButton);
    
    editModal.classList.add('active');
  });

  // Close edit modal
  cancelEditButton.addEventListener('click', () => {
    editModal.classList.remove('active');
  });

  // Open delete modal
  deleteUserButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteModal.classList.add('active');
  });

  // Close delete modal
  cancelDeleteButton.addEventListener('click', () => {
    deleteModal.classList.remove('active');
  });

  // Prevent modal closure on internal clicks
  document.getElementById('edit').addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

function filterTable() {
  const filterValue = document.getElementById('filter').value.toUpperCase();
  const table = document.getElementById('mytable');
  if (!table) return;
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const nameCell = rows[i].getElementsByTagName('td')[1];
    const roleCell = rows[i].getElementsByTagName('td')[6];
    if (nameCell && roleCell) {
      const nameText = nameCell.textContent || nameCell.innerText;
      const roleText = roleCell.textContent || roleCell.innerText;
      const nameMatch = nameText.toUpperCase().includes(filterValue);
      const roleMatch = roleText.toUpperCase().includes(filterValue);
      const match = nameMatch || roleMatch;
      rows[i].style.display = match ? '' : 'none';
    }
  }
}

function previewImage(event, previewId, alertId) {
  const input = event.target;
  const preview = document.getElementById(previewId);
  const alertEl = alertId ? document.getElementById(alertId) : null;
  const file = input.files[0];

  if (alertEl) {
    alertEl.textContent = '';
  }

  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      if (alertEl) {
        alertEl.textContent = 'Please select an image file';
      }
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      if (alertEl) {
        alertEl.textContent = 'Image size must be less than 5MB';
      }
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      if (previewId === 'preview') {
        preview.style.display = 'block';
      }
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    if (previewId === 'preview') {
      preview.style.display = 'none';
    }
  }
}


