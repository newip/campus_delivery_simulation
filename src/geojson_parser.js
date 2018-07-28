'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const log4js = require('log4js');

const logger = log4js.getLogger();

const datafile = '../data/map.geojson';
const logfile = '../log/parser_output.log';

// Part 1. Get data from geojson file and setup logfile.
// Remove the logfile if it exist.
try {
    fs.unlinkSync(logfile);
    logger.info('successfully deleted ' + logfile);
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

// Print the basic information about geojson file.
fs.stat(datafile, function (err, stat) {
    if (err) {
        logger.error(err);
    } else {
        // 是否是文件:
        logger.info('isFile: ' + stat.isFile());
        // 是否是目录:
        logger.info('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            logger.info('size: ' + stat.size);
            // 创建时间, Date对象:
            logger.info('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            logger.info('modified time: ' + stat.mtime);
        }
    }
});

// Read data from geojson file.
// fs.readFileSync(datafile, 'utf-8', function(err, data) {
//     if (err) {
//         logger.info(err);
//     } else {
//         let geodata = toString(data);
//         logger.info(data);
//         logger.info(data.length + ' bytes');
//     }
// });

// Another way to Read data from geojson file.
// (async() =>  {
//     try {
//         const result = await readFile(datafile, 'utf8');
//         logger.info(result);
//         logger.info(result.length + ' bytes');
// } catch(err) {
//         logger.error(err);
//     }
//  })();

var result = fs.readFileSync(datafile, 'utf8'); // This will block the event loop, not recommended for non-cli programs.
console.log('result read: ' + result);



// Part 2. Parse the data to get all the longitude and latitude.
// Parse the data object.
