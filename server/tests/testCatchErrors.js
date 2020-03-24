const catchErrors = require("../util/catchErrors.js");

if (catchErrors instanceof Function) {
    console.log("catchErrors is a function");
}
else {
    console.log("catchErrors is not a function");
}