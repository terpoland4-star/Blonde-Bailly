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

const API = "http://localhost:3000";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produit ajouté !");
}

// CHECKOUT MTN
async function checkout() {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const phone = prompt("Numéro MTN (ex: 229XXXXXXXX)");

  await fetch(API + "/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ items: cart, total })
  });

  const res = await fetch(API + "/mtn/pay", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone, amount: total })
  });

  const data = await res.json();

  alert("Confirme sur ton téléphone...");

  setTimeout(async () => {

    const status = await fetch(API + "/mtn/status/" + data.referenceId)
      .then(r => r.json());

    if(status.status === "SUCCESSFUL") {
      alert("Paiement réussi !");
      cart = [];
      localStorage.removeItem("cart");
    } else {
      alert("Paiement non confirmé");
    }

  }, 10000);
}

// BOOKING
async function bookService(service) {

  const date = prompt("Date (YYYY-MM-DD)");

  await fetch(API + "/bookings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ service, date })
  });

  alert("Réservation enregistrée !");
}
