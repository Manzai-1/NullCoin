import Storage from "../utilities/Storage.mjs";

const errorLog = new Storage('logs', 'errorLog.txt');

export const errorLogger = async (err, req, res, next) => {
	const message = `Method: ${req.method} Url: ${
		req.originalUrl
	} Date: ${new Date().toLocaleDateString(
		'sv-SE'
	)} Time: ${new Date().toLocaleTimeString('sv-SE')} Success: ${
		err.success
	} - Message: ${err.message}\n`;

    await errorLog.appendToFile(message);
    next(err, req, res);
};
