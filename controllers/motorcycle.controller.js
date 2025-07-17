const {Motorcycle} = require('../models/Motorcycle.js');


const createMotorcycle = async (model, plate, year, id_workshop, id_brand,id_owner) => {
    const existMotorcycle = await Motorcycle.findOne({ where: { plate } });
    if (existMotorcycle) {
        throw new Error('Ya existe una motocicleta con esta placa');
    };
    const motorcycle = await Motorcycle.create({
        model,
        plate,
        year,
        id_workshop,
        id_brand,
        id_owner
    });

    return motorcycle;
};

const getAllMotorcycles = async (id_workshop) => {
    let motorcycles = await Motorcycle.findAll({
        where: {
            id_workshop
        }
    });
    if (!motorcycles || motorcycles.length === 0) {
        motorcycles = "No hay motocicletas registradas en este taller"; 
    }
    return motorcycles;
}

const getMotorcycleById = async (id) => {
    let motorcycle = await Motorcycle.findByPk(id);
    if (!motorcycle) {
        motorcycle = 'Motocicleta no encontrada';
    }
    return motorcycle;
} 

const deleteMotorcycle = async (id) => {
    const motorcycle = await Motorcycle.findByPk(id);
    if (!motorcycle) {
        throw new Error('Motocicleta no encontrada');
    }
    await motorcycle.destroy();
    return 'Motocicleta eliminada correctamente';
}

const updateMotorcycle = async (id, model, plate, year, id_workshop, id_brand, id_owner) => {
    const motorcycle = await Motorcycle.findByPk(id);
    if (!motorcycle) {
        throw new Error('Motocicleta no encontrada');
    }

    const existPlate = await Motorcycle.findOne({ where: { plate, id_workshop } });

    if (existPlate && existPlate.id !== id) {
        throw new Error('Ya existe una motocicleta con esta placa en el taller');
    }
    
    if(model !== undefined) motorcycle.model = model;
    if(plate !== undefined) motorcycle.plate = plate;
    if(year !== undefined) motorcycle.year = year;
    if(id_workshop !== undefined) motorcycle.id_workshop = id_workshop;
    if(id_brand !== undefined) motorcycle.id_brand = id_brand;
    if(id_owner !== undefined) motorcycle.id_owner = id_owner;

    await motorcycle.save();
    
    return motorcycle;
}


module.exports = {
    createMotorcycle,
    getAllMotorcycles,
    getMotorcycleById,
    deleteMotorcycle,
    updateMotorcycle
}