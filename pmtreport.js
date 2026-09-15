// Mock Data for Reports
let reports = [
    { id: 1, name: "Q3 Task Completion Summary", type: "Task Completion", date: "2026-08-20", status: "Ready" },
    { id: 2, name: "Frontend Team Performance", type: "Team Completion", date: "2026-08-21", status: "Ready" },
    { id: 3, name: "Critical Overdue Items", type: "Overdue Tasks", date: "2026-08-22", status: "Review Needed" },
    { id: 4, name: "Backend Team Performance", type: "Team Completion", date: "2026-08-23", status: "Ready" }
];

// Function to render the table rows
function renderTable() {
    const tableBody = document.getElementById('reports-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    reports.forEach(report => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${report.name}</td>
            <td>${report.type}</td>
            <td>${report.date}</td>
            <td>${report.status}</td>
            <td>
                <button class="btn btn-view" onclick="viewReport(${report.id})">👁️ View</button>
                <button class="btn btn-download" onclick="downloadReport(${report.id})">⬇️ Download</button>
                <button class="btn btn-edit" onclick="editReport(${report.id})">✏️ Edit</button>
                <button class="btn btn-delete" onclick="deleteReport(${report.id})">🗑️ Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Action: View Report
function viewReport(id) {
    const report = reports.find(r => r.id === id);
    alert(`Viewing Report: ${report.name}\nType: ${report.type}\nStatus: ${report.status}`);
    // In a real app, this might open a modal or redirect to a detailed page
}

// Action: Download Report
function downloadReport(id) {
    const report = reports.find(r => r.id === id);
    alert(`Downloading ${report.name} as PDF/CSV...`);
    // In a real app, this triggers a file download via an API endpoint
}

// Action: Edit Report
function editReport(id) {
    const report = reports.find(r => r.id === id);
    const newName = prompt("Edit Report Name:", report.name);
    
    if (newName && newName.trim() !== "") {
        report.name = newName;
        renderTable(); // Re-render table with updated data
        alert("Report updated successfully!");
    }
}

// Action: Delete Report
function deleteReport(id) {
    const confirmDelete = confirm("Are you sure you want to delete this report? This action cannot be undone.");
    
    if (confirmDelete) {
        reports = reports.filter(r => r.id !== id);
        renderTable(); // Re-render table after deletion
    }
}

// Action: Generate New Report (Demo)
function generateNewReport() {
    alert("This would open a wizard to generate a new Task, Team, or Overdue report.");
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});