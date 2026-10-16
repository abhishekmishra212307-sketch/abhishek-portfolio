function showMesage() {
    alert("Thank you for visiting my website!");
}
/* ===== Scroll Reveal Animation ===== */

const revealElements = document.querySelectorAll(
    "#about, #skills, #goals, #services, #projects, #contact"
)

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

/* ===== Animate Skills Progress Bars ===== */

const skillsSection = document.getElementById("skills");

if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    skillsSection.classList.add("bars-visible");
                    observer.unobserve(skillsSection);
                }
            });
        },
        {
            threshold: 0.25
        }
    );
    skillsObserver.observe(skillsSection);
}

/* Reveal elements when they enter the screen */
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(
        "section:not(.home-section), .project-card, .service-card, .about-card"
    );

    animatedElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }
});
