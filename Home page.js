// Scroll to the role section
function scrollToRoles() {

    document.getElementById("roles").scrollIntoView({
        behavior: "smooth"
    });

}


// When a role is selected
function selectRole(role) {

    alert("You selected: " + role);

    // Later you can redirect users to different login pages.
    //
    // Example:
    //
    // if (role === "Admin") {
    //     window.location.href = "admin-login.html";
    // }

}