const { IsOpenOn } = require('../public/script');

module.exports = (req, res) => {
    try {
        const date = new Date(req.query.date);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        const isOpen = IsOpenOn(date);
        res.status(200).json({ isOpen });
    } catch (error) {
        console.error('Error in isopen function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};