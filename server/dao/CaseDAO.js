const Case = require("../models/Case.js").Model;
const { NotFoundError } = require("../util/exceptions");

exports.create = async caseParams => {
  return await new Case(caseParams).save();
};

exports.getAll = async () => {
  return await Case.find({}).exec();
};

exports.get = async id => {
  const clientCase = await Case.findById(id);
  if (!clientCase) {
    throw new NotFoundError();
  }
  return clientCase;
};

exports.update = async (id, updatedData) => {
  await Case.findOneAndUpdate({ _id: id }, updatedData, {
    upsert: true,
    useFindAndModify: false
  });

  return exports.get(id);
};

exports.delete = async id => {
  const clientCase = await Case.findByIdAndDelete(id);
  if (!clientCase) throw new NotFoundError();

  return clientCase;
};

exports.deleteAll = async () => {
  await Case.deleteMany();
};
