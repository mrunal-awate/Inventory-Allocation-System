const sequelize = require('../config/database');
const productRepository = require('../repositories/ProductRepository');
const orderRepository = require('../repositories/OrderRepository');

class OrderService {
    async createOrder(productId, quantity) {
        const transaction = await sequelize.transaction();

        try {
            
            const product = await productRepository.findById(productId, transaction);
            if (!product) {
                throw new Error('Product not found');
            }

            
            const affectedRows =
                await productRepository.deductStockIfAvailable(
                    productId,
                    quantity,
                    transaction
                );

            if (affectedRows === 0) {
                throw new Error('Insufficient stock');
            }

            
            const order = await orderRepository.create(
                {
                    productId,
                    quantity,
                    status: 'confirmed'
                },
                transaction
            );

            await transaction.commit();
            return order;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new OrderService();
