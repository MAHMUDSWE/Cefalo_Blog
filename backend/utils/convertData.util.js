const js2xmlparser = require("js2xmlparser").parse;

const convertToCsv = require("json2csv").parse;

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
                spaces: 4,
                attributesKey: null,
                textKey: '_value',
            };
            result = js2xmlparser('root', data, options);
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
