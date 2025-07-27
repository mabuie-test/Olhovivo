const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const deviceController = require('../controllers/deviceController');

// Middleware de autenticação
router.use(authController.authenticate);

// Obter estatísticas do dashboard
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const deviceCount = await Device.countDocuments({ owner: userId });
    
    // Aqui você pode adicionar mais estatísticas conforme necessário
    // Ex: últimas localizações, total de chamadas, etc.
    
    res.status(200).json({
      deviceCount,
      // outras estatísticas
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
