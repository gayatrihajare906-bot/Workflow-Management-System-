// Page load jhalyavar code chalu hoil
document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const addBtn = document.getElementById("add-task-btn");

  // 1. NEW TASK ADD KARNE
  addBtn.addEventListener("click", () => {
    let taskName = prompt("Task Name Liha:");
    if (!taskName) return;

    let deadline = prompt("Deadline Liha:", "Sep 30, 2026");
    let progress = prompt("Progress kiti % ahe? (0-100):", "0");

    let statusClass = "pending";
    let statusText = "Pending";

    if (progress == 100) {
      statusClass = "completed";
      statusText = "Completed";
    } else if (progress > 0) {
      statusClass = "in-progress";
      statusText = "In Progress";
    }

    let newRow = `
      <tr>
        <td>${taskName}</td>
        <td>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progress}%;"></div>
          </div>
          <span class="progress-text">${progress}%</span>
        </td>
        <td>${deadline}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td class="actions">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </td>
      </tr>
    `;
    taskList.innerHTML += newRow;
  });

  // 2. EDIT AANI DELETE - Ekach jagi handle
  taskList.addEventListener("click", (e) => {

    // DELETE
    if (e.target.classList.contains("btn-delete")) {
      let confirmDel = confirm("Ha task delete karaycha ka?");
      if (confirmDel) {
        e.target.closest("tr").remove();
      }
    }

    // EDIT
    if (e.target.classList.contains("btn-edit")) {
      let row = e.target.closest("tr");

      let oldName = row.cells[0].innerText;
      let oldDeadline = row.cells[2].innerText;
      let oldProgress = row.querySelector(".progress-text").innerText.replace("%", "");

      let newName = prompt("Navin Task Name:", oldName);
      let newDeadline = prompt("Navin Deadline:", oldDeadline);
      let newProgress = prompt("Navin Progress %:", oldProgress);

      if (newName) row.cells[0].innerText = newName;
      if (newDeadline) row.cells[2].innerText = newDeadline;

      if (newProgress) {
        row.querySelector(".progress-bar").style.width = newProgress + "%";
        row.querySelector(".progress-text").innerText = newProgress + "%";

        let badge = row.querySelector(".badge");
        if (newProgress == 100) {
          badge.className = "badge completed";
          badge.innerText = "Completed";
        } else if (newProgress > 0) {
          badge.className = "badge in-progress";
          badge.innerText = "In Progress";
        } else {
          badge.className = "badge pending";
          badge.innerText = "Pending";
        }
      }
    }
  });
});