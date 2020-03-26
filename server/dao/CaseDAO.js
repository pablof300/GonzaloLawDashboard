const Case = require("../models/Case.js").Model;
const { NotFoundError } = require("../util/exceptions");



exports.create = async caseParams => {
  return await new Case(caseParams).save();
};


exports.getAll = async () => {
    return await Case.find({}).exec(); 
};

exports.get = async id => {
    
    const tempCase = await Case.findById(id);
    if (!tempCase) {
      console.log("Could not find a case for the given id!")
    }
    return tempCase; 
};

exports.update = async (id, updatedData) => {
    await Case.findOneAndUpdate({ _id: id }, updatedData, {
      upsert: true,
      useFindAndModify: false
    });
    
    return exports.get(id);
};

exports.delete = async id => {
    const tempCase = await Case.findByIdAndDelete(id);
    if (!tempCase) throw new NotFoundError();
  
    return tempCase;
};

exports.deleteAll = async () => {
  await Case.deleteMany();
};
