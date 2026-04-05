import { placementAiAuth } from '../../services/placementAiAuth';
import './placement-ai.css';

export const PlacementAiAdmin = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const currentUser = placementAiAuth.getCurrentUser();
    const users = placementAiAuth.getUsers();
    
    if (!currentUser || users[currentUser]?.role !== 'admin') {
        window.history.pushState({}, '', '/placement-ai');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return container;
    }

    const render = () => {
        const studentList = Object.keys(users).filter(u => users[u].role === 'student');
        const scores = JSON.parse(localStorage.getItem("scores") || "{}");

        container.innerHTML = `
            <div class="stars-bg"></div>
            <div class="container relative z-10 animate-pa">
                <header class="flex justify-between items-center mb-10">
                    <h2 class="text-left m-0">Admin Dashboard</h2>
                    <button id="pa-admin-logout" class="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-all">Logout</button>
                </header>

                <div class="card p-8">
                    <h3 class="mb-6">Student Activity Dashboard</h3>
                    <div class="overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>USN</th>
                                    <th>Course</th>
                                    <th>CGPA</th>
                                    <th>Latest Score</th>
                                    <th>Target Company</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${studentList.map(username => {
                                    const profile = placementAiAuth.getProfile(username);
                                    const scoreData = scores[username] || {};
                                    return `
                                        <tr>
                                            <td class="font-bold">${username}</td>
                                            <td>${profile.regSRN || '-'}</td>
                                            <td>${profile.course || '-'}</td>
                                            <td>${profile.cgpa || '-'}</td>
                                            <td class="text-emerald-600 font-bold">${scoreData.score !== undefined ? `${scoreData.score}/${scoreData.total}` : '-'}</td>
                                            <td>${scoreData.company || '-'}</td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="pa-del-student text-rose-500 hover:text-rose-700" data-user="${username}">Delete</button>
                                                    <button class="pa-reset-pass text-indigo-500 hover:text-indigo-700 font-medium" data-user="${username}">Reset Pwd</button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                                ${studentList.length === 0 ? '<tr><td colspan="7" class="text-center p-12 text-slate-400">No student records found.</td></tr>' : ''}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-12 flex justify-center">
                    <button id="pa-clear-all" class="bg-rose-500 text-white px-10 py-3 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg">⚠️ Dangerous: Clear All Application Data</button>
                </div>
            </div>
        `;

        setupEvents();
    };

    const setupEvents = () => {
        container.querySelector('#pa-admin-logout').onclick = () => {
            placementAiAuth.logout();
            window.history.pushState({}, '', '/placement-ai');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        container.querySelectorAll('.pa-del-student').forEach(btn => {
            btn.onclick = () => {
                const user = btn.getAttribute('data-user');
                if (confirm(`Are you sure you want to delete student: ${user}? All profile and score data will be lost.`)) {
                    placementAiAuth.deleteStudent(user);
                    location.reload();
                }
            };
        });

        container.querySelectorAll('.pa-reset-pass').forEach(btn => {
            btn.onclick = () => {
                const user = btn.getAttribute('data-user');
                const newPass = prompt(`Enter new password for ${user}:`);
                if (newPass) {
                    const u = placementAiAuth.getUsers();
                    u[user].password = newPass;
                    localStorage.setItem("users", JSON.stringify(u));
                    alert("Password reset successfully.");
                }
            };
        });

        container.querySelector('#pa-clear-all').onclick = () => {
            if (confirm("CRITICAL: This will wipe ALL users, profiles, and test scores for Placement AI. Continue?")) {
                placementAiAuth.clearAllData();
                window.history.pushState({}, '', '/placement-ai');
                window.dispatchEvent(new PopStateEvent('popstate'));
            }
        };
    };

    render();
    return container;
};
