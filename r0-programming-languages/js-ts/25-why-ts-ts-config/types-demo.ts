interface Product {
    id: number;
    name: string;
    price: number;
    discount?: number;
}

type ProductStatus = "in-stock" | "out-of-stock" | "discounted";

function describeProduct(product: Product, status: ProductStatus): string {
    const finalPrice = product.discount ? product.price - product.discount : product.price;

    return `${product.name} is ${status}, priced at $${finalPrice}`;
}

const laptop: Product = {
    id: 1,
    name: "Thinkpad",
    price: 1200
};

console.log(describeProduct(laptop, "in-stock"))

//console.log(describeProduct(laptop, "available"))