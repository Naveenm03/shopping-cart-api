const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
