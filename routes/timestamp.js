const express = require('express');
const moment = require('moment');
const router = express.Router();

router.get('/', (req, res) => {
    const unixTimestamp = parseInt(req.query.unix, 10);

    if (isNaN(unixTimestamp)) {
        return res.status(400).send('Timestamp Unix inválido');
    }

    const duration = moment.duration(unixTimestamp * 1000); // Multiplicar por 1000 para convertir a milisegundos
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedTime = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    res.send(formattedTime);
});

module.exports = router;