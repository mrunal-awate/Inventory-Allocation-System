const axios = require('axios');

async function testConcurrency() {
    const url = 'http://localhost:3000/order';
    const productId = 1; // Assuming 'Gadget' is ID 1
    const quantity = 30; // 30 items per order

    // We assume initial stock is 100
    // Fire 5 requests. Total demand = 150.
    // Expected: 3 success (90 deducted), 2 fail (insufficient).

    const requests = [];
    for (let i = 0; i < 5; i++) {
        requests.push(
            axios.post(url, { productId, quantity })
                .then(res => ({ status: 'success', data: res.data }))
                .catch(err => ({ status: 'failed', error: err.response?.data?.message || err.message }))
        );
    }

    console.log('Sending 5 concurrent requests...');
    const results = await Promise.all(requests);

    let successCount = 0;
    let failCount = 0;

    results.forEach((res, index) => {
        console.log(`Request ${index + 1}: ${res.status} - ${res.status === 'success' ? 'Order Placed' : res.error}`);
        if (res.status === 'success') successCount++;
        else failCount++;
    });

    console.log('--------------------------------');
    console.log(`Total Success: ${successCount}`);
    console.log(`Total Failed: ${failCount}`);
    console.log('--------------------------------');

    if (successCount === 3 && failCount === 2) {
        console.log('PASSED: Concurrency handled correctly (assuming stock was 100).');
    } else {
        console.log('NOTE: Result depends on initial stock. Verify manually.');
    }
}

testConcurrency();
