let projects=[
 {id:1,name:"Website Redesign",progress:65,deadline:"2026-09-10",team:["Rahul","Priya"],tasks:{total:12,pending:3,completed:7,inprogress:2},status:"In Progress"},
 {id:2,name:"CRM System",progress:40,deadline:"2026-10-05",team:["Amit","Neha","Priya"],tasks:{total:18,pending:8,completed:5,inprogress:5},status:"In Progress"},
 {id:3,name:"Mobile App",progress:85,deadline:"2026-08-30",team:["Priya","Rahul"],tasks:{total:8,pending:1,completed:6,inprogress:1},status:"In Progress"},
 {id:4,name:"E-commerce Platform",progress:100,deadline:"2026-08-15",team:["Amit","Rahul"],tasks:{total:15,pending:0,completed:15,inprogress:0},status:"Completed"}
];

function render(view="All"){
 // Main table
 let html=`<table><thead><tr><th>Project Name</th><th>Project Progress</th><th>Team Members</th><th>Deadlines</th><th>Task Summary</th><th>Status</th><th>Actions</th></tr></thead><tbody>`;
 html+=projects.map(p=>`
  <tr>
   <td><b>${p.name}</b></td>
   <td><div class="p-wrap"><div class="p-fill" style="width:${p.progress}%"></div></div> ${p.progress}%</td>
   <td>${p.team.join(", ")}</td>
   <td>${p.deadline}</td>
   <td>${p.tasks.completed}/${p.tasks.total} Done</td>
   <td><span class="badge ${p.status.toLowerCase().replace(' ','')}">${p.status}</span></td>
   <td><button class="btn btn-e" onclick="editProgress(${p.id})">Edit</button><button class="btn btn-d" onclick="delProject(${p.id})">Delete</button></td>
  </tr>
 `).join('')+`</tbody></table>`;
 document.getElementById('mainCard').innerHTML=html;

 // Side sections
 document.getElementById('progressList').innerHTML=projects.map(p=>`
  <div style="margin:12px 0"><div style="display:flex;justify-content:space-between;font-size:12px"><b>${p.name}</b><span>${p.progress}%</span></div><div class="p-wrap" style="width:100%;margin-top:6px"><div class="p-fill" style="width:${p.progress}%"></div></div><div style="font-size:11px;color:#64748b;margin-top:4px">Tasks: ${p.tasks.completed}/${p.tasks.total} Completed • ${p.tasks.pending} Pending</div></div>
 `).join('');

 document.getElementById('teamList').innerHTML=projects.map(p=>`
  <div class="team-row"><span><b>${p.name}</b><br><span style="font-size:11px;color:#64748b">${p.team.length} Members: ${p.team.join(", ")}</span></span><span class="badge inprogress">${p.team.length} Members</span></div>
 `).join('');

 document.getElementById('deadlineList').innerHTML=projects.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline)).map(p=>`
  <div class="team-row"><span><b>${p.name}</b><br><span style="font-size:11px;color:#64748b">Deadline: ${p.deadline}</span></span><span class="badge ${new Date(p.deadline)<new Date()?'pending':'inprogress'}">${p.status}</span></div>
 `).join('');

 document.getElementById('summaryList').innerHTML=projects.map(p=>`
  <div class="team-row"><span><b>${p.name}</b><br><span style="font-size:11px;color:#64748b">Total: ${p.tasks.total} | ✅ ${p.tasks.completed} | ⏳ ${p.tasks.pending} | 🔵 ${p.tasks.inprogress}</span></span><span style="font-size:11px">${p.progress}%</span></div>
 `).join('');

 // Stats
 document.getElementById('totalP').innerText=projects.length;
 let avg=Math.round(projects.reduce((s,p)=>s+p.progress,0)/projects.length);
 document.getElementById('avgP').innerText=avg+"% Avg";
 document.getElementById('bar-avg').style.width=avg+"%";
 let allMembers=[...new Set(projects.flatMap(p=>p.team))];
 document.getElementById('teamC').innerText=allMembers.length;
 document.getElementById('deadC').innerText=projects.filter(p=>p.status!="Completed").length+" Due";
 document.getElementById('overC').innerText=projects.filter(p=>new Date(p.deadline)<new Date() && p.status!="Completed").length+" Overdue";

 document.getElementById('c-all').innerText=`(${projects.length})`;
 document.getElementById('c-progress').innerText=`(${avg}%)`;
 document.getElementById('c-dead').innerText=`(${projects.filter(p=>p.status!="Completed").length})`;
}

function filterProject(type){
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(type.toLowerCase()=='all'?'all':type.toLowerCase()).classList.add('active');
 if(type=='All'){ document.getElementById('title').innerText="Assigned Projects - All Projects"; }
 if(type=='Progress'){ document.getElementById('title').innerText="Assigned Projects - Project Progress"; }
 if(type=='Team'){ document.getElementById('title').innerText="Assigned Projects - Team Members"; }
 if(type=='Deadlines'){ document.getElementById('title').innerText="Assigned Projects - Deadlines"; }
 if(type=='Summary'){ document.getElementById('title').innerText="Assigned Projects - Task Summary"; }
 render(type);
}

function editProgress(id){
 let p=projects.find(x=>x.id==id);
 let v=prompt(`Update progress for ${p.name} (0-100)`,p.progress);
 if(v!==null){ p.progress=parseInt(v); if(p.progress==100) p.status="Completed"; render(); }
}
function delProject(id){ if(confirm("Delete project?")){ projects=projects.filter(p=>p.id!=id); render(); } }
function addProject(){
 let name=prompt("Project Name:"); if(!name) return;
 projects.push({id:Date.now(),name,progress:10,deadline:"2026-10-30",team:["Rahul"],tasks:{total:5,pending:5,completed:0,inprogress:0},status:"In Progress"});
 render();
}
function showView(v){ render(); }

render();