"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InMemoryProductRepository_1 = require("./infra/repositories/InMemoryProductRepository");
const CreateProduct_1 = require("./domain/usecases/CreateProduct");
const MenageProductStock_1 = require("./domain/usecases/MenageProductStock");
const ProductController_1 = require("./application/controllers/ProductController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuração dos casos de uso e repositório
const productRepository = new InMemoryProductRepository_1.InMemoryProductRepository();
const createProduct = new CreateProduct_1.CreateProduct(productRepository);
const menageProductStock = new MenageProductStock_1.MenageProductStock(productRepository);
const productController = new ProductController_1.ProductController(createProduct, menageProductStock);
// Rotas
app.post('/products/create', (req, res) => productController.create(req, res));
app.post('/products/increase-stock', (req, res) => productController.increaseStock(req, res));
app.post('/products/decrease-stock', (req, res) => productController.decreaseStock(req, res));
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=main.js.map