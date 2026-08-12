let age: number = 30;
let nameUser: string = "Vedat";
let isActive: boolean = true;
let nothingReturned: void = undefined;   // typically a function's return type, not a variable type

let tags: string[] = ["backend", "typescript"];
let scores: Array<number> = [10, 20, 30];   // equivalent generic syntax, same meaning

let cords: [number, number] = [41.0, 28.9];
let entry: [string, number, boolean] = ["Vedat", 30, true];

enum OrderStatus {
    Pending,
    Active,
    Shipped,
    Cancelled
}

let orderStatus: OrderStatus = OrderStatus.Shipped;
console.log(orderStatus);
console.log(OrderStatus[2]);

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
};

const newHttpMethod: HttpMethod = HttpMethod.GET;
console.log(newHttpMethod);

const fetchSomething = (): string => {
    return 'Hello';
}


let dataAny: any = fetchSomething();
dataAny.toUpperCase(); // no error - any disables type checking entirely
dataAny.nonExistentMethod(); // also no erorr - even though this doesn't exit

let dataUnknown: unknown = fetchSomething();
//dataUnknown.toUpperCase(); // Error: Object is of type 'unknown'

function handleData(data: unknown) {
    if(typeof data === "string") {
        console.log(data.toUpperCase());
    }
}

function throwError(message: string): never {
  throw new Error(message);   // this function never returns a value — it always throws
}

function infiniteLoop(): never {
  while (true) {}             // never returns — loops forever
}

function assertUnreachable(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}
