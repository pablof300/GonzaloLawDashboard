const exceptions = require("./exceptions");

module.exports = catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result });
  } catch (e) {
    if (e instanceof exceptions.ValidationError) {
      res.status(e.httpErrorCode).send({
        ok: false,
        error: e.message,
        validationErrors: e.validationErrors
      });
    } else if (e instanceof exceptions.NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message });
    }
  }
};
