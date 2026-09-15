/* =========================================================
   PROJECT MANAGER DASHBOARD
   Project Manager: Gayatri Chavan
========================================================= */


/* =========================================================
   PAGE INFORMATION
========================================================= */

const pageTitles = {

    dashboard: "Dashboard",

    projects: "Projects",

    projectDetails: "Project Details",

    team: "Team Members",

    tasks: "Tasks",

    assignment: "Task Assignment",

    reports: "Reports",

    notifications: "Notifications",

    profile: "Profile"

};


const pageSubtitles = {

    dashboard:
        "Welcome back, Gayatri Chavan",

    projects:
        "Manage all your projects",

    projectDetails:
        "View detailed project information",

    team:
        "Manage your project team",

    tasks:
        "Track and manage project tasks",

    assignment:
        "Assign tasks to team members",

    reports:
        "Project and team performance reports",

    notifications:
        "Latest project updates",

    profile:
        "Manage your profile information"

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageName) {

    /*
        Hide all pages
    */

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    /*
        Remove active menu
    */

    const menuItems =
        document.querySelectorAll(".nav-item");

    menuItems.forEach(item => {

        item.classList.remove("active");

    });


    /*
        Show selected page
    */

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /*
        Highlight sidebar menu
    */

    const selectedMenu =
        document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );

    if (selectedMenu) {

        selectedMenu.classList.add("active");

    }


    /*
        Update header
    */

    document.getElementById("pageTitle")
        .textContent =
        pageTitles[pageName];


    document.getElementById("pageSubtitle")
        .textContent =
        pageSubtitles[pageName];


    /*
        Close sidebar on mobile
    */

    document
        .getElementById("sidebar")
        .classList.remove("show");


    /*
        Scroll to top
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   SIDEBAR CLICK EVENTS
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const page =
                    this.getAttribute(
                        "data-page"
                    );

                showPage(page);

            }
        );

    });


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("sidebar")
                .classList.toggle("show");

        }
    );


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   CREATE PROJECT
========================================================= */

function createProject() {

    const projectName =
        prompt(
            "Enter the new project name:"
        );


    if (
        projectName &&
        projectName.trim() !== ""
    ) {

        showToast(
            "Project '" +
            projectName +
            "' created successfully."
        );

    }

}


/* =========================================================
   ADD TEAM MEMBER
========================================================= */

function addMember() {

    const memberName =
        prompt(
            "Enter team member name:"
        );


    if (
        memberName &&
        memberName.trim() !== ""
    ) {

        showToast(
            memberName +
            " added successfully."
        );

    }

}


/* =========================================================
   TASK ASSIGNMENT
========================================================= */

document
    .getElementById("assignmentForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const task =
                document
                    .getElementById("taskName")
                    .value;


            const member =
                document
                    .getElementById("assignMember")
                    .value;


            if (
                task === "" ||
                member === ""
            ) {

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

        }
    );


/* =========================================================
   REPORT GENERATION
========================================================= */

function generateReport() {

    showToast(
        "Project report generated successfully."
    );

}


/* =========================================================
   MARK NOTIFICATIONS AS READ
========================================================= */

function markNotificationsRead() {

    const notifications =
        document.querySelectorAll(
            ".notification"
        );


    notifications.forEach(notification => {

        notification.classList.remove(
            "unread"
        );

    });


    const count =
        document.querySelector(
            ".notification-count"
        );


    if (count) {

        count.textContent = "0";

    }


    showToast(
        "All notifications marked as read."
    );

}


/* =========================================================
   PROFILE FORM
========================================================= */

document
    .getElementById("profileForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            showToast(
                "Profile updated successfully."
            );

        }
    );


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            const confirmation =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmation) {

                showToast(
                    "Gayatri Chavan logged out successfully."
                );

            }

        }
    );


/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

console.log(
    "Project Manager Dashboard loaded."
);

console.log(
    "Project Manager: Gayatri Chavan"
);