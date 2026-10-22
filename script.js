(() => {
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const cartDialog = document.getElementById("cartDialog");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartTotal = document.getElementById("cartTotal");
  const cartStatus = document.getElementById("cartStatus");
  const cartCount = document.getElementById("cartCount");
  const cartFloatCount = document.getElementById("cartFloatCount");
  const productGrid = document.getElementById("productGrid");
  const productSearch = document.getElementById("productSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const productResults = document.getElementById("productResults");
  const whatsappOrder = document.getElementById("whatsappOrder");
  const products = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
  const ORDER_WHATSAPP = "919741171521";
  let language = "en";
  let cart = [];

  try {
    language = localStorage.getItem("durga-language") || "en";
    const savedCart = JSON.parse(localStorage.getItem("durga-cart") || "[]");
    if (Array.isArray(savedCart)) {
      cart = savedCart.filter((item) => item && typeof item.id === "string" && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99)
        .map((item) => ({ id: item.id, qty: item.qty, name: typeof item.name === "string" ? item.name.slice(0, 70) : "" }));
    }
  } catch (error) {}

  if (year) year.textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    })[char]);
  }

  function formatPrice(value) {
    return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
  }

  function artMarkup(product) {
    const hues = {
      grain: ["#eadbb7", "#bd8f4e"], pulse: ["#e7dbb1", "#9a723e"], jar: ["#d8e4c5", "#52754b"],
      bottle: ["#d9ece4", "#347c61"], spice: ["#f4d4b7", "#d6764f"], packet: ["#f3dfc7", "#d6764f"],
      bar: ["#e7e2d2", "#758b6b"], tube: ["#d5e7d2", "#315b3e"]
    };
    const pair = hues[product.art] || hues.packet;
    const shape = product.art === "bottle"
      ? '<path class="pack-shape" d="M92 40h18v15l9 11v59a9 9 0 0 1-9 9H85a9 9 0 0 1-9-9V66l9-11V40z"/><rect class="pack-cap" x="92" y="31" width="18" height="11" rx="3"/>'
      : product.art === "jar"
      ? '<rect class="pack-cap" x="78" y="45" width="48" height="11" rx="3"/><path class="pack-shape" d="M82 56h40l5 11v48a9 9 0 0 1-9 9H86a9 9 0 0 1-9-9V67z"/>'
      : product.art === "bar"
      ? '<rect class="pack-shape" x="68" y="58" width="65" height="53" rx="12" transform="rotate(-7 100 84)"/><path d="M78 70q20-10 44-2" fill="none" stroke="#fff" stroke-width="4" opacity=".65"/>'
      : product.art === "tube"
      ? '<path class="pack-shape" d="M80 47h48l-7 70q-1 9-10 10H92q-9-1-10-10z"/><rect class="pack-cap" x="94" y="125" width="21" height="9" rx="2"/>'
      : '<path class="pack-shape" d="M78 46h45l9 13-5 64q-1 8-9 8H81q-9 0-9-9l-3-64z"/><path d="M78 46l8-12h28l9 12" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>';
    return '<svg viewBox="0 0 200 170" aria-hidden="true" focusable="false">' +
      '<rect x="0" y="0" width="200" height="170" rx="4" fill="' + pair[0] + '"/>' +
      '<circle cx="160" cy="31" r="25" fill="#fff" opacity=".38"/><circle cx="37" cy="130" r="37" fill="#fff" opacity=".28"/>' +
      '<ellipse cx="101" cy="143" rx="50" ry="7" fill="#253c2b" opacity=".13"/>' +
      '<g style="--pack:' + pair[1] + '">' + shape +
      '<rect x="78" y="77" width="48" height="27" rx="3" fill="#fffdf2" opacity=".95"/>' +
      '<text x="102" y="96" text-anchor="middle" font-size="19">' + escapeHTML(product.glyph) + '</text></g>' +
      '<path d="M147 119c13-17 23-14 27-5-9-2-16 1-27 5zm3 0c-2-12 5-21 13-23-3 9-7 16-13 23z" fill="' + pair[1] + '" opacity=".8"/>' +
      '</svg>';
  }

  function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product";
    card.dataset.productId = product.id;
    card.dataset.group = product.group;
    card.dataset.search = (product.en + " " + product.kn + " " + product.groupEn + " " + product.groupKn).toLocaleLowerCase();
    card.innerHTML =
      '<div class="product-art art-' + escapeHTML(product.art) + '" role="img" aria-label="' + escapeHTML(product.en + " / " + product.kn) + '">' + artMarkup(product) + '</div>' +
      '<div class="product-card-meta"><small data-en="' + escapeHTML(product.groupEn) + '" data-kn="' + escapeHTML(product.groupKn) + '">' + escapeHTML(product.groupEn) + '</small><span data-en="' + escapeHTML(product.pack) + '" data-kn="' + escapeHTML(product.packKn) + '">' + escapeHTML(product.pack) + '</span></div>' +
      '<h3 data-en="' + escapeHTML(product.en) + '" data-kn="' + escapeHTML(product.kn) + '">' + escapeHTML(product.en) + '</h3>' +
      '<div class="product-price"><span data-en="Online reference" data-kn="ಆನ್‌ಲೈನ್ ಉಲ್ಲೇಖ">Online reference</span><strong data-price="' + product.price + '">' + formatPrice(product.price) + '</strong></div>' +
      '<a class="source-link" href="' + escapeHTML(product.source) + '" target="_blank" rel="noopener noreferrer" data-en="Price source ↗" data-kn="ದರದ ಮೂಲ ↗">Price source ↗</a>' +
      '<button class="add-to-cart" type="button" data-cart-add="' + escapeHTML(product.id) + '" data-en="Add to cart +" data-kn="ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ +">Add to cart +</button>' +
      '<a class="order" href="#contact" data-en="Ask about availability ↗" data-kn="ಲಭ್ಯತೆ ವಿಚಾರಿಸಿ ↗">Ask about availability ↗</a>';
    return card;
  }

  const groups = [];
  products.forEach((product) => {
    if (!groups.some((group) => group.id === product.group)) groups.push({ id: product.group, en: product.groupEn, kn: product.groupKn });
    if (productGrid) productGrid.appendChild(createProductCard(product));
  });

  if (categoryFilter) {
    groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.id;
      option.dataset.en = group.en;
      option.dataset.kn = group.kn;
      option.textContent = group.en;
      categoryFilter.appendChild(option);
    });
  }

  function productName(id) {
    const product = products.find((item) => item.id === id);
    return product ? (product[language] || product.en) : id;
  }

  function productPrice(id) {
    const product = products.find((item) => item.id === id);
    return product && Number.isFinite(Number(product.price)) ? Number(product.price) : null;
  }

  function saveCart() {
    try { localStorage.setItem("durga-cart", JSON.stringify(cart)); } catch (error) {}
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    [cartCount, cartFloatCount].forEach((node) => {
      if (node) {
        node.textContent = String(count);
        node.setAttribute("aria-label", language === "kn" ? count + " ವಸ್ತುಗಳು ಕಾರ್ಟ್‌ನಲ್ಲಿ" : count + " items in cart");
      }
    });
    document.querySelectorAll(".cart-trigger").forEach((button) => {
      button.setAttribute("aria-label", language === "kn" ? "ಕಾರ್ಟ್ ತೆರೆಯಿರಿ, " + count + " ವಸ್ತುಗಳು" : "Open cart, " + count + " items");
    });
  }

  function cartMessage() {
    if (!cart.length) return "";
    const lines = cart.map((item) => {
      const name = item.id.startsWith("custom-") ? item.name : productName(item.id);
      const price = item.id.startsWith("custom-") ? null : productPrice(item.id);
      const ref = price === null ? "" : " — " + formatPrice(price) + " online reference each";
      return "• " + name + " × " + item.qty + ref;
    });
    const heading = language === "kn"
      ? "ನಮಸ್ಕಾರ, ದುರ್ಗಾ ಪರಮೇಶ್ವರಿ ಕಿರಾಣಿ ಅಂಗಡಿಯಿಂದ ಈ ವಸ್ತುಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿಕೊಡಬಹುದೇ?"
      : "Hello, could you please prepare these items from Durga Parameshwari Kirani?";
    const note = language === "kn"
      ? "ಆನ್‌ಲೈನ್ ದರಗಳು ಉಲ್ಲೇಖ ಮಾತ್ರ. ಅಂಗಡಿಯ ದರ ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ದಯವಿಟ್ಟು ಖಚಿತಪಡಿಸಿ."
      : "Online prices are references only. Please confirm shop prices and availability.";
    return heading + "\n\n" + lines.join("\n") + "\n\n" + note;
  }

  function updateWhatsAppLink() {
    if (!whatsappOrder) return;
    const hasItems = cart.length > 0;
    whatsappOrder.href = hasItems
      ? "https://wa.me/919741171521?text=" + encodeURIComponent(cartMessage())
      : "#";
    whatsappOrder.setAttribute("aria-disabled", String(!hasItems));
    whatsappOrder.classList.toggle("is-disabled", !hasItems);
  }

  function renderCart() {
    if (!cartItems) return;
    cartItems.replaceChildren();
    if (cartEmpty) cartEmpty.hidden = cart.length > 0;
    let total = 0;
    let allPricesKnown = cart.length > 0;

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-row";
      const details = document.createElement("div");
      const name = document.createElement("div");
      name.className = "cart-row-name";
      name.textContent = item.id.startsWith("custom-") ? item.name : productName(item.id);
      details.appendChild(name);

      const price = document.createElement("div");
      price.className = "cart-row-price";
      if (item.id.startsWith("custom-")) {
        price.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Price: ask in store";
        allPricesKnown = false;
      } else {
        const unitPrice = productPrice(item.id);
        if (unitPrice === null) {
          price.textContent = language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Price: ask in store";
          allPricesKnown = false;
        } else {
          total += unitPrice * item.qty;
          price.textContent = formatPrice(unitPrice) + (language === "kn" ? " ಆನ್‌ಲೈನ್ ಉಲ್ಲೇಖ" : " online ref.");
        }
      }
      details.appendChild(price);
      row.appendChild(details);

      const quantity = document.createElement("div");
      quantity.className = "cart-qty";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", language === "kn" ? "ಒಂದು ಕಡಿಮೆ ಮಾಡಿ" : "Decrease quantity");
      minus.dataset.cartAction = "decrease";
      minus.dataset.cartId = item.id;
      const amount = document.createElement("output");
      amount.textContent = String(item.qty);
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", language === "kn" ? "ಒಂದು ಹೆಚ್ಚಿಸಿ" : "Increase quantity");
      plus.dataset.cartAction = "increase";
      plus.dataset.cartId = item.id;
      quantity.append(minus, amount, plus);
      row.appendChild(quantity);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "cart-remove";
      remove.textContent = language === "kn" ? "ತೆಗೆದುಹಾಕಿ" : "Remove";
      remove.dataset.cartAction = "remove";
      remove.dataset.cartId = item.id;
      row.appendChild(remove);
      cartItems.appendChild(row);
    });

    if (cartTotal) {
      if (!cart.length) cartTotal.textContent = "";
      else if (allPricesKnown) {
        cartTotal.textContent = (language === "kn" ? "ಆನ್‌ಲೈನ್ ಉಲ್ಲೇಖ ಒಟ್ಟು: " : "Online reference subtotal: ") + formatPrice(total);
      } else {
        cartTotal.textContent = language === "kn" ? "ಅಂತಿಮ ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ಖಚಿತವಾಗುತ್ತದೆ" : "Final price confirmed at the shop";
      }
    }
    updateCartCount();
    updateWhatsAppLink();
  }

  function filterCatalog() {
    if (!productGrid) return;
    const query = (productSearch ? productSearch.value : "").trim().toLocaleLowerCase();
    const category = categoryFilter ? categoryFilter.value : "all";
    let visible = 0;
    productGrid.querySelectorAll(".product").forEach((card) => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesCategory = category === "all" || card.dataset.group === category;
      const show = matchesQuery && matchesCategory;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (productResults) productResults.textContent = language === "kn"
      ? visible + " ವಸ್ತುಗಳು"
      : visible + (visible === 1 ? " item" : " items");
  }

  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.body.classList.toggle("kn", language === "kn");
    document.querySelectorAll("[data-en][data-kn]").forEach((el) => { el.innerHTML = el.dataset[language]; });
    const customNameInput = document.getElementById("customItemName");
    if (customNameInput) {
      customNameInput.placeholder = customNameInput.dataset["placeholder" + (language === "kn" ? "Kn" : "En")];
      customNameInput.setAttribute("aria-label", language === "kn" ? "ವಸ್ತುವಿನ ಹೆಸರು" : "Item name");
    }
    if (productSearch) {
      productSearch.placeholder = productSearch.dataset["placeholder" + (language === "kn" ? "Kn" : "En")];
      productSearch.setAttribute("aria-label", language === "kn" ? "ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ" : "Search products");
    }
    document.querySelectorAll("[data-price]").forEach((el) => {
      const rawPrice = el.dataset.price.trim();
      const price = Number(rawPrice);
      el.textContent = rawPrice && Number.isFinite(price) && price >= 0
        ? formatPrice(price)
        : (language === "kn" ? "ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ" : "Ask in store");
    });
    if (languageToggle) {
      languageToggle.textContent = language === "en" ? "ಕನ್ನಡ" : "English";
      languageToggle.setAttribute("aria-label", language === "en" ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ" : "Switch to English");
    }
    try { localStorage.setItem("durga-language", language); } catch (error) {}
    renderCart();
    filterCatalog();
  }

  function addItem(id, name) {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty = Math.min(99, existing.qty + 1);
    else cart.push({ id, qty: 1, name: name || "" });
    saveCart();
    renderCart();
    if (cartStatus) cartStatus.textContent = language === "kn" ? "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ." : "Added to your cart.";
  }

  document.querySelectorAll("[data-cart-add]").forEach((button) => {
    button.addEventListener("click", () => addItem(button.dataset.cartAdd, ""));
  });

  document.querySelectorAll(".cart-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      if (cartDialog && typeof cartDialog.showModal === "function") cartDialog.showModal();
      renderCart();
    });
  });

  const closeCart = document.getElementById("cartClose");
  if (closeCart) closeCart.addEventListener("click", () => cartDialog.close());
  const continueShopping = document.getElementById("cartContinue");
  if (continueShopping) continueShopping.addEventListener("click", () => cartDialog.close());
  if (cartDialog) cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) cartDialog.close();
  });

  if (cartItems) cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const item = cart.find((entry) => entry.id === button.dataset.cartId);
    if (!item) return;
    if (button.dataset.cartAction === "remove" || (button.dataset.cartAction === "decrease" && item.qty <= 1)) {
      cart = cart.filter((entry) => entry.id !== item.id);
    } else if (button.dataset.cartAction === "decrease") {
      item.qty -= 1;
    } else if (button.dataset.cartAction === "increase") {
      item.qty = Math.min(99, item.qty + 1);
    }
    saveCart();
    renderCart();
  });

  const customItemForm = document.getElementById("customItemForm");
  if (customItemForm) customItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("customItemName");
    const name = input ? input.value.trim().slice(0, 70) : "";
    if (!name) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ವಸ್ತುವಿನ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Enter an item name first.";
      if (input) input.focus();
      return;
    }
    const id = "custom-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    addItem(id, name);
    input.value = "";
    input.focus();
  });

  const clearCart = document.getElementById("clearCart");
  if (clearCart) clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    if (cartStatus) cartStatus.textContent = language === "kn" ? "ಕಾರ್ಟ್ ಖಾಲಿ ಮಾಡಲಾಗಿದೆ." : "Cart cleared.";
  });

  const copyCart = document.getElementById("copyCart");
  if (copyCart) copyCart.addEventListener("click", async () => {
    if (!cart.length) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಮೊದಲು ಕಾರ್ಟ್‌ಗೆ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ." : "Add items to the cart first.";
      return;
    }
    const lines = cart.map((item) => {
      const name = item.id.startsWith("custom-") ? item.name : productName(item.id);
      return name + " × " + item.qty;
    });
    const message = (language === "kn" ? "ಖರೀದಿ ಪಟ್ಟಿ" : "Shopping list") + "\n" + lines.join("\n") + "\n" +
      (language === "kn" ? "ಬೆಲೆ/ಲಭ್ಯತೆ ಅಂಗಡಿಯಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ." : "Please confirm price and availability at the shop.");
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(message);
      else {
        const temporary = document.createElement("textarea");
        temporary.value = message;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        document.execCommand("copy");
        temporary.remove();
      }
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಪಟ್ಟಿ ನಕಲಾಗಿದೆ." : "List copied.";
    } catch (error) {
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಪಟ್ಟಿಯನ್ನು ನಕಲಿಸಲಾಗಲಿಲ್ಲ." : "Could not copy the list.";
    }
  });

  if (whatsappOrder) whatsappOrder.addEventListener("click", (event) => {
    if (!cart.length) {
      event.preventDefault();
      if (cartStatus) cartStatus.textContent = language === "kn" ? "ಮೊದಲು ಕಾರ್ಟ್‌ಗೆ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ." : "Add items to the cart first.";
    }
  });

  if (productSearch) productSearch.addEventListener("input", filterCatalog);
  if (categoryFilter) categoryFilter.addEventListener("change", filterCatalog);
  if (languageToggle) languageToggle.addEventListener("click", () => applyLanguage(language === "en" ? "kn" : "en"));
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("is-open", !expanded);
    });
    mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 620) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  applyLanguage(language);
})();
