import { divide } from "../test/divide";

const result = divide(10, 5);
if (result.ok()) {
  // Compiler coerces "result" into Ok<number>.
  console.log("Result" + result.val);
} else {
  // Compiler coerces "result" into Err<Error>.
  console.log("Error" + result.error);
}
// This results in a type error because the result has to explicitly checked before either "val" or "error" can be accessed.
console.log("Result: ", result.val);
