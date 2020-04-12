const User = require("../models/User.js").Model;
const CaseDAO = require("./CaseDAO");
const { NotFoundError } = require("../util/exceptions");

exports.create = async userParams => {
  if (await User.exists({ username: userParams.username })) {
    throw Error("username already taken");
  }
  return await new User(userParams).save();
};

exports.getAll = async () => {
  return await User.find({}).exec();
};

exports.get = async id => {
  const user = await User.findById(id)
      .populate("cases")
      .exec()
      .then(data => {
        return data;
      });
  if (!user) {
    console.log("Could not find an user for the given id!");
  }
  return user;
};

exports.getByUsername = async username => {
  const user = await User.findOne({ username: username });
  if (!user) throw new NotFoundError();

  return user;
};

exports.addFileToUser = async (id, data) => {
  await User.findOneAndUpdate({ _id: id }, { $push: { files: data._id } }).exec(
    (err, data) => {
      if (err) console.log("error: " + err);
    }
  );
  return exports.get(id).files;
};

exports.deleteFileById = async (id, fileID) => {
  await User.findOneAndUpdate({ _id: id }, { $pull: { files: fileID } }).exec(
    (err, data) => {
      if (err) console.log("error: " + err);
    }
  );
  return exports.get(id).files;
};

exports.update = async (id, updatedData) => {
  await User.findOneAndUpdate({ _id: id }, updatedData, {
    upsert: true,
    useFindAndModify: false
  });

  return exports.get(id);
};

exports.createCase = async (id, data) => {
  var newCase = await CaseDAO.create(data);
  await User.findOneAndUpdate({ _id: id }, { $push: { cases: newCase } }).exec(
    (err, data) => {
      if (err) console.log("error: " + err);
    }
  );
  return CaseDAO.get(newCase.id);
};

exports.deleteCaseById = async (id, caseID) => {
  await User.findOneAndUpdate({ _id: id }, { $pull: { cases: caseID } }).exec(
    (err, data) => {
      if (err) console.log("error: " + err);
    }
  );
  return exports.getCases(id);
};

exports.delete = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new NotFoundError();

  return user;
};

exports.deleteAll = async () => {
  await User.deleteMany();
};

exports.getCases = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError();
  }
  return usfer.cases;
};

exports.getCase = async (id, caseid) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError();
  }

  return CaseDAO.get(caseid);
};

exports.updateCase = async (id, data, caseid) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError();
  }
  return CaseDAO.update(caseid, data);
};
