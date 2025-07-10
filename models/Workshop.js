const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/db.js');
const bcrypt = require('bcrypt') 

const Workshop = db.define("workshop", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Use Sequelize's built-in UUID function
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
},{
    freezeTableName: true, // 👈 evita la pluralización automática
    hooks: {
        beforeCreate: async function(workshop) {
            const salt = await bcrypt.genSalt(10)
            workshop.password = await bcrypt.hash(workshop.password, salt)
        }
    }
})

//metodo personalizado

Workshop.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}



module.exports = {
    Workshop
};