"use strict";
let age = 30;
let nameUser = "Vedat";
let isActive = true;
let nothingReturned = undefined; // typically a function's return type, not a variable type
let tags = ["backend", "typescript"];
let scores = [10, 20, 30]; // equivalent generic syntax, same meaning
let cords = [41.0, 28.9];
let entry = ["Vedat", 30, true];
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Pending"] = 0] = "Pending";
    OrderStatus[OrderStatus["Active"] = 1] = "Active";
    OrderStatus[OrderStatus["Shipped"] = 2] = "Shipped";
    OrderStatus[OrderStatus["Cancelled"] = 3] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
let orderStatus = OrderStatus.Shipped;
console.log(orderStatus);
console.log(OrderStatus[2]);
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
;
const newHttpMethod = HttpMethod.GET;
console.log(newHttpMethod);
