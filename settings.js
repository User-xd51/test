// Settings state object
const settings = {
    theme: 'dark',
    name: 'Your Name',
    title: 'Developer & Creator',
    bio: "I'm a passionate developer who loves building amazing things with code. Check out my work below and feel free to reach out!",
    githubUsername: '',
    email: '',
    showStats: true,
    animationSpeed: 'normal'
};

// Load settings from memory on page load
function loadSettings() {
    // Apply theme
    if (settings.theme === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').checked = true;
        document.getElementById('themeLabel').textContent = 'Light Mode';
    }

    // Apply user info
    if (settings.name) {
        document.getElementById('displayName').textContent = settings.name;
        document.getElementById('footerName').textContent = settings.name;
        document.getElementById('userName').value = settings.name;
    }

    if (settings.title) {
        document.getElementById('displayTitle').textContent = settings.title;
        document.getElementById('userTitle').value = settings.title;
    }

    if (settings.bio) {
        document.getElementById('displayBio').textContent = settings.bio;
        document.getElementById('userBio').value = settings.bio;
    }

    if (settings.githubUsername) {
        document.getElementById('githubUsername').value = settings.githubUsername;
        document.getElementById('githubLink').href = `https://github.com/${settings.githubUsername}`;
        document.getElementById('profileImg').src = `https://github.com/${settings.githubUsername}.png`;
    }

    if (settings.email) {
        document.getElementById('userEmail').value = settings.email;
        document.getElementById('emailLink').href = `mailto:${settings.email}`;
    }

    // Apply stats visibility
    document.getElementById('showStats').checked = settings.showStats;
    toggleStats();

    // Apply animation speed
    document.getElementById('animationSpeed').value = settings.animationSpeed;
    changeAnimationSpeed();
}

// Toggle settings panel
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('open');
}

// Toggle theme
function toggleTheme() {
    const isLightMode = document.getElementById('themeToggle').checked;
    const label = document.getElementById('themeLabel');
    
    if (isLightMode) {
        document.body.classList.add('light-mode');
        label.textContent = 'Light Mode';
        settings.theme = 'light';
    } else {
        document.body.classList.remove('light-mode');
        label.textContent = 'Dark Mode';
        settings.theme = 'dark';
    }
}

// Toggle stats visibility
function toggleStats() {
    const statsSection = document.getElementById('statsSection');
    const isChecked = document.getElementById('showStats').checked;
    
    statsSection.style.display = isChecked ? 'block' : 'none';
    settings.showStats = isChecked;
}

// Change animation speed
function changeAnimationSpeed() {
    const speed = document.getElementById('animationSpeed').value;
    const root = document.documentElement;
    
    switch(speed) {
        case 'slow':
            root.style.setProperty('--animation-duration', '0.6s');
            break;
        case 'fast':
            root.style.setProperty('--animation-duration', '0.15s');
            break;
        default:
            root.style.setProperty('--animation-duration', '0.3s');
    }
    
    settings.animationSpeed = speed;
}

// Save all settings
function saveSettings() {
    // Get values from inputs
    const name = document.getElementById('userName').value.trim();
    const title = document.getElementById('userTitle').value.trim();
    const bio = document.getElementById('userBio').value.trim();
    const githubUsername = document.getElementById('githubUsername').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    // Update settings object
    if (name) {
        settings.name = name;
        document.getElementById('displayName').textContent = name;
        document.getElementById('footerName').textContent = name;
    }

    if (title) {
        settings.title = title;
        document.getElementById('displayTitle').textContent = title;
    }

    if (bio) {
        settings.bio = bio;
        document.getElementById('displayBio').textContent = bio;
    }

    if (githubUsername) {
        settings.githubUsername = githubUsername;
        document.getElementById('githubLink').href = `https://github.com/${githubUsername}`;
        document.getElementById('profileImg').src = `https://github.com/${githubUsername}.png`;
    }

    if (email) {
        settings.email = email;
        document.getElementById('emailLink').href = `mailto:${email}`;
    }

    // Show success feedback
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✓ Saved!';
    saveBtn.style.background = '#3fb950';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
    }, 2000);

    // Close settings panel
    setTimeout(() => {
        toggleSettings();
    }, 1000);
}

// Close settings panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('settingsPanel');
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (panel.classList.contains('open') && 
        !panel.contains(event.target) && 
        !settingsBtn.contains(event.target)) {
        toggleSettings();
    }
});

// Add smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations to cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    
    const cards = document.querySelectorAll('.stat-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add keyboard shortcut to open settings (Ctrl/Cmd + K)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSettings();
    }
});
