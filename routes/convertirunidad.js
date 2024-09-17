const express = require('express');
const convert = require('convert-units');
const router = express.Router();
const unitTranslations = require('../utils/unitTranslations');

router.get('/', (req, res) => {
    const { valor, de, a } = req.query;

    if (!valor || !de || !a) {
        return res.status(400).send('Parámetros valor, de y a son requeridos.');
    }

    try {
        const fromUnitInEnglish = unitTranslations[de] || de;
        const toUnitInEnglish = unitTranslations[a] || a;

        const numericValue = parseFloat(valor);
        const result = convert(numericValue).from(fromUnitInEnglish).to(toUnitInEnglish);
        res.send(`${numericValue} ${de} es igual a ${Math.round(result)} ${a}.`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;