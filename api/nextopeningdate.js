const { NextOpeningDate } = require('../public/script');

module.exports = (req, res) => {
    try {
        const date = new Date(req.query.date);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        const nextOpening = NextOpeningDate(date);
        res.status(200).json({ nextOpening });
    } catch (error) {
        console.error('Error in nextopening function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};