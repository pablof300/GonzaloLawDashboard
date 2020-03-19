const LocalFile = require("../models/LocalFile.js").LocalFile;
const { NotFoundError } = require("../util/exceptions");

exports.create = async fileParams => {
  if (await LocalFile.exists({ url: fileParams.url })) {
    throw Error("File already exist");
  }
  return await new LocalFile(fileParams).save();
};

exports.getAll = async () => {
  return await LocalFile.find({}).exec();
};

exports.get = async id => {
  const file = await LocalFile.findById(id);
  if (!file) throw new NotFoundError();

  return file;
};

exports.delete = async id => {
  const file = await LocalFile.findByIdAndDelete(id);
  if (!file) throw new NotFoundError();
  return file;
};

exports.deleteAll = async () => {
  await LocalFile.deleteMany();
};
