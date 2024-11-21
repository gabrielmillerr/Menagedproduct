import { FindProduct } from "../../domain/usecases/product/FindProduct";

const mockProductRepository = {
  findById: jest.fn(),
  findByName: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  update: jest.fn()
}

// criação usecase
const findProductUseCase = new FindProduct(mockProductRepository);

describe("FindProductUseCase", () => {
  it("should find product by id", async () => {
    const product = {
      id: "1",
      name: "tela iPhone",
      price: 500,
      stock: 5
    }

    mockProductRepository.findById = jest.fn().mockResolvedValue(product);

    const result = await findProductUseCase.findById("1");

    expect(result).toEqual(product);
    expect(mockProductRepository.findById).toHaveBeenCalledWith("1");
  })

  it("should return null if product is not found", async() => {
    mockProductRepository.findById = jest.fn().mockResolvedValue(null);

    const result = await findProductUseCase.findById("2");

    expect(result).toBeNull();
    expect(mockProductRepository.findById).toHaveBeenCalledWith("2");
  })

  it("should find all products", async() => {
    const products = [
      { id: '1', name: 'tela iPhone', price: 500, stock: 5 },
      { id: '2', name: 'tela Samsung', price: 400, stock: 10 },
    ]

    mockProductRepository.findAll = jest.fn().mockResolvedValue(products);

    const result = await findProductUseCase.findAll();
    
    expect(result).toEqual(products);
    expect(mockProductRepository.findAll).toHaveBeenCalled();
  })
})