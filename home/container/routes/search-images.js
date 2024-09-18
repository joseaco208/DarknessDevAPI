const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint para buscar imágenes
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    // Realiza la solicitud a la API de imágenes
    const response = await axios.get('https://api.kastg.xyz/api/search/google-image', {
      params: { q: query }
    });

    // Extrae los resultados y limita a 100 imágenes
    const images = response.data.result.slice(0, 100);

    // Envía la respuesta
    res.json({ status: 'true', result: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching images' });
  }
});

module.exports = router;