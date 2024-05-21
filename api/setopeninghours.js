const { SetOpeningHours } = require('../public/script');

module.exports = (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;

        // Call the SetOpeningHours function
        SetOpeningHours(day, startTime, endTime);

        res.status(200).json({ message: 'Opening hours updated successfully' });
    } catch (error) {
        console.error('Error in setopeninghours function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};