const Repository = require('./entity');
const Job = require('../models/jobtitle');

const jobEntity = new Repository(Job);

const create = async (job) => {
  const newJob = await jobEntity.create(job);
  return newJob;
};
const get = async (id) => {
  const job = await jobEntity.find({ _id: id });
  return job;
};
const list = async () => {
  const jobs = await jobEntity.find();
  return jobs;
};
const remove = async (id) => {
  const job = await jobEntity.remove({ _id: id });
  return job;
};
const update = async (jobId, job) => {
  const updatedBooking = await jobEntity.update({ _id: jobId }, job);
  return updatedBooking;
};

module.exports = {
  create,
  remove,
  get,
  list,
  update
};
