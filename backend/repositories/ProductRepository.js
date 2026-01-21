const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductRepository {

    async deductStockIfAvailable(productId, quantity, transaction) {
        const [affectedRows] = await Product.update(
            {
                stock: Product.sequelize.literal(`stock - ${quantity}`)
            },
            {
                where: {
                    id: productId,
                    stock: { [Op.gte]: quantity }
                },
                transaction
            }
        );

        return affectedRows; 
    }

    async findById(id, transaction) {
        return await Product.findByPk(id, { transaction });
    }
}

module.exports = new ProductRepository();
