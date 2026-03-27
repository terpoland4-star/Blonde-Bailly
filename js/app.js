let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.length;
  const el = document.getElementById("cart-count");
  if(el) el.innerText = count;
}

function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produit ajouté !");
  updateCartCount();
}

function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");
    div.innerText = item.name + " - " + item.price + " FCFA";
    container.appendChild(div);
  });

  totalEl.innerText = total;
}

function checkout() {
  let message = "Commande Blonde Bailly:%0A";

  cart.forEach(item => {
    message += item.name + " - " + item.price + " FCFA%0A";
  });

  const url = "https://wa.me/2290161513820?text=" + message;
  window.open(url, "_blank");
}

updateCartCount();
displayCart();
