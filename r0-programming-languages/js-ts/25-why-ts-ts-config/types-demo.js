"use strict";
function describeProduct(product, status) {
    const finalPrice = product.discount ? product.price - product.discount : product.price;
    return `${product.name} is ${status}, priced at $${finalPrice}`;
}
const laptop = {
    id: 1,
    name: "Thinkpad",
    price: 1200
};
console.log(describeProduct(laptop, "in-stock"));
console.log(describeProduct(laptop, "available"));
