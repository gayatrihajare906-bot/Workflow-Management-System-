let projects=[
 {id:1, name:"Website Redesign", progress:65, deadline:"Sep 10, 2026", team:"Rahul, Priya", status:"In Progress"},
 {id:2, name:"CRM System Development", progress:40, deadline:"Oct 05, 2026", team:"Amit, Neha", status:"In Progress"},
 {id:3, name:"Mobile App UI", progress:90, deadline:"Aug 30, 2026", team:"Priya", status:"In Progress"},
 {id:4, name:"E-commerce Platform", progress:100, deadline:"Aug 15, 2026", team:"Rahul, Amit", status:"Completed"},
 {id:5, name:"Client Portal", progress:20, deadline:"Nov 01, 2026", team:"Neha", status:"Pending"}
];

let currentFilter="All";

function render(){
 let filtered = currentFilter=="All"? projects : projects.filter(p=>p.status==currentFilter);
 if(currentFilter=="In Progress") filtered = projects.filter(p=>p.status=="In Progress" || p.status=="Pending");

 document.getElementById('projectBody').innerHTML = filtered.map(p=>`
  <tr>
   <td><b>${p.name}</b></td>
   <td><div class="progress-wrap"><div class="progress-fill" style="width:${p.progress}%"></div></div> ${p.progress}%</td>
   <td>${p.deadline}</td>
   <td>${p.team}</td>
   <td><span class="badge ${p.status.toLowerCase().replace(' ','')}">${p.status}</span></td>
   <td>
     <button class="btn btn-edit" onclick="editProject(${p.id})">Edit</button>
     <button class="btn btn-del" onclick="deleteProject(${p.id})">Delete</button>
   </td>
  </tr>
 `).join('');

 document.getElementById('progressList').innerHTML = projects.map(p=>`
  <div style="margin:12px 0">
    <div style="display:flex;justify-content:space-between;font-size:13px"><b>${p.name}</b><span>${p.progress}%</span></div>
    <div class="progress-wrap" style="width:100%;margin-top:6px"><div class="progress-fill" style="width:${p.progress}%"></div></div>
  </div>
 `).join('');

 document.getElementById('deadlineList').innerHTML = projects.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline)).map(p=>`
  <div class="deadline-item"><span><b>${p.name}</b><br><span>Deadline: ${p.deadline}</span></span><span class="badge ${p.status.toLowerCase().replace(' ','')}">${p.status}</span></div>
 `).join('');

 // Stats
 document.getElementById('totalP').innerText = projects.length;
 document.getElementById('assignedP').innerText = projects.filter(p=>p.status!="Completed").length;
 document.getElementById('doneP').innerText = projects.filter(p=>p.status=="Completed").length;
 let avg = Math.round(projects.reduce((s,p)=>s+p.progress,0)/projects.length);
 document.getElementById('avgP').innerText = avg+"% Avg";
 document.getElementById('bar-avg').style.width = avg+"%";
 document.getElementById('bar-assigned').style.width = (projects.filter(p=>p.status!="Completed").length/projects.length*100)+"%";
 document.getElementById('bar-done').style.width = (projects.filter(p=>p.status=="Completed").length/projects.length*100)+"%";

 document.getElementById('count-all').innerText = `(${projects.length})`;
 document.getElementById('count-progress').innerText = `(${projects.filter(p=>p.status=="In Progress").length})`;
 document.getElementById('count-done').innerText = `(${projects.filter(p=>p.status=="Completed").length})`;
}

function filterProject(type){
 currentFilter=type;
 document.getElementById('title').innerText = type=="All"? "My Projects - Assigned Projects" : `My Projects - ${type}`;
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 if(type=="All") document.querySelectorAll('.menu-item')[1].classList.add('active');
 render();
}

function deleteProject(id){
 if(confirm("Delete this project?")){
  projects=projects.filter(p=>p.id!=id);
  render();
 }
}
function editProject(id){
 let p=projects.find(x=>x.id==id);
 let prog=prompt(`Update progress for ${p.name} (0-100)`, p.progress);
 if(prog!==null){ p.progress=parseInt(prog); if(p.progress==100) p.status="Completed"; render(); }
}
function addProject(){
 let name=prompt("Project Name:");
 if(!name) return;
 projects.push({id:Date.now(), name, progress:10, deadline:"Oct 30, 2026", team:"You", status:"In Progress"});
 render();
}

render();