const { js2xml } = require('xml-js');
const js2xmlparser = require("js2xmlparser");

const { parse: convertToCsv } = require("json2csv");

const { HttpError, StatusCode } = require('./commonObject.util');

function convertData(data, format) {

    let result;
    switch (format) {
        case 'json':
            result = JSON.stringify(data);
            break;
        case 'xml':
            const options = {
                compact: true,
                ignoreComment: true,
                spaces: 4
            };
            result = js2xml(data, options)
            break;
        case 'csv':
            result = convertToCsv(data);
            break;
        default:
            result = null;
            throw new HttpError(StatusCode.NOT_ACCEPTABLE, "Unsupported format");
    }
    return result;
}

module.exports = convertData;
