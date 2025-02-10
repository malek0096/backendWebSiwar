const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Port pour TLS
  secure: false, // Utilisez TLS
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

// Configuration de Handlebars pour les templates d'e-mail
const handlebarOptions = {
  viewEngine: {
    extname: '.hbs', // Extension des fichiers
    defaultLayout: false,
    partialsDir: path.join(__dirname, '../templates'), // Chemin des templates
  },
  viewPath: path.join(__dirname, '../templates'),
  extName: '.hbs',
};

// Attacher Handlebars au transporteur Nodemailer
transporter.use('compile', hbs(handlebarOptions));

/**
 * Envoie un e-mail.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} template - Nom du fichier template Handlebars.
 * @param {Object} context - Données à injecter dans le template.
 */
const sendMail = async (to, subject, template, context) => {
  try {
    await transporter.sendMail({
      from: `"Woods of the World" <${process.env.SMPT_MAIL}>`, // Expéditeur
      to, // Destinataire
      subject, // Sujet
      template, // Nom du template Handlebars
      context, // Données injectées dans le template
    });
    console.log(`E-mail envoyé à ${to}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'e-mail à ${to} :`, error);
    throw new Error("Échec de l'envoi de l'e-mail.");
  }
};

module.exports = { sendMail };
