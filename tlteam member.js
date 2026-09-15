let members=[
 {id:1,name:"Rahul Sharma",role:"Frontend Developer",email:"rahul@company.com",tasks:5,completed:3,pending:2,performance:85,status:"Active",projects:["Website Redesign","Mobile App"]},
 {id:2,name:"Priya Patil",role:"Backend Developer",email:"priya@company.com",tasks:6,completed:4,pending:2,performance:92,status:"Active",projects:["CRM System","Website Redesign"]},
 {id:3,name:"Amit Deshmukh",role:"QA Engineer",email:"amit@company.com",tasks:3,completed:2,pending:1,performance:78,status:"On Leave",projects:["CRM System","E-commerce"]},
 {id:4,name:"Neha Singh",role:"UI/UX Designer",email:"neha@company.com",tasks:4,completed:3,pending:1,performance:88,status:"Busy",projects:["Mobile App"]},
 {id:5,name:"Suresh Kumar",role:"DevOps",email:"suresh@company.com",tasks:2,completed:1,pending:1,performance:80,status:"Active",projects:["E-commerce","CRM System"]}
];

function render(view="List"){
 let html="";
 if(view=="List"){
   html=`<table><thead><tr><th>Member List</th><th>Role</th><th>Email</th><th>Projects</th><th>Status</th><th>Actions</th></tr></thead><tbody>
   ${members.map(m=>`<tr><td><b>${m.name}</b></td><td>${m.role}</td><td style="color:#64748b">${m.email}</td><td>${m.projects.join(", ")}</td><td><span class="badge ${m.status.toLowerCase().replace(' ','')}">${m.status}</span></td><td><button class="btn btn-e" onclick="editMember(${m.id})">Edit</button><button class="btn btn-d" onclick="delMember(${m.id})">Delete</button></td></tr>`).join('')}
   </tbody></table>`;
 }
 if(view=="Tasks"){
   html=`<table><thead><tr><th>Member</th><th>Assigned Tasks</th><th>Completed</th><th>Pending</th><th>Completion Rate</th><th>Action</th></tr></thead><tbody>
   ${members.map(m=>`<tr><td><b>${m.name}</b><br><span style="font-size:11px;color:#64748b">${m.role}</span></td><td>${m.tasks}</td><td style="color:#22c55e">${m.completed}</td><td style="color:#f59e0b">${m.pending}</td><td><div class="p-wrap"><div class="p-fill" style="width:${(m.completed/m.tasks*100)}%"></div></div> ${Math.round(m.completed/m.tasks*100)}%</td><td><button class="btn btn-e" onclick="assignTaskTo(${m.id})">Assign Task</button></td></tr>`).join('')}
   </tbody></table>`;
 }
 if(view=="Performance"){
   html=`<table><thead><tr><th>Member</th><th>Role</th><th>Performance</th><th>Tasks Done</th><th>Rating</th><th>Work Status</th></tr></thead><tbody>
   ${members.map(m=>`<tr><td><b>${m.name}</b></td><td>${m.role}</td><td><div class="p-wrap"><div class="p-fill" style="width:${m.performance}%;background:${m.performance>=85?'#22c55e':'#3b82f6'}"></div></div> ${m.performance}%</td><td>${m.completed}/${m.tasks}</td><td>${m.performance>=90?'⭐⭐⭐':m.performance>=80?'⭐⭐⭐⭐':'⭐⭐⭐'}</td><td><span class="badge ${m.status.toLowerCase().replace(' ','')}">${m.status}</span></td></tr>`).join('')}
   </tbody></table>`;
 }
 if(view=="Status"){
   html=`<table><thead><tr><th>Member</th><th>Current Status</th><th>Work Status</th><th>Projects Working</th><th>Availability</th><th>Actions</th></tr></thead><tbody>
   ${members.map(m=>`<tr><td><b>${m.name}</b><br><span style="font-size:11px;color:#64748b">${m.role}</span></td><td><span class="badge ${m.status.toLowerCase().replace(' ','')}">${m.status}</span></td><td>${m.tasks>4?'Overloaded':m.tasks>2?'Normal':'Available'}</td><td>${m.projects.length} Projects</td><td>${m.status=="Active"?'✅ Available':m.status=="Busy"?'⏳ Busy':'❌ On Leave'}</td><td><button class="btn btn-e" onclick="changeStatus(${m.id})">Change Status</button></td></tr>`).join('')}
   </tbody></table>`;
 }

 document.getElementById('mainCard').innerHTML=html;

 // Side cards
 document.getElementById('perfList').innerHTML=members.map(m=>`<div class="perf-row"><div class="perf-head"><b style="font-size:12px">${m.name}</b><span style="font-size:12px">${m.performance}%</span></div><div class="p-wrap" style="width:100%;margin-top:6px"><div class="p-fill" style="width:${m.performance}%;background:${m.performance>=85?'#22c55e':'#3b82f6'}"></div></div><div style="font-size:11px;color:#64748b">${m.role} • ${m.completed}/${m.tasks} tasks done</div></div>`).join('');
 document.getElementById('statusList').innerHTML=members.map(m=>`<div style="padding:8px 0;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;font-size:12px"><span><b>${m.name}</b><br><span style="font-size:11px;color:#64748b">${m.role}</span></span><span class="badge ${m.status.toLowerCase().replace(' ','')}">${m.status}</span></div>`).join('');

 // Stats
 document.getElementById('totalM').innerText=members.length;
 document.getElementById('totalT').innerText=members.reduce((s,m)=>s+m.tasks,0)+" Tasks";
 let avg=Math.round(members.reduce((s,m)=>s+m.performance,0)/members.length);
 document.getElementById('avgP').innerText=avg+"%";
 document.getElementById('bar-perf').style.width=avg+"%";
 document.getElementById('bar-task').style.width="70%";
 document.getElementById('activeC').innerText=`${members.filter(m=>m.status=="Active").length} / ${members.filter(m=>m.status=="On Leave").length}`;
 document.getElementById('c-list').innerText=`(${members.length})`;
 document.getElementById('c-tasks').innerText=`(${members.reduce((s,m)=>s+m.tasks,0)})`;
 document.getElementById('c-perf').innerText=`(${avg}%)`;
 document.getElementById('c-status').innerText=`(${members.filter(m=>m.status=="Active").length})`;
}

function filterTeam(type){
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(type.toLowerCase()).classList.add('active');
 let titleMap={List:"Member List",Tasks:"Assigned Tasks",Performance:"Performance",Status:"Work Status"};
 document.getElementById('title').innerText="Team Members - "+titleMap[type];
 render(type);
}

function editMember(id){ let m=members.find(x=>x.id==id); let p=prompt(`Update performance for ${m.name} (0-100)`,m.performance); if(p){m.performance=parseInt(p); render();} }
function delMember(id){ if(confirm("Delete member?")){ members=members.filter(m=>m.id!=id); render(); } }
function changeStatus(id){ let m=members.find(x=>x.id==id); let s=prompt("Status: Active, On Leave, Busy, Offline",m.status); if(s){m.status=s; render();} }
function assignTaskTo(id){ let m=members.find(x=>x.id==id); m.tasks++; m.pending++; alert(`Task assigned to ${m.name}`); render('Tasks'); }
function addMember(){
 let name=prompt("Member Name:"); if(!name) return;
 let role=prompt("Role:","Developer");
 members.push({id:Date.now(),name,role,email:name.toLowerCase().replace(' ','')+"@company.com",tasks:0,completed:0,pending:0,performance:75,status:"Active",projects:[]});
 render();
}

render("List");