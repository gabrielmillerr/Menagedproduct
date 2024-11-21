"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(props) {
        var _a;
        this.props = props;
        this.props.stock = (_a = this.props.stock) !== null && _a !== void 0 ? _a : 0;
        this.validate();
    }
    static create(name, price) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            stock: 0,
        });
    }
    static with(props) {
        return new Product(props); // Método alternativo de criação
    }
    validate() {
        if (!this.props.name) {
            throw new Error('Name is required');
        }
        if (this.props.price === undefined || this.props.price < 0) {
            throw new Error('Price must be a positive number');
        }
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get price() {
        return this.props.price;
    }
    get stock() {
        var _a;
        return (_a = this.props.stock) !== null && _a !== void 0 ? _a : 0;
    }
    increaseStock(quantity) {
        var _a;
        if (quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        this.props.stock = ((_a = this.props.stock) !== null && _a !== void 0 ? _a : 0) + quantity;
    }
    decreaseStock(quantity) {
        var _a, _b;
        if (quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        if (((_a = this.props.stock) !== null && _a !== void 0 ? _a : 0) < quantity) {
            throw new Error('Insufficient stock');
        }
        this.props.stock = ((_b = this.props.stock) !== null && _b !== void 0 ? _b : 0) - quantity;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map