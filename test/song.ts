import { err, ok, Result } from "../src/result";

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
