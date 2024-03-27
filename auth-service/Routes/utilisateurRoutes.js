
const express = require('express');
const router = express.Router();
const Utilisateur = require('./Utilisateur');

router.post('/ajouter', async (req, res) => {
  try {
    const existeEmail = await Utilisateur.findOne({ email: req.body.email });
    const existeLogin = await Utilisateur.findOne({ login: req.body.login });
    if (existeEmail || existeLogin) {
      return res.status(400).json({ message: 'Email ou login deja utilise' });
    }
    const nouvelUtilisateur = new Utilisateur(req.body);
    await nouvelUtilisateur.save();
    res.status(201).json(nouvelUtilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/connexion', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ login: req.body.login });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const motDePasseValide = await bcrypt.compare(req.body.mdp, utilisateur.mdp);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.get('/verifier/:login', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ login: req.params.login });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }
    res.status(200).json({ message: 'Utilisateur trouve', utilisateur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
    module.exports = router;
