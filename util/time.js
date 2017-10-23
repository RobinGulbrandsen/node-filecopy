module.exports.getCurrentDateTime = () => {

  const normalizeNumber = (number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

	const now = new Date();
  return {
    year: now.getFullYear(),
    month: normalizeNumber(now.getMonth() + 1),
    day: normalizeNumber(now.getDate()),
    hour: normalizeNumber(now.getHours()),
    min: normalizeNumber(now.getMinutes()),
    sec: normalizeNumber(now.getSeconds())
  };
}

module.exports.getCurrentDateString = () => {
  const dateTime = this.getCurrentDateTime();
  return dateTime.day + '-' + dateTime.month + '-' + dateTime.year;
}

module.exports.getCurrentTimeString = () => {
  const dateTime = this.getCurrentDateTime();
  return dateTime.hour + ':' + dateTime.min + ':' + dateTime.sec;
}

module.exports.getCurrentDateTimeString = () => {
  return this.getCurrentDateString() + ' ' + this.getCurrentTimeString();
}
