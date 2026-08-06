function f(a = b, b = 2) {} // ReferenceError if called as f() — b isn't initialized yet when a's default runs

const user = {
    name: "Vedat",
    address: null
}

user.address.city; // TypeError: Cannot read properties of null
user.address?.city; // undefined -- short-circuits safely

const a = user.address?.city.toUpperCase().trim();

user?.address?.city;

const fn = null;
fn?.(); // undefined, doesn't throw fn is not a function

const arr = null;
arr?.[0]; // undfined

// What it does NOT protect against: it only guards agains
// null / undefined. It does nothing for other falsy-but-valid values,
// and it does nothning if the property genuinely doesn't exist as a method:

const obj = { name: "Vedat" };
obj.getName?.(); // undefined -- obj.getName is undefined, so ?.() short-circuits safely
                 // this is actually a *useful* pattern: call this method if it exists




// Nullish coelescin ??
const count = 0;
const result1 = count || 10; // 10 -- WRONG if 0 is a valid value
const result2 = count ?? 10; // 0 -- correct, 0 is not nullish

const settings = { volume: 0, muted: false };

settings.volume || 50; // 50 -- wrong, 0 is a real, intentional volume
settings.volume ?? 50; // 0 -- correct

settings.muted || true; // true - wrong, ignores an explicit 'false'
settings.muted ?? true; // false - correct

const x = a || b ?? c; // SyntaxError
const x = (a || b) ?? c; // fine -- you must be explicit

const city = user?.address?.city ?? "Unknown";


const config = {
    retries: 0,
    timeout: null,
    headers: undefined
}

const a = config.retries ?? 5;
const b = config.timeout ?? 5000;
const c = config.headers?.["x-api-key"] ?? "none";
const d = config.retries || 5;

