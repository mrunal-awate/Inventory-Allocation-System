const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
        defaultValue: 'pending'
    }
});


Order.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order, { foreignKey: 'productId' });

module.exports = Order;
