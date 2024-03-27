const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
    utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    evenement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }
});
module.exports = mongoose.model('Inscripton', inscriptionSchema);
