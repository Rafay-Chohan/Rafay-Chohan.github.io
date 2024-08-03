function toggleProjectDetails(projectId) {
    const projectDetails = document.getElementById(projectId);
    if (projectDetails.style.display === "none" || projectDetails.style.display === "") {
        projectDetails.style.display = "block";
    } else {
        projectDetails.style.display = "none";
    }
}
function showPopup(popupId) {
    document.getElementById(popupId).style.display = "block";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Optional: Close popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target.classList.contains('popup')) {
        event.target.style.display = "none";
    }
}