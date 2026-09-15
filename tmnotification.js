let notifications = [
  { id: 1, title: "New task assigned to you", desc: "Gayatri assigned you 'Landing Page Design'", time: "2m ago", type: "task", read: false },
  { id: 2, title: "You were mentioned in a comment", desc: "@Rahul mentioned you in Website Redesign project", time: "1h ago", type: "mentions", read: false },
  { id: 3, title: "Deadline approaching", desc: "API Integration deadline is tomorrow", time: "3h ago", type: "deadline", read: false },
  { id: 4, title: "Project updated", desc: "CRM System project status changed to In Progress", time: "Yesterday", type: "project", read: true },
  { id: 5, title: "Team meeting reminder", desc: "Daily standup meeting at 10:00 AM", time: "Yesterday", type: "task", read: true },
  { id: 6, title: "Gayatri commented on your task", desc: "Please check the new design feedback", time: "2 days ago", type: "mentions", read: true }
];

let current = "all";

function render() {
  let filtered = notifications;
  if (current === "unread") filtered = notifications.filter(n =>!n.read);
  if (current === "mentions") filtered = notifications.filter(n => n.type === "mentions");

  document.getElementById('notiBody').innerHTML = filtered.map(n => `
    <div class="noti ${!n.read? 'unread' : ''}">
      <div>
        <b>${!n.read? '<span class="dot"></span>' : ''}${n.title}</b>
        <p>${n.desc} • ${n.time}</p>
      </div>
      <div style="display:flex;align-items:center">
        <span class="badge ${n.type}">${n.type}</span>
        ${!n.read? `<button class="btn btn-read" onclick="markRead(${n.id})">Mark Read</button>` : ''}
        <button class="btn btn-del" onclick="deleteNoti(${n.id})">Delete</button>
      </div>
    </div>
  `).join('') || `<p style="font-size:13px;color:#94a3b8;">No notifications</p>`;

  document.getElementById('totalCount').innerText = notifications.length;
  document.getElementById('unreadCount').innerText = notifications.filter(n =>!n.read).length;
  document.getElementById('mentionCount').innerText = notifications.filter(n => n.type === "mentions").length;
  document.getElementById('todayCount').innerText = notifications.filter(n => n.time.includes("m ago") || n.time.includes("h ago")).length;

  document.getElementById('c-all').innerText = `(${notifications.length})`;
  document.getElementById('c-unread').innerText = `(${notifications.filter(n =>!n.read).length})`;
  document.getElementById('c-ment').innerText = `(${notifications.filter(n => n.type === "mentions").length})`;

  let unreadPercent = notifications.length? (notifications.filter(n =>!n.read).length / notifications.length * 100) + "%" : "0%";
  document.getElementById('bar-unread').style.width = unreadPercent;
}

function filterNoti(type) {
  current = type;
  document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
  document.getElementById(type).classList.add('active');
  let titles = { all: "All Notifications", unread: "Unread Notifications", mentions: "Mentions" };
  document.getElementById('title').innerText = titles[type];
  document.getElementById('tableHead').innerText = "🔔 " + titles[type];
  render();
}

function markRead(id) {
  let n = notifications.find(x => x.id === id);
  n.read = true;
  render();
}

function markAllRead() {
  notifications.forEach(n => n.read = true);
  render();
}

function deleteNoti(id) {
  notifications = notifications.filter(n => n.id!== id);
  render();
}

function addNoti() {
  let title = prompt("Notification Title:");
  if (!title) return;
  let desc = prompt("Description:", "New update from team");
  let type = prompt("Type: task / mentions / deadline / project", "task");
  notifications.unshift({ id: Date.now(), title, desc, time: "Just now", type, read: false });
  render();
}

render();