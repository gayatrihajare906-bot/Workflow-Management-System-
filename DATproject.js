// 1. View Button - Modal ughad
function viewRow(btn) {
    const row = btn.closest('tr');
    const name = row.cells[0].innerText;
    const manager = row.cells[1].innerText;
    const progress = row.cells[2].innerText;
    const deadline = row.cells[3].innerText;
    const status = row.cells[4].innerText;

    const details = `
        <b>Project Name:</b> ${name}<br><br>
        <b>Manager:</b> ${manager}<br><br>
        <b>Progress:</b> ${progress}<br><br>
        <b>Deadline:</b> ${deadline}<br><br>
        <b>Status:</b> ${status}
    `;

    document.getElementById('viewDetails').innerHTML = details;
    document.getElementById('viewModal').style.display = 'block';
}

// 2. Modal Band Kara
function closeModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// 3. Edit Button
function editRow(btn) {
    const row = btn.closest('tr');
    let oldName = row.cells[0].innerText;

    let newName = prompt("Navin Project Name Tak:", oldName);
    if (newName && newName.trim()!== "") {
        row.cells[0].innerText = newName;
    }

    let newDeadline = prompt("Navin Deadline Tak:", row.cells[3].innerText);
    if (newDeadline && newDeadline.trim()!== "") {
        row.cells[3].innerText = newDeadline;
    }
}

// 4. Delete Button
function deleteRow(btn) {
    let confirmDelete = confirm("Ha project delete karaycha ka?");
    if (confirmDelete) {
        btn.closest('tr').remove();
    }
}

// 5. Create Project Button
function openModal() {
    let projectName = prompt("Project Name Liha:");
    if (!projectName) return;

    let manager = prompt("Manager Name Liha:", "Gayatri");
    let deadline = prompt("Deadline Liha:", "30 Sep 2026");

    let tbody = document.getElementById('projectBody');

    let newRow = `
        <tr>
            <td>${projectName}</td>
            <td>${manager}</td>
            <td><div class="progress"><div class="fill" style="width:0%"></div></div> 0%</td>
            <td>${deadline}</td>
            <td><span class="status Active">Active</span></td>
            <td>
                <button class="btn view" onclick="viewRow(this)">View</button>
                <button class="btn edit" onclick="editRow(this)">Edit</button>
                <button class="btn delete" onclick="deleteRow(this)">Delete</button>
            </td>
        </tr>
    `;
    tbody.innerHTML += newRow;
}

// 6. Modal chya baher click kela tar band hoil
window.onclick = function(event) {
    let modal = document.getElementById('viewModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}