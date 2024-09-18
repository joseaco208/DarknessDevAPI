const express = require('express');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const NodeCache = require('node-cache');
const app = express();
const port = process.env.PORT || 8080; // Usar el puerto proporcionado por Railway

const FILE_LIFETIME = 1 * 60 * 60 * 1000; // Tiempo de vida del archivo en milisegundos (1 hora)
const BASE_DIR = __dirname; // Directorio base

// Crear instancia de node-cache
const myCache = new NodeCache();

// Configurar el directorio principal
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la misma carpeta que index.html
app.use(express.static(BASE_DIR)); // Sirve archivos estáticos desde home/container

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    const cachedIndex = myCache.get('index');
    
    if (cachedIndex) {
        console.log('Usando página principal desde el caché');
        res.send(cachedIndex); // Enviar el archivo desde el caché si está almacenado
    } else {
        const indexPath = path.join(BASE_DIR, 'index.html');
        fs.readFile(indexPath, (err, data) => {
            if (err) {
                console.error('Error al leer index.html:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            myCache.set('index', data, 3600); // Cachear por 1 hora
            console.log('Almacenando página principal en el caché');
            res.send(data.toString());
        });
    }
});

// Importar las rutas de la API
const colorRoute = require('./routes/color');
const timestampRoute = require('./routes/timestamp');
const datediffRoute = require('./routes/datediff');
const convertirunidadRoute = require('./routes/convertirunidad');
const morseRoute = require('./routes/morse');
const qrRoute = require('./routes/qr');
const inviteinfoRoute = require('./routes/inviteinfo');
const unidadesRoute = require('./routes/unidades');
const roleinfoRoute = require('./routes/roleinfo');
const userinfoRoute = require('./routes/userinfo');
const searchImagesRoute = require('./routes/search-images'); // Nueva ruta

// Usar las rutas de la API
app.use('/color', colorRoute);
app.use('/timestamp', timestampRoute);
app.use('/datediff', datediffRoute);
app.use('/convertirunidad', convertirunidadRoute);
app.use('/morse', morseRoute);
app.use('/qr', qrRoute);
app.use('/inviteinfo', inviteinfoRoute);
app.use('/unidades', unidadesRoute);
app.use('/roleinfo', roleinfoRoute);
app.use('/userinfo', userinfoRoute);
app.use('/search-images', searchImagesRoute); // Nueva ruta

// Tarea programada para limpiar archivos antiguos en la carpeta public
cron.schedule('0 * * * *', () => {
    fs.readdir(BASE_DIR, (err, files) => {
        if (err) {
            console.error('Error al leer el directorio base:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(BASE_DIR, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error al obtener el estado del archivo ${filePath}:`, err);
                    return;
                }

                const now = Date.now();
                if (now - stats.mtimeMs > FILE_LIFETIME) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error al eliminar el archivo ${filePath}:`, err);
                        } else {
                            console.log(`Archivo ${filePath} eliminado.`);
                        }
                    });
                }
            });
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://darknessdevapi.onrender.com:${port}/`);
});
