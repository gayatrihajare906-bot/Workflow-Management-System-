document.addEventListener('DOMContentLoaded', () => {
    const deadlineList = document.getElementById('deadline-list');
    const addDeadlineBtn = document.getElementById('add-deadline-btn');

    // Event Delegation for dynamically interacting with rows
    deadlineList.addEventListener('click', (e) => {
        
        // --- DELETE FUNCTIONALITY ---
        if (e.target.classList.contains('btn-delete')) {
            const row = e.target.closest('tr');
            const workTask = row.querySelector('.deadline-work').innerText;
            
            if (confirm(`Are you sure you want to delete the deadline for: "${workTask}"?`)) {
                row.remove();
            }
        }

        // --- EDIT FUNCTIONALITY ---
        if (e.target.classList.contains('btn-edit')) {
            const row = e.target.closest('tr');
            
            // Elements to update
            const dateBadge = row.querySelector('.date-badge');
            const monthCell = row.querySelector('.deadline-month');
            const workCell = row.querySelector('.deadline-work');
            
            // Prompts for new values
            const newDate = prompt("Edit Date (Number):", dateBadge.innerText);
            const newMonth = prompt("Edit Month:", monthCell.innerText);
            const newWork = prompt("Edit Work / Task:", workCell.innerText);
            
            // Apply updates if input is not null
            if (newDate && newDate.trim() !== "") {
                // Ensure date is formatted nicely (e.g., "05" instead of "5")
                dateBadge.innerText = newDate.trim().padStart(2, '0');
            }
            if (newMonth && newMonth.trim() !== "") {
                monthCell.innerText = newMonth.trim();
            }
            if (newWork && newWork.trim() !== "") {
                workCell.innerText = newWork.trim();
            }
        }
    });

    // --- ADD DEADLINE PLACEHOLDER ---
    addDeadlineBtn.addEventListener('click', () => {
        alert("A date picker and task creation modal would open here to append a new row to the calendar.");
    });
});