const { Service } = require('../models/Service.js');
const { Op, fn, col, where } = require('sequelize');
const { ServiceByWorkshop } = require('../models/ServiceByWorkshop.js');


const createService = async (name, price, brand, quantity, id_type, id_workshop) => {
  const service = await Service.create({
    name,
    price,
    brand,
    quantity,
    id_type,
    id_workshop
  });
  return service;
}


const getAllServices = async (id_workshop) => {
  const services = await Service.findAll({ where: { id_workshop } });
  return services;
};

const getServicesByName = async (name, id_workshop) => {

  const services = await Service.findAll({
    where: {
      [Op.and]: [
        where(fn('LOWER', col('name')), {
          [Op.like]: `%${name.toLowerCase()}%`
        }),
        { id_workshop }
      ]
    }
  });
  return services;
};


const deleteService = async (id) => {
  try {
    const serviceByWorkshop = await ServiceByWorkshop.findAll({ where: { id_service: id } });
    if (serviceByWorkshop.length > 0) {
      throw new Error('No se puede eliminar el servicio porque está siendo utilizado en una orden de trabajo');
    }
    const service = await Service.destroy({ where: { id } });

    return service;
  } catch (error) {
    console.error(`Error buscando servicio: ${error.message}`);
  }

}


module.exports = {
  createService,
  getAllServices,
  getServicesByName,
  deleteService
}