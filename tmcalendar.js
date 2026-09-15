let events=[
 {id:1, name:"Frontend Development Review", date:"2026-08-25", type:"upcoming", project:"Website Redesign", status:"upcoming"},
 {id:2, name:"API Integration Deadline", date:"2026-08-28", type:"deadlines", project:"CRM System", status:"upcoming"},
 {id:3, name:"Client Presentation", date:"2026-08-24", type:"upcoming", project:"Mobile App", status:"today"},
 {id:4, name:"Landing Page Submission", date:"2026-08-20", type:"deadlines", project:"Website Redesign", status:"overdue"},
 {id:5, name:"Database Design Deadline", date:"2026-09-01", type:"deadlines", project:"CRM System", status:"upcoming"},
 {id:6, name:"Team Standup Meeting", date:"2026-08-26", type:"upcoming", project:"General", status:"upcoming"},
 {id:7, name:"Bug Fixing Deadline", date:"2026-08-22", type:"deadlines", project:"E-commerce", status:"overdue"}
];

let current="upcoming";

function render(){
 let filtered = current=="upcoming" ? events.filter(e=>e.type=="upcoming" || e.status!="overdue") : events.filter(e=>e.type=="deadlines" || e.status=="overdue");
 if(current=="upcoming") filtered = events.filter(e=>e.status!="overdue");
 if(current=="deadlines") filtered = events.filter(e=>e.type=="deadlines" || e.status=="overdue");

 document.getElementById('calendarBody').innerHTML = filtered.map(ev=>`
  <div class="event">
    <div>
      <b>${ev.name}</b>
      <p>📁 ${ev.project} • 📅 ${ev.date}</p>
    </div>
    <div>
      <span class="badge ${ev.status}">${ev.status}</span>
      <button class="btn btn-edit" onclick="editEvent(${ev.id})">Edit</button>
      <button class="btn btn-del" onclick="deleteEvent(${ev.id})">Delete</button>
    </div>
  </div>
 `).join('');

 document.getElementById('deadlineSide').innerHTML = events.filter(e=>e.status=="overdue" || e.type=="deadlines").slice(0,4).map(ev=>`
  <div style="padding:10px 0;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between">
    <span style="font-size:13px"><b>${ev.name}</b><br><span style="font-size:11px;color:#64748b">${ev.date}</span></span>
    <span class="badge ${ev.status}">${ev.status}</span>
  </div>
 `).join('');

 // Stats
 document.getElementById('upCount').innerText = events.filter(e=>e.status=="upcoming").length;
 document.getElementById('weekCount').innerText = events.filter(e=>e.date>="2026-08-24" && e.date<="2026-08-31").length;
 document.getElementById('overCount').innerText = events.filter(e=>e.status=="overdue").length;
 document.getElementById('doneCount').innerText = 4;
 document.getElementById('c-up').innerText = `(${events.filter(e=>e.status!="overdue").length})`;
 document.getElementById('c-dead').innerText = `(${events.filter(e=>e.type=="deadlines").length})`;

 // Mini calendar
 let gridHTML="";
 for(let i=1;i<=31;i++){
   let has = events.find(e=>parseInt(e.date.split('-')[2])==i);
   let cls="day";
   if(has) cls+=" has-task";
   if(i==24) cls+=" today";
   if(has && has.status=="overdue") cls+=" overdue";
   gridHTML+=`<div class="${cls}">${i}</div>`;
 }
 document.getElementById('calGrid').innerHTML=gridHTML;
}

function filterCal(type){
 current=type;
 document.getElementById('title').innerText = type=="upcoming" ? "Calendar - Upcoming Tasks" : "Calendar - Deadlines";
 document.getElementById('tableHead').innerText = type=="upcoming" ? "📅 Upcoming Tasks" : "⏰ Deadlines";
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(type).classList.add('active');
 render();
}

function deleteEvent(id){ events=events.filter(e=>e.id!=id); render(); }
function editEvent(id){
 let ev=events.find(e=>e.id==id);
 let d=prompt(`Edit date for ${ev.name} (YYYY-MM-DD)`, ev.date);
 if(d){ ev.date=d; render(); }
}
function addEvent(){
 let name=prompt("Event / Task Name:");
 if(!name) return;
 let date=prompt("Date YYYY-MM-DD", "2026-08-30");
 let type=prompt("Type: upcoming / deadlines", "upcoming");
 events.push({id:Date.now(), name, date, type, project:"General", status:"upcoming"});
 render();
}

render();