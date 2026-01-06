// Save Vendor
function saveVendor() {
  const vendor = {
    name: vendorName.value,
    shop: shopName.value,
    shopNo: shopNo.value,
    performance: performance.value
  };
  localStorage.setItem("vendor", JSON.stringify(vendor));
  alert("Vendor Details Saved");
}

// Convert image to Base64
function getImageBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Add Product
function addProduct() {
  const imageFile = productImage.files[0];
  if (!imageFile) {
    alert("Please upload product image");
    return;
  }

  getImageBase64(imageFile, function (imgData) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
      name: productName.value,
      price: price.value,
      discount: discount.value,
      description: description.value,
      image: imgData,
      views: 0,
      sold: 0
    });

    localStorage.setItem("products", JSON.stringify(products));
    loadDisplay();
    alert("Product Added to Display");
  });
}

// Load Display Screen
function loadDisplay() {
  const display = document.getElementById("display");
  if (!display) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  display.innerHTML = "";

  products.forEach((p, i) => {
    p.views++;
    display.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p><b>₹${p.price}</b> • ${p.discount}% OFF</p>
          <button onclick="buy(${i})">Scan & Buy</button>
        </div>
      </div>
    `;
  });

  localStorage.setItem("products", JSON.stringify(products));
}

// Buy Product
function buy(index) {
  let products = JSON.parse(localStorage.getItem("products"));
  products[index].sold++;

  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push({
    product: products[index].name,
    time: new Date().toLocaleString(),
    payment: "UPI"
  });

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("customers", JSON.stringify(customers));
  alert("Purchase Recorded");
}

// Analytics
function loadAnalytics() {
  const analytics = document.getElementById("analytics");
  if (!analytics) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  analytics.innerHTML = "";

  products.forEach(p => {
    analytics.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Views: ${p.views}</p>
        <p>Sold: ${p.sold}</p>
      </div>
    `;
  });
}

// Customer Data
function loadCustomers() {
  const customersDiv = document.getElementById("customers");
  if (!customersDiv) return;

  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customersDiv.innerHTML = "";

  customers.forEach(c => {
    customersDiv.innerHTML += `
      <div class="card">
        <p><b>${c.product}</b></p>
        <p>${c.time}</p>
        <p>${c.payment}</p>
      </div>
    `;
  });
}

window.onload = () => {
  loadDisplay();
  loadAnalytics();
  loadCustomers();
};
