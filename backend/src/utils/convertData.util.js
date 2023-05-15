/**
 * Utility functions for the application.
 * @module Utils
 */

const js2xmlparser = require("js2xmlparser").parse;

const convertToCsv = require("json2csv").parse;

const { HttpError, StatusCode } = require('./commonObject.util');


/**
 * Converts data to the specified format
 *
 * @param {any} data - The data to be converted
 * @param {string} format - The format to convert the data to (json, xml, or csv)
 * @returns {string} The data in the specified format
 * @throws {HttpError} Throws an error if the specified format is not supported
 */

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
