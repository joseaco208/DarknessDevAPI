const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Función para manejar la lógica del endpoint /role_info
async function getRoleInfo(req, res) {
  const { token, guild_id, role_id } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Falta el parámetro token' });
  }

  if (!guild_id || !role_id) {
    return res.status(400).json({ message: 'Faltan los parámetros guild_id o role_id' });
  }

  try {
    await client.login(token);
    const guild = await client.guilds.fetch(guild_id);
    const role = await guild.roles.fetch(role_id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(role.id)).size;

    const permissions = {
      ADMINISTRATOR: role.permissions.has(PermissionsBitField.Flags.Administrator) ? '✅' : '❌',
      MANAGE_ROLES: role.permissions.has(PermissionsBitField.Flags.ManageRoles) ? '✅' : '❌',
      MANAGE_CHANNELS: role.permissions.has(PermissionsBitField.Flags.ManageChannels) ? '✅' : '❌',
      MENTION_EVERYONE: role.permissions.has(PermissionsBitField.Flags.MentionEveryone) ? '✅' : '❌',
    };

    res.json({
      id: role.id,
      nombre: role.name,
      color: `#${role.color.toString(16).padStart(6, '0')}`,
      posición: role.position,
      permisos: role.permissions.toArray(),
      destacable: role.hoist ? '✅' : '❌',
      mencionable: role.mentionable ? '✅' : '❌',
      fecha_creación: role.createdAt.toLocaleDateString(),
      miembros_con_rol: membersWithRole,
      permisos_específicos: permissions
    });
  } catch (error) {
    console.error('Error al obtener información del rol:', error);
    res.status(500).json({ message: 'Error al obtener información del rol', error: error.message });
  }
}

module.exports = getRoleInfo;