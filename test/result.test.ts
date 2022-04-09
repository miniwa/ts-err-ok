import { err, ok, Result } from "../src/result";
import { divide } from "./divide";
import { parseSong } from "./song";

describe("Result<R, E>", () => {
  it("should work with simple division example", () => {
    const divideBy10 = divide(10, 10);
    if (divideBy10.ok()) {
      expect(divideBy10.val).toBe(1);
    } else {
      fail();
    }

    const divideByZero = divide(10, 0);
    if (divideByZero.err()) {
      expect(divideByZero.error.message).toBe("Division by zero");
    } else {
      fail();
    }
  });

  it("should work with parse song example", () => {
    const invalidJsonRes = parseSong("{{}a");
    if (invalidJsonRes.err()) {
      expect(invalidJsonRes.error.type).toBe("JsonSyntaxError");
    } else {
      fail();
    }

    const missingTitleSong = JSON.stringify({
      author: "Iron Maiden",
    });
    const missingTitleRes = parseSong(missingTitleSong);
    if (missingTitleRes.err()) {
      expect(missingTitleRes.error.type).toBe("MissingField");
    } else {
      fail();
    }

    const validSong = JSON.stringify({
      author: "Iron Maiden",
      title: "Dance of Death",
    });
    const validRes = parseSong(validSong);
    if (validRes.ok()) {
      expect(validRes.val.author).toBe("Iron Maiden");
      expect(validRes.val.title).toBe("Dance of Death");
    } else {
      fail();
    }
  });
});
