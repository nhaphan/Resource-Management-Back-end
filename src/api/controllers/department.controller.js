const httpStatus = require('http-status');

const departmentService = require('../../services/department.service');

exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getDepartments();
    return res.status(httpStatus.OK).json({ departments });
  } catch (err) {
    return next(err);
  }
};

exports.getDepartment = async (req, res, next) => {
  const { departmentId } = req.params;
  try {
    const department = await departmentService.getDepartmentById(departmentId);
    return res.status(httpStatus.OK).json({ department });
  } catch (err) {
    return next(err);
  }
};

exports.addDepartment = async (req, res, next) => {
  try {
    const department = req.body;
    const newDepartment = await departmentService.createDepartment(department);
    return res.status(httpStatus.OK).json({ message: 'Adding department is OK', department: newDepartment });
  } catch (err) {
    return next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    await departmentService.updateDepartment(departmentId, req.body);
    return res
      .status(httpStatus.OK)
      .json({ message: `Update department is OK with department id: ${departmentId}` });
  } catch (err) {
    return next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;

    await departmentService.deleteDepartment(departmentId);
    return res
      .status(httpStatus.OK)
      .json({ message: ` Delete OK with department id: ${departmentId}` });
  } catch (err) {
    return next(err);
  }
};
