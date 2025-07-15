const { body } = require('express-validator');

const validateCreateOwner = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),

    body('phone')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('es-CO').withMessage('Teléfono inválido para Colombia'),

    body('email')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido'),

    body('identification')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres'),

    body('id_workshop')
        .notEmpty().withMessage('El id del taller es obligatorio')
];


module.exports = {
    validateCreateOwner
}