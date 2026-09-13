let is24Hour = false;

// ================= CLOCK =================

function updateClock() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";

    if (!is24Hour) {
        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }
    }

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("clock").innerText =
        `${hours}:${minutes}:${seconds}`;

    document.getElementById("ampm").innerText =
        is24Hour ? "" : ampm;

    let date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("date").innerText = date;

    updateGreeting(now.getHours());
}

function updateGreeting(hour) {
    let greeting = document.getElementById("greeting");

    if (hour >= 5 && hour < 12) {
        greeting.innerText = "Good Morning ☀️";
    }
    else if (hour >= 12 && hour < 17) {
        greeting.innerText = "Good Afternoon 🌤️";
    }
    else if (hour >= 17 && hour < 21) {
        greeting.innerText = "Good Evening 🌆";
    }
    else {
        greeting.innerText = "Good Night 🌙";
    }
}

function toggleFormat() {
    is24Hour = !is24Hour;

    let button = document.getElementById("formatBtn");

    if (is24Hour) {
        button.innerText = "24 Hour";
    }
    else {
        button.innerText = "12 Hour";
    }

    updateClock();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-mode")) {
        button.innerText = "☀️ Light Mode";
    }
    else {
        button.innerText = "🌙 Dark Mode";
    }
}

updateClock();
setInterval(updateClock, 1000);


// ================= WORLD CLOCK =================

function updateWorldClocks() {
    let now = new Date();

    let india = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    let london = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    let newYork = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("indiaTime").innerText = india;
    document.getElementById("londonTime").innerText = london;
    document.getElementById("newYorkTime").innerText = newYork;
}

updateWorldClocks();
setInterval(updateWorldClocks, 1000);


// ================= STOPWATCH =================

let stopwatchSeconds = 0;
let stopwatchInterval = null;

function updateStopwatch() {
    let hours = Math.floor(stopwatchSeconds / 3600);
    let minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    let seconds = stopwatchSeconds % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("stopwatchDisplay").innerText =
        `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    if (stopwatchInterval !== null) {
        return;
    }

    stopwatchInterval = setInterval(function() {
        stopwatchSeconds++;
        updateStopwatch();
    }, 1000);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);

    stopwatchInterval = null;
    stopwatchSeconds = 0;

    updateStopwatch();
}

updateStopwatch();


// ================= ALARM SOUND =================

let alarmSound = new Audio("./Alarm.mp3");
alarmSound.loop = true;
function enableAlarmSound() {
    alarmSound.play()
        .then(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;

            document.getElementById("alarmStatus").innerText =
                "🔊 Alarm sound enabled!";
        })
        .catch(error => {
            console.log("Audio permission error:", error);
        });
}


// ================= ALARM =================

let alarmTime = null;
let alarmInterval = null;

function setAlarm() {

    let hour = document.getElementById("alarmHour").value;
    let minute = document.getElementById("alarmMinute").value;
    let ampm = document.getElementById("alarmAmPm").value;

    if (hour === "" || minute === "" || ampm === "") {
        alert("Please select hour, minute and AM/PM!");
        return;
    }

    let hours24 = Number(hour);

    // Convert 12-hour time to 24-hour time
    if (ampm === "PM" && hours24 !== 12) {
        hours24 += 12;
    }

    if (ampm === "AM" && hours24 === 12) {
        hours24 = 0;
    }

    alarmTime = {
        hour: hours24,
        minute: Number(minute)
    };

    document.getElementById("alarmStatus").innerText =
        "⏰ Alarm set for " + hour + ":" + minute + " " + ampm;


    // Unlock audio on mobile browser
    alarmSound.play().then(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }).catch(() => {
        console.log("Audio permission pending");
    });


    // Remove previous alarm checker
    clearInterval(alarmInterval);

    // Check every second
    alarmInterval = setInterval(checkAlarm, 1000);
}


function checkAlarm() {

    if (alarmTime === null) {
        return;
    }

    let now = new Date();

    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    if (
        currentHour === alarmTime.hour &&
        currentMinute === alarmTime.minute
    ) {

        alarmSound.currentTime = 0;

        alarmSound.play().catch(error => {
            console.log("Alarm sound blocked:", error);
        });

        console.log("Alarm reached!");

        document.getElementById("alarmStatus").innerText =
            "🔔 Alarm ringing!";

        alarmTime = null;

        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}


function cancelAlarm() {

    alarmSound.pause();
    alarmSound.currentTime = 0;

    alarmTime = null;

    clearInterval(alarmInterval);
    alarmInterval = null;

    document.getElementById("alarmStatus").innerText =
        "No alarm set";
}


function stopAlarm() {

    alarmSound.pause();
    alarmSound.currentTime = 0;

    document.getElementById("alarmStatus").innerText =
        "🔕 Alarm stopped";
}