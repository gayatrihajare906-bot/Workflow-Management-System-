let tasks = [
  { id: 1, name: "Frontend Development Review", project: "Website Redesign", date: "2026-08-25", type: "upcoming", status: "upcoming" },
  { id: 2, name: "API Integration Deadline", project: "CRM System", date: "2026-08-28", type: "deadlines", status: "upcoming" },
  { id: 3, name: "Client Presentation", project: "Mobile App", date: "2026-08-24", type: "upcoming", status: "today" },
  { id: 4, name: "Landing Page Submission", project: "Website Redesign", date: "2026-08-20", type: "deadlines", status: "overdue" },
  { id: 5, name: "Database Design Deadline", project: "CRM System", date: "2026-09-01", type: "deadlines", status: "upcoming" },
  { id: 6, name: "Team Standup Meeting", project: "General", date: "2026-08-26", type: "upcoming", status: "upcoming" }
];

let current = "all";

function render() {
  let filtered = tasks;
  if (current === "upcoming") filtered = tasks.filter(t => t.status === "upcoming" || t.status === "today");
  if (current === "deadlines") filtered = tasks.filter(t => t.type === "deadlines");
  if (current === "overdue") filtered = tasks.filter(t => t.status === "overdue");

  document.getElementById('taskBody').innerHTML = filtered.map(t => `
    <div class="task">
      <div>
        <b>${t.name}</b>
        <p>📁 ${t.project} • 📅 ${t.date}</p>
      </div>
      <div>
        <span class="badge ${t.status}">${t.status}</span>
        <button class="btn btn-done" onclick="markDone(${t.id})">Done</button>
        <button class="btn btn-edit" onclick="editTask(${t.id})">Edit</button>
        <button class="btn btn-del" onclick="deleteTask(${t.id})">Delete</button>
      </div>
    </div>
  `).join('');

  // Stats
  document.getElementById('totalCount').innerText = tasks.length;
  document.getElementById('upCount').innerText = tasks.filter(t => t.status!== "overdue").length;
  document.getElementById('overCount').innerText = tasks.filter(t => t.status === "overdue").length;
  document.getElementById('doneCount').innerText = 4;

  document.getElementById('c-all').innerText = `(${tasks.length})`;
  document.getElementById('c-up').innerText = `(${tasks.filter(t => t.status!== "overdue").length})`;
  document.getElementById('c-dead').innerText = `(${tasks.filter(t => t.type === "deadlines").length})`;
  document.getElementById('c-over').innerText = `(${tasks.filter(t => t.status === "overdue").length})`;
}

function filterTask(type) {
  current = type;
  document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
  document.getElementById(type).classList.add('active');

  let titles = { all: "All Assigned Tasks", upcoming: "Upcoming Tasks", deadlines: "Deadlines", overdue: "Overdue Tasks" };
  document.getElementById('title').innerText = titles[type];
  document.getElementById('tableHead').innerText = "📋 " + titles[type];
  render();
}

function addTask() {
  let name = prompt("Task Name:");
  if (!name) return;
  let project = prompt("Project Name:", "General");
  let date = prompt("Deadline Date YYYY-MM-DD:", "2026-08-30");
  let type = prompt("Type: upcoming / deadlines", "upcoming");

  tasks.push({ id: Date.now(), name, project, date, type, status: "upcoming" });
  render();
}

function editTask(id) {
  let t = tasks.find(x => x.id === id);
  let newDate = prompt(`Edit Deadline for ${t.name}:`, t.date);
  let newName = prompt(`Edit Task Name:`, t.name);
  if (newDate) t.date = newDate;
  if (newName) t.name = newName;
  render();
}

function deleteTask(id) {
  if (confirm("Delete this task?")) {
    tasks = tasks.filter(t => t.id!== id);
    render();
  }
}

function markDone(id) {
  let t = tasks.find(x => x.id === id);
  t.status = "completed";
  render();
}

render();