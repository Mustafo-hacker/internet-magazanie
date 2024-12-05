async function loadProducts() {
    const productsContainer = document.querySelector('.electronics');

    try {
        const response = await fetch('http://localhost:3000/electronic');
        const data = await response.json();
        productsContainer.innerHTML = '';
        data.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onclick="window.location.href='../info files/info2.html?id=${product.id}'">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
                <div class="rating">${product.rating}</div>
                 <div class="addToCart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</div>
            `;
            productsContainer.append(productElement);
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


window.onload = loadProducts;


