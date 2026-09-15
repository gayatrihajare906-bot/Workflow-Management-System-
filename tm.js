/* =========================================================
   TEAM MEMBER DASHBOARD
   Members:
   1. Bhakti Deshmukh
   2. Gayatri Hajare
========================================================= */


/* =========================================================
   MEMBER DATA
========================================================= */

const members = {

    "Bhakti Deshmukh": {

        initials: "BD",

        firstName: "Bhakti",

        email: "bhakti@example.com",

        department: "Development"

    },


    "Gayatri Hajare": {

        initials: "GH",

        firstName: "Gayatri",

        email: "gayatri@example.com",

        department: "Development"

    }

};


/* =========================================================
   PAGE TITLES
========================================================= */

const pageTitles = {

    dashboard: "Dashboard",

    tasks: "My Tasks",

    deadlines: "Task Deadlines",

    projects: "My Projects",

    calendar: "Calendar",

    notifications: "Notifications",

    profile: "My Profile"

};


const pageSubtitles = {

    dashboard: "Welcome back, Team Member",

    tasks: "View and manage your assigned tasks",

    deadlines: "Keep track of your upcoming deadlines",

    projects: "Projects assigned to you",

    calendar: "View your task schedule",

    notifications: "Your latest project updates",

    profile: "Manage your personal information"

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageName) {

    /*
        Hide all pages
    */

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    /*
        Remove active navigation
    */

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    /*
        Display selected page
    */

    const page =
        document.getElementById(pageName);

    if (page) {

        page.classList.add("active");

    }


    /*
        Highlight selected menu
    */

    const nav =
        document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );

    if (nav) {

        nav.classList.add("active");

    }


    /*
        Update heading
    */

    document
        .getElementById("pageTitle")
        .textContent =
        pageTitles[pageName];


    document
        .getElementById("pageSubtitle")
        .textContent =
        pageSubtitles[pageName];


    /*
        Close mobile menu
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
   SIDEBAR NAVIGATION
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
   MOBILE MENU
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
   MEMBER SWITCHER
========================================================= */

document
    .getElementById("memberSelect")
    .addEventListener(
        "change",
        function() {

            const memberName =
                this.value;

            changeMember(memberName);

        }
    );


function changeMember(memberName) {

    const member =
        members[memberName];


    if (!member) {
        return;
    }


    /*
        Header name
    */

    document
        .getElementById("headerName")
        .textContent =
        memberName;


    /*
        Header avatar
    */

    document
        .getElementById("headerAvatar")
        .textContent =
        member.initials;


    /*
        Welcome message
    */

    document
        .getElementById("welcomeName")
        .textContent =
        `Welcome back, ${member.firstName}! 👋`;


    /*
        Profile
    */

    document
        .getElementById("profileName")
        .value =
        memberName;


    /*
        Profile avatar
    */

    document
        .getElementById("profileAvatar")
        .textContent =
        member.initials;


    /*
        Profile email
    */

    const emailInput =
        document.querySelector(
            '#profile input[type="email"]'
        );

    if (emailInput) {

        emailInput.value =
            member.email;

    }


    /*
        Department
    */

    const inputs =
        document.querySelectorAll(
            "#profile input"
        );


    if (inputs.length >= 4) {

        inputs[3].value =
            member.department;

    }


    showToast(
        `${memberName} profile selected.`
    );

}


/* =========================================================
   TASK FILTER
========================================================= */

function filterTasks(
    status,
    button
) {

    /*
        Update active filter
    */

    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    /*
        Filter tasks
    */

    const tasks =
        document.querySelectorAll(
            ".task-row"
        );


    tasks.forEach(task => {

        const taskStatus =
            task.getAttribute(
                "data-status"
            );


        if (
            status === "all" ||
            taskStatus === status
        ) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

}


/* =========================================================
   COMPLETE TASK
========================================================= */

function completeTask(button) {

    const taskRow =
        button.closest(".task-row");


    const taskName =
        taskRow.querySelector(
            ".task-details strong"
        ).textContent;


    /*
        Change task status
    */

    const status =
        taskRow.querySelector(".status");


    status.textContent =
        "Completed";


    status.className =
        "status completed-status";


    /*
        Change task category
    */

    taskRow.setAttribute(
        "data-status",
        "completed"
    );


    /*
        Disable button
    */

    button.textContent =
        "Done";

    button.disabled = true;

    button.classList.add("disabled");


    /*
        Change icon
    */

    const icon =
        taskRow.querySelector(
            ".task-check"
        );

    icon.innerHTML =
        '<i class="fa-solid fa-check"></i>';

    icon.className =
        "task-check green";


    showToast(
        `"${taskName}" marked as completed.`
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function markNotificationsRead() {

    document
        .querySelectorAll(".notification")
        .forEach(notification => {

            notification.classList.remove(
                "unread"
            );

        });


    /*
        Set notification count to zero
    */

    document
        .getElementById(
            "notificationCount"
        )
        .textContent = "0";


    showToast(
        "All notifications marked as read."
    );

}


/* =========================================================
   PROFILE SAVE
========================================================= */

document
    .getElementById("profileForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const newName =
                document
                    .getElementById(
                        "profileName"
                    )
                    .value;


            /*
                Update header
            */

            document
                .getElementById(
                    "headerName"
                )
                .textContent =
                newName;


            /*
                Update initials
            */

            const initials =
                getInitials(newName);


            document
                .getElementById(
                    "headerAvatar"
                )
                .textContent =
                initials;


            document
                .getElementById(
                    "profileAvatar"
                )
                .textContent =
                initials;


            showToast(
                "Profile updated successfully."
            );

        }
    );


/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word =>
            word.charAt(0)
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================================================
   CALENDAR
========================================================= */

let currentMonth = 7;

let currentYear = 2026;


function renderCalendar() {

    const calendarDays =
        document.getElementById(
            "calendarDays"
        );


    const calendarMonth =
        document.getElementById(
            "calendarMonth"
        );


    calendarDays.innerHTML = "";


    /*
        Month name
    */

    const date =
        new Date(
            currentYear,
            currentMonth,
            1
        );


    const monthName =
        date.toLocaleString(
            "default",
            {
                month: "long"
            }
        );


    calendarMonth.textContent =
        `${monthName} ${currentYear}`;


    /*
        First day
    */

    const firstDay =
        date.getDay();


    /*
        Number of days
    */

    const totalDays =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    /*
        Empty days
    */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(
            empty
        );

    }


    /*
        Event dates
    */

    const eventDates = [
        20,
        23,
        25,
        28,
        30
    ];


    /*
        Create calendar days
    */

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.className =
            "calendar-day";


        dayElement.textContent =
            day;


        /*
            Highlight today
            Demo date:
            18 August 2026
        */

        if (
            day === 18 &&
            currentMonth === 7 &&
            currentYear === 2026
        ) {

            dayElement.classList.add(
                "today"
            );

        }


        /*
            Event marker
        */

        if (
            eventDates.includes(day) &&
            currentMonth === 7 &&
            currentYear === 2026
        ) {

            dayElement.classList.add(
                "event"
            );

        }


        /*
            Click calendar date
        */

        dayElement.addEventListener(
            "click",
            function() {

                showToast(
                    `Selected ${day} ${monthName} ${currentYear}`
                );

            }
        );


        calendarDays.appendChild(
            dayElement
        );

    }

}


/* =========================================================
   CHANGE CALENDAR MONTH
========================================================= */

function changeMonth(direction) {

    currentMonth += direction;


    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }


    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }


    renderCalendar();

}


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                showToast(
                    "Logged out successfully."
                );

            }

        }
    );


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderCalendar();

console.log(
    "Team Member Dashboard Loaded"
);

console.log(
    "Members: Bhakti Deshmukh & Gayatri Hajare"
);