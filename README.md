# ts-err-ok

Javascript exception handling leaves much to be asked. That is why this package provides a method for typesafe error handling. When combined with typescript type coercion you are left with a powerful primitive to signal the results of operations.

## Install

```
$ npm install ts-err-ok
```

## Usage

`Result` declares your possible return values. In this case `number` if ok, else `Error`.

```typescript
function divide(x: number, y: number): Result<number, Error>;
```

The compiler forces you to check whether the operation was successful or not.

```typescript
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
```

Build result objects by using the helper functions `ok()` and `err()`.

```typescript
function divide(x: number, y: number): Result<number, Error> {
  if (y === 0) {
    // Use err() to construct an error result.
    return err(new Error("Division by zero"));
  } else {
    // Use ok() to oconstruct an ok result.
    return ok(x / y);
  }
}
```

## Examples

By using discriminated unions as your error types you can get very fine grained error handling. An example that parses songs out of json strings

```typescript
interface Song {
  author: string;
  title: string;
}

interface MissingField {
  type: "MissingField";
  message: string;
}

interface JsonSyntaxError {
  type: "JsonSyntaxError";
  syntaxError: SyntaxError;
}

type SongParseError = MissingField | JsonSyntaxError;

export function parseSong(str: string): Result<Song, SongParseError> {
  try {
    const obj = JSON.parse(str);
    if (obj.author === undefined) {
      return err({
        type: "MissingField",
        message: "Author was undefined",
      });
    }
    if (obj.title === undefined) {
      return err({
        type: "MissingField",
        message: "Title was undefined",
      });
    }
    return ok(obj);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err({
        type: "JsonSyntaxError",
        syntaxError: error,
      });
    } else {
      // Rethrow unexpected errors.
      throw error;
    }
  }
}

const res = parseSong("{[]");
if (res.ok()) {
  // "val" has type "Song".
  console.log("Song: ", res.val);
} else {
  if (res.error.type === "MissingField") {
    // "error" has type "MissingField".
    console.log("Missing field: ", res.error.message);
  } else if (res.error.type === "JsonSyntaxError") {
    // "error" has type "SyntaxError".
    console.log("Syntax error: ", res.error.syntaxError);
  }
}
```

## Maintainers

- [Max Byrde](https://github.com/miniwa)

## License

- [MIT](/LICENSE)

## Other

- [Changelog](/CHANGELOG.md)
