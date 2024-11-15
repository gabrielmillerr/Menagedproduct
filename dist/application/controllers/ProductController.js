"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(createProduct, menageProductStock) {
        this.createProduct = createProduct;
        this.menageProductStock = menageProductStock;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { name, price } = req.body;
                const product = yield this.createProduct.execute(name, price);
                res.status(201).json(product);
            }
            catch (error) {
                console.log(req.body);
                res.status(400).json({ message: error });
            }
        });
    }
    increaseStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, quantity } = req.body;
                const product = yield this.menageProductStock.increaseStock(productId, quantity);
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    decreaseStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, quantity } = req.body;
                const product = yield this.menageProductStock.decreaseStock(productId, quantity);
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map