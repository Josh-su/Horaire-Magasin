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
            if (hours) {
                const [startTime, endTime] = hours.split('-');
                if (isWithinHours(date, startTime, endTime)) {
                    console.log(true);
                    return true;
                }
            } else {
                console.log(false);
                return false; // Day is closed, return false
            }
        }
    }
    return false; // Day is not found in the openingHours array, return false
}

function NextOpeningDate(date) {
    let nextDate = new Date(date);
    nextDate.setMinutes(nextDate.getMinutes() + 1);

    for (let i = 0; i < 7; i++) {
        const day = daysOfWeek[nextDate.getDay()];
        for (const { days, hours } of openingHours) {
            if (days.includes(day)) {
                if (hours) {
                    const [startTime, endTime] = hours.split('-');
                    const [startHours, startMinutes] = startTime.split(':').map(Number);
                    nextDate.setHours(startHours, startMinutes, 0, 0);

                    if (nextDate > date) {
                        return nextDate;
                    }
                } else {
                    nextDate.setDate(nextDate.getDate() + 1);
                    nextDate.setHours(0, 0, 0, 0); // Reset to the beginning of the day
                    break; // Move to the next day
                }
            }
        }
        nextDate.setDate(nextDate.getDate() + 1);
    }
    return null; // No next opening date found within 7 days
}

function SetOpeningHours(day, startTime = '', endTime = '') {
    // Find the index of the entry corresponding to the provided day
    const index = openingHours.findIndex(entry => entry.days.includes(day));

    // If the day is found in the openingHours array
    if (index !== -1) {
        if (startTime && endTime) {
            // Update the hours for that day
            openingHours[index].hours = `${startTime}-${endTime}`;
            console.log(`Opening hours for ${day} updated to ${startTime}-${endTime}`);
        } else {
            // Set the day as closed
            openingHours[index].hours = '';
            console.log(`Store closed on ${day}`);
        }
    } else {
        console.error(`No opening hours found for ${day}`);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IsOpenOn, NextOpeningDate, SetOpeningHours };
} else {
    document.addEventListener('DOMContentLoaded', async () => {
        const now = new Date();
        document.getElementById('status').innerText = IsOpenOn(now) ? 'Le magasin est ouvert.' : 'Le magasin est fermé.';
        document.getElementById('next-opening').innerText = 'Prochaine ouverture: ' + NextOpeningDate(now);
    });
}