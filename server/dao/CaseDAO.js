const Case = require("../models/Case.js").Model;
const { NotFoundError } = require("../util/exceptions");



exports.create = async caseParams => {
      let newCase = new Case(caseParams);
      newCase.save().then(data => {        
    }).catch(err => {
        console.log(err) });
    return newCase;
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
    console.log("made it to caseDAO great");
    await Case.findOneAndUpdate({ _id: id }, updatedData, {
      upsert: true,
      useFindAndModify: false
    });
    
    return; //exports.get(id);
};
//works
exports.delete = async id => {
    console.log("made it to caseDAO!");
    const tempCase = await Case.findByIdAndDelete(id);
    if (!tempCase) throw new NotFoundError();
  
    return tempCase;
};

exports.deleteAll = async () => {
  console.log("got sent to deleteALL fuck!");  
  await Case.deleteMany();
};
