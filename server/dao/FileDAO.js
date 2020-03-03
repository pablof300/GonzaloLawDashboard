const File = require("../models/File.js").Model;
const { NotFoundError } = require("../util/exceptions");

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Possible memoization of db connection

exports.create = async fileParams => {
  if (await File.exists({ url: fileParams.url })) {
    throw Error("File already exist");
  }

  return await new File(fileParams).save();
};

exports.getAll = async () => {
  return await File.find({}).exec();
};

exports.get = async id => {
  const file = await File.findById(id);
  if (!file) throw new NotFoundError();

  return file;
};

exports.getByFileName = async fileName => {
  const file = await File.findOne({ name: fileName });
  if (!file) throw new NotFoundError();

  return file;
};

exports.getByFileSize = async fileSize => {
  const file = await File.findOne({ name: fileSize });
  if (!file) throw new NotFoundError();
  return file;
};

exports.delete = async id => {
  const file = await File.findByIdAndDelete(id);
  if (!file) throw new NotFoundError();

  return file;
};

exports.deleteAll = async () => {
  await File.deleteMany();
};
