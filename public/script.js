const openingHours = [
    { days: ['Mon', 'Wed', 'Fri'], hours: '08:00-16:00' },
    { days: ['Tue', 'Thu', 'Sat'], hours: '08:00-12:00' },
    { days: ['Tue', 'Thu'], hours: '14:00-18:00' }
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
}

function isWithinHours(date, startTime, endTime) {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const afterStart = (currentHours > start.hours) || (currentHours === start.hours && currentMinutes >= start.minutes);
    const beforeEnd = (currentHours < end.hours) || (currentHours === end.hours && currentMinutes <= end.minutes);
    return afterStart && beforeEnd;
}

function IsOpenOn(date) {
    const day = daysOfWeek[date.getDay()];
    for (const { days, hours } of openingHours) {
        if (days.includes(day)) {
            const [startTime, endTime] = hours.split('-');
            if (isWithinHours(date, startTime, endTime)) {
                return true;
            }
        }
    }
    return false;
}

function NextOpeningDate(date) {
    let nextDate = new Date(date);
    nextDate.setMinutes(nextDate.getMinutes() + 1);

    for (let i = 0; i < 7; i++) {
        const day = daysOfWeek[nextDate.getDay()];
        for (const { days, hours } of openingHours) {
            if (days.includes(day)) {
                const [startTime, endTime] = hours.split('-');
                const [startHours, startMinutes] = startTime.split(':').map(Number);
                nextDate.setHours(startHours, startMinutes, 0, 0);

                if (nextDate > date) {
                    return nextDate;
                }
            }
        }
        nextDate.setDate(nextDate.getDate() + 1);
    }
    return null;
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the parsed JSON data
}

function toLocalTime(dateString) {
    console.log(dateString);
    const date = new Date(dateString);
    console.log(dateString);
    // Convert to local time
    let formated = date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Zurich', // Ensure this matches the time zone of your API server
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    console.log(formated);
    return formated;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IsOpenOn, NextOpeningDate };
} else {
    document.addEventListener('DOMContentLoaded', async () => {
        const now = new Date(); // Use current date and time
        document.getElementById('status').innerText = IsOpenOn(now) ? 'Le magasin est ouvert.' : 'Le magasin est fermé.';
        document.getElementById('next-opening').innerText = 'Prochaine ouverture: ' + toLocalTime(NextOpeningDate(now));

        try {
            const isOpenUrl = `https://horaire-magasin.vercel.app/api/isopen?date=${now}`;
            const nextOpeningUrl = `https://horaire-magasin.vercel.app/api/nextopening?date=${now}`;

            // Fetch data from your API
            const [statusData, nextOpeningData] = await Promise.all([
                fetchJson(isOpenUrl),
                fetchJson(nextOpeningUrl)
            ]);

            // Handle status API response
            if (statusData.error) {
                document.getElementById('status-api').innerText = `Error: ${statusData.error}`;
            } else {
                document.getElementById('status-api').innerText = `Le magasin est ${statusData.isOpen ? 'ouvert' : 'fermé'}`;
            }

            // Handle next opening API response
            if (nextOpeningData.error) {
                document.getElementById('next-opening-api').innerText = `Error: ${nextOpeningData.error}`;
            } else {
                document.getElementById('next-opening-api').innerText = `Prochaine ouverture : ${toLocalTime(nextOpeningData.nextOpening)}`;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('status-api').innerText = 'Error fetching status';
            document.getElementById('next-opening-api').innerText = 'Error fetching next opening';
        }
    });
}