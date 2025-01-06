const jsonData = `[
  { "id": 1, "Name": "Laptop", "category": "Electronics", "price": 1000, "available": true },
  { "id": 2, "name": "pphone", "category": "Electronics", "price": 500, "available": false },
  { "id": 3, "name": "Shirt", "category": "Clothing", "price": 30, "available": true },
  { "id": 4, "name": "Washing Machine", "category": "Appliances", "price": 400, "available": true },
  { "id": 5, "name": "Headphones", "category": "Electronics", "price": 150, "available": false }
]`;

let products = JSON.parse(jsonData);

function addProduct(id, name, category, price, available) {
  const newProduct = { id, name, category, price, available };
  products.push(newProduct);
  console.log('New product added:', JSON.stringify(newProduct, null, 2));
}

function updatePrice(id, newPrice) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.price = newPrice;
    console.log(`Price of product ID ${id} updated to ${newPrice}`);
  } else {
    console.log('Product not found!');
  }
}

function getAvailableProducts() {
  const availableProducts = products.filter(product => product.available);
  console.log('Available products:');
  availableProducts.forEach(product => {
    console.log(JSON.stringify(product, null, 2));
  });
}

function getProductsByCategory(category) {
  const filteredProducts = products.filter(product => product.category === category);
  console.log(`Products in category "${category}":`);
  filteredProducts.forEach(product => {
    console.log(JSON.stringify(product, null, 2));
  });
}

addProduct(6, 'Smart Watch', 'Electronics', 200, true);
updatePrice(1, 950);
getAvailableProducts();
getProductsByCategory('Electronics');
