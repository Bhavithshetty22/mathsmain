document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section-header');

    sections.forEach(section => {
        section.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            const content = document.getElementById(`section-${sectionId}`);
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = '0';
                localStorage.removeItem("lastOpenedSection"); // Remove stored section
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                localStorage.setItem("lastOpenedSection", sectionId); // Store opened section
            }
        });
    });

    // Open the last active section from localStorage
    const lastOpenedSection = localStorage.getItem("lastOpenedSection");
    if (lastOpenedSection) {
        document.querySelector(`[data-section="${lastOpenedSection}"]`).click();
    }

    // Function to update progress
    function updateProgress(sectionId) {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        const lessons = document.querySelectorAll(`#section-${sectionId} .lesson`);
        const completedLessons = document.querySelectorAll(`#section-${sectionId} .lesson input:checked`);
        const progressSpan = section.querySelector('.progress');
        
        progressSpan.textContent = `${completedLessons.length}/${lessons.length}`;
    }

    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.lesson input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const sectionId = this.closest('.section-content').id.split('-')[1];
            updateProgress(sectionId);
        });
    });

    // Initial progress update
    sections.forEach(section => {
        const sectionId = section.getAttribute("data-section");
        updateProgress(sectionId);
    });

    // Toggle dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem("darkMode", document.body.classList.contains("dark"));
        });

        // Load dark mode state
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark");
        }
    }
});

// Sidebar and dark mode toggle
const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("darkMode", body.classList.contains("dark"));

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode";
    } else {
        modeText.innerText = "Dark Mode";
    }
});

// Load dark mode state
if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    modeText.innerText = "Light Mode";
}
