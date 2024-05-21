async function IsOpenOn(date) {
    const queryDate = date.toISOString();
    const url = `https://horaire-magasin.vercel.app/api/isopenon?date=${queryDate}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.isOpen;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function NextOpeningDate(date) {
    const queryDate = date.toISOString();
    const url = `https://horaire-magasin.vercel.app/api/nextopeningdate?date=${queryDate}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.nextOpening);
        return new Date(data.nextOpening);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function SetOpeningHours(day, startTime = "", endTime = "") {
    const postData = {
        day, startTime, endTime
    };
    try {
        const response = await fetch('https://horaire-magasin.vercel.app/api/setopeninghours', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IsOpenOn, NextOpeningDate, SetOpeningHours };
} else {
    try {
        const now = new Date();
        document.getElementById('status-api').innerText = `Le magasin est ${IsOpenOn(now) ? 'ouvert' : 'fermé'}`;
        document.getElementById('next-opening-api').innerText = `Prochaine ouverture : ${NextOpeningDate(now)}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('status-api').innerText = 'Error fetching status';
        document.getElementById('next-opening-api').innerText = 'Error fetching next opening';
    }
}