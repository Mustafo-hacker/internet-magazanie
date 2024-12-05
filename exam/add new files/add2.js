async function saveProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = {
        name: formData.get('productName'),
        description: formData.get('productDescription'),
        category: formData.get('productCategory'),
        price: parseFloat(formData.get('productPrice')),
        inventory: parseInt(formData.get('productInventory'), 10),
        rating: formData.get('productRating')
    };

    const fileInput = document.getElementById('productImage');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async function() {
        product.image = reader.result;

        try {
            let response;
            switch (product.category) {
                case 'electronic':
                    response = await fetch('http://localhost:3000/electronic', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    });
                    break;
                case 'products2':
                    response = await fetch('http://localhost:3000/products2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    });
                    break;
                case 'lifestyle':
                    response = await fetch('http://localhost:3000/lifestyle', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    });
                    break;
                case 'medicine':
                    response = await fetch('http://localhost:3000/medicine', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    });
                    break;
                default:
                    console.error('Unknown category:', product.category);
                    return;
            }

            if (response.ok) {
                window.location.href = '../product admin files/productAdmin.html';
            } else {
                console.error('Failed to save product:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        saveProductData(product);
    }
}

function saveProductData(product) {
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added successfully!');
        window.location.href = '../product admin files/productAdmin.html';
    })
    .catch(error => console.error('Error:', error));
}

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', saveProduct);
