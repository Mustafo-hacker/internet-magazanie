async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products2');
        const data = await response.json();
        const productsTableBody = document.querySelector('.products-body');
        productsTableBody.innerHTML = '';
        data.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox" class="selectProduct" data-id="${product.id}"></td>
                <td><img class="surat1" src="${product.image}" alt="">${product.name}</td>
                <td>${product.inventory}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9 delete" onclick="deleteProduct('${product.id}')">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            `;
            productsTableBody.append(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

function handleSelectAllChange() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.selectProduct');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

async function deleteProduct(productId) {
    try {
        await fetch(`http://localhost:3000/products2/${productId}`, {
            method: 'DELETE'
        });
        loadProducts(); 
    } catch (error) {
        console.error(error);
    }
}

async function deleteSelectedProducts() {
    const selectedProducts = document.querySelectorAll('.selectProduct:checked');
    selectedProducts.forEach(async (checkbox) => {
        const productId = checkbox.getAttribute('data-id');
        try {
            await fetch(`http://localhost:3000/products2/${productId}`, {
                method: 'DELETE'
            });
            checkbox.closest('tr').remove();
        } catch (error) {
            console.error(error);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search');
    const productsBody = document.querySelector('.products-body');

    async function loadProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    function displayProducts(products) {
        productsBody.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td><input class="checkbox" type="checkbox"></td>
                <td>${product.name}</td>
                <td>${product.inventory}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            productsBody.appendChild(productRow);
        });
    }

    function filterProducts(event) {
        const searchTerm = event.target.value.toLowerCase();
        const productRows = productsBody.querySelectorAll('tr');
        productRows.forEach(row => {
            const productName = row.children[1].textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    searchInput.addEventListener('input', filterProducts);

    loadProducts();
});


window.onload = () => {
    loadProducts();
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.onchange = handleSelectAllChange;
    const btnDelete = document.querySelector('.size-6');
    btnDelete.onclick = deleteSelectedProducts;
};
