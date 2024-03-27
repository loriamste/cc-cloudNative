const express = require('express');
const router = express.Router();
const Evenement = require('./Evenement/models/Evenement');
const Utilisateur = require('./auth-service/models/Utilisateur');
const Inscription = require('./models/Inscription');

router.post('/ajouter', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.body.utilisateur_id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    
    const evenement = await Evenement.findById(req.body.evenement_id);
    if (!evenement ) {
      return res.status(404).json({ message: 'evenement non trouvee ' });
    }
    }}})
module.exports = router;



router.post('/ajouter', async (req, res) => {
  try {
    const existeEvenement = await Evenement.findOne({ evenement: req.body.evenement });
    const existeUtilisateur = await Utilisateur.String({ utilisateur: req.body.utilisateur_id  });
    if (existeEvenement || existeUtilisateur) {
      return res.status(400).json({ message: 'evenement ou utilisateur existe pas' });
    }
   

const nouvelleIscription = new Inscription(req.body);
await nouvelleInscription.save();
res.status(201).json(nouvelleIscription);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Erreur serveur' });
}
});