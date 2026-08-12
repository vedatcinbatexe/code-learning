function formatId(id: number): string;
function formatId(id: string): string;
function formatId(id: number | string): string {
  if (typeof id === "number") {
    return `ID-${id.toString().padStart(5, "0")}`;
  }
  return `ID-${id.toUpperCase()}`;
}

console.log(formatId(42));
console.log(formatId("abc"));

function buildUser(name: string, age: number = 18, isAdmin?: boolean) {
  return { name, age, isAdmin: isAdmin ?? false };
}

console.log(buildUser("Vedat"));
console.log(buildUser("Vedat", 30));
console.log(buildUser("Vedat", 30, true));

// predict this call specifically:
console.log(buildUser("Vedat", undefined, true));