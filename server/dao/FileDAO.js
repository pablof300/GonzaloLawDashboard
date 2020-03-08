const LocalFile = require("../models/LocalFile.js").LocalFile;
const { NotFoundError } = require("../util/exceptions");

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Possible memoization of db connection

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

exports.getByFileName = async fileName => {
  const file = await LocalFile.findOne({ name: fileName });
  if (!file) throw new NotFoundError();

  return file;
};

exports.getByFileSize = async fileSize => {
  const file = await LocalFile.findOne({ name: fileSize });
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
