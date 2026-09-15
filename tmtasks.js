let tasks=[
 {id:1, name:"Frontend Development - Homepage", status:"In Progress", project:"Website Redesign", priority:"High", deadline:"Sep 10, 2026"},
 {id:2, name:"API Integration for Login", status:"To Do", project:"CRM System", priority:"High", deadline:"Sep 12, 2026"},
 {id:3, name:"UI Bug Fixing - Dashboard", status:"Review", project:"Website Redesign", priority:"Medium", deadline:"Sep 05, 2026"},
 {id:4, name:"Landing Page Design", status:"Completed", project:"Website Redesign", priority:"Low", deadline:"Aug 28, 2026"},
 {id:5, name:"Client Meeting Notes Update", status:"Overdue", project:"Mobile App", priority:"High", deadline:"Aug 20, 2026"},
 {id:6, name:"Database Schema Design", status:"To Do", project:"CRM System", priority:"Medium", deadline:"Oct 01, 2026"},
 {id:7, name:"Testing - Checkout Flow", status:"In Progress", project:"E-commerce", priority:"High", deadline:"Sep 15, 2026"}
];

let currentFilter="All";

function render(){
 let filtered = currentFilter=="All" ? tasks : tasks.filter(t=>t.status==currentFilter);
 
 document.getElementById('taskBody').innerHTML = filtered.map(t=>`
  <tr>
   <td><b>${t.name}</b></td>
   <td><span class="badge ${t.status.toLowerCase().replace(' ','')}">${t.status}</span></td>
   <td>${t.project}</td>
   <td><span class="${t.priority.toLowerCase()}">${t.priority}</span></td>
   <td>${t.deadline}</td>
   <td>
     <button class="btn btn-edit" onclick="changeStatus(${t.id})">Edit</button>
     <button class="btn btn-del" onclick="deleteTask(${t.id})">Delete</button>
   </td>
  </tr>
 `).join('');

 // Counts
 document.getElementById('total').innerText=tasks.length;
 document.getElementById('todo').innerText=tasks.filter(t=>t.status=="To Do").length;
 document.getElementById('progress').innerText=tasks.filter(t=>t.status=="In Progress").length;
 document.getElementById('done').innerText=tasks.filter(t=>t.status=="Completed").length;

 document.getElementById('c-All').innerText=`(${tasks.length})`;
 document.getElementById('c-To Do').innerText=`(${tasks.filter(t=>t.status=="To Do").length})`;
 document.getElementById('c-In Progress').innerText=`(${tasks.filter(t=>t.status=="In Progress").length})`;
 document.getElementById('c-Review').innerText=`(${tasks.filter(t=>t.status=="Review").length})`;
 document.getElementById('c-Completed').innerText=`(${tasks.filter(t=>t.status=="Completed").length})`;
 document.getElementById('c-Overdue').innerText=`(${tasks.filter(t=>t.status=="Overdue").length})`;

 document.getElementById('bar-todo').style.width=(tasks.filter(t=>t.status=="To Do").length/tasks.length*100)+"%";
 document.getElementById('bar-progress').style.width=(tasks.filter(t=>t.status=="In Progress").length/tasks.length*100)+"%";
 document.getElementById('bar-done').style.width=(tasks.filter(t=>t.status=="Completed").length/tasks.length*100)+"%";
}

function filterTasks(status){
 currentFilter=status;
 document.getElementById('title').innerText=`My Tasks - ${status}`;
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(status).classList.add('active');
 render();
}

function deleteTask(id){
 if(confirm("Delete this task?")){
  tasks=tasks.filter(t=>t.id!=id);
  render();
 }
}

function changeStatus(id){
 let t=tasks.find(x=>x.id==id);
 let s=prompt(`Change status for "${t.name}"\nOptions: To Do, In Progress, Review, Completed, Overdue`, t.status);
 if(s && ["To Do","In Progress","Review","Completed","Overdue"].includes(s)){
  t.status=s;
  render();
 }
}

function addTask(){
 let name=prompt("Enter Task Name:");
 if(!name) return;
 let project=prompt("Project Name:", "Website Redesign");
 let priority=prompt("Priority: High / Medium / Low", "Medium");
 tasks.push({id:Date.now(), name, status:"To Do", project, priority, deadline:"Sep 30, 2026"});
 render();
}

render();