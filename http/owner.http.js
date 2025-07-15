const {createOwner,deleteOwner,getAllOwners,getOwnerById,updateOwner} = require('../controllers/owner.controller.js');


const create = async(req,res) => {
    const {name,identification,email,phone,id_workshop} = req.body;

    try {
        const response = await createOwner(name,identification,id_workshop,phone,email) 
        res.status(201).json({
            message: `Cliente creado correctamente con el nombre: ${response?.name}`,
            owner: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    create
}