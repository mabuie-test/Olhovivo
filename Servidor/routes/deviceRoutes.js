const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// Middleware de autenticação
router.use(authController.authenticate);

// Registrar novo dispositivo
router.post('/register', [
  check('deviceId', 'ID do dispositivo é obrigatório').notEmpty(),
  check('deviceInfo', 'Informações do dispositivo são obrigatórias').notEmpty()
], deviceController.registerDevice);

// Atualizar dados do dispositivo
router.post('/data', [
  check('deviceId', 'ID do dispositivo é obrigatório').notEmpty()
], deviceController.updateDeviceData);

// Obter dispositivos do usuário
router.get('/', deviceController.getUserDevices);

// Obter detalhes do dispositivo
router.get('/:id', deviceController.getDeviceDetails);

module.exports = router;
