// ==========================================
// ADMIN DASHBOARD JAVASCRIPT
// Admin: Kavya Jain
// ==========================================


// Page navigation
const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

const pageTitles = {
    dashboard: "Dashboard",
    projects: "Projects",
    deadlines: "Project Deadlines",
    team: "Team Members",
    tasks: "Tasks",
    reports: "Reports",
    notifications: "Notifications",
    profile: "Profile"
};

const pageSubtitles = {
    dashboard: "Welcome back, Kavya Jain!",
    projects: "Manage all your projects",
    deadlines: "Track upcoming project deadlines",
    team: "Manage your team members",
    tasks: "Manage and track team tasks",
    reports: "View project and team performance",
    notifications: "Stay updated with your team and projects",
    profile: "Manage your account information"
};


// Show selected page
function showPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    menuItems.forEach(item => {
        item.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const selectedMenu = document.querySelector(
        `.menu-item[data-page="${pageName}"]`
    );

    if (selectedMenu) {
        selectedMenu.classList.add("active");
    }

    document.getElementById("pageTitle").textContent =
        pageTitles[pageName];

    document.getElementById("pageSubtitle").textContent =
        pageSubtitles[pageName];

    // Close mobile sidebar
    document.querySelector(".sidebar").classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Sidebar navigation
menuItems.forEach(item => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        const pageName = this.getAttribute("data-page");

        showPage(pageName);

    });

});


// Mobile menu
document
    .getElementById("mobileMenu")
    .addEventListener("click", function() {

        document
            .querySelector(".sidebar")
            .classList.toggle("show");

    });


// Toast notification
function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// Add project
function addProject() {

    const projectName = prompt("Enter project name:");

    if (projectName && projectName.trim() !== "") {

        showToast(
            `"${projectName}" project created successfully!`
        );

    }

}


// Add team member
function addMember() {

    const memberName = prompt("Enter team member name:");

    if (memberName && memberName.trim() !== "") {

        showToast(
            `${memberName} added to the team successfully!`
        );

    }

}


// Add task
function addTask() {

    const taskName = prompt("Enter task name:");

    if (taskName && taskName.trim() !== "") {

        showToast(
            `Task "${taskName}" added successfully!`
        );

    }

}


// Generate report
function generateReport() {

    showToast("Report generated successfully!");

}


// Save profile
function saveProfile() {

    showToast("Profile changes saved successfully!");

}


// Mark notifications as read
function markNotifications() {

    const notifications =
        document.querySelectorAll(".notification-item");

    notifications.forEach(notification => {
        notification.classList.remove("unread");
    });

    const count =
        document.querySelector(".notification-count");

    count.textContent = "0";

    showToast("All notifications marked as read.");

}


// Notification button
document
    .getElementById("notificationBtn")
    .addEventListener("click", function() {

        showPage("notifications");

    });


// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            showToast("Logged out successfully!");

        }

    });


// Project search
function searchProjects() {

    const input =
        document.getElementById("projectSearch");

    const filter =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll("#projectTable tbody tr");

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}


// Display current date in console
const today = new Date();

console.log(
    "Admin Dashboard loaded for Kavya Jain",
    today.toDateString()
);