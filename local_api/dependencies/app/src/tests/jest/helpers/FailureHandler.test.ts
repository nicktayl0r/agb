require("@/tests/jest/__polyfill__/TextEncoder");
import { tryCatch } from "@/helpers/projectHelpers";

describe("Generic Failure Handler", () => {
  it("should return whatever value the original Function would return", () => {
    expect(
      tryCatch(() => {
        const x = "y";
      })
    ).toBe(undefined); // no return in function....
    expect(tryCatch(() => "fizzbuzz")).toBe("fizzbuzz"); // implicit return should be consistent...
  });
  it("should call onFail when appropriate", () => {
    const onFail = jest.fn(() => 42);

    tryCatch(() => {
      throw "hello world";
    }, onFail);
    expect(onFail).toHaveBeenCalledTimes(1);
  });
});
