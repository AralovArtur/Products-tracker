const router = require("express").Router();
let Product = require("../models/product");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const date = Date.parse(req.body.date);

  const newProduct = new Product({
    name,
    category,
    date,
  });

  newProduct
    .save()
    .then(() => res.json("Product is added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product is deleted."))
    .catch((err) =>
      res.status(400).json("Can not delete product with the specified Id")
    );
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.name = req.body.name;
      product.category = req.body.category;
      product.date = Date.parse(req.body.date);

      product
        .save()
        .then(() => res.json("Product is updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/categories/:category").get((req, res) => {
  Product.find({ category: req.params.category })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(400).json("The product with the provided ID does not exist.")
    );
});

module.exports = router;
