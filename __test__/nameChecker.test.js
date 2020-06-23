const nameChecker = require("../src/client/js/nameChecker");

test("test return undefined", () => {
  expect(nameChecker.checkForName("ahmed")).toBe(undefined);
});
