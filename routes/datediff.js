const express = require('express');
const moment = require('moment');
const router = express.Router();

router.get('/', (req, res) => {
    const { date1, date2 } = req.query;

    if (!date1 || !date2) {
        return res.status(400).send('Parámetros date1 y date2 son requeridos');
    }

    try {
        const d1 = moment(date1, 'YYYY-MM-DD');
        const d2 = moment(date2, 'YYYY-MM-DD');
        const diffInDays = d2.diff(d1, 'days');
        res.send(`${diffInDays} días`);
    } catch (error) {
        res.status(400).send('Fechas inválidas');
    }
});

module.exports = router;