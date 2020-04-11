let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Products API", () => {
  /**
   * Test the GET route
   */

  describe("GET /products/", () => {
    it("It should GET all the products", (done) => {
      chai
        .request(server)
        .get("/products/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should send an error (wrong path)", (done) => {
      chai
        .request(server)
        .get("/product")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */

  describe("GET /products/:id", () => {
    it("It should GET a product by ID", (done) => {
      const productId = "5e91da27989e934ae8b1dbab";
      chai
        .request(server)
        .get("/products/" + productId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("_id")
            .eq("5e91da27989e934ae8b1dbab");
          response.body.should.have.property("name");
          response.body.should.have.property("category");
          response.body.should.have.property("date");
          response.body.should.have.property("createdAt");
          response.body.should.have.property("updatedAt");
          response.body.should.have.property("__v");

          done();
        });
    });

    it("It should send an error (this product does not exist)", (done) => {
      const productId = "5e90bf";
      chai
        .request(server)
        .get("/products/" + productId)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            '"The product with the provided ID does not exist."'
          );
          done();
        });
    });
  });

  /**
   * Test the POST route
   */

  describe("POST /products/add", () => {
    it("It should POST a new product", (done) => {
      const product = {
        name: "Delete",
        category: "Groceries",
        date: "2019-11-01T19:48:01.000Z",
      };
      chai
        .request(server)
        .post("/products/add")
        .send(product)
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.be.eq('"Product is added!"');
          done();
        });
    });

    it("It should NOT POST a new product without the name property", (done) => {
      const product = {
        category: "Groceries",
        date: "2019-11-01T19:48:01.000Z",
      };
      chai
        .request(server)
        .post("/products/add")
        .send(product)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            '"Error: ValidationError: name: Path `name` is required."'
          );
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */

  describe("DELETE /products/:id", () => {
    it("It should DELETE an existing product specified by ID", (done) => {
      const productId = "5e91da27989e934ae8b1dbab";
      chai
        .request(server)
        .delete("/products/" + productId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should send an error while trying to delete a product that does not exist", (done) => {
      const productId = "123";
      chai
        .request(server)
        .delete("/products/" + productId)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            '"Can not delete product with the specified Id"'
          );
          done();
        });
    });
  });
});
