const { sendMail } = require('../services/mailService');

const contactUs = async (req, res) => {
  try {
    const { type, nom, prenom, email, adresse, telephone, commentaire, entreprise } = req.body;

    // Validation des champs obligatoires
    if (!type || !nom || !prenom || !email || !adresse || !telephone || !commentaire) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
    }

    // Vérification du champ "Nom de l'entreprise" si le type est "Professionnel"
    if (type === "Professionnel" && !entreprise) {
      return res.status(400).json({ error: "Le nom de l'entreprise est requis pour les professionnels." });
    }

    // Envoyer l'e-mail à l'administrateur
    await sendMail(process.env.SMPT_MAIL, `Nouvelle demande de devis de ${prenom} ${nom}`, 'adminEmail', {
      type,
      nom,
      prenom,
      email,
      adresse,
      telephone,
      commentaire,
      entreprise: type === "Professionnel" ? entreprise : null, // Ajout de l'entreprise si professionnel
    });

    // Envoyer l'e-mail d'accusé de réception au client
    await sendMail(email, 'Accusé de réception de votre demande de devis', 'clientEmail', {
      type,
      nom,
      prenom,
      commentaire,
      entreprise: type === "Professionnel" ? entreprise : null, // Ajout de l'entreprise si professionnel
    });

    res.status(200).json({
      message: "Votre demande a été envoyée avec succès et un accusé de réception a été envoyé à votre adresse e-mail.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({ error: "Échec de l'envoi de la demande. Veuillez réessayer plus tard." });
  }
};

const sendContactMessage = async (req, res) => {
  try {
    const { type, nom, telephone, adresse, email, message, autre } = req.body;

    // Validation des champs obligatoires
    if (!type || !nom || !telephone || !adresse || !email || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // Validation conditionnelle pour "Autre"
    if (type === "Autre" && !autre) {
      return res.status(400).json({ error: "Veuillez préciser votre type si vous avez sélectionné 'Autre'." });
    }

    // Préparer les informations à inclure dans l'email
    const contactType = type === "Autre" ? `Autre : ${autre}` : type;

    // Envoyer l'e-mail à l'administrateur
    await sendMail(
      process.env.SMPT_MAIL,
      `Nouveau message de contact de ${nom}`,
      'adminContact', // Template pour l'administrateur
      {
        type: contactType,
        nom,
        telephone,
        adresse,
        email,
        message,
      }
    );

    // Envoyer l'e-mail d'accusé de réception au client
    await sendMail(
      email,
      'Confirmation de votre message',
      'clientContact', // Template pour le client
      {
        nom,
        message,
      }
    );

    res.status(200).json({
      message: "Votre message a été envoyé avec succès et un accusé de réception vous a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({ error: "Échec de l'envoi du message. Veuillez réessayer plus tard." });
  }
};


const sendChatMessage = async (req, res) => {
  try {
    const { details, telephone, email, type, subType } = req.body;

    if (!telephone || !email || !details) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    const chatDetails = details.split(" | ").join("\n"); 

    await sendMail(
      process.env.SMPT_MAIL,
      `Nouvelle demande via Chatbot de ${email}`,
      'adminChatEmail',
      {
        type: type || "Non spécifié",
        subType: subType || "Non spécifié",
        telephone,
        email,
        details: chatDetails,
      }
    );

    if (typeof email === "string" && email.includes("@")) {
      await sendMail(
        email,
        "Confirmation de votre demande via chatbot",
        'clientChatEmail',
        {
          type: type || "Non spécifié",
          subType: subType || "Non spécifié",
          details: chatDetails,
        }
      );
    } else {
      console.warn("Email invalide, aucun mail envoyé au client.");
    }

    res.status(200).json({
      message: "Votre demande a été envoyée avec succès et un accusé de réception vous a été envoyé.",
    });

  } catch (error) {
    console.error("Erreur lors de l'envoi du message via chatbot :", error);
    res.status(500).json({ error: "Échec de l'envoi du message. Veuillez réessayer plus tard." });
  }
};

module.exports = { contactUs , sendContactMessage, sendChatMessage};
