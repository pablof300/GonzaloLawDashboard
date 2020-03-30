const Admin = require("../models/Admin.js").Model;
const User = require("../models/User.js").Model;
const { NotFoundError } = require("../util/exceptions");
const mongoose = require("mongoose");

exports.create = async adminParams => {
  if (await Admin.exists({ username: adminParams.username })) {
    throw Error("username already taken");
  }

  return await new Admin(adminParams).save();
};

exports.getAll = async () => {
  return await Admin.find({}).exec(); //why exec?
};

exports.get = async id => {
  const admin = await Admin.findById(id);
  if (!admin) {
    console.log("Could not find an admin for the given id!")
  }
  return admin;
};

exports.getByUsername = async username => {
  const admin = await Admin.findOne({ username: username });
  if (!admin) throw new NotFoundError();

  return admin;
};

exports.update = async (id, updatedData) => {
  await Admin.findOneAndUpdate({ _id: id }, updatedData, {
    upsert: true,
    useFindAndModify: false
  });

  return exports.get(id);
};

exports.delete = async id => {
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) throw new NotFoundError();

  return admin;
};

exports.deleteAll = async () => {
  await Admin.deleteMany();
};

exports.removeClient = async (id, client) => {
  const admin = await Admin.findByIdAndUpdate(id,
    { $pullAll: { clients: [client] } },
    { new: true },
    function (err, data) { }
  );
  if (!admin) throw new NotFoundError();

  return admin;
};

exports.addClient = async (id, client) => {
  const user = await User.findById(client);
  if (!user) throw new NotFoundError();

  const admin = await Admin.findByIdAndUpdate(id,
    { $addToSet: { clients: [client] } },
    { new: true },
    function (err, data) { }
  );

  return admin;
};

exports.getClient = async (id, client) => {
  const admin = await Admin.findById(id);
  if (!admin) throw new NotFoundError();

  clientList = admin.clients;
  for (var i = 0; i < clientList.length; i++) { //Fix the logic
    if (clientList[i] == client) {
      const user = await User.findById(client);
      if (!user) throw new NotFoundError();

      return user;
    }
  }

  throw new NotFoundError();
};

exports.getAllClients = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) throw new NotFoundError();

  const users = await User.find({

    '_id': {
      $in: admin.clients
    }

  });


  return users;
}

/*Figure out how to implement Todos later***********

exports.addTodo = async (id, newTodo) => {
	//check if this is correct
	const admin = await Admin.findById(id);
	if (!admin) throw new NotFoundError();
	newTodoList = admin.todoList;
	newTtodoList.push(newTodo);
	const admin = await Admin.findByIdAndUpdate(id, { todoList: newTodoList });

	return admin;
};

exports.deleteTodo = async (id, numIndex) => {
	const admin = await Admin.findById(id);
	if(!admin) throw new NotFoundError();
	todoList = admin.todoList;
	todoList[numIndex] = "";
	const admin = await Admin.findByIdAndUpdate(id, { todoList: newTodoList });

	return admin;
}

exports.shiftTodo = async (id, shiftFromIndex, shiftToIndex) => {...}

*************************************************/
