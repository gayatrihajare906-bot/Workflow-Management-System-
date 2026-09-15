// Tab Switch Logic
function openTab(tabId, el){
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.querySelectorAll('.sidebar a').forEach(a=>a.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pageTitle').innerText = el.innerText;
}

// Create Record - Project Tab madhe add hoil
function createRecord(){
  let name = prompt("Enter Project Name:");
  if(!name) return;
  let manager = prompt("Enter Manager Name:");
  let deadline = prompt("Enter Deadline:", "30 Aug 2026");

  let row = `<tr>
    <td>${name}</td>
    <td>${manager}</td>
    <td>0%</td>
    <td>${deadline}</td>
    <td><span class="badge medium">New</span></td>
    <td>
      <button class="btn view" onclick="viewRecord(this)">View</button>
      <button class="btn edit" onclick="editRecord(this)">Edit</button>
      <button class="btn del" onclick="deleteRecord(this)">Delete</button>
    </td>
  </tr>`;

  document.getElementById('projectBody').innerHTML += row;
}

// View Record
function viewRecord(btn){
  let r = btn.closest('tr').children;
  alert(`Details:\n${r[0].innerText} - ${r[1].innerText}`);
}

// Edit Record
function editRecord(btn){
  let r = btn.closest('tr').children;
  let newName = prompt("Edit Project Name:", r[0].innerText);
  if(newName) r[0].innerText = newName;
}

// Delete Record
function deleteRecord(btn){
  if(confirm("Delete this record?")){
    btn.closest('tr').remove();
  }
}