async function loadData() {
    try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();
        const root = document.querySelector('.orders-body');
        root.innerHTML = '';
        data.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox" class="selectOrder" data-id="${order.id}"></td>
                <td>${order.orderNumber}</td>
                <td>${order.date}</td>
                <td>${order.customerName}</td>
                <td>${order.paymentStatus}</td>
                <td>${order.orderStatus}</td>
                <td>${order.totalAmount}</td>
            `;
            root.append(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

function handleSelectAllChange() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.selectOrder');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}


async function delTodo() {
    const selectedOrders = document.querySelectorAll('.selectOrder:checked');
    selectedOrders.forEach(async (checkbox) => {
        const orderId = checkbox.getAttribute('data-id');
        try {
            await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'DELETE'
            });
            checkbox.closest('tr').remove();
        } catch (error) {
            console.error(error);
        }
    });
}

window.onload = () => {
    loadData();
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.onchange = handleSelectAllChange;
    const btnDelete = document.querySelector('.size-6');
    btnDelete.onclick = delTodo;
};
