const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const router = express.Router();

// Inicializar el cliente de Discord con los intents necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
    ],
});

// Mapeo de permisos en inglés a español
const permisosEnEspanol = {
    "CreateInstantInvite": "Crear Invitación Instantánea",
    "KickMembers": "Expulsar Miembros",
    "BanMembers": "Prohibir Miembros",
    "Administrator": "Administrador",
    "ManageChannels": "Gestionar Canales",
    "ManageGuild": "Gestionar Servidor",
    "AddReactions": "Añadir Reacciones",
    "ViewAuditLog": "Ver Registro de Auditoría",
    "PrioritySpeaker": "Prioridad de Voz",
    "Stream": "Transmitir",
    "ViewChannel": "Ver Canal",
    "SendMessages": "Enviar Mensajes",
    "SendTTSMessages": "Enviar Mensajes de Texto a Voz",
    "ManageMessages": "Gestionar Mensajes",
    "EmbedLinks": "Incrustar Enlaces",
    "AttachFiles": "Adjuntar Archivos",
    "ReadMessageHistory": "Leer Historial de Mensajes",
    "MentionEveryone": "Mencionar a Todos",
    "UseExternalEmojis": "Usar Emojis Externos",
    "ViewGuildInsights": "Ver Información del Servidor",
    "Connect": "Conectar",
    "Speak": "Hablar",
    "MuteMembers": "Silenciar Miembros",
    "DeafenMembers": "Ensordecer Miembros",
    "MoveMembers": "Mover Miembros",
    "UseVAD": "Usar Detección de Actividad de Voz",
    "ChangeNickname": "Cambiar Apodo",
    "ManageNicknames": "Gestionar Apodos",
    "ManageRoles": "Gestionar Roles",
    "ManageWebhooks": "Gestionar Webhooks",
    "ManageEmojisAndStickers": "Gestionar Emojis y Stickers",
    "UseApplicationCommands": "Usar Comandos de Aplicación",
    "RequestToSpeak": "Solicitar Hablar",
    "ManageThreads": "Gestionar Hilos",
    "UsePublicThreads": "Usar Hilos Públicos",
    "UsePrivateThreads": "Usar Hilos Privados",
    "UseExternalStickers": "Usar Stickers Externos",
    "SendMessagesInThreads": "Enviar Mensajes en Hilos",
    "UseEmbeddedActivities": "Usar Actividades Incrustadas",
    "UseSoundboard": "Usar Tablero de Sonido",
    "CreateGuildExpressions": "Crear Expresiones del Servidor",
    "CreateEvents": "Crear Eventos",
    "UseExternalSounds": "Usar Sonidos Externos",
    "SendVoiceMessages": "Enviar Mensajes de Voz",
    "SendPolls": "Enviar Encuestas",
    "UseExternalApps": "Usar Aplicaciones Externas",
};

// Ruta para obtener información sobre las invitaciones
router.get('/', async (req, res) => {
    const { token, guild_id, member_id } = req.query;

    if (!token || !guild_id || !member_id) {
        return res.status(400).json({
            error: "Faltan parámetros requeridos: token, guild_id y member_id."
        });
    }

    try {
        // Iniciar sesión solo si el cliente no está listo
        if (!client.isReady()) {
            await client.login(token);
        }

        // Obtener el guild usando el guild_id proporcionado
        const guild = await client.guilds.fetch(guild_id);
        if (!guild) {
            return res.status(404).json({
                error: "Servidor no encontrado."
            });
        }

        // Buscar el miembro en el guild
        const member = await guild.members.fetch(member_id);
        if (!member) {
            return res.status(404).json({
                error: "Miembro no encontrado."
            });
        }

        // Obtiene las invitaciones del guild
        const invites = await guild.invites.fetch();
        const memberInvites = invites.filter(invite => invite.inviter.id === member.id);
        const invitedCount = memberInvites.reduce((count, invite) => count + invite.uses, 0);

        // Traducir permisos a español
        const permisosTraducidos = member.permissions.toArray().map(permission => permisosEnEspanol[permission] || permission);

        // Estructura de la respuesta en JSON
        const response = {
            cantidad_invitados: invitedCount,
            invitaciones_creadas: memberInvites.map(invite => ({
                codigo: invite.code,
                usos: invite.uses
            })),
            permisos_miembro: permisosTraducidos
        };

        return res.json(response); // Envía la respuesta en formato JSON

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
});

module.exports = router;