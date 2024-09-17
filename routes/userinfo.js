const express = require('express');
const router = express.Router();
const { Client, GatewayIntentBits } = require('discord.js');

// Crear una instancia del cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Endpoint para obtener información sobre un usuario
router.get('/', async (req, res) => {
    const { token, guildID, memberID } = req.query;

    if (!memberID) {
        return res.status(400).json({ error: '¡Debes mencionar a alguien!' });
    }

    try {
        await client.login(token);
        const guild = await client.guilds.cache.get(guildID);
        const member = await guild.members.fetch(memberID);

        // Agrupando los resultados en secciones separadas
        const userInfo = {
            "results": {
                "informacion_basica": {
                    "Apodo": member.nickname || member.user.username,
                    "Nombre de Usuario": `${member.user.username}#${member.user.discriminator}`,
                    "ID de Usuario": member.user.id,
                    "Es Bot": member.user.bot ? 'Sí' : 'No',
                    "Estado de Presencia": member.presence?.status || 'Desconectado',
                    "Estado Personalizado": member.presence?.activities.length ? member.presence.activities[0].name : 'Ninguno'
                },
                "fechas": {
                    "Fecha de Creación de la Cuenta": member.user.createdAt.toISOString().split('T')[0],
                    "Fecha de Unión al Servidor": member.joinedAt.toISOString().split('T')[0]
                },
                "roles": {
                    "Rol Más Alto": `<@&${member.roles.highest.id}>`,
                    "Todos los Roles": member.roles.cache
                        .filter(role => role.name !== '@everyone') // Filtrar el rol @everyone
                        .map(role => role.name)
                },
                "permisos": {
                    "Administrador": member.permissions.has('ADMINISTRATOR') ? '✅' : '❌',
                    "Añadir Reacciones": member.permissions.has('ADD_REACTIONS') ? '✅' : '❌',
                    "Adjuntar Archivos": member.permissions.has('ATTACH_FILES') ? '✅' : '❌',
                    "Banear Miembros": member.permissions.has('BAN_MEMBERS') ? '✅' : '❌',
                    "Cambiar Apodos": member.permissions.has('MANAGE_NICKNAMES') ? '✅' : '❌',
                    "Crear Invitaciones": member.permissions.has('CREATE_INSTANT_INVITE') ? '✅' : '❌',
                    "Incrustar Enlaces": member.permissions.has('EMBED_LINKS') ? '✅' : '❌',
                    "Usar Emojis Externos": member.permissions.has('USE_EXTERNAL_EMOJIS') ? '✅' : '❌',
                    "Expulsar Miembros": member.permissions.has('KICK_MEMBERS') ? '✅' : '❌',
                    "Gestionar Canales": member.permissions.has('MANAGE_CHANNELS') ? '✅' : '❌',
                    "Gestionar Mensajes": member.permissions.has('MANAGE_MESSAGES') ? '✅' : '❌',
                    "Gestionar Roles": member.permissions.has('MANAGE_ROLES') ? '✅' : '❌'
                },
                "avatar": {
                    "Imagen de Perfil": `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`
                }
            }
        };

        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la información del usuario.' });
    } finally {
        client.destroy();
    }
});

module.exports = router;