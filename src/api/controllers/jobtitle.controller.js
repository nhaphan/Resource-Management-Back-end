const httpStatus = require('http-status');

const jobService = require('../../services/jobtitle.service');

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs();
    return res.status(httpStatus.OK).json({ jobs });
  } catch (err) {
    return next(err);
  }
};

exports.getJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await jobService.getJobById(jobId);
    return res.status(httpStatus.OK).json({ job });
  } catch (err) {
    return next(err);
  }
};

exports.addJob = async (req, res, next) => {
  try {
    const job = req.body;
    const newJob = await jobService.createJob(job);
    return res.status(httpStatus.OK).json({ message: 'Adding job is OK', job: newJob });
  } catch (err) {
    return next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    await jobService.updateJob(jobId, req.body);
    return res
      .status(httpStatus.OK)
      .json({ message: `Update job is OK with job id: ${jobId}` });
  } catch (err) {
    return next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    await jobService.deleteJob(jobId);
    return res
      .status(httpStatus.OK)
      .json({ message: ` Delete OK with job id: ${jobId}` });
  } catch (err) {
    return next(err);
  }
};
