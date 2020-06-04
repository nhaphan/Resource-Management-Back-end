const moment = require('moment');
const { DATE_HANDLE_DIFF, VALUE_SATURDAY, VALUE_SUNDAY } = require('../helpers/constant');

exports.getTypeInMongo = (schema) => schema.collection.collectionName.slice(0, -1);
exports.isEmpty = (value) => (
  value === undefined ||
          value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
);
exports.capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

exports.removeKeyUndefined = (obj) => Object.keys(obj).forEach(key => (obj[key] === undefined ?
  // eslint-disable-next-line no-param-reassign
  delete obj[key] : {}));
exports.getNumberOfDay = (start, end) => {
  const startMoment = moment(start);
  const endMoment = moment(end);
  return endMoment.diff(startMoment, DATE_HANDLE_DIFF) + 1;
};
exports.getBusinessDatesCount = (start, end) => {
  const startDate = moment(start);
  const endDate = moment(end);
  const day = moment(startDate);
  let businessDays = 0;

  while (day.isSameOrBefore(endDate, DATE_HANDLE_DIFF)) {
    if (day.day() !== VALUE_SUNDAY && day.day() !== VALUE_SATURDAY) {
      businessDays += 1;
    }
    day.add(1, DATE_HANDLE_DIFF);
  }
  return businessDays;
};
