// Tab functionality
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu functionality
const sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbwHCl1OV_6uaXW_UtugC494n72O7G2LeDA1LThTuqiMS1dJOCt4OOiFEm7kiVKFA2KcOQ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function() {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

// Project scrolling
let currentPage = 0;
const projectsPerPage = 1; // Show one project at a time

function scrollProjects(direction) {
    const projectList = document.querySelector('.project-list');
    const projectWrappers = document.querySelectorAll('.project-wrapper');
    const totalPages = Math.ceil(projectWrappers.length / projectsPerPage);
    
    if (direction === 'right') {
        currentPage = (currentPage + 1) % totalPages;
    } else {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
    }
    
    // Calculate the scroll position
    const scrollAmount = projectWrappers[currentPage * projectsPerPage].offsetLeft - projectList.offsetLeft;
    
    // Scroll to the position
    projectList.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    // Update page indicator
    updatePageIndicator(currentPage, totalPages);
}

function updatePageIndicator(current, total) {
    const pageIndicator = document.querySelector('.page-indicator');
    if (!pageIndicator) return;
    
    pageIndicator.innerHTML = '';
    
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('page-dot');
        if (i === current) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentPage = i;
            const projectList = document.querySelector('.project-list');
            const projectWrappers = document.querySelectorAll('.project-wrapper');
            const scrollAmount = projectWrappers[i * projectsPerPage].offsetLeft - projectList.offsetLeft;
            
            projectList.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            updatePageIndicator(i, total);
        });
        pageIndicator.appendChild(dot);
    }
}

// Initialize page indicator when the page loads
window.addEventListener('load', () => {
    const projectWrappers = document.querySelectorAll('.project-wrapper');
    const totalPages = Math.ceil(projectWrappers.length / projectsPerPage);
    updatePageIndicator(0, totalPages);
});

// Project detail functionality
function openProjectDetail(projectId) {
    const projectDetail = document.getElementById(`${projectId}-detail`);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    projectDetail.style.display = 'block';
    
    // Add a small delay before adding the 'active' class for the transition effect
    setTimeout(() => {
        projectDetail.classList.add('active');
    }, 10);
}

function closeProjectDetail(projectId) {
    const projectDetail = document.getElementById(`${projectId}-detail`);
    projectDetail.classList.remove('active');
    
    // Wait for the transition to complete before hiding the element
    setTimeout(() => {
        projectDetail.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 300);
}

// Scroll animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
});

// Typing animation for header
document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.typing-text');
    if (text) {
        const textContent = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
    
    // Initialize project detail pages
    const projectCards = document.querySelectorAll('.projects');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const projectId = this.getAttribute('data-project');
                openProjectDetail(projectId);
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (!this.getAttribute('href').includes('-detail')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Particle background effect
function createParticles() {
    const header = document.getElementById('header');
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles');
    header.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);
