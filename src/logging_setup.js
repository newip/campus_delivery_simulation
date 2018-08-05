const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const log4js = require('log4js');

const logger = log4js.getLogger();

const logfile = '../log/logger_output.log';

// Part 1. Get data from geojson file and setup logfile.
// Remove the logfile if it exist.
try {
    fs.unlinkSync(logfile);
    setTimeout(function(){
        logger.info('successfully deleted ' + logfile);
    }, 2);
  } catch (err) {
    logger.error(err);
  }

// Config the log4js
log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: logfile,
            layout: {
                type: 'pattern',
                pattern: '%r %p - %m',
            }
        }
    },
    categories: {
        default: {
            appenders: ['file'],
            level: 'debug'
        }
    }
})

module.exports = logger;
// Print the basic information about geojson file.
// fs.stat(datafile, function (err, stat) {
//     if (err) {
//         logger.error(err);
//     } else {
//         // 是否是文件:
//         logger.info('isFile: ' + stat.isFile());
//         // 是否是目录:
//         logger.info('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             // 文件大小:
//             logger.info('size: ' + stat.size);
//             // 创建时间, Date对象:
//             logger.info('birth time: ' + stat.birthtime);
//             // 修改时间, Date对象:
//             logger.info('modified time: ' + stat.mtime);
//         }
//     }
// });
