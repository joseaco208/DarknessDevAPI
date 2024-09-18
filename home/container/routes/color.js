const express = require('express');
const Color = require('color');
const colorNamer = require('color-namer');
const router = express.Router();
const colorTranslations = require('../utils/colorTranslations');

router.get('/', (req, res) => {
    const hex = req.query.hex;

    if (!hex) {
        return res.status(400).send('Parámetro hex es requerido');
    }

    try {
        const color = Color(`#${hex}`).hex().slice(1);
        const namedColors = colorNamer(color);
        const colorNameInEnglish = namedColors.basic[0].name;
        const colorNameInSpanish = colorTranslations[colorNameInEnglish.toLowerCase()] || colorNameInEnglish;
        res.send(colorNameInSpanish);
    } catch (error) {
        res.status(400).send('Código hexadecimal inválido');
    }
});

module.exports = router;
