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

exports.getEventsByUser = async userId => {
  const events = await Event.find({ users: userId });
  console.log("Found events")
  console.log(events)
  if (!events) throw new NotFoundError();

  return events;
};
