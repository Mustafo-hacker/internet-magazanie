document.addEventListener('DOMContentLoaded', () => {
    const transactionsTableBody = document.querySelector('.transactions-body');
    const topProductsTableBody = document.querySelector('.top-products-body');

    async function loadData() {
        try {
            const transactionsResponse = await fetch('http://localhost:3000/transactions');
            const transactionsData = await transactionsResponse.json();
            transactionsTableBody.innerHTML = '';
            transactionsData.forEach(transaction => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.status}</td>
                `;
                transactionsTableBody.appendChild(tr);
            });
        } catch (error) {
            console.error(error);
        }

        try {
            const topProductsResponse = await fetch('http://localhost:3000/topProducts');
            const topProductsData = await topProductsResponse.json();
            topProductsTableBody.innerHTML = '';
            topProductsData.forEach(product => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.unitsSold}</td>
                `;
                topProductsTableBody.appendChild(tr);
            });
        } catch (error) {
            console.error(error);
        }
    }

    loadData();
});
