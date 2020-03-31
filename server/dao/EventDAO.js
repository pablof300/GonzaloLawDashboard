const Event = require("../models/Event.js").Model;
const { NotFoundError } = require("../util/exceptions");

exports.getEventsByAdmin = async adminId => {
  const events = await Event.find({ admins: adminId });
  if (!events) throw new NotFoundError();

  return events;
};

exports.addEvent = async eventParams => {
  return await new Event(eventParams).save();
};

exports.getEventsByUser = async adminId => {
  const events = await Event.find({ clients: adminId });
  if (!events) throw new NotFoundError();

  return events;
};
