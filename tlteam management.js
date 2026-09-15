let tasks=[
 {id:1,name:"Homepage Development",project:"Website Redesign",assignee:"Rahul Sharma",status:"Pending",priority:"High",deadline:"2026-09-05"},
 {id:2,name:"API Integration",project:"CRM System",assignee:"Priya Patil",status:"In Progress",priority:"High",deadline:"2026-09-08"},
 {id:3,name:"Bug Fixing - Dashboard",project:"Website Redesign",assignee:"Amit Deshmukh",status:"Blocked",priority:"Medium",deadline:"2026-08-22"},
 {id:4,name:"Landing Page Design",project:"Website Redesign",assignee:"Neha Singh",status:"Completed",priority:"Low",deadline:"2026-08-28"},
 {id:5,name:"Database Schema",project:"CRM System",assignee:"Priya Patil",status:"Overdue",priority:"High",deadline:"2026-08-18"},
 {id:6,name:"UI Bug Review",project:"Mobile App",assignee:"Neha Singh",status:"Review",priority:"Medium",deadline:"2026-09-02"},
 {id:7,name:"Checkout Testing",project:"E-commerce",assignee:"Amit Deshmukh",status:"Pending",priority:"High",deadline:"2026-09-10"},
 {id:8,name:"Client Portal Setup",project:"Client Portal",assignee:"Rahul Sharma",status:"Completed",priority:"Medium",deadline:"2026-08-25"}
];

function render(filter="All"){
 let filtered = filter=="All" ? tasks : tasks.filter(t=>t.status==filter);
 if(filter=="All") filtered=tasks;

 document.getElementById('mainCard').innerHTML=`
  <div style="display:flex;justify-content:space-between;margin-bottom:12px"><h3>📋 ${filter=="All"?"All Tasks":filter+" Tasks"} - ${filtered.length}</h3><span style="font-size:12px;color:#64748b">Assign Task = New task add karel</span></div>
  <table><thead><tr><th>Task Name (Assign Task)</th><th>Project</th><th>Assignee</th><th>Status</th><th>Priority</th><th>Deadline</th><th>Actions</th></tr></thead>
  <tbody>${filtered.map(t=>`<tr><td><b>${t.name}</b></td><td>${t.project}</td><td>${t.assignee}</td><td><span class="badge ${t.status.toLowerCase().replace(' ','')}">${t.status}</span></td><td style="font-size:11px;font-weight:600;color:${t.priority=="High"?"#ef4444":t.priority=="Medium"?"#f59e0b":"#22c55e"}">${t.priority}</td><td>${t.deadline}</td><td><button class="btn btn-e" onclick="changeStatus(${t.id})">Edit</button><button class="btn btn-m" onclick="markComplete(${t.id})">Done</button><button class="btn btn-d" onclick="deleteTask(${t.id})">Delete</button></td></tr>`).join('')}</tbody></table>
  ${filtered.length==0?`<p style="text-align:center;padding:20px;color:#94a3b8">No ${filter} tasks found</p>`:''}
 `;

 // Side cards
 let byMember={};
 tasks.forEach(t=>{ byMember[t.assignee]=(byMember[t.assignee]||0)+1; });
 document.getElementById('memberTask').innerHTML=Object.entries(byMember).map(([name,count])=>`<div class="row"><span><b>${name}</b></span><span class="badge inprogress">${count} Tasks</span></div>`).join('');

 let statusCount={Pending:tasks.filter(t=>t.status=="Pending").length, Completed:tasks.filter(t=>t.status=="Completed").length, Blocked:tasks.filter(t=>t.status=="Blocked").length, Overdue:tasks.filter(t=>t.status=="Overdue").length, Review:tasks.filter(t=>t.status=="Review").length, "In Progress":tasks.filter(t=>t.status=="In Progress").length};
 document.getElementById('statusOver').innerHTML=Object.entries(statusCount).map(([k,v])=>`<div class="row"><span>${k}</span><span><div style="display:inline-block;width:60px;height:6px;background:#e2e8f0;border-radius:10px;margin-right:6px"><div style="width:${v/tasks.length*100}%;height:100%;background:${k=="Completed"?"#22c55e":k=="Pending"?"#f59e0b":k=="Blocked"||k=="Overdue"?"#ef4444":"#3b82f6"};border-radius:10px"></div></div> ${v}</span></div>`).join('');

 // Stats
 document.getElementById('total').innerText=tasks.length;
 document.getElementById('pend').innerText=statusCount.Pending;
 document.getElementById('comp').innerText=statusCount.Completed;
 document.getElementById('blockOver').innerText=`${statusCount.Blocked} / ${statusCount.Overdue}`;
 document.getElementById('bar-pend').style.width=(statusCount.Pending/tasks.length*100)+"%";
 document.getElementById('bar-comp').style.width=(statusCount.Completed/tasks.length*100)+"%";

 document.getElementById('c-all').innerText=`(${tasks.length})`;
 document.getElementById('c-pending').innerText=`(${statusCount.Pending})`;
 document.getElementById('c-completed').innerText=`(${statusCount.Completed})`;
 document.getElementById('c-blocked').innerText=`(${statusCount.Blocked})`;
 document.getElementById('c-overdue').innerText=`(${statusCount.Overdue})`;
 document.getElementById('c-review').innerText=`(${statusCount.Review})`;
}

function filterTask(status){
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(status).classList.add('active');
 document.getElementById('title').innerText=`Task Management - ${status}`;
 render(status);
}

function assignTask(){
 let name=prompt("Task Name (Assign Task):");
 if(!name) return;
 let project=prompt("Project Name:","Website Redesign");
 let assignee=prompt("Assign to: Rahul Sharma, Priya Patil, Amit Deshmukh, Neha Singh","Rahul Sharma");
 let priority=prompt("Priority: High / Medium / Low","High");
 let deadline=prompt("Deadline: YYYY-MM-DD","2026-09-15");
 let status=prompt("Status: Pending, In Progress, Review","Pending");
 tasks.push({id:Date.now(),name,project,assignee,status,priority,deadline});
 render("All");
 alert(`✅ Task "${name}" assigned to ${assignee}`);
}

function changeStatus(id){
 let t=tasks.find(x=>x.id==id);
 let s=prompt(`Change status for "${t.name}"\nOptions: Pending, In Progress, Completed, Blocked, Overdue, Review`,t.status);
 if(s){ t.status=s; render(t.status); }
}

function markComplete(id){
 let t=tasks.find(x=>x.id==id);
 t.status="Completed";
 render("Completed");
}

function deleteTask(id){
 if(confirm("Delete this task?")){
  tasks=tasks.filter(t=>t.id!=id);
  render("All");
 }
}

render("All");