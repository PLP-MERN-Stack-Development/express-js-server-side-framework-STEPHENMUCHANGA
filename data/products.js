const { v4: uuidv4 } = require("uuid");

let products = [
  {
    id: uuidv4(),
    name: "Wireless Computer Mouse",
    description: "Ergonomic wireless computer mouse",
    price: 37.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Bluetooth Stereo Headphones",
    description: "Noise-cancelling Bluetooth stereo headphones",
    price: 99.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Smart LED TV",
    description: "55-inch 4K Ultra HD Smart LED TV",
    price: 799.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RGB keyboard",    
    price: 1499.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Mountain Bike",
    description: "All-terrain mountain bike with 21-speed gear system",
    price: 499.99,
    category: "Sports & Outdoors Equipment",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Story Book Collection",
    description: "A collection of classic children's stories",
    price: 29.99,
    category: "Stationery & Books",
    inStock: false,
  }
];

module.exports = products;
