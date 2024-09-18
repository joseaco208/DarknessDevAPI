const express = require('express');
const morse = require('morse');
const router = express.Router();

router.get('/', (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).send('Parámetro text es requerido');
    }

    const morseCode = morse.encode(text);
    res.send(morseCode);
});

module.exports = router;