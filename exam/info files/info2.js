async function loadProductInfo() {
    const productImage = document.getElementById('productImage');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productRating = document.getElementById('productRating');
    const productDescription = document.getElementById('productDescription');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    try {
        let response = await fetch(`http://localhost:3000/electronic/${productId}`);

        if (!response.ok) {
            response = await fetch(`http://localhost:3000/lifestyle/${productId}`);
        }
        
        const product = await response.json();

        productImage.src = product.image;
        productName.innerHTML = product.name;
        productPrice.innerHTML = `Price: $${product.price}`;
        productRating.innerHTML = `Rating: ${product.rating}`;
        productDescription.innerHTML = `Description: ${product.description || 'No description available.'}`;
    } catch (error) {
        console.error(error);
    }
}

window.onload = loadProductInfo;
