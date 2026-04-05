import { Home } from './Home';
import { About } from './About';
import { Projects } from './Projects';
import { Contact } from './Contact';

export const MainLayout = async () => {
    const container = document.createElement('div');
    container.className = 'w-full min-h-screen relative overflow-hidden';

    // Global background properties that should span the entire scroll view
    const bgContainer = document.createElement('div');
    bgContainer.className = 'fixed inset-0 pointer-events-none z-[-1]';
    bgContainer.innerHTML = `
        <div class="bg-blobs">
            <div class="blob left-[10%] top-[10%] bg-primary-500/20"></div>
            <div class="blob right-[10%] bottom-[10%] bg-purple-500/20 animate-[blob-float_25s_infinite_reverse]"></div>
        </div>
    `;
    container.appendChild(bgContainer);

    // Section wrapper
    const sectionsWrap = document.createElement('main');
    sectionsWrap.className = 'relative z-10';

    // Initialize individual sections
    // Note: Projects might be async if it fetches github repos
    const homeSection = Home();
    const aboutSection = About();
    const projectsSection = await Projects();
    const contactSection = Contact();

    // Assign IDs for smooth scrolling navigation
    homeSection.id = 'home';
    aboutSection.id = 'about';
    projectsSection.id = 'projects';
    contactSection.id = 'contact';

    // Remove overlapping background classes from individual sections if they exist
    [homeSection, aboutSection, projectsSection, contactSection].forEach(section => {
        if (!section) return;
        const localBlobs = section.querySelector('.bg-blobs');
        if (localBlobs) localBlobs.remove();
        const localStars = section.querySelector('.stars-bg');
        if (localStars) localStars.remove();
    });

    // Make sections stack nicely
    aboutSection.classList.add('py-20');
    projectsSection.classList.add('py-20');
    contactSection.classList.add('py-20');

    sectionsWrap.appendChild(homeSection);
    sectionsWrap.appendChild(aboutSection);
    sectionsWrap.appendChild(projectsSection);
    sectionsWrap.appendChild(contactSection);

    container.appendChild(sectionsWrap);

    return container;
};
