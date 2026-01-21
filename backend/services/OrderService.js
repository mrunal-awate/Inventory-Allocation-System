const sequelize = require('../config/database');
const productRepository = require('../repositories/ProductRepository');
const orderRepository = require('../repositories/OrderRepository');

class OrderService {
    async createOrder(productId, quantity) {
        const transaction = await sequelize.transaction();

        try {
            // 1. Ensure product exists (no stock logic here)
            const product = await productRepository.findById(productId, transaction);
            if (!product) {
                throw new Error('Product not found');
            }

            // 2. Atomically deduct stock (DB-level safety)
            const affectedRows =
                await productRepository.deductStockIfAvailable(
                    productId,
                    quantity,
                    transaction
                );

            if (affectedRows === 0) {
                throw new Error('Insufficient stock');
            }

            // 3. Create order after stock deduction succeeds
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
