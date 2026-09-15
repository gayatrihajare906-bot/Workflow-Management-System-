document.addEventListener('DOMContentLoaded', () => {
    const teamList = document.getElementById('team-list');
    const addMemberBtn = document.getElementById('add-member-btn');

    teamList.addEventListener('click', (e) => {
        // DELETE
        if (e.target.classList.contains('btn-delete')) {
            const row = e.target.closest('tr');
            const memberName = row.querySelector('.member-name').innerText;
            if (confirm(`Are you sure you want to remove ${memberName}?`)) {
                row.remove();
            }
        }
        // EDIT
        if (e.target.classList.contains('btn-edit')) {
            const row = e.target.closest('tr');
            const nameCell = row.querySelector('.member-name strong');
            const roleCell = row.querySelector('.member-role span');
            const taskCell = row.querySelector('.member-task');
            
            const newName = prompt("Edit Member Name:", nameCell.innerText);
            const newRole = prompt("Edit Role (Frontend / Backend / Design):", roleCell.innerText);
            const newTask = prompt("Edit Task:", taskCell.innerText);
            
            if (newName) nameCell.innerText = newName;
            if (newRole) {
                roleCell.innerText = newRole;
                if (newRole.toLowerCase().includes('backend')) roleCell.className = 'role-badge backend';
                else if (newRole.toLowerCase().includes('design') || newRole.toLowerCase().includes('ui')) roleCell.className = 'role-badge design';
                else roleCell.className = 'role-badge dev';
            }
            if (newTask) taskCell.innerText = newTask;
        }
    });

    // ADD MEMBER
    addMemberBtn.addEventListener('click', () => {
        let name = prompt("Enter Member Name:");
        if (!name) return;
        let role = prompt("Enter Role (Frontend Dev / Backend Dev / UI/UX Designer):", "Frontend Dev");
        let task = prompt("Enter Assigned Task:", "New Task");

        let badgeClass = "dev";
        if (role.toLowerCase().includes("backend")) badgeClass = "backend";
        if (role.toLowerCase().includes("design") || role.toLowerCase().includes("ui")) badgeClass = "design";

        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="member-name"><strong>${name}</strong></td>
            <td class="member-role"><span class="role-badge ${badgeClass}">${role}</span></td>
            <td class="member-task">${task}</td>
            <td class="actions"><button class="btn-edit">Edit</button><button class="btn-delete">Delete</button></td>
        `;
        teamList.appendChild(newRow);
    });
});