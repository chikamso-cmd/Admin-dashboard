function filterTable() {
  const filterValue = document.getElementById("filter").value.toUpperCase();
  const table = document.getElementById("mytable");
  if (!table) return;
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const nameCell = rows[i].getElementsByTagName("td")[1];
    const roleCell = rows[i].getElementsByTagName("td")[6];
    if (nameCell && roleCell) {
      const nameText = nameCell.textContent || nameCell.innerText;
      const roleText = roleCell.textContent || roleCell.innerText;
      const nameMatch = nameText.toUpperCase().includes(filterValue);
      const roleMatch = roleText.toUpperCase().includes(filterValue);
      const match = nameMatch || roleMatch;
      rows[i].style.display = match ? "" : "none";
    }
  }
}
filterTable();
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Update your JavaScript function

function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById("preview");
  const file = input.files[0];

  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      Warning.textContent = "Please select an image file";
      // alert('Please select an image file');
      return;
    }
    console.log(Warning);

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      Warning.textContent = "Image size must be less than 5MB";
      // alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}
const Warning = document.getElementById("alert");
document
  .getElementById("upload-image")
  .addEventListener("change", previewImage);

// Function for edit modal image preview
function previewImageEdit(event) {
  const input = event.target;
  const preview = document.getElementById("modalImage");
  const file = input.files[0];

  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

// Add event listener to edit modal file input
document
  .getElementById("upload-image-edit")
  .addEventListener("change", previewImageEdit);

// Prevent modal closure on internal clicks
const editModalContent = document.getElementById("edit");
editModalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

//adding an onclick event to the visibility button
const OpenEdit = document.getElementById("myEdit");
const openedit = document.getElementById("openEdit");
const View = document.getElementById("view");
const Edit = document.getElementById("edit");

const cancel_Selection = document.getElementById("cancel");
const save_Edit = document.getElementById("save");

cancel_Selection.addEventListener("click", (e) => {
  e.preventDefault();
});
save_Edit.addEventListener("click", (e) => {
  e.preventDefault();
});
// ! adds and removes an active class to the edit user modal
openedit.addEventListener("click", (e) => {
  e.stopPropagation();
  OpenEdit.classList.add("active");
  console.log(OpenEdit, "btn clicked");
});

function closeModal() {
  OpenEdit.classList.remove("active");
}
// ! remove the active class form the view profile modal and adds it to the edit modal.

// delete modal function
const deleteModal = document.getElementById("myDelete");
const DeleteUser = document.getElementById("deleteUser");
const Delete = document.getElementById("delete");
const Delete_User = document.getElementById("delete_user");
const Clear = document.getElementById("clear");

Delete_User.addEventListener("click", (e) => {
  e.preventDefault();
  deleteModal.classList.add("active");
});

DeleteUser.addEventListener("click", (e) => {
  e.stopPropagation();
  deleteModal.classList.add("active");
});
document.addEventListener("click", (e) => {
  if (Delete.contains(e.target) && e.target === Clear) {
    deleteModal.classList.remove("active");
  }
});

