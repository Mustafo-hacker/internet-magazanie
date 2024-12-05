async function loadSalesItems() {
    try {
        const response = await fetch('http://localhost:3000/salesItems');
        const data = await response.json();
        const salesItemsContainer = document.querySelector('.sales-items');
        salesItemsContainer.innerHTML = '';

        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="image-container">
                    <img src="${item.image}" alt="${item.name}" onclick="window.location.href='../info files/info.html?id=${item.id}'">
                </div>
                <h4>${item.name}</h4>
                <p class="pricec">${item.price} <span class="original-price">${item.originalPrice}</span></p>
                <div class="rating">${item.rating}</div>
                <div class="addToCart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</div>
            `;
            salesItemsContainer.append(itemElement);
        });

        const addToCartButtons = document.querySelectorAll('.addToCart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const product = {
                    id: this.dataset.id,
                    name: this.dataset.name,
                    price: this.dataset.price,
                    image: this.dataset.image,
                    count: 1
                };
                addToCart(product);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.count += 1;
    } else {
        cart.push(product);
    }    localStorage.setItem('cart', JSON.stringify(cart));

}

window.onload = loadSalesItems;
