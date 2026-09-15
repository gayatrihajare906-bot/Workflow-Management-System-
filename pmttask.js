document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const addBtn = document.querySelector(".btn-primary");

  // New Task Add
  addBtn.addEventListener("click", () => {
    let name = prompt("Task Name liha:");
    if (!name) return;

    let priority = prompt("Priority liha - High / Medium / Low:", "Medium");
    let status = prompt("Status liha - To Do / In Progress / Done:", "To Do");
    let date = prompt("Due Date liha:", "Sep 30, 2026");

    // Priority class set
    let pClass = "priority-medium";
    if (priority.toLowerCase() === "high") pClass = "priority-high";
    if (priority.toLowerCase() === "low") pClass = "priority-low";

    // Status class set
    let sClass = "status-todo";
    if (status.toLowerCase().includes("progress")) sClass = "status-progress";
    if (status.toLowerCase() === "done") sClass = "status-done";

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td><span class="badge ${pClass}">${priority}</span></td>
      <td><span class="badge ${sClass}">${status}</span></td>
      <td>${date}</td>
      <td class="actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });

  // Edit aani Delete ekach jagya varun
  taskList.addEventListener("click", (e) => {
    // DELETE
    if (e.target.classList.contains("btn-delete")) {
      if (confirm("Ha task delete karaycha ka?")) {
        e.target.closest("tr").remove();
      }
    }

    // EDIT
    if (e.target.classList.contains("btn-edit")) {
      let row = e.target.closest("tr");
      let oldName = row.cells[0].innerText;
      let oldPriority = row.cells[1].innerText;
      let oldStatus = row.cells[2].innerText;
      let oldDate = row.cells[3].innerText;

      let newName = prompt("Edit Task Name:", oldName);
      let newPriority = prompt("Edit Priority (High/Medium/Low):", oldPriority);
      let newStatus = prompt("Edit Status (To Do / In Progress / Done):", oldStatus);
      let newDate = prompt("Edit Due Date:", oldDate);

      if (newName) row.cells[0].innerText = newName;
      if (newDate) row.cells[3].innerText = newDate;

      if (newPriority) {
        let pClass = "priority-medium";
        if (newPriority.toLowerCase() === "high") pClass = "priority-high";
        if (newPriority.toLowerCase() === "low") pClass = "priority-low";
        row.cells[1].innerHTML = `<span class="badge ${pClass}">${newPriority}</span>`;
      }

      if (newStatus) {
        let sClass = "status-todo";
        if (newStatus.toLowerCase().includes("progress")) sClass = "status-progress";
        if (newStatus.toLowerCase() === "done") sClass = "status-done";
        row.cells[2].innerHTML = `<span class="badge ${sClass}">${newStatus}</span>`;
      }
    }
  });
});