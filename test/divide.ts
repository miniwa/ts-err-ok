import { err, ok, Result } from "../src/result";

export function divide(x: number, y: number): Result<number, Error> {
  if (y === 0) {
    // Use err() to construct an error result.
    return err(new Error("Division by zero"));
  } else {
    // Use ok() to oconstruct an ok result.
    return ok(x / y);
  }
}
