let products = [];
let nextId = 1;

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const newProduct = { id: nextId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
};
