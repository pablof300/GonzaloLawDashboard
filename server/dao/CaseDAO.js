const Case = require("../models/Case.js").Model;
const { NotFoundError } = require("../util/exceptions");




exports.create = async caseParams => {
    console.log("made it to caseDAO");
     /* if (await Case.exists({ _id: id })) {
        throw Error("File already exist");
      }  */
      let newCase = new Case(caseParams);
      newCase.save().then(data => {        
    }).catch(err => {
        console.log(err) });
    console.log("made it past saving the listing");
    return;
};


exports.getAll = async () => {
    return await Case.find({}).exec(); 
};

exports.get = async id => {
    console.log("sent to .get");
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

exports.delete = async id => {
    console.log("made it to caseDAO!");
    const tempCase = await Case.findByIdAndDelete(id);
    if (!tempCase) throw new NotFoundError();
  
    return tempCase;
};

exports.deleteAll = async () => {
    await Case.deleteMany();
};
