// ============================================
// TEAM LEADER DASHBOARD
// Team Leader: Gayatri Chavan
// ============================================


// ================= PAGE INFORMATION =================

const pageTitles = {

    dashboard: "Dashboard",

    team: "Team",

    projects: "Projects",

    teamTasks: "Team Tasks",

    assignTask: "Assign Task",

    taskReview: "Task Review",

    teamProgress: "Team Progress",

    notifications: "Notifications",

    profile: "Profile"

};


const pageSubtitles = {

    dashboard:
        "Welcome back, Gayatri Chavan!",

    team:
        "Manage your team members",

    projects:
        "Monitor team projects",

    teamTasks:
        "Track all team tasks",

    assignTask:
        "Assign work to your team member",

    taskReview:
        "Review completed team tasks",

    teamProgress:
        "Check individual team performance",

    notifications:
        "Team and project updates",

    profile:
        "Manage your Team Leader profile"

};


// ================= PAGE NAVIGATION =================

function showPage(pageName) {

    // Hide every page

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    // Remove active sidebar item

    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        item.classList.remove("active");

    });


    // Show selected page

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Highlight sidebar

    const selectedMenu =
        document.querySelector(
            `.menu-item[data-page="${pageName}"]`
        );

    if (selectedMenu) {

        selectedMenu.classList.add("active");

    }


    // Change page title

    document.getElementById("pageTitle")
        .textContent =
        pageTitles[pageName];


    document.getElementById("pageSubtitle")
        .textContent =
        pageSubtitles[pageName];


    // Close mobile sidebar

    document
        .getElementById("sidebar")
        .classList.remove("show");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ================= SIDEBAR MENU =================

document
    .querySelectorAll(".menu-item")
    .forEach(item => {

        item.addEventListener("click", function(event) {

            event.preventDefault();

            const page =
                this.getAttribute("data-page");

            showPage(page);

        });

    });


// ================= MOBILE MENU =================

document
    .getElementById("mobileMenu")
    .addEventListener("click", function() {

        document
            .getElementById("sidebar")
            .classList.toggle("show");

    });


// ================= TOAST =================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ================= ADD TEAM MEMBER =================

function addTeamMember() {

    const name =
        prompt("Enter team member name:");

    if (name && name.trim() !== "") {

        showToast(
            name +
            " added successfully to the team."
        );

    }

}


// ================= CREATE PROJECT =================

function createProject() {

    const project =
        prompt("Enter project name:");

    if (project && project.trim() !== "") {

        showToast(
            "Project '" +
            project +
            "' created successfully."
        );

    }

}


// ================= ASSIGN TASK =================

document
    .getElementById("taskForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const task =
            document.getElementById("taskName").value;


        const member =
            document.getElementById("teamMember").value;


        if (!task || !member) {

            showToast(
                "Please fill all required fields."
            );

            return;

        }


        showToast(
            "Task successfully assigned to " +
            member
        );


        this.reset();

    });


// ================= APPROVE TASK =================

function approveTask(button) {

    const card =
        button.closest(".review-card");


    card.style.borderLeft =
        "4px solid #10b981";


    showToast(
        "Task approved successfully."
    );

}


// ================= REQUEST CHANGES =================

function requestChanges(button) {

    const card =
        button.closest(".review-card");


    card.style.borderLeft =
        "4px solid #ef4444";


    showToast(
        "Changes requested from team member."
    );

}


// ================= MARK NOTIFICATIONS =================

function markAllRead() {

    const notifications =
        document.querySelectorAll(
            ".notification"
        );


    notifications.forEach(notification => {

        notification.classList.remove("unread");

    });


    document
        .getElementById("notificationCount")
        .textContent = "0";


    showToast(
        "All notifications marked as read."
    );

}


// ================= PROFILE =================

document
    .getElementById("profileForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        showToast(
            "Profile updated successfully."
        );

    });


// ================= PROJECT SEARCH =================

function searchProjects() {

    const search =
        document
            .getElementById("projectSearch")
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#projectTable tbody tr"
        );


    rows.forEach(row => {

        const projectText =
            row.textContent.toLowerCase();


        if (projectText.includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// ================= LOGOUT =================

document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        const logout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (logout) {

            showToast(
                "Gayatri Chavan logged out successfully."
            );

        }

    });


// ================= START =================

console.log(
    "Team Leader Dashboard loaded successfully."
);

console.log(
    "Team Leader: Gayatri Chavan"
);