import AppConfig from '../configs/AppConfig';
import Moment from '../utils/Moment';
import Logger from '../utils/Logger';

/*
|--------------------------------------------------------------------------
| Unexpected Request From Node Engine
|--------------------------------------------------------------------------
*/
const exceptedPath = [
	"/contentDocumentStart.js"
]

export default (req, res, next) => {
	// Tracking request data
	if (AppConfig.LOGGER_ENABLE_TRACKING && exceptedPath.indexOf(req.url) === -1 && process.env.NODE_ENV !== "test") {
		const objLogger = {
			level: "info",
			label: "REQUEST_TRACKING",
			message: {
				time: Moment.format(),
				path: req.url,
				header: req.headers,
				body: req.body,
				method: req.method,
				response: null,
				ip: req.ip
			}
		}

		// Tracking response data
		if (AppConfig.LOGGER_ENABLE_TRACKING_RESPONSE) {
			// Parse Response body
			const { write, end } = res
			const chunks = []

			res.write = function newWrite(chunk) {
				chunks.push(chunk)
				write.apply(res, arguments)
			}

			res.end = function newEnd(chunk) {
				if (chunk) { chunks.push(chunk) }
				end.apply(res, arguments)
			}
			// Write log when request finish
			res.once("finish", () => {
				objLogger.message.response = {
					statusCode: res.statusCode,
					statusMessage: res.statusMessage,
				}

				try {
					objLogger.message.response.body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
				} catch {
					objLogger.message.response.body = Buffer.concat(chunks).toString("utf8")
				}

				Logger.log(objLogger)
			})
		} else {
			Logger.log(objLogger)
		}
	}
	next()
}
