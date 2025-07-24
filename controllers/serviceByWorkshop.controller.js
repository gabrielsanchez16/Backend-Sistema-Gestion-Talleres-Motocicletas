const { Service } = require('../models/Service.js');
const { ServiceByWorkshop } = require('../models/ServiceByWorkshop.js');


const createServiceByWorkshop = async (name_service, quantity_order, price_unit, id_order, id_service) => {
    const price_total = quantity_order * price_unit; // Calculate total price
    const serviceEx = await Service.findByPk(id_service);
    const quantityOperation = serviceEx.quantity - quantity_order;
    if (serviceEx.id_type !== "a0b2c3d4-e5f6-7890-1234-56789abcdefh") {
        if (quantityOperation >= 0) {
            serviceEx.quantity = quantityOperation; // Update the quantity in the service model
            await serviceEx.save(); // Save the updated service
        } else {
            throw new Error('No hay suficiente cantidad de este servicio disponible');
        }
    }

    try {
        const service = await ServiceByWorkshop.create({
            name_service,
            quantity_order,
            price_unit,
            price_total,
            id_order,
            id_service
        });
        return service;
    } catch (error) {
        throw error;
    }
}

const getAllServicesByOrder = async (id_order) => {
    try {
        const services = await ServiceByWorkshop.findAll({
            where: { id_order },
        });
        return services;
    } catch (error) {
        throw error;
    }
}

const deleteService = async (id) => {
    try {
        const service = await ServiceByWorkshop.destroy({
            where: { id }
        });
        return service;
    } catch (error) {
        throw error;
    }
}

const updateService = async (id, quantity_order) => {
    const service = await ServiceByWorkshop.findByPk(id);
    if (!service) {
        throw new Error('Servicio no encontrado');
    }
    if (quantity_order <= 0) {
        throw new Error('La cantidad debe ser un número entero mayor que 0');
    }
    const price_total = quantity_order * service.price_unit;
    service.quantity_order = quantity_order;
    service.price_total = price_total;
    try {
        await service.save();
        return service;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    createServiceByWorkshop,
    getAllServicesByOrder,
    updateService,
    deleteService
}