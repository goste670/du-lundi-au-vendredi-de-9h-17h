const express = require('express');
const app = express();
const port = 5000;

// Middleware pour vérifier l'heure de la demande
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    next(); // Continuer avec la demande si c'est pendant les heures de travail
  } else {
    res.send('L\'application est disponible uniquement pendant les heures de travail.');
  }
};

app.use(express.static('public'));
app.use(checkWorkingHours);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/accueil.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
