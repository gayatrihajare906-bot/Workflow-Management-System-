function toggleNotif(){
  document.getElementById('notifDropdown').classList.toggle('show');
}

function markAllRead(){
  alert("All notifications marked as read");
  document.querySelector('.badge-count').innerText = '0';
  document.querySelector('.count').innerText = '0';
  document.getElementById('notifDropdown').classList.remove('show');
}

function viewNotif(btn){
  let row = btn.closest('tr').children;
  alert(`Notification Detail:\n\nType: ${row[0].innerText}\nProject: ${row[1].innerText}\nMessage: ${row[2].innerText}\nDeadline: ${row[3].innerText}`);
}

function deleteNotif(btn){
  if(confirm("Delete this notification?")){
    btn.closest('tr').remove();
  }
}

// Auto Notification - Deadline Check
function checkDeadlines(){
  let today = new Date();
  // Example logic: jar deadline javal asel tar notification dakhva
  console.log("Checking deadlines... ", today);
  // Backend API: fetch('get_deadline_notifications.php')
}

// Page load la check kara
window.onload = checkDeadlines;

// Baher click kela tar dropdown band
window.onclick = function(e){
  if(!e.target.closest('.notif-bell')){
    document.getElementById('notifDropdown').classList.remove('show');
  }
}