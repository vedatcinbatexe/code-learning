"use strict";
function formatId(id) {
    if (typeof id === "number") {
        return `ID-${id.toString().padStart(5, "0")}`;
    }
    return `ID-${id.toUpperCase()}`;
}
console.log(formatId(42));
console.log(formatId("abc"));
function buildUser(name, age = 18, isAdmin) {
    return { name, age, isAdmin: isAdmin ?? false };
}
console.log(buildUser("Vedat"));
console.log(buildUser("Vedat", 30));
console.log(buildUser("Vedat", 30, true));
// predict this call specifically:
console.log(buildUser("Vedat", undefined, true));
