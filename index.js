const fs = require('fs-extra');

const FOLDER_FROM = './files_from/';
const FOLDER_TO = './files_to/';

let timeStartedAt;
let lastExecutedAt;

// UTIL - TIME
const getCurrentDateTime = () => {

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

const getCurrentDateString = () => {
  const dateTime = getCurrentDateTime();
  return dateTime.day + '-' + dateTime.month + '-' + dateTime.year;
}

const getCurrentTimeString = () => {
  const dateTime = getCurrentDateTime();
  return dateTime.hour + ':' + dateTime.hour + ':' + dateTime.sec;
}

const getCurrentDateTimeString = () => {
  return getCurrentDateString() + ' ' + getCurrentTimeString();
}

const getModifiedTime = (filename) => {
	return fs.statSync(FOLDER_FROM + filename).mtime;
}

// UTIL - FS

const log = (message) => {
  fs.appendFileSync('./logs/' + getCurrentDateString(),
                    getCurrentDateTimeString() + ': ' + message + '\n');
}

const readDirectory = () => {
  return fs.readdirSync(FOLDER_FROM);
}

const fileHasBeenCopied = (filename) => {
  try {
    fs.readFileSync(FOLDER_FROM + filename);
    return true;
  } catch (error) {
    return false;
  }
}
const copyFile = (filename) => {
  fs.copy(FOLDER_FROM + filename, FOLDER_TO + filename, (error) => {
    if (error) {
      log('feil ved kopiering: \n' + error);
    } else {
      addFileToCopiedFilesList(filename);    
    }
  });
}


// PROGRAM
const hasBeenCopied = (filename) => {
  for (let i = 0; i < processedFiles.length; i++) {
    if (processedFiles[i] === filename) {
      return true;
    }
  }
  return false;
}

const copyJob = () => {
  log('+---------------------------+');
  log('| Starter Ny Kopieringsjobb |');
  log('+---------------------------+');

	const files = readDirectory();
  console.log(files);
	for (let i = 0; i < files.length; i++) {
  	const filename = files[i];

    if (!fileHasBeenCopied(filename)) {
      log('kopierer over ' + filename);
      copyFile(filename);
      log('kopiering fullført for ' + filename);
    }
  }
}

const sleep = () => {

  const currentDateTime = getCurrentDateTime();
  if (timeStartedAt.min < currentDateTime.min) {
    copyJob();
    lastExecutedAt = currentDateTime;
  } else {
    console.log('sover',
                timeStartedAt.hour + '-' + timeStartedAt.min + '-' + timeStartedAt.sec,
                currentDateTime.hour + '-' + timeStartedAt.min + '-' + timeStartedAt.sec);
  }
}

log('Applikasjon startet opp');
copyJob();
timeStartedAt = getCurrentDateTime();
setInterval(sleep, 10000);
















