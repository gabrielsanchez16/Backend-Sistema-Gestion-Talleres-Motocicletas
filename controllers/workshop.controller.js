const {Workshop} = require('../models/Workshop.js');


const createWorkshop = async (name,phone,email, password,logo = false) => {
    // Check if the workshop already exists
    const existingWorkshop = await Workshop.findOne({ where: { email } });
    if (existingWorkshop) {
        throw new Error('Ya existe un taller con este correo');
    }
    const newWorkshop = await Workshop.create({
        name,
        phone,
        email,
        password,
        logo
    });
    return newWorkshop;
}

const getWorkshopById = async (id) => {
    const workshop = await Workshop.findByPk(id);
    if (!workshop) {
        throw new Error('Taller no encontrado');
    }
    return workshop;
}


module.exports = {
    createWorkshop,
    getWorkshopById
}