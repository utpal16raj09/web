document.addEventListener('DOMContentLoaded', function() {
    const skillSegments = document.querySelectorAll('.skill-segment');
    const skillDetailItems = document.querySelectorAll('.skill-detail');
    const skillsWheel = document.querySelector('.skills-wheel');
    
    // Add hover events to each skill segment
    skillSegments.forEach(segment => {
        // Hover events for preview
        segment.addEventListener('mouseenter', function() {
            // Get the skill name and find the corresponding detail
            const skillName = this.getAttribute('data-skill');
            const skillId = skillName.replace(/\s+/g, '-');
            
            // Hide all skill details
            skillDetailItems.forEach(item => item.classList.remove('active'));
            
            // Show the selected skill detail
            const selectedDetail = document.getElementById(skillId);
            if (selectedDetail) {
                selectedDetail.classList.add('active');
            }
        });
    });
    
    // Handle wheel mouseleave to hide all details
    if (skillsWheel) {
        skillsWheel.addEventListener('mouseleave', function() {
            // Reset the rotation when mouse leaves
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            // Hide all skill details after a short delay
            setTimeout(() => {
                skillDetailItems.forEach(item => item.classList.remove('active'));
            }, 300);
        });
        
        // Add 3D rotation effect
        skillsWheel.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate the rotation angle based on mouse position
            const rotateX = y / 30;
            const rotateY = -x / 30;
            
            // Apply the rotation
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    // Add glowing effect to the skills wheel
    addGlowingEffect();
    
    function addGlowingEffect() {
        // Create a canvas element for the glow effect
        const canvas = document.createElement('canvas');
        canvas.classList.add('glow-canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.7;
            border-radius: 50%;
        `;
        
        if (skillsWheel) {
            skillsWheel.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            function resizeCanvas() {
                canvas.width = skillsWheel.offsetWidth;
                canvas.height = skillsWheel.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Animation function
            let hue = 0;
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw glow
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(centerX, centerY) * 0.8;
                
                // Create gradient
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, radius * 0.5,
                    centerX, centerY, radius
                );
                
                // Cycle through colors
                hue = (hue + 0.2) % 360;
                const color1 = `hsla(${hue}, 70%, 60%, 0.1)`;
                const color2 = `hsla(${(hue + 60) % 360}, 70%, 60%, 0)`;
                
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }
    }
});
