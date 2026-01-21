const Product = require('../models/Product');

class ProductRepository {
    async findById(id, transaction) {
        return await Product.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
    }

    async updateStock(product, quantity, transaction) {
        product.stock -= quantity;
        return await product.save({ transaction });
    }
}

module.exports = new ProductRepository();
