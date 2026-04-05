import { placementAiAuth } from '../../services/placementAiAuth';
import './placement-ai.css';

export const PlacementAiProfile = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const currentUser = placementAiAuth.getCurrentUser();
    if (!currentUser) {
        window.history.pushState({}, '', '/placement-ai');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return container;
    }

    const render = () => {
        const profile = placementAiAuth.getProfile(currentUser);

        container.innerHTML = `
            <div class="stars-bg"></div>
            <div class="container relative z-10 animate-pa">
                <div class="text-center mb-8">
                    <h2>Complete Your Profile</h2>
                    <p class="text-slate-500">We need these details to suggest the best companies and mock tests for you.</p>
                </div>

                <div class="card p-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label>USN (University Serial Number)</label>
                            <input id="pa-reg-srn" type="text" placeholder="e.g. 2HN22CS001" value="${profile.regSRN || ''}">
                        </div>
                        <div class="form-group">
                            <label>Course</label>
                            <input id="pa-reg-course" type="text" placeholder="e.g. CSE" value="${profile.course || ''}">
                        </div>
                        <div class="form-group">
                            <label>CGPA (out of 10)</label>
                            <input id="pa-reg-cgpa" type="number" step="0.1" placeholder="e.g. 8.5" value="${profile.cgpa || ''}">
                        </div>
                        <div class="form-group">
                            <label>Target Role</label>
                            <input id="pa-reg-role" type="text" placeholder="e.g. Software Engineer" value="${profile.role || ''}">
                        </div>
                    </div>
                    <div class="mt-6">
                        <label>Technical Skills</label>
                        <textarea id="pa-reg-skills" placeholder="e.g. Python, Java, React, SQL" rows="4">${profile.skills || ''}</textarea>
                    </div>
                    <div class="flex gap-4 mt-10">
                        <button id="pa-save-profile" class="btn-pa flex-1">Save & Continue</button>
                        <button id="pa-logout-btn" class="flex-1 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-all">Logout</button>
                    </div>
                </div>
            </div>
        `;

        setupEvents();
    };

    const setupEvents = () => {
        container.querySelector('#pa-save-profile').onclick = () => {
            const srn = container.querySelector('#pa-reg-srn').value.trim();
            const course = container.querySelector('#pa-reg-course').value.trim();
            const cgpa = container.querySelector('#pa-reg-cgpa').value.trim();
            const role = container.querySelector('#pa-reg-role').value.trim();
            const skills = container.querySelector('#pa-reg-skills').value.trim();

            if (!srn || !course || !cgpa || !role || !skills) {
                alert("Please fill all profile fields.");
                return;
            }

            if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
                alert("Please enter a valid CGPA between 0 and 10.");
                return;
            }

            placementAiAuth.saveProfile(currentUser, { regSRN: srn, course, cgpa, role, skills });
            alert("Profile saved successfully!");
            window.history.pushState({}, '', '/placement-ai/dashboard');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        container.querySelector('#pa-logout-btn').onclick = () => {
            placementAiAuth.logout();
            window.history.pushState({}, '', '/placement-ai');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };
    };

    render();
    return container;
};
