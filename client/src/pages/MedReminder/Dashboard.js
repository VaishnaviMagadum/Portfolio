import { medReminderApi } from '../../services/medReminderApi';
import './med-reminder.css';

export const MedReminderDashboard = () => {
    const container = document.createElement('div');
    container.className = 'med-reminder-app min-h-screen pt-20 pb-12';

    const state = {
        medicines: [],
        username: localStorage.getItem('med_username') || 'Guest',
        currentSlide: 0
    };

    const render = async () => {
        if (!localStorage.getItem('med_token')) {
            window.history.pushState({}, '', '/med-reminder');
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
        }

        container.innerHTML = `
            <div class="container fade-in-page px-4 sm:px-8">
                <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl text-white shadow-lg">M</div>
                        <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800">MedReminder</h2>
                    </div>
                    <div class="flex flex-row items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                        <span class="text-xs sm:text-sm text-slate-500 font-semibold underline underline-offset-4">Hello, ${state.username}</span>
                        <button id="med-logout-btn" class="bg-slate-100 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all">Logout</button>
                    </div>
                </header>

                <!-- Carousel -->
                <div class="carousel-container h-auto sm:h-[400px]">
                    <div class="carousel-viewport">
                        <div class="carousel-track" id="med-carousel-track">
                            <div class="carousel-slide bg-indigo-600">
                                <div class="slide-content flex flex-col sm:flex-row items-center justify-center sm:justify-around w-full max-w-4xl px-6 sm:px-12 py-10 sm:py-0 gap-8 sm:gap-0">
                                    <img src="/assets/med-reminder/pill.png" class="w-24 h-24 sm:w-48 sm:h-48 drop-shadow-2xl animate-float">
                                    <div class="text-white text-center sm:text-left">
                                        <h2 class="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">Keep Track</h2>
                                        <p class="text-sm sm:text-xl opacity-90 mb-4 sm:mb-6">Of all medications you take daily.</p>
                                        <button class="bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold shadow-xl text-xs sm:text-base" id="open-add-med">Add Medicine</button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-slide bg-emerald-600">
                                <div class="slide-content flex flex-col sm:flex-row items-center justify-center sm:justify-around w-full max-w-4xl px-6 sm:px-12 py-10 sm:py-0 gap-8 sm:gap-0">
                                    <img src="/assets/med-reminder/bottle.png" class="w-24 h-24 sm:w-48 sm:h-48 drop-shadow-2xl animate-float">
                                    <div class="text-white text-center sm:text-left">
                                        <h2 class="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">Stay Healthy</h2>
                                        <p class="text-sm sm:text-xl opacity-90 mb-4 sm:mb-6">Never miss a dose with smart alerts.</p>
                                        <button class="bg-white text-emerald-600 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold shadow-xl text-xs sm:text-base" id="open-health-profile">Check Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Dashboard -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div class="stat-card">
                        <div class="stat-label">Total Medicines</div>
                        <div id="stat-total" class="stat-value">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Next Reminder</div>
                        <div id="stat-next" class="stat-value">--:--</div>
                    </div>
                    <div class="stat-card bg-emerald-50 border-emerald-100">
                        <div class="stat-label">Daily Adherence</div>
                        <div class="stat-value text-emerald-600">100%</div>
                    </div>
                </div>

                <!-- Medicine Grid -->
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-3xl font-extrabold text-slate-800">Medicine Schedule</h2>
                        <p class="text-slate-500">Manage your daily doses and reminders.</p>
                    </div>
                    <button id="open-add-med-bottom" class="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:translate-y-[-2px] transition-all">+ Add Medicine</button>
                </div>
                <div id="medicine-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>

            <!-- Add Med Modal -->
            <div id="med-add-modal" class="hidden fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div class="bg-slate-900/40 backdrop-blur-md absolute inset-0"></div>
                <div class="bg-white rounded-[2.5rem] p-10 max-w-lg w-full relative z-10 shadow-2xl">
                    <h2 class="text-3xl font-extrabold mb-2">New Medication</h2>
                    <p class="text-slate-500 mb-8">Schedule a new reminder for your health.</p>
                    <form id="add-medicine-form" class="space-y-4">
                        <div class="form-group">
                            <label>Medicine Name</label>
                            <input type="text" id="med-name" required placeholder="e.g. Paracetamol">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label>Dosage</label>
                                <input type="text" id="med-dosage" required placeholder="e.g. 500mg">
                            </div>
                            <div class="form-group">
                                <label>Time</label>
                                <input type="time" id="med-time-specific" required>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label>Start Date</label>
                                <input type="date" id="med-start" required>
                            </div>
                            <div class="form-group">
                                <label>End Date</label>
                                <input type="date" id="med-end" required>
                            </div>
                        </div>
                        <div class="flex gap-4 pt-4">
                            <button type="submit" class="flex-1 bg-indigo-500 text-white rounded-xl py-3 font-bold shadow-lg">Save</button>
                            <button type="button" id="close-add-modal" class="flex-1 bg-slate-100 text-slate-500 rounded-xl py-3 font-bold">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <audio id="med-alarm-sound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto"></audio>
        `;

        setupEvents();
        loadMedicines();
        startCarouselUpdate();
    };

    const setupEvents = () => {
        container.querySelector('#med-logout-btn').onclick = () => {
            localStorage.removeItem('med_token');
            localStorage.removeItem('med_username');
            window.history.pushState({}, '', '/med-reminder');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        const addModal = container.querySelector('#med-add-modal');
        const showAdd = () => addModal.classList.remove('hidden');
        const hideAdd = () => addModal.classList.add('hidden');

        container.querySelector('#open-add-med').onclick = showAdd;
        container.querySelector('#open-add-med-bottom').onclick = showAdd;
        container.querySelector('#close-add-modal').onclick = hideAdd;

        container.querySelector('#add-medicine-form').onsubmit = async (e) => {
            e.preventDefault();
            const medicine = {
                name: container.querySelector('#med-name').value,
                dosage: container.querySelector('#med-dosage').value,
                time_of_day: 'custom',
                reminder_time: container.querySelector('#med-time-specific').value,
                start_date: container.querySelector('#med-start').value,
                end_date: container.querySelector('#med-end').value
            };

            try {
                await medReminderApi.addMedicine(medicine);
                alert('Medicine added!');
                hideAdd();
                loadMedicines();
                e.target.reset();
            } catch (err) {
                alert(err.message);
            }
        };
    };

    const loadMedicines = async () => {
        try {
            const medicines = await medReminderApi.getMedicines();
            state.medicines = medicines;
            
            const listEl = container.querySelector('#medicine-list');
            listEl.innerHTML = medicines.map((m, i) => `
                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all">
                    <div class="flex justify-between items-start mb-4">
                        <img src="${i % 2 === 0 ? '/assets/med-reminder/pill.png' : '/assets/med-reminder/bottle.png'}" class="w-12 h-12">
                        <span class="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">${m.reminder_time}</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">${m.name}</h3>
                    <p class="text-slate-400 text-sm mb-6">${m.dosage}</p>
                    <div class="flex justify-between items-center pt-4 border-t border-slate-50">
                        <span class="text-[10px] text-slate-300 font-bold uppercase tracking-wider">${m.start_date}</span>
                        <button class="med-delete-btn text-rose-500 text-xs font-bold hover:text-rose-600" data-id="${m.id}">Remove</button>
                    </div>
                </div>
            `).join('');

            listEl.querySelectorAll('.med-delete-btn').forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.getAttribute('data-id');
                    if (confirm('Are you sure you want to remove this medication?')) {
                        try {
                            await medReminderApi.deleteMedicine(id);
                            loadMedicines();
                        } catch (err) {
                            alert(err.message);
                        }
                    }
                };
            });

            container.querySelector('#stat-total').textContent = medicines.length;
        } catch (err) {
            console.error(err);
        }
    };

    const startCarouselUpdate = () => {
        const track = container.querySelector('#med-carousel-track');
        setInterval(() => {
            state.currentSlide = (state.currentSlide + 1) % 2;
            if (track) track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
        }, 5000);
    };

    render();
    return container;
};
