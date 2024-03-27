
const express = require('express');
const Evenement = require('./models/Evenement');
const router = express.Router();
router.post('/ajouter', async (req, res) => {
    try {
      const existeTitre = await Evenement.findOne({ titre: req.body.titre });
      const chaine = await Evenement.String({ priorite: req.body.priorite });
      if (existeTitre || chaine) {
        return res.status(400).json({ message: 'titre déjà utilise ou priorite doit etre chaine de caractere' });
      }
     
  
  const nouvelleEvenement = new Evenement(req.body);
  await nouvelleEvenement.save();
  res.status(201).json(nouvelleEvenement);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Erreur serveur' });
}
});


router.get('/:id', async (req, res) => {
    try {
      const evenement = await Evenement.findById(req.params.id);
      if (!evenement) {
        return res.status(404).json({ message: 'Evenement non trouvee' });
      }
      res.status(200).json(evenement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });


