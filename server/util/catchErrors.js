const temp = require('./exceptions')

module.exports = catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result }).then().catch((err)=>console.log(err));
  } catch (e) {
    if (e instanceof temp.ValidationError) {
      res.status(e.httpErrorCode).send({
        ok: false,
        error: e.message,
        validationErrors: e.validationErrors
      });
    } else if (e instanceof temp.NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
        if(!res.headersSent) {
        res.status(400).send({ ok: false, error: e.message });
      } 
      
    }
  }
};
