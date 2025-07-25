const { Workshop } = require('../models/Workshop');
const jwt = require('jsonwebtoken');

// Usa dotenv o config para no exponer claves
const SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

const login = async (email, password) => {
    const workshop = await Workshop.findOne({ where: { email } });

    if (!workshop) {
        throw new Error('Correo o contraseña inválidos');
    }

    const valid = workshop.verificarPassword(password);

    if (!valid) {
        throw new Error('Correo o contraseña inválidos');
    }



    const payload = {
        id: workshop.id,
        name: workshop.name,
        email: workshop.email,
        phone: workshop.phone,
        suscription: workshop.suscription,
        logo: workshop.logo,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '8h' });


    return { token };
};

module.exports = {
    login
};
