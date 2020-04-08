const Code = require("../models/Code.js").Code;

exports.codeExist = async (code, id) => {
  const userCode = await Code.findOne({ code: code, userID: id });
  if (userCode) {
    const expiredTime = userCode.expireTime;
    const d = new Date();
    let diff = expiredTime - d.getTime();
    if (diff >= 0) {
      await Code.deleteOne(userCode, (err) => {
        if (err) console.log(err);
      });
      await deleteExpiredCodes();
      
      return true;
    }

    return false;
  }
  return false;
};

const deleteExpiredCodes = async () => {
  const date = new Date();
  const res = await Code.deleteMany(
    { expireTime: { $lt: date.getTime() } },
    (err, data) => {
      if (err) return err;
      return data;
    })

  return res;
};

exports.createCode = async (id) => {
  await deleteExpiredCodes();
  const code = Math.random().toString().slice(2, 9);
  const sendDate = new Date();
  const expireTime = 600000 + sendDate.getTime();
  let data = {
    code: code,
    sendTime: sendDate.getTime(),
    expireTime: expireTime,
    userID: id,
  };
  return await new Code(data).save();
};
