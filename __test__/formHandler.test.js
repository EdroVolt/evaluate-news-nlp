const formHandler = require("../src/client/js/formHandler");

test("test return defined", () => {
    expect(formHandler.updateUI).toBeDefined();
});