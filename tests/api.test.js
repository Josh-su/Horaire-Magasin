const { IsOpenOn, NextOpeningDate, SetOpeningHours } = require('../public/use.api.script');

const testDates = {
    wednesday: new Date('2024-02-21T07:45:00.000'),
    thursday: new Date('2024-02-22T12:22:11.824'),
    saturday: new Date('2024-02-24T09:15:00.000'),
    sunday: new Date('2024-02-25T09:15:00.000'),
    friday_morning: new Date('2024-02-23T08:00:00.000'),
    monday_morning: new Date('2024-02-26T08:00:00.000'),
    thursday_afternoon: new Date('2024-02-22T14:00:00.000'),
};

test('IsOpenOn API returns false for Wednesday', async () => {
    expect(await IsOpenOn(testDates.wednesday)).toBe(false);
});

test('IsOpenOn API returns false for Thursday', async () => {
    expect(await IsOpenOn(testDates.thursday)).toBe(false);
});

test('IsOpenOn API returns false for Sunday', async () => {
    expect(await IsOpenOn(testDates.sunday)).toBe(false);
});

test('NextOpeningDate API returns Friday morning for Thursday afternoon', async () => {
    const response = await NextOpeningDate(testDates.thursday_afternoon);
    expect(response).toStrictEqual(testDates.friday_morning);
});

test('NextOpeningDate API returns Monday morning for Saturday', async () => {
    const response = await NextOpeningDate(testDates.saturday);
    expect(response).toStrictEqual(testDates.monday_morning);
});

test('NextOpeningDate API returns Thursday afternoon for Thursday', async () => {
    const response = await NextOpeningDate(testDates.thursday);
    expect(response).toStrictEqual(testDates.thursday_afternoon);
});