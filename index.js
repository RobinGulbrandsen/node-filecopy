const fs = require('fs-extra');

const FOLDER_FROM = './files_from/';
const FOLDER_TO = './files_to/';

const {getCurrentDateTime,
       getCurrentDateString,
       getCurrentTimeString,
       getCurrentDateTimeString} = require('./util/time.js');

let lastExecutedAt;

const log = (message) => {
  fs.appendFileSync('./logs/' + getCurrentDateString(),
                    getCurrentDateTimeString() + ': ' + message + '\n');
}

const readDirectory = () => {
  return fs.readdirSync(FOLDER_FROM);
}

const fileHasBeenCopied = (filename) => {
  try {
    fs.readFileSync(FOLDER_TO + filename);
    return true;
  } catch (error) {
    return false;
  }
}

const copyFile = (filename) => {
  fs.copy(FOLDER_FROM + filename, FOLDER_TO + filename, (error) => {
    if (error) {
      log('feil ved kopiering av ' + filename + ': \n' + error);
    }
  });
}

const copyJob = () => {
  log('+---------------------------+');
  log('| Starter Ny Kopieringsjobb |');
  log('+---------------------------+');

	const files = readDirectory();
	for (let i = 0; i < files.length; i++) {
  	const filename = files[i];

    if (!fileHasBeenCopied(filename)) {
      log('Kopierer ' + filename);
      copyFile(filename);
    }
  }
}

const sleep = () => {

  const currentDateTime = getCurrentDateTime();
  if (lastExecutedAt.hour !== currentDateTime.hour && currentDateTime.min > 30) {
    copyJob();
    lastExecutedAt = currentDateTime;  
  }
}

log('Applikasjon startet opp');
copyJob();
lastExecutedAt = getCurrentDateTime();

const SECOND = 1000;
const MINUTE = SECOND * 60;
setInterval(sleep, 5 * MINUTE);
















