// Role Save Function
function saveRole(button) {
    const row = button.closest('tr');
    const name = row.cells[0].innerText;
    const select = row.querySelector('select');
    const newRole = select.value;
    const badge = row.querySelector('.badge');

    // Badge update kara
    badge.innerText = newRole;
    badge.className = 'badge'; // june class kadha

    if (newRole === 'Admin') badge.classList.add('role-admin');
    else if (newRole === 'Project Manager') badge.classList.add('role-pm');
    else if (newRole === 'Team Leader') badge.classList.add('role-leader');
    else badge.classList.add('role-member');

    // Button animation
    button.innerText = 'Saved ✓';
    button.style.background = '#4caf50';

    setTimeout(() => {
        button.innerText = 'Save';
        button.style.background = '';
    }, 2000);

    console.log(`${name} cha role badalun ${newRole} kela`);
    // alert(`${name} is now ${newRole}`); // hava asel tar uncomment kara
}

// Page load zalyavar table cha color set kara
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const select = row.querySelector('select');
        if(select) {
            select.addEventListener('change', function() {
                row.style.background = '#fffbe6';
            });
        }
    });
});