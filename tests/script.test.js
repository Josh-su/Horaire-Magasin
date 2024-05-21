const { IsOpenOn, NextOpeningDate } = require('../public/script.js');

const testDates = {
    wednesday: new Date('2024-02-21T07:45:00.000'),
    thursday: new Date('2024-02-22T12:22:11.824'),
    saturday: new Date('2024-02-24T09:15:00.000'),
    sunday: new Date('2024-02-25T09:15:00.000'),
    friday_morning: new Date('2024-02-23T08:00:00.000'),
    monday_morning: new Date('2024-02-26T08:00:00.000'),
    thursday_afternoon: new Date('2024-02-22T14:00:00.000'),
};

test('IsOpenOn returns false for Wednesday', () => {
    expect(IsOpenOn(testDates.wednesday)).toBe(false);
});

test('IsOpenOn returns false for Thursday', () => {
    expect(IsOpenOn(testDates.thursday)).toBe(false);
});

test('IsOpenOn returns false for Sunday', () => {
    expect(IsOpenOn(testDates.sunday)).toBe(false);
});

test('NextOpeningDate returns Friday morning for Thursday afternoon', () => {
    expect(NextOpeningDate(testDates.thursday_afternoon)).toEqual(testDates.friday_morning);
});

test('NextOpeningDate returns Monday morning for Saturday', () => {
    expect(NextOpeningDate(testDates.saturday)).toEqual(testDates.monday_morning);
});

test('NextOpeningDate returns Thursday afternoon for Thursday', () => {
    expect(NextOpeningDate(testDates.thursday)).toEqual(testDates.thursday_afternoon);
});

