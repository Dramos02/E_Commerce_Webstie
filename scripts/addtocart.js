let cart = []; // Array to store cart items

function addToCart(productName, price) {
  // Get selected quantity
  let quantity = parseInt(document.getElementById('quantity').value);

  // Calculate total price for this product
  let totalPrice = price * quantity;

  // Add product to cart
  cart.push({ name: productName, price: totalPrice });

  // Update cart display
  updateCart();
}

function updateCart() {
  let totalAmount = 0;
  let productNames = '';
  for (let item of cart) {
    totalAmount += item.price;
    productNames += item.name + ', ';
  }
  document.getElementById('prodNum').textContent = '$ ' + totalAmount.toFixed(2);
  document.getElementById('prodName').textContent = productNames.slice(0, -2);
}
