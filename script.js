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
