import { medReminderApi, DEFAULT_MEDICINES } from '../../services/medReminderApi';
import './med-reminder.css';

export const MedReminderDashboard = () => {
    const container = document.createElement('div');
    container.className = 'med-reminder-app min-h-screen pt-20 pb-12';

    // Auto-create a demo session if visitor directly opens dashboard
    if (!localStorage.getItem('med_token')) {
        localStorage.setItem('med_token', 'demo-guest-token');
        localStorage.setItem('med_username', 'Recruiter Guest');
    }

    const state = {
        medicines: [],
        username: localStorage.getItem('med_username') || 'Recruiter Guest',
        currentSlide: 0
    };

    const render = async () => {
        container.innerHTML = `
            <div class="container fade-in-page px-4 sm:px-8">
                <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl text-white shadow-lg">M</div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800">MedReminder</h2>
                                <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-200">Live Demo</span>
                            </div>
                            <p class="text-xs text-slate-400 font-medium">Smart daily medication scheduler</p>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                        <span class="text-xs sm:text-sm text-slate-600 font-semibold bg-slate-100 px-3 py-1.5 rounded-xl">👤 ${state.username}</span>
                        <a href="/#projects" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">← Back to Portfolio</a>
                        <button id="med-logout-btn" class="bg-slate-100 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all">Sign Out</button>
                    </div>
                </header>

                <!-- Carousel -->
                <div class="carousel-container h-auto sm:h-[350px]">
                    <div class="carousel-viewport">
                        <div class="carousel-track" id="med-carousel-track">
                            <div class="carousel-slide bg-indigo-600">
                                <div class="slide-content flex flex-col sm:flex-row items-center justify-center sm:justify-around w-full max-w-4xl px-6 sm:px-12 py-10 sm:py-0 gap-8 sm:gap-0">
                                    <img src="./assets/med-reminder/pill.png" class="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-2xl animate-float">
                                    <div class="text-white text-center sm:text-left">
                                        <h2 class="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">Never Miss a Dose</h2>
                                        <p class="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6">Real-time scheduling with smart time-slot reminders.</p>
                                        <button class="bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold shadow-xl text-xs sm:text-base hover:bg-indigo-50 transition-all" id="open-add-med">+ Schedule Medication</button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-slide bg-emerald-600">
                                <div class="slide-content flex flex-col sm:flex-row items-center justify-center sm:justify-around w-full max-w-4xl px-6 sm:px-12 py-10 sm:py-0 gap-8 sm:gap-0">
                                    <img src="./assets/med-reminder/bottle.png" class="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-2xl animate-float">
                                    <div class="text-white text-center sm:text-left">
                                        <h2 class="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4">Adherence & Analytics</h2>
                                        <p class="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6">Comprehensive tracking across morning, afternoon, and night regimens.</p>
                                        <button class="bg-white text-emerald-600 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold shadow-xl text-xs sm:text-base hover:bg-emerald-50 transition-all" id="open-health-profile">100% Tracking Health</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Dashboard -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div class="stat-card">
                        <div class="stat-label">Active Medications</div>
                        <div id="stat-total" class="stat-value">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Next Reminder</div>
                        <div id="stat-next" class="stat-value text-indigo-600">--:--</div>
                    </div>
                    <div class="stat-card bg-emerald-50 border-emerald-100">
                        <div class="stat-label">Compliance / Adherence</div>
                        <div class="stat-value text-emerald-600">98%</div>
                    </div>
                </div>

                <!-- Medicine Grid Header -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800">Prescription Schedule</h2>
                        <p class="text-slate-500 text-sm">Personalized dosage timeline and automated reminder alert times.</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button id="reset-sample-meds-btn" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all" title="Reload demo sample medicines">
                            ↻ Reset Sample Meds
                        </button>
                        <button id="open-add-med-bottom" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:translate-y-[-2px] transition-all">
                            + Add Medicine
                        </button>
                    </div>
                </div>

                <!-- Medicine List Grid -->
                <div id="medicine-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>

            <!-- Add Med Modal -->
            <div id="med-add-modal" class="hidden fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div class="bg-slate-900/50 backdrop-blur-sm absolute inset-0"></div>
                <div class="bg-white rounded-[2rem] p-8 max-w-lg w-full relative z-10 shadow-2xl">
                    <h2 class="text-2xl font-extrabold mb-1 text-slate-800">New Medication Reminder</h2>
                    <p class="text-slate-500 text-sm mb-6">Schedule a new prescribed dose and set the alert trigger.</p>
                    <form id="add-medicine-form" class="space-y-4">
                        <div class="form-group">
                            <label class="text-xs font-bold text-slate-600">Medicine Name</label>
                            <input type="text" id="med-name" required placeholder="e.g. Paracetamol, Ibuprofen" class="w-full">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="text-xs font-bold text-slate-600">Dosage</label>
                                <input type="text" id="med-dosage" required placeholder="e.g. 500mg (1 tablet)" class="w-full">
                            </div>
                            <div class="form-group">
                                <label class="text-xs font-bold text-slate-600">Reminder Time</label>
                                <input type="time" id="med-time-specific" required value="08:30" class="w-full">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="text-xs font-bold text-slate-600">Start Date</label>
                                <input type="date" id="med-start" required class="w-full">
                            </div>
                            <div class="form-group">
                                <label class="text-xs font-bold text-slate-600">End Date</label>
                                <input type="date" id="med-end" required class="w-full">
                            </div>
                        </div>
                        <div class="flex gap-4 pt-4">
                            <button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold text-sm shadow-md transition-all">Save Medication</button>
                            <button type="button" id="close-add-modal" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl py-3 font-bold text-sm transition-all">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <audio id="med-alarm-sound" src="/assets/med-reminder/medicine_reminder.mp3" preload="auto"></audio>
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
        const showAdd = () => {
            const today = new Date().toISOString().split('T')[0];
            const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            container.querySelector('#med-start').value = today;
            container.querySelector('#med-end').value = nextMonth;
            addModal.classList.remove('hidden');
        };
        const hideAdd = () => addModal.classList.add('hidden');

        container.querySelector('#open-add-med').onclick = showAdd;
        container.querySelector('#open-add-med-bottom').onclick = showAdd;
        container.querySelector('#close-add-modal').onclick = hideAdd;

        const resetBtn = container.querySelector('#reset-sample-meds-btn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                medReminderApi.resetDefaultMedicines();
                loadMedicines();
            };
        }

        container.querySelector('#add-medicine-form').onsubmit = async (e) => {
            e.preventDefault();
            const reminderTimeInput = container.querySelector('#med-time-specific').value;
            // Format time with AM/PM for clean display
            let formattedTime = reminderTimeInput;
            try {
                const [h, m] = reminderTimeInput.split(':');
                const hour = parseInt(h, 10);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const standardHour = hour % 12 || 12;
                formattedTime = `${String(standardHour).padStart(2, '0')}:${m} ${ampm}`;
            } catch (err) {}

            const medicine = {
                name: container.querySelector('#med-name').value,
                dosage: container.querySelector('#med-dosage').value,
                time_of_day: 'Custom',
                reminder_time: formattedTime,
                start_date: container.querySelector('#med-start').value,
                end_date: container.querySelector('#med-end').value
            };

            try {
                await medReminderApi.addMedicine(medicine);
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
            state.medicines = medicines || [];
            
            const listEl = container.querySelector('#medicine-list');
            if (!medicines || medicines.length === 0) {
                listEl.innerHTML = `
                    <div class="col-span-full py-12 px-6 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div class="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                            <img src="./assets/med-reminder/med_bottle_illustration.svg" class="w-8 h-8 opacity-60" alt="empty">
                        </div>
                        <h4 class="text-lg font-bold text-slate-800 mb-1">No Medications Scheduled</h4>
                        <p class="text-slate-400 text-sm mb-6 max-w-md mx-auto">Get started by loading our recommended sample prescriptions or adding your own medication.</p>
                        <button id="empty-state-reset-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all">
                            Load Sample Prescriptions
                        </button>
                    </div>
                `;
                const emptyReset = container.querySelector('#empty-state-reset-btn');
                if (emptyReset) {
                    emptyReset.onclick = () => {
                        medReminderApi.resetDefaultMedicines();
                        loadMedicines();
                    };
                }
            } else {
                listEl.innerHTML = medicines.map((m, i) => `
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-xl hover:border-indigo-100 transition-all">
                        <div class="flex justify-between items-start mb-4">
                            <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
                                <img src="${i % 2 === 0 ? './assets/med-reminder/pill.png' : './assets/med-reminder/bottle.png'}" class="w-full h-full object-contain">
                            </div>
                            <span class="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                                ⏰ ${m.reminder_time || '08:00 AM'}
                            </span>
                        </div>
                        <h3 class="text-lg sm:text-xl font-extrabold text-slate-800 mb-1 tracking-tight">${m.name}</h3>
                        <p class="text-slate-500 text-xs sm:text-sm mb-6 font-medium">${m.dosage}</p>
                        <div class="flex justify-between items-center pt-4 border-t border-slate-100 text-slate-400 text-[11px] font-semibold">
                            <span>📅 Starts: ${m.start_date || 'Active'}</span>
                            <button class="med-delete-btn text-rose-500 hover:text-rose-700 font-bold px-2 py-1 rounded hover:bg-rose-50 transition-colors" data-id="${m.id}">Remove</button>
                        </div>
                    </div>
                `).join('');

                listEl.querySelectorAll('.med-delete-btn').forEach(btn => {
                    btn.onclick = async () => {
                        const id = btn.getAttribute('data-id');
                        if (confirm('Remove this medication from schedule?')) {
                            try {
                                await medReminderApi.deleteMedicine(id);
                                loadMedicines();
                            } catch (err) {
                                alert(err.message);
                            }
                        }
                    };
                });
            }

            container.querySelector('#stat-total').textContent = medicines.length;
            const nextReminderEl = container.querySelector('#stat-next');
            if (nextReminderEl) {
                nextReminderEl.textContent = medicines.length > 0 ? (medicines[0].reminder_time || '08:00 AM') : '--:--';
            }
        } catch (err) {
            console.error('Error loading medicines:', err);
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
