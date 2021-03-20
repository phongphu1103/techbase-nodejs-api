import "./environments/LoadEnv"

const AppConfig = {
	API_SERVER_PORT						: process.env.API_SERVER_PORT || 8080,
	LOCALE								: process.env.LOCALE || "vi_VN",
	TIME_ZONE							: process.env.TIME_ZONE || "Asia/Ho_Chi_Minh",

	// Logger Variable
	LOGGER_ENABLE_TRACKING				: JSON.parse(process.env.LOGGER_ENABLE_TRACKING || true),
	LOGGER_ENABLE_TRACKING_RESPONSE		: JSON.parse(process.env.LOGGER_ENABLE_TRACKING_RESPONSE || false),
	LOGGER_FILE_MAX_SIZE				: process.env.LOGGER_FILE_MAX_SIZE || 2097152,
	LOGGER_FILE_MAX_FILES				: process.env.LOGGER_FILE_MAX_FILES || 10,
}

export default AppConfig
