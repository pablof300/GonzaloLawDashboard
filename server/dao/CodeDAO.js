const Code = require("../models/Code.js").Code;




exports.codeExist = async (code, id) => {
  const userCode = await Code.findOne({ code: code, userID: id });
  if (userCode) {
    const timeSent = userCode.sendTime
    const d = new Date();

    let diff =(d.getTime() - timeSent) / (1000);
    console.log(diff)
    let results =  Math.abs(Math.round(diff));
    console.log(results)
    if(results <= 600){
      return true;
    }
    return false;
  }
  return false;
};

exports.deleteCode = async () => {
  
}

exports.createCode = async (id) => {
  const code = Math.random().toString().slice(2,8);
  const date = new Date();
  let data = {
      code: code,
      sendTime: date.getTime(),
      userID : id,
  }
  return await new Code(data).save();
};
