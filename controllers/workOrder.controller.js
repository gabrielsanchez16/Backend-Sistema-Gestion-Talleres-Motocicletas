const {WorkOrder} = require('../models/WorkOrder.js');



const createWorkOrder = async (title,date,description,recommendations,price,id_motorcycle,id_mechanic) => {
    try {
        const newWorkOrder = await WorkOrder.create({
            title,
            date,
            description,
            recommendations,
            price,
            id_motorcycle,
            id_mechanic
        });
        return newWorkOrder;
    } catch (error) {
        throw error;
    }
}

const getWorkOrderById = async (id) => {
    try {
        const workOrder = await WorkOrder.findOne({
            where: { id }
        });
        return workOrder;
    } catch (error) {
        throw error;
    }
}

const getWorkOrderByMotorcycle = async (id_motorcycle) => {
    try {
        const workOrders = await WorkOrder.findAll({
            where: { id_motorcycle }
        });
        return workOrders;
    } catch (error) {
        throw error;
    }
}


const getWorkOrderByMechanic = async (id_mechanic) => {
    try {
        const workOrders = await WorkOrder.findAll({
            where: { id_mechanic }
        });
        return workOrders;
    } catch (error) {
        throw error;
    }
}

const updateWorkOrder = async (id,title,date,description,recommendations,price,id_motorcycle,id_mechanic) => {
    try {
        const workOrder = await WorkOrder.findOne({
            where: { id }
        });
        if (!workOrder) {
            throw new Error('Orden de trabajo no encontrada');
        }
        if(title) workOrder.title = title;
        if(date) workOrder.date = date;
        if(description) workOrder.description = description;
        if(recommendations) workOrder.recommendations = recommendations;
        if(price) workOrder.price = price;
        if(id_motorcycle) workOrder.id_motorcycle = id_motorcycle;
        if(id_mechanic) workOrder.id_mechanic = id_mechanic;

        await workOrder.save();
        return workOrder;
    } catch (error) {
        throw error;
    }
}

const deleteWorkOrder = async (id) => {
    try {
        const workOrder = await WorkOrder.findOne({
            where: { id }
        });
        if (!workOrder) {
            throw new Error('Orden de trabajo no encontrada');
        }
        await workOrder.destroy();
        return true;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createWorkOrder,
    getWorkOrderById,
    getWorkOrderByMotorcycle,
    updateWorkOrder,
    deleteWorkOrder,
    getWorkOrderByMechanic
}