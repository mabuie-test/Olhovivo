const Device = require('../models/Device');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Registrar novo dispositivo
exports.registerDevice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { deviceId, deviceInfo } = req.body;
    const userId = req.user.id;

    // Verificar se dispositivo já existe
    let device = await Device.findOne({ deviceId });
    if (device) {
      return res.status(400).json({ error: 'Dispositivo já registrado' });
    }

    // Criar novo dispositivo
    device = new Device({
      deviceId,
      deviceInfo,
      owner: userId
    });

    await device.save();

    // Adicionar dispositivo ao usuário
    await User.findByIdAndUpdate(userId, {
      $push: { devices: device._id }
    });

    res.status(201).json(device);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Atualizar dados do dispositivo
exports.updateDeviceData = async (req, res) => {
  try {
    const { deviceId, location, sms, calls } = req.body;
    
    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo não encontrado' });
    }

    // Atualizar localização
    if (location) {
      device.lastLocation = {
        lat: location.lat,
        lng: location.lng,
        timestamp: new Date(location.timestamp)
      };
      device.locations.push(device.lastLocation);
    }

    // Adicionar SMS
    if (sms && sms.length > 0) {
      const newSms = sms.map(s => ({
        sender: s.sender,
        message: s.message,
        timestamp: new Date(s.timestamp)
      }));
      device.sms.push(...newSms);
    }

    // Adicionar chamadas
    if (calls && calls.length > 0) {
      const newCalls = calls.map(c => ({
        number: c.number,
        duration: c.duration,
        timestamp: new Date(c.timestamp)
      }));
      device.calls.push(...newCalls);
    }

    await device.save();
    res.status(200).json({ message: 'Dados atualizados com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Obter dispositivos do usuário
exports.getUserDevices = async (req, res) => {
  try {
    const userId = req.user.id;
    const devices = await Device.find({ owner: userId })
      .select('deviceId lastLocation createdAt updatedAt')
      .lean();

    res.status(200).json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Obter detalhes do dispositivo
exports.getDeviceDetails = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const userId = req.user.id;

    const device = await Device.findOne({ 
      _id: deviceId, 
      owner: userId 
    }).lean();

    if (!device) {
      return res.status(404).json({ error: 'Dispositivo não encontrado' });
    }

    res.status(200).json(device);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
