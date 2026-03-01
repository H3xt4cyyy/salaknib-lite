const emergencyContacts = [
    { 
        name: "Mayor's Office", category: "Municipal Hall", icon: "🏛️",
        phones: [
            { network: "Globe/TM", number: "09175451094", display: "0917-545-1094" },
            { network: "Smart/TNT", number: "09188888319", display: "0918-888-8319" },
            { network: "Landline", number: "0776005517", display: "(077) 600-55-17" }
        ]
    },
    { 
        name: "MDDRM Office", category: "Disaster / Rescue", icon: "🌪️",
        phones: [
            { network: "Smart/TNT", number: "09498343424", display: "0949-834-3424" },
            { network: "Globe/TM", number: "09158703494", display: "0915-870-3494" },
            { network: "Landline", number: "0776003285", display: "(077) 600-32-85" }
        ]
    },
    { 
        name: "RHU Solsona", category: "Medical", icon: "🏥",
        phones: [
            { network: "Sun/Smart", number: "09431349194", display: "0943-134-9194" },
            { network: "Globe/TM", number: "09171605445", display: "0917-160-5445" },
            { network: "Landline", number: "0776003835", display: "(077) 600-38-35" }
        ]
    },
    { 
        name: "BFP Solsona", category: "Fire", icon: "🔥",
        phones: [
            { network: "Smart/TNT", number: "09474996907", display: "0947-499-6907" },
            { network: "Landline", number: "0776003785", display: "(077) 600-37-85" }
        ]
    },
    { 
        name: "PNP Solsona", category: "Police", icon: "👮",
        phones: [
            { network: "Smart/TNT", number: "09215613333", display: "0921-561-3333" },
            { network: "Smart/TNT", number: "09985985043", display: "0998-598-5043" }
        ]
    }
];

const safetyGuides = {
    fire: {
        title: "Fire Emergency", color: "text-orange-600",
        steps: [
            { letter: "S", label: "Sound the Alarm", desc: "Shout 'FIRE!' and alert everyone immediately." },
            { letter: "A", label: "Advise the Station", desc: "Call the nearest BFP station using this app." },
            { letter: "F", label: "Fight the Fire", desc: "Use an extinguisher only if the fire is small." },
            { letter: "E", label: "Evacuate", desc: "Leave the area quickly. Do not go back inside." }
        ]
    },
    earthquake: {
        title: "During an Earthquake", color: "text-amber-600",
        steps: [
            { letter: "D", label: "Drop", desc: "Drop onto your hands and knees." },
            { letter: "C", label: "Cover", desc: "Cover your head and neck under a sturdy desk." },
            { letter: "H", label: "Hold On", desc: "Hold on until the shaking completely stops." },
            { letter: "E", label: "Evacuate", desc: "Walk to an open area away from buildings." }
        ]
    },
    typhoon: {
        title: "Typhoon & Flooding", color: "text-blue-600",
        steps: [
            { letter: "1", label: "Monitor", desc: "Listen to PAGASA announcements regularly." },
            { letter: "2", label: "Prepare Go-Bag", desc: "Pack a 72-hour survival kit." },
            { letter: "3", label: "Secure Property", desc: "Tie down loose outdoor items." },
            { letter: "4", label: "Evacuate Early", desc: "Move to designated evacuation centers." }
        ]
    },
    medical: {
        title: "Medical Emergency", color: "text-emerald-600",
        steps: [
            { letter: "1", label: "Assess Safety", desc: "Ensure the scene is safe before approaching." },
            { letter: "2", label: "Call for Help", desc: "Contact the RHU via the app immediately." },
            { letter: "3", label: "Basic Aid", desc: "Apply pressure to bleeding. Only do CPR if trained." },
            { letter: "4", label: "Do Not Move", desc: "Do not move a severely injured person unless necessary." }
        ]
    }
};

// --- Action Sheet Logic ---
function openActionSheet(name, number) {
    document.getElementById('actionSheetTitle').innerText = name;
    document.getElementById('actionSheetNumber').innerText = number;
    document.getElementById('callAction').href = `tel:${number}`;
    document.getElementById('textAction').href = `sms:${number}`;
    document.getElementById('actionSheet').classList.remove('hidden');
}
function closeActionSheet() { document.getElementById('actionSheet').classList.add('hidden'); }

// --- Render Contacts ---
const container = document.getElementById('contactContainer');
function displayContacts(list) {
    container.innerHTML = ""; 
    list.forEach(contact => {
        let phoneButtonsHtml = contact.phones.map(p => `
            <button onclick="openActionSheet('${contact.name}', '${p.number}')" class="w-full bg-slate-50 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold border border-slate-200 flex items-center justify-between active:scale-[0.98] mb-2">
                <span class="text-[10px] tracking-widest uppercase text-slate-400 font-black">${p.network}</span>
                <span class="text-red-600 tracking-wider">${p.display}</span>
            </button>
        `).join('');
        const card = `
            <div class="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4">
                <div class="flex items-center gap-5">
                    <div class="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-white">${contact.icon}</div>
                    <div>
                        <h3 class="font-extrabold text-slate-800 text-lg leading-none">${contact.name}</h3>
                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">${contact.category}</p>
                    </div>
                </div>
                <div class="flex flex-col border-t border-slate-100 pt-3">${phoneButtonsHtml}</div>
            </div>
        `;
        container.innerHTML += card;
    });
}
displayContacts(emergencyContacts);

// --- SPA Nav ---
function switchTab(tabName) {
    ['home', 'hotlines', 'modules'].forEach(t => document.getElementById(`view-${t}`).classList.add('hidden'));
    ['tab-home', 'tab-hotlines', 'tab-modules'].forEach(t => {
        document.getElementById(t).classList.remove('text-red-600');
        document.getElementById(t).classList.add('text-slate-400');
    });
    document.getElementById(`view-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-${tabName}`).classList.remove('text-slate-400');
    document.getElementById(`tab-${tabName}`).classList.add('text-red-600');
}

// --- Modals ---
function openGuide(key) {
    const guide = safetyGuides[key];
    const content = document.getElementById('guideContent');
    content.innerHTML = `<h2 class="text-2xl font-black ${guide.color} mb-6 tracking-tight">${guide.title}</h2><div class="space-y-5">${guide.steps.map(step => `<div class="flex gap-4 items-start"><div class="h-10 w-10 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-700">${step.letter}</div><div><h4 class="font-bold text-slate-800 leading-none">${step.label}</h4><p class="text-sm text-slate-500 mt-1">${step.desc}</p></div></div>`).join('')}</div>`;
    document.getElementById('guideModal').classList.remove('hidden');
}
function closeGuide() { document.getElementById('guideModal').classList.add('hidden'); }

// --- GPS & Siren ---
function shareLocation() {
    const btnText = document.getElementById('btn-location-text');
    if (!navigator.geolocation) return alert("GPS not supported.");
    btnText.innerHTML = "Locating...";
    navigator.geolocation.getCurrentPosition(pos => {
        const link = `http://googleusercontent.com/maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        const msg = `EMERGENCY! My location: ${link}`;
        if (navigator.share) navigator.share({ title: 'Emergency', text: msg });
        else window.location.href = `sms:?body=${encodeURIComponent(msg)}`;
        btnText.innerHTML = "Share<br>Location";
    }, () => { alert("Check GPS permissions."); btnText.innerHTML = "Share<br>Location"; });
}

let audioCtx, oscillator, alarmInterval, isAlarmPlaying = false;
function toggleAlarm() {
    const btnText = document.getElementById('btn-alarm-text');
    if (isAlarmPlaying) {
        clearInterval(alarmInterval); oscillator.stop(); isAlarmPlaying = false;
        btnText.innerHTML = "Sound<br>Alarm"; return;
    }
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = 'square'; oscillator.connect(gain); gain.connect(audioCtx.destination);
    oscillator.start(); isAlarmPlaying = true; btnText.innerHTML = "Stop<br>Alarm";
    let high = true;
    alarmInterval = setInterval(() => {
        oscillator.frequency.setValueAtTime(high ? 800 : 400, audioCtx.currentTime);
        high = !high;
    }, 400);
}