const { Client } = require("discord.js-selfbot-v13");

const TOKEN = "";

const client = new Client();

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!dmfriends") || message.author.id !== client.user.id) return;

  const args = message.content.split(" ").slice(1);
  if (!args.length) {
    return message.edit("Veuillez entrer un message à envoyer à vos amis.");
  }

  message.delete().catch(() => {});

  try {
    client.relationships.friendCache.forEach(friend => {
      if (friend && friend.id) {
        const messageToSend = args.join(" ").replace(/{user}/g, `<@${friend.id}>`);
        friend.send(messageToSend).catch((err) => console.log(`Impossible d'envoyer un message à ${friend.id}: ${err}`));
      } else {
        console.log("Ami non valide détecté.");
      }
    });
  } catch (e) {
    console.error("Erreur lors de l'envoi des messages aux amis :", e);
  }
});

client.login(TOKEN).catch(() => console.log("Échec de la connexion, vérifiez votre token."));