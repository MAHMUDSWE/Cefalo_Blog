const convertData = require('../../../utils/convertData.util');
const js2xmlparser = require("js2xmlparser").parse;
const convertToCsv = require("json2csv").parse;
const { HttpError, StatusCode } = require('../../../utils/commonObject.util');

describe('convertData utility function', () => {
    it('should convert data to JSON format', () => {
        const data = { message: 'Hello, World!' };
        const format = 'json';
        const expected = JSON.stringify(data);

        const result = convertData(data, format);

        expect(result).toEqual(expected);
    });

    it('should convert data to XML format', () => {
        const data = { message: 'Hello, World!' };
        const format = 'xml';
        const expected = js2xmlparser('root', data, {
            compact: true,
            ignoreComment: true,
            spaces: 4,
            attributesKey: null,
            textKey: '_value',
        });

        const result = convertData(data, format);

        expect(result).toEqual(expected);
    });

    it('should convert data to CSV format', () => {
        const data = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
        const format = 'csv';
        const expected = convertToCsv(data);

        const result = convertData(data, format);

        expect(result).toEqual(expected);
    });

    it('should return data as-is if format is unsupported', () => {
        const data = { message: 'Hello, World!' };
        const format = 'unsupported';
        const expected = data;

        const result = convertData(data, format);

        expect(result).toEqual(expected);
    });
});
