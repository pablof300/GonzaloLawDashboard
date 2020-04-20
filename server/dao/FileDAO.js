const LocalFile = require("../models/LocalFile.js").LocalFile;
const User = require("../models/User.js").Model;
const { NotFoundError } = require("../util/exceptions");

exports.create = async (fileParams) => {
  if (await LocalFile.exists({ url: fileParams.url })) {
    throw Error("File already exist");
  }
  return await new LocalFile(fileParams).save();
};

exports.getAll = async () => {
  return await LocalFile.find({}).exec();
};

exports.getAllFilesByUser = async (id) => {
  const files = await User.findById(id)
    .exec()
    .then((data) => {
      return data.files;
    });
  const userFiles = await LocalFile.find({ _id: { $in: files } })
    .exec()
    .then((data) => {
      return data;
    });
  if (!userFiles) {
    console.log("User has no files");
  }
  return userFiles;
};

exports.get = async (id) => {
  const file = await LocalFile.findById(id);
  if (!file) throw new NotFoundError();

  return file;
};

exports.delete = async (id) => {
  const file = await LocalFile.findByIdAndDelete(id);
  if (!file) throw new NotFoundError();
  return file;
};

exports.deleteAll = async () => {
  await LocalFile.deleteMany();
};
