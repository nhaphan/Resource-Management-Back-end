/* eslint-disable no-underscore-dangle */
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { isEmpty } = require('../helpers/util');

const JobRepository = require('../repository/job.repository');

exports.getJobs = async () => {
  const jobs = await JobRepository.list();
  return jobs;
};
exports.getJobById = async jobId => {
  const job = await JobRepository.get(jobId);
  if (isEmpty(job)) {
    throw new NotFoundError(`NotFound: Job with id ${jobId}`, jobId);
  }
  return job;
};

exports.deleteJob = async jobId => {
  const job = await JobRepository.remove(jobId);
  if (isEmpty(job)) {
    throw new NotFoundError(`NotFound: Job with id ${jobId}`, jobId);
  }
  return job;
};
exports.updateJob = async (jobId, job) => {
  const updatedJob = await JobRepository.update(jobId, job);
  if (isEmpty(job)) {
    throw new NotFoundError(`NotFound: Job with id ${jobId}`, jobId);
  }
  return updatedJob;
};
exports.createJob = async (job) => {
  const newJob = await JobRepository.create(job);
  return newJob;
};
