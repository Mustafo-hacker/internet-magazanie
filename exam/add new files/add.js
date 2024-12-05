async function saveOrder(event) {
    event.preventDefault();

    const orderData = {
        orderNumber: document.getElementById('orderNumber').value,
        date: document.getElementById('date').value,
        customerName: document.getElementById('customerName').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        orderStatus: document.getElementById('orderStatus').value,
        totalAmount: document.getElementById('totalAmount').value
    };

    try {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (response.ok) {
            window.location.href = 'http://127.0.0.1:5500/order%20files/order.html';
        } 
    } catch (error) {
        console.error(error);
    }
}
const addOrderForm = document.getElementById('addOrderForm');
addOrderForm.onsubmit = saveOrder;
