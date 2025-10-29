function filterTable(){
    const filterValue = document.getElementById('filter').value.toUpperCase();
    const table = document.getElementById('mytable');
    if (!table) return;
    const rows = table.getElementsByTagName('tr');

    for(let i = 1; i < rows.length; i++){
        const nameCell = rows[i].getElementsByTagName('td')[1];
        const roleCell = rows[i].getElementsByTagName('td')[6];
        if(nameCell && roleCell) {
            const nameText = nameCell.textContent || nameCell.innerText;
            const roleText = roleCell.textContent || roleCell.innerText;
            const nameMatch = nameText.toUpperCase().includes(filterValue);
            const roleMatch = roleText.toUpperCase().includes(filterValue);
            const match = nameMatch || roleMatch;
            rows[i].style.display = match ? '' : 'none';
        }
    }
}
filterTable()
function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
    }

// Update your JavaScript function

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('preview');
    const file = input.files[0];
   
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            Warning.textContent = "Please select an image file"
            // alert('Please select an image file');
            return;
          
           
        }
         console.log(Warning);
        
        // Validate file size (5MB = 5 * 1024 * 1024 bytes)
        if (file.size > 5 * 1024 * 1024) {
             Warning.textContent = "Image size must be less than 5MB"
            // alert('Image size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

// Add event listener to file input
 const Warning = document.getElementById("alert");
document.getElementById('upload-image').addEventListener('change', previewImage);

//adding an onclick event to the visibility button
const visibility = document.getElementById('myModal');
const Close = document.getElementById('myModal');


function openModal() {
    visibility.style.display = "block"
    visibility.style.transition = "0.3s ease-in"

    console.log(visibility)
};
function closeModal() {
    Close.style.display = "none"
     console.log(Close)
};