const mongoose = require('mongoose');
const utilisateurSchema = new mongoose.Schema({
    nom: String,
    email: { type: String, unique: true },
    login: { type: String, unique: true },
    mdp: String
});
module.exports = mongoose.model('Utilisateur', utilisateurSchema);


