const db = require('../config/db');

const Client = {
  // Ajouter un client
  create: async (data) => {
    const { username, email, password } = data;
    const sql = `
      INSERT INTO client (username, email, password)
      VALUES ( ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [username, email, password]);
    return result;
  },

  // Trouver un client par email
  findByEmail: async (email) => {
    const sql = `
      SELECT * FROM client WHERE email = ?
    `;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  },

  // Trouver un client par ID
  findById: async (id) => {
    const sql = `
      SELECT * FROM client WHERE id = ?
    `;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // Mettre à jour un client
  update: async (id, data) => {
    const { username, email } = data;
    const sql = `
      UPDATE client
      SET username, email = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(sql, [nom, prenom, email, id]);
    return result.affectedRows > 0;
  },

  // Mettre à jour le mot de passe
  updatePassword: async (id, password) => {
    const sql = `
      UPDATE client
      SET password = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(sql, [password, id]);
    return result.affectedRows > 0;
  },
};

module.exports = Client;
