const { HttpError, StatusCode } = require("../utils/commonObject.util");

function contentNegotiation(req, res, next) {

    const acceptedTypes = req.accepts();
    const defaultType = 'application/json';

    if (acceptedTypes[0] === '*/*' || acceptedTypes.includes(defaultType)) {
        req.requestedFormat = 'json';
        res.setHeader('Content-Type', defaultType);
        next();
    }
    else {
        const acceptedType = acceptedTypes.find(type => type !== '*/*');

        if (acceptedType) {
            const requestedFormat = acceptedType.split('/')[1];
            req.requestedFormat = requestedFormat;
            res.setHeader('Content-Type', acceptedType);
        }
        next();
    }
}

module.exports = contentNegotiation;
