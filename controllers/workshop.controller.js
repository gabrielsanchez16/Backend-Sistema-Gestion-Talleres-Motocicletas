const { Workshop } = require('../models/Workshop.js');
const cloudinary = require('cloudinary').v2;
const { Service } = require('../models/Service.js');
const { Owner} = require('../models/Owner.js');
const { Motorcycle } = require('../models/Motorcycle.js');
const { Mechanic } = require('../models/Mechanic.js');

const createWorkshop = async (name, phone, email, password, logo, id_logo_public) => {
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
        logo,
        id_logo_public
    });
    return newWorkshop;
}

const editWorkshop = async (id, name, phone, email, password, logo, id_logo_public,passwordConfirmation) => {
    const workshop = await Workshop.findByPk(id);
    if (!workshop) {
        throw new Error('Taller no encontrado');
    }
    // Solo actualiza si vienen definidos
    if (name !== undefined) workshop.name = name;
    if (phone !== undefined) workshop.phone = phone;
    if (email !== undefined) workshop.email = email;
    if (logo != undefined) workshop.logo = logo;
    if (password !== undefined && passwordConfirmation !== undefined) {
        // Verifica que la contraseña tenga al menos 6 caracteres
        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        const valid = workshop.verificarPassword(passwordConfirmation);

        if (!valid) {
            throw new Error('Contraseña vieja incorrecta');
        }
        // No se encripta ya que el hook de Sequelize lo hace automáticamente (se configuro en el modelo)
        workshop.password = password;
    };

    if (id_logo_public != undefined) {
        if (workshop.id_logo_public) {
            await cloudinary.uploader.destroy(workshop.id_logo_public);
        }
        workshop.id_logo_public = id_logo_public;
    }


    await workshop.save();

    const workshopData = workshop.toJSON();
    delete workshopData.password;

    return workshopData;
};


const getWorkshopById = async (id) => {
    const workshop = await Workshop.findByPk(id, {
        attributes: { exclude: ['password'] } // Exclude password from the result
    });
    if (!workshop) {
        throw new Error('Taller no encontrado');
    }
    return workshop;
}

const deleteWorkshop = async (id) => {
    const workshop = await Workshop.findByPk(id);
    if (!workshop) {
        throw new Error('Taller no encontrado');
    }
    // Elimina la imagen de Cloudinary si existe
    if (workshop.id_logo_public) {
        await cloudinary.uploader.destroy(workshop.id_logo_public);
    }
    
    await Service.destroy({ where: { id_workshop: id } });
    await Motorcycle.destroy({ where: { id_workshop: id } });
    await Owner.destroy({ where: { id_workshop: id } });
    await Mechanic.destroy({ where: { id_workshop: id } });

    await workshop.destroy();

    return true;
}


module.exports = {
    createWorkshop,
    getWorkshopById,
    editWorkshop,
    deleteWorkshop
}