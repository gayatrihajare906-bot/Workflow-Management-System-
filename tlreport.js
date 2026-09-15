let team=[
 {name:"Rahul Sharma",role:"Frontend",tasks:12,completed:9,overdue:1,performance:85,efficiency:"Good"},
 {name:"Priya Patil",role:"Backend",tasks:15,completed:13,overdue:0,performance:92,efficiency:"Excellent"},
 {name:"Amit Deshmukh",role:"QA",tasks:10,completed:7,overdue:2,performance:78,efficiency:"Average"},
 {name:"Neha Singh",role:"UI/UX",tasks:8,completed:6,overdue:1,performance:88,efficiency:"Good"}
];

let taskReport=[
 {project:"Website Redesign",total:12,completed:7,pending:3,blocked:1,overdue:1,completion:58},
 {project:"CRM System",total:18,completed:8,pending:6,blocked:2,overdue:2,completion:44},
 {project:"Mobile App",total:8,completed:6,pending:1,blocked:0,overdue:1,completion:75},
 {project:"E-commerce",total:15,completed:15,pending:0,blocked:0,overdue:0,completion:100}
];

let projectProgress=[
 {name:"Website Redesign",progress:65,deadline:"Sep 10, 2026",status:"In Progress",team:4,budget:"85% Used"},
 {name:"CRM System",progress:40,deadline:"Oct 05, 2026",status:"In Progress",team:3,budget:"45% Used"},
 {name:"Mobile App",progress:85,deadline:"Aug 30, 2026",status:"In Progress",team:2,budget:"90% Used"},
 {name:"E-commerce",progress:100,deadline:"Aug 15, 2026",status:"Completed",team:2,budget:"100% Used"}
];

let overdueReport=[
 {task:"Database Schema Design",assignee:"Priya Patil",project:"CRM System",deadline:"Aug 18",daysOverdue:6,priority:"High",reason:"Waiting for client approval"},
 {task:"Bug Fixing - Dashboard",assignee:"Amit Deshmukh",project:"Website Redesign",deadline:"Aug 22",daysOverdue:2,priority:"Medium",reason:"Blocked by API"},
 {task:"Client Meeting Notes",assignee:"Rahul Sharma",project:"Mobile App",deadline:"Aug 20",daysOverdue:4,priority:"High",reason:"Client feedback pending"},
 {task:"API Documentation",assignee:"Neha Singh",project:"CRM System",deadline:"Aug 15",daysOverdue:9,priority:"Low",reason:"Low priority"}
];

let current="Team Performance";

function render(){
 if(current=="Team Performance"){
   document.getElementById('stats').innerHTML=`
    <div class="stat-card"><small>Team Members</small><h2>${team.length}</h2></div>
    <div class="stat-card"><small>Avg Performance</small><h2>${Math.round(team.reduce((s,m)=>s+m.performance,0)/team.length)}%</h2><div class="bar"><div class="fill green" style="width:86%"></div></div></div>
    <div class="stat-card"><small>Total Tasks Done</small><h2>${team.reduce((s,m)=>s+m.completed,0)}/${team.reduce((s,m)=>s+m.tasks,0)}</h2></div>
    <div class="stat-card"><small>Overdue Tasks</small><h2 style="color:#ef4444">${team.reduce((s,m)=>s+m.overdue,0)}</h2></div>
   `;
   document.getElementById('mainCard').innerHTML=`
    <h3>📊 Team Performance Report</h3><br>
    <table><thead><tr><th>Member</th><th>Role</th><th>Total Tasks</th><th>Completed</th><th>Overdue</th><th>Performance</th><th>Efficiency</th></tr></thead>
    <tbody>${team.map(m=>`<tr><td><b>${m.name}</b></td><td>${m.role}</td><td>${m.tasks}</td><td style="color:#22c55e">${m.completed}</td><td style="color:#ef4444">${m.overdue}</td><td><div class="p-wrap"><div class="p-fill" style="width:${m.performance}%;background:${m.performance>=85?'#22c55e':'#f59e0b'}"></div></div> ${m.performance}%</td><td><span class="badge ${m.efficiency=="Excellent"||m.efficiency=="Good"?"good":m.efficiency=="Average"?"avg":"poor"}">${m.efficiency}</span></td></tr>`).join('')}</tbody></table>
   `;
   document.getElementById('bottomGrid').innerHTML=`
    <div class="card"><h3>🏆 Top Performers</h3>${team.sort((a,b)=>b.performance-a.performance).map(m=>`<div class="row"><span><b>${m.name}</b> - ${m.role}</span><span>${m.performance}%</span></div>`).join('')}</div>
    <div class="card"><h3>📉 Needs Improvement</h3>${team.filter(m=>m.performance<85).map(m=>`<div class="row"><span>${m.name} - ${m.overdue} Overdue</span><span class="badge poor">${m.performance}%</span></div>`).join('') || '<p style="font-size:12px;color:#22c55e">All members performing well! ✅</p>'}</div>
   `;
 }
 if(current=="Task Report"){
   document.getElementById('stats').innerHTML=`
    <div class="stat-card"><small>Total Tasks</small><h2>${taskReport.reduce((s,p)=>s+p.total,0)}</h2></div>
    <div class="stat-card"><small>Completed</small><h2>${taskReport.reduce((s,p)=>s+p.completed,0)}</h2><div class="bar"><div class="fill green" style="width:67%"></div></div></div>
    <div class="stat-card"><small>Pending / Blocked</small><h2>${taskReport.reduce((s,p)=>s+p.pending,0)} / ${taskReport.reduce((s,p)=>s+p.blocked,0)}</h2></div>
    <div class="stat-card"><small>Overdue</small><h2 style="color:#ef4444">${taskReport.reduce((s,p)=>s+p.overdue,0)}</h2></div>
   `;
   document.getElementById('mainCard').innerHTML=`
    <h3>📝 Task Report - By Project</h3><br>
    <table><thead><tr><th>Project</th><th>Total</th><th>Completed</th><th>Pending</th><th>Blocked</th><th>Overdue</th><th>Completion %</th></tr></thead>
    <tbody>${taskReport.map(r=>`<tr><td><b>${r.project}</b></td><td>${r.total}</td><td style="color:#22c55e">${r.completed}</td><td style="color:#f59e0b">${r.pending}</td><td style="color:#ef4444">${r.blocked}</td><td style="color:#7f1d1d">${r.overdue}</td><td><div class="p-wrap"><div class="p-fill" style="width:${r.completion}%;background:${r.completion==100?'#22c55e':'#3b82f6'}"></div></div> ${r.completion}%</td></tr>`).join('')}</tbody></table>
   `;
   document.getElementById('bottomGrid').innerHTML=`<div class="card"><h3>📊 Completion Chart</h3>${taskReport.map(r=>`<div style="margin:10px 0"><div style="display:flex;justify-content:space-between;font-size:12px"><b>${r.project}</b><span>${r.completion}%</span></div><div class="p-wrap" style="width:100%;margin-top:5px"><div class="p-fill blue" style="width:${r.completion}%"></div></div></div>`).join('')}</div><div class="card"><h3>Summary</h3><p style="font-size:12px;color:#64748b;line-height:20px">Total Tasks: ${taskReport.reduce((s,p)=>s+p.total,0)}<br>Completed: ${taskReport.reduce((s,p)=>s+p.completed,0)} (${Math.round(taskReport.reduce((s,p)=>s+p.completed,0)/taskReport.reduce((s,p)=>s+p.total,0)*100)}%)<br>Pending: ${taskReport.reduce((s,p)=>s+p.pending,0)}<br>Blocked: ${taskReport.reduce((s,p)=>s+p.blocked,0)} need attention</p></div>`;
 }
 if(current=="Project Progress"){
   document.getElementById('stats').innerHTML=`
    <div class="stat-card"><small>Total Projects</small><h2>${projectProgress.length}</h2></div>
    <div class="stat-card"><small>Avg Progress</small><h2>${Math.round(projectProgress.reduce((s,p)=>s+p.progress,0)/projectProgress.length)}%</h2><div class="bar"><div class="fill blue" style="width:72%"></div></div></div>
    <div class="stat-card"><small>Completed</small><h2>${projectProgress.filter(p=>p.status=="Completed").length}</h2></div>
    <div class="stat-card"><small>In Progress</small><h2>${projectProgress.filter(p=>p.status!="Completed").length}</h2></div>
   `;
   document.getElementById('mainCard').innerHTML=`
    <h3>📈 Project Progress Report</h3><br>
    <table><thead><tr><th>Project Name</th><th>Progress</th><th>Deadline</th><th>Team Size</th><th>Budget</th><th>Status</th></tr></thead>
    <tbody>${projectProgress.map(p=>`<tr><td><b>${p.name}</b></td><td><div class="p-wrap"><div class="p-fill blue" style="width:${p.progress}%"></div></div> ${p.progress}%</td><td>${p.deadline}</td><td>${p.team} Members</td><td>${p.budget}</td><td><span class="badge ${p.status=="Completed"?"good":"inprogress"}">${p.status}</span></td></tr>`).join('')}</tbody></table>
   `;
   document.getElementById('bottomGrid').innerHTML=`<div class="card"><h3>📈 Progress Timeline</h3>${projectProgress.map(p=>`<div class="row"><span><b>${p.name}</b><br><span style="font-size:11px;color:#64748b">Deadline: ${p.deadline}</span></span><span>${p.progress}%</span></div>`).join('')}</div><div class="card"><h3>Budget Utilization</h3>${projectProgress.map(p=>`<div class="row"><span>${p.name}</span><span>${p.budget}</span></div>`).join('')}</div>`;
 }
 if(current=="Overdue Report"){
   document.getElementById('stats').innerHTML=`
    <div class="stat-card"><small>Total Overdue</small><h2 style="color:#ef4444">${overdueReport.length}</h2></div>
    <div class="stat-card"><small>High Priority</small><h2>${overdueReport.filter(r=>r.priority=="High").length}</h2></div>
    <div class="stat-card"><small>Avg Days Overdue</small><h2>${Math.round(overdueReport.reduce((s,r)=>s+r.daysOverdue,0)/overdueReport.length)} Days</h2></div>
    <div class="stat-card"><small>Members Affected</small><h2>${[...new Set(overdueReport.map(r=>r.assignee))].length}</h2></div>
   `;
   document.getElementById('mainCard').innerHTML=`
    <h3>⚠️ Overdue Report - Needs Immediate Action</h3><br>
    <table><thead><tr><th>Task</th><th>Assignee</th><th>Project</th><th>Deadline</th><th>Days Overdue</th><th>Priority</th><th>Reason</th></tr></thead>
    <tbody>${overdueReport.map(r=>`<tr><td><b>${r.task}</b></td><td>${r.assignee}</td><td>${r.project}</td><td>${r.deadline}</td><td style="color:#ef4444;font-weight:700">${r.daysOverdue} Days</td><td><span class="badge ${r.priority=="High"?"poor":r.priority=="Medium"?"avg":"inprogress"}">${r.priority}</span></td><td style="font-size:11px;color:#64748b">${r.reason}</td></tr>`).join('')}</tbody></table>
   `;
   document.getElementById('bottomGrid').innerHTML=`<div class="card"><h3>🚨 Critical Overdue (High Priority)</h3>${overdueReport.filter(r=>r.priority=="High").map(r=>`<div class="row"><span><b>${r.task}</b><br><span style="font-size:11px;color:#64748b">${r.assignee} • ${r.daysOverdue} days overdue</span></span><span class="badge poor">High</span></div>`).join('')}</div><div class="card"><h3>👥 Overdue by Member</h3>${Object.entries(overdueReport.reduce((a,c)=>{a[c.assignee]=(a[c.assignee]||0)+1;return a},{})).map(([name,count])=>`<div class="row"><span>${name}</span><span style="color:#ef4444">${count} Overdue</span></div>`).join('')}</div>`;
 }
}

function filterReport(type){
 current=type;
 document.querySelectorAll('.menu-item').forEach(el=>el.classList.remove('active'));
 document.getElementById(type).classList.add('active');
 document.getElementById('title').innerText="Reports - "+type;
 render();
}

function exportReport(){
 alert(`📥 Exporting ${current} Report...\n\nFile: ${current.replace(' ','_')}_Report_${new Date().toISOString().split('T')[0]}.pdf\n\n✅ Report exported successfully!`);
}

render();