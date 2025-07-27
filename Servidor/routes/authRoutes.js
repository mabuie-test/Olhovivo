const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// Registrar novo usuário
router.post('/register', [
  check('username', 'Username é obrigatório').notEmpty(),
  check('email', 'Email inválido').isEmail(),
  check('password', 'Senha deve ter no mínimo 8 caracteres').isLength({ min: 8 })
], authController.register);

// Login de usuário
router.post('/login', [
  check('username', 'Username é obrigatório').notEmpty(),
  check('password', 'Senha é obrigatória').exists()
], authController.login);

module.exports = router;
