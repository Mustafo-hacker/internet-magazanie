let cartDiv = document.querySelector(".cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

function Carzine(cart) {
    if (cart.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.innerHTML = "Сабад холӣ аст!";
        emptyMessage.classList.add("empty-message");
        cartDiv.append(emptyMessage);
        return;
    }

    cart.forEach(element => {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item");

        let imgOfProduct = document.createElement("img");
        imgOfProduct.src = element.image;
        imgOfProduct.alt = element.name;
        imgOfProduct.classList.add("product-image");

        let nameOfProduct = document.createElement("h1");
        nameOfProduct.innerHTML = element.name;
        nameOfProduct.classList.add("product-name");

        let count = document.createElement("p");
        count.innerHTML = `Count: ${element.count}`;
        count.classList.add("product-count");

        let price = document.createElement("p");
        price.innerHTML = `Price: $${element.price}`;
        price.classList.add("product-price");

        let subtotal = document.createElement("p");
        subtotal.innerHTML = `Subtotal: $${element.price * element.count}`;
        subtotal.classList.add("product-subtotal");

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", () => {
            removeFromCart(element.id);
        });

        itemContainer.append(imgOfProduct, nameOfProduct, count, price, subtotal, deleteButton);
        cartDiv.append(itemContainer);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}

function loadCartItems() {
    cartDiv.innerHTML = "";
    Carzine(cart);
}

Carzine(cart);
