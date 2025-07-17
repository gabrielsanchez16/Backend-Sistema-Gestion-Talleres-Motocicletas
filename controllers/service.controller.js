const {Service} = require('../models/Service.js');
const {Op,fn,col,where} = require('sequelize')


const createService = async (name,price,brand,quantity,id_type,id_workshop) =>{
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
    const services = await Service.findAll({where:{id_workshop}});
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
    const service = await Service.destroy({where:{id}});
    return service;
  }


  module.exports = {
    createService,
    getAllServices,
    getServicesByName,
    deleteService
  }