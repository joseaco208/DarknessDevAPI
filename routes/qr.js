const express = require('express');
const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configuración del servidor
const HOST = 'http://mtl1-1.micium-hosting.com';
const PORT = '10195';
const FILE_LIFETIME = 24 * 60 * 60 * 1000; // 24 horas
const PUBLIC_DIR = '/home/container/public';

// Ruta para generar el código QR
router.get('/', async (req, res) => {
    const text = req.query.text;

    // Verificar si se ha proporcionado el parámetro 'text'
    if (!text) {
        return res.status(400).json({ error: 'Parámetro text es requerido' });
    }

    try {
        // Generar el código QR como una imagen en formato PNG
        const qrCodePng = await QRCode.toBuffer(text);

        // Convertir la imagen PNG a JPG usando sharp
        const qrCodeJpg = await sharp(qrCodePng)
            .jpeg()
            .toBuffer();

        // Definir el nombre y la ruta del archivo
        const fileName = `qr_${Date.now()}.jpg`;
        const filePath = path.join(PUBLIC_DIR, fileName);

        // Guardar el archivo JPG en el sistema de archivos
        fs.writeFileSync(filePath, qrCodeJpg);

        // Construir la URL completa del archivo
        const fileUrl = `${HOST}:${PORT}/public/${fileName}`;
        
        // Enviar la respuesta JSON con la URL de la imagen
        res.json({ qr: fileUrl });
        
        // Programar la eliminación del archivo después de un tiempo
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo temporal ${filePath}:`, err);
                } else {
                    console.log(`Archivo temporal ${filePath} eliminado.`);
                }
            });
        }, FILE_LIFETIME);
    } catch (error) {
        console.error('Error en la generación del código QR:', error);
        res.status(500).json({ error: 'Error al generar el código QR' });
    }
});

module.exports = router;