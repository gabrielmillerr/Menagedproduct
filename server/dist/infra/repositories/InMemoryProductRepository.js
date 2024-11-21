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
exports.InMemoryProductRepository = void 0;
class InMemoryProductRepository {
    constructor() {
        this.products = [];
    }
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            this.products.push(product);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.products.find((product) => product.id === id) || null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.products;
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productIndex = this.products.findIndex(product => product.id === product.id);
            if (productIndex !== -1) {
                this.products[productIndex] = product;
            }
        });
    }
}
exports.InMemoryProductRepository = InMemoryProductRepository;
//# sourceMappingURL=InMemoryProductRepository.js.map