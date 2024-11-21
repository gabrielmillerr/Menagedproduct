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
exports.MenageProductStock = void 0;
class MenageProductStock {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    increaseStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            product.increaseStock(quantity);
            yield this.productRepository.update(product);
            return product;
        });
    }
    decreaseStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            product.decreaseStock(quantity);
            yield this.productRepository.update(product);
            return product;
        });
    }
}
exports.MenageProductStock = MenageProductStock;
//# sourceMappingURL=MenageProductStock.js.map