import { err, ok, Result } from "../src/result";
import { parseSong } from "../test/song";

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
