function viewTask(btn){
  let r = btn.closest('tr').children;
  alert(`Task Details:\n\nTask: ${r[0].innerText}\nProject: ${r[1].innerText}\nAssigned: ${r[2].innerText}\nPriority: ${r[3].innerText}\nDue Date: ${r[4].innerText}\nStatus: ${r[5].innerText}`);
}

function editTask(btn){
  let r = btn.closest('tr').children;
  let task = prompt("Edit Task Name:", r[0].innerText);
  let project = prompt("Edit Project Name:", r[1].innerText);
  let assigned = prompt("Edit Assigned To:", r[2].innerText);
  let priority = prompt("Edit Priority (High/Medium/Low):", r[3].innerText);
  let due = prompt("Edit Due Date:", r[4].innerText);
  let status = prompt("Edit Status (Pending/In Progress/Completed):", r[5].innerText);

  if(!task) return;
  r[0].innerText = task;
  r[1].innerText = project;
  r[2].innerText = assigned;
  r[3].innerHTML = `<span class="priority ${priority.toLowerCase()}">${priority}</span>`;
  r[4].innerText = due;
  r[5].innerHTML = `<span class="status ${status == 'Completed'? 'completed' : status == 'In Progress'? 'progress' : 'pending'}">${status}</span>`;
}

function deleteTask(btn){
  if(confirm("Delete this task?")){
    btn.closest('tr').remove();
  }
}

function addTask(){
  let task = prompt("Task Name:");
  let project = prompt("Project Name:");
  let assigned = prompt("Assigned To:");
  let priority = prompt("Priority (High/Medium/Low):","Medium");
  let due = prompt("Due Date:","30 Aug 2026");
  let status = prompt("Status:","Pending");
  if(!task) return;

  let html = `<tr>
    <td>${task}</td>
    <td>${project}</td>
    <td>${assigned}</td>
    <td><span class="priority ${priority.toLowerCase()}">${priority}</span></td>
    <td>${due}</td>
    <td><span class="status pending">${status}</span></td>
    <td>
      <button class="btn view" onclick="viewTask(this)">View</button>
      <button class="btn edit" onclick="editTask(this)">Edit</button>
      <button class="btn delete" onclick="deleteTask(this)">Delete</button>
    </td>
  </tr>`;
  document.getElementById("taskBody").innerHTML += html;
}