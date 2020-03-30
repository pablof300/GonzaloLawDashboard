const { ValidationError, NotFoundError } = require('./exceptions');

module.exports = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message});
    }
  }
};