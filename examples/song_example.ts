import { err, ok, Result } from "../src/result";
import { parseSong } from "../test/song";

const res = parseSong("{[]");
if (res.ok()) {
  // "val" has type "Song".
  console.log("Song: ", res.val);
} else {
  switch (res.error.type) {
    case "MissingField":
      // "error" has type "MissingField".
      console.log("Missing field: ", res.error.message);
      break;
    case "JsonSyntaxError":
      // "error" has type "SyntaxError".
      console.log("Syntax error: ", res.error.syntaxError);
      break;
  }
}
