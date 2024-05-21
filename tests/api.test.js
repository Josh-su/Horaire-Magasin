const axios = require('axios');

const baseUrl = 'https://horaire-magasin.vercel.app/api';

const testDates = {
    wednesday: new Date('2024-02-21T07:45:00.000Z').toISOString(),
    thursday: new Date('2024-02-22T12:22:11.824Z').toISOString(),
    saturday: new Date('2024-02-24T09:15:00.000Z').toISOString(),
    sunday: new Date('2024-02-25T09:15:00.000Z').toISOString(),
    friday_morning: new Date('2024-02-23T08:00:00.000Z').toISOString(),
    monday_morning: new Date('2024-02-26T08:00:00.000Z').toISOString(),
    thursday_afternoon: new Date('2024-02-22T14:00:00.000Z').toISOString(),
};

async function fetchJson(url) {
    const response = await axios.get(url);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
}

test('IsOpenOn API returns false for Wednesday', async () => {
    const response = await fetchJson(`${baseUrl}/isopen?date=${testDates.wednesday}`);
    expect(response.isOpen).toBe(false);
});

test('IsOpenOn API returns false for Thursday', async () => {
    const response = await fetchJson(`${baseUrl}/isopen?date=${testDates.thursday}`);
    expect(response.isOpen).toBe(false);
});

test('IsOpenOn API returns false for Sunday', async () => {
    const response = await fetchJson(`${baseUrl}/isopen?date=${testDates.sunday}`);
    expect(response.isOpen).toBe(false);
});

test('NextOpeningDate API returns Friday morning for Thursday afternoon', async () => {
    const response = await fetchJson(`${baseUrl}/nextopening?date=${testDates.thursday_afternoon}`);
    expect(response.nextOpening).toBe(testDates.friday_morning);
});

test('NextOpeningDate API returns Monday morning for Saturday', async () => {
    const response = await fetchJson(`${baseUrl}/nextopening?date=${testDates.saturday}`);
    expect(response.nextOpening).toBe(testDates.monday_morning);
});

test('NextOpeningDate API returns Thursday afternoon for Thursday', async () => {
    const response = await fetchJson(`${baseUrl}/nextopening?date=${testDates.thursday}`);
    expect(response.nextOpening).toBe(testDates.thursday_afternoon);
});