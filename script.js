"use strict";

// =====================================
// CONFIGURACIÓN
// =====================================

const WHATSAPP_NUMBER = "573205810086";
const COUPON_CODE = "URBANO10";
const DISCOUNT = 0.10;

const money = value =>
  "$" + Math.round(value).toLocaleString("es-CO");

// =====================================
// PRODUCTOS
// Cambia las fotos dentro de imagenes
// =====================================

const products = [

  // HOMBRES

  {
    id: 1,
    name: "Camiseta Deportiva Hombre",
    gender: "hombre",
    category: "camisetas",
    price: 49900,
    image: "camiseta deportiva.jpeg",
    sizes: ["S", "M", "L", "XL"],
    tag: "DEPORTIVO"
  },
  {
    id: 2,
    name: "Sudadera Oversize Hombre",
    gender: "hombre",
    category: "urbano",
    price: 89900,
    image: "sudadera.jpeg",
    sizes: ["S", "M", "L", "XL"],
    tag: "POPULAR"
  },
  {
    id: 3,
    name: "Pantaloneta Deportiva Hombre",
    gender: "hombre",
    category: "pantalonetas",
    price: 45900,
    image: "pantaloneta.jpeg",
    sizes: ["S", "M", "L", "XL"],
    tag: "SPORT"
  },
  {
    id: 4,
    name: "Jogger Deportivo Hombre",
    gender: "hombre",
    category: "joggers",
    price: 79900,
    image: "jogger hombre.jpeg",
    sizes: ["S", "M", "L", "XL"],
    tag: "CÓMODO"
  },
  {
    id: 5,
    name: "Chaqueta Deportiva Hombre",
    gender: "hombre",
    category: "chaquetas",
    price: 119900,
    image: "chaqueta .jpeg",
    sizes: ["M", "L", "XL"],
    tag: "NUEVO"
  },
  {
    id: 6,
    name: "Camiseta Urbana Hombre",
    gender: "hombre",
    category: "camisetas",
    price: 59900,
    image: "busos urbanos.jpeg",
    sizes: ["S", "M", "L", "XL"],
    tag: "URBAN"
  },

  // MUJERES

  {
    id: 7,
    name: "Vestido deportivo",
    gender: "mujer",
    category: "vestidos",
    price: 89900,
    image: "vestido.jpeg",
    sizes: ["XS", "S", "M", "L"],
    tag: "Comodo"
  },
  {
    id: 8,
    name: "Short Deportivo Mujer",
    gender: "mujer",
    category: "shorts",
    price: 49900,
    image: "shorts.jpeg",
    sizes: ["XS", "S", "M", "L"],
    tag: "SPORT"
  },
  {
    id: 9,
    name: "Chaqueta Deportiva",
    gender: "mujer",
    category: "crop",
    price: 39900,
    image: "chaqueta mujer.jpeg",
    sizes: ["XS", "S", "M", "L"],
    tag: "POPULAR"
  },
  {
    id: 10,
    name: "Legging Deportivo Mujer",
    gender: "mujer",
    category: "leggings",
    price: 69900,
    image: "leggins.jpeg",
    sizes: ["XS", "S", "M", "L", "XL"],
    tag: "FITNESS"
  },
  {
    id: 11,
    name: "Conjunto Deportivo Mujer",
    gender: "mujer",
    category: "conjuntos",
    price: 109900,
    image: "conjunto mujer.jpeg",
    sizes: ["XS", "S", "M", "L"],
    tag: "NUEVO"
  },
  {
    id: 12,
    name: "Camiseta Casual Mujer",
    gender: "mujer",
    category: "camisetas",
    price: 44900,
    image: "camiseta mujer.jpeg",
    sizes: ["XS", "S", "M", "L"],
    tag: "CASUAL"
  }

];

// =====================================
// FUNCIONES GENERALES
// =====================================

const $ = id => document.getElementById(id);

function safeImage(img) {
  img.onerror = null;
  img.src = "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg"
      width="400" height="500">
      <rect width="100%" height="100%" fill="#eee9e2"/>
      <text x="50%" y="48%" text-anchor="middle"
        font-family="Arial" font-size="25" fill="#555">
        URBAN STYLE
      </text>
      <text x="50%" y="56%" text-anchor="middle"
        font-family="Arial" font-size="15" fill="#777">
        COLOCA TU FOTOGRAFÍA
      </text>
    </svg>
  `);
}

function imageHTML(src, alt, className = "") {
  return `
    <img class="${className}"
      src="${src}"
      alt="${alt}"
      loading="lazy"
      onerror="safeImage(this)">
  `;
}

// =====================================
// TARJETAS DE PRODUCTOS
// =====================================

function productCard(product) {

  const options = product.sizes.map(size =>
    `<option value="${size}">${size}</option>`
  ).join("");

  return `
    <article class="product-card">

      <div class="product-image">

        ${imageHTML(product.image, product.name)}

        <span class="product-tag">${product.tag}</span>

      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.gender === "hombre" ? "HOMBRES" : "MUJERES"}
          · ${product.category}
        </span>

        <h3>${product.name}</h3>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <label class="size-label" for="size-${product.id}">
          Selecciona tu talla:
        </label>

        <select class="product-size" id="size-${product.id}">
          ${options}
        </select>

        <button class="add-btn" data-add="${product.id}">
          AGREGAR AL CARRITO +
        </button>

      </div>
    </article>
  `;
}

// =====================================
// MOSTRAR PRODUCTOS
// =====================================

function renderCollections() {

  $("menProducts").innerHTML = products
    .filter(p => p.gender === "hombre")
    .map(productCard)
    .join("");

  $("womenProducts").innerHTML = products
    .filter(p => p.gender === "mujer")
    .map(productCard)
    .join("");

}

renderCollections();

// =====================================
// FILTROS
// =====================================

function renderCatalog() {

  let filtered = [...products];

  const gender = $("genderFilter").value;
  const category = $("categoryFilter").value;
  const size = $("sizeFilter").value;
  const sort = $("sortFilter").value;

  if (gender !== "todos") {
    filtered = filtered.filter(p => p.gender === gender);
  }

  if (category !== "todos") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (size !== "todos") {
    filtered = filtered.filter(p => p.sizes.includes(size));
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  $("resultsCount").textContent =
    `${filtered.length} productos encontrados`;

  $("allProducts").innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : "<p>No encontramos productos.</p>";

}

["genderFilter", "categoryFilter", "sizeFilter", "sortFilter"]
  .forEach(id => $(id).addEventListener("change", renderCatalog));

renderCatalog();

// =====================================
// CARRITO
// =====================================

let cart = [];
let couponApplied = false;

function saveCart() {
  try {
    localStorage.setItem("urbanStyleCart", JSON.stringify(cart));
  } catch (error) {
    console.warn("No se pudo guardar el carrito.");
  }

  renderCart();
}

try {
  const saved = JSON.parse(localStorage.getItem("urbanStyleCart"));

  if (Array.isArray(saved)) {
    cart = saved.filter(item =>
      products.some(p => p.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  }
} catch (error) {
  cart = [];
}

// =====================================
// AGREGAR PRODUCTO
// =====================================

function addToCart(id) {

  const product = products.find(p => p.id === id);
  const sizeElement = $(`size-${id}`);

  if (!product || !sizeElement) return;

  const size = sizeElement.value;

  const existing = cart.find(item =>
    item.id === id && item.size === size
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      gender: product.gender,
      size,
      quantity: 1
    });
  }

  saveCart();
  openCart();
}

// =====================================
// BOTONES DE PRODUCTOS
// =====================================

document.addEventListener("click", event => {

  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
  }

});

// =====================================
// CANTIDADES Y TOTALES
// =====================================

function subtotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
}

function discount() {
  return couponApplied ? subtotal() * DISCOUNT : 0;
}

function total() {
  return subtotal() - discount();
}

function changeQuantity(index, amount) {

  if (!cart[index]) return;

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  if (!cart.length) couponApplied = false;

  saveCart();
}

function removeItem(index) {

  cart.splice(index, 1);

  if (!cart.length) couponApplied = false;

  saveCart();
}

// =====================================
// MOSTRAR CARRITO
// =====================================

function renderCart() {

  $("cartCount").textContent = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  if (!cart.length) {

    $("cartItems").innerHTML = `
      <div class="empty-cart">
        <div style="font-size:50px">🛍️</div>
        <h3>Tu carrito está vacío</h3>
        <p>Descubre nuestras colecciones.</p>
      </div>
    `;

  } else {

    $("cartItems").innerHTML = cart.map((item, index) => `

      <div class="cart-item">

        ${imageHTML(item.image, item.name)}

        <div>
          <h4>${item.name}</h4>
          <p>Talla: ${item.size}</p>
          <strong>${money(item.price * item.quantity)}</strong>

          <div class="cart-controls">

            <button data-change="${index}" data-amount="-1">−</button>

            <span>${item.quantity}</span>

            <button data-change="${index}" data-amount="1">+</button>

            <button class="cart-remove" data-remove="${index}">
              Eliminar
            </button>

          </div>
        </div>

      </div>

    `).join("");

  }

  $("subtotal").textContent = money(subtotal());
  $("discount").textContent = "-" + money(discount());
  $("total").textContent = money(total());

}

// =====================================
// ACCIONES DEL CARRITO
// =====================================

$("cartItems").addEventListener("click", event => {

  const change = event.target.closest("[data-change]");
  const remove = event.target.closest("[data-remove]");

  if (change) {
    changeQuantity(
      Number(change.dataset.change),
      Number(change.dataset.amount)
    );
  }

  if (remove) {
    removeItem(Number(remove.dataset.remove));
  }

});

// =====================================
// CUPÓN
// =====================================

$("applyCoupon").addEventListener("click", () => {

  const code = $("couponInput").value.trim().toUpperCase();

  if (!cart.length) {
    $("couponMessage").textContent = "Agrega productos primero.";
    return;
  }

  if (code === COUPON_CODE) {

    couponApplied = true;

    $("couponMessage").textContent =
      "¡Tienes un 10% de descuento!";

  } else {

    couponApplied = false;

    $("couponMessage").textContent =
      "Código incorrecto.";

  }

  renderCart();

});

$("copyCoupon").addEventListener("click", async () => {

  try {
    await navigator.clipboard.writeText(COUPON_CODE);
    $("copyCoupon").textContent = "¡COPIADO!";
  } catch (error) {
    $("copyCoupon").textContent = COUPON_CODE;
  }

});

// =====================================
// ABRIR Y CERRAR CARRITO
// =====================================

function openCart() {
  $("cartPanel").classList.add("show");
  $("cartOverlay").classList.add("show");
}

function closeCart() {
  $("cartPanel").classList.remove("show");
  $("cartOverlay").classList.remove("show");
}

$("openCart").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("cartOverlay").addEventListener("click", closeCart);

// =====================================
// IR A FINALIZAR COMPRA
// =====================================

$("goCheckout").addEventListener("click", () => {

  if (!cart.length) {
    alert("Tu carrito está vacío.");
    return;
  }

  closeCart();

  $("checkout").scrollIntoView({
    behavior: "smooth"
  });

});

// =====================================
// ENVIAR PEDIDO A WHATSAPP
// =====================================

$("checkoutForm").addEventListener("submit", event => {

  event.preventDefault();

  if (!cart.length) {
    alert("Primero agrega productos al carrito.");
    return;
  }

  const name = $("customerName").value.trim();
  const phone = $("customerPhone").value.trim();
  const address = $("customerAddress").value.trim();
  const city = $("customerCity").value.trim();
  const notes = $("customerNotes").value.trim();

  if (!name || !phone || !address || !city) {
    alert("Completa todos los datos obligatorios.");
    return;
  }

  let message =
    "🛍️ *NUEVO PEDIDO - URBAN STYLE*\n\n" +
    "*DATOS DEL CLIENTE*\n" +
    `Nombre: ${name}\n` +
    `Teléfono: ${phone}\n` +
    `Dirección: ${address}\n` +
    `Ciudad: ${city}\n\n` +
    "*PRODUCTOS:*\n";

  cart.forEach((item, index) => {

    message +=
      `\n${index + 1}. ${item.name}\n` +
      `Colección: ${item.gender}\n` +
      `Talla: ${item.size}\n` +
      `Cantidad: ${item.quantity}\n` +
      `Precio: ${money(item.price * item.quantity)}\n`;

  });

  message +=
    `\nSubtotal: ${money(subtotal())}\n` +
    `Descuento: ${money(discount())}\n` +
    `*TOTAL: ${money(total())}*\n`;

  if (couponApplied) {
    message += `Cupón: ${COUPON_CODE}\n`;
  }

  if (notes) {
    message += `\nObservaciones: ${notes}\n`;
  }

  message += "\nHola, quiero confirmar mi pedido.";

  const url =
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  const opened = window.open(url, "_blank");

  if (!opened) {
    window.location.href = url;
  }

  $("formMessage").textContent =
    "Revisa WhatsApp y pulsa enviar para confirmar tu pedido.";

});

// =====================================
// MENÚ PARA CELULARES
// =====================================

$("menuBtn").addEventListener("click", () => {
  $("nav").classList.toggle("show");
});

document.querySelectorAll("#nav a").forEach(link => {

  link.addEventListener("click", () => {
    $("nav").classList.remove("show");
  });

});

// =====================================
// INICIAR
// =====================================

renderCart();