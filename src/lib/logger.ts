export type customLoggerType = 'log' | 'error' | 'info' | 'debug' | 'trace' | 'warn';
export const logger = {
	log: (message: string, ...params: any[]) => console.log(`${new Date().toLocaleString()}\t [Info] ${message}`, params),
	error: (message: string, ...params: any[]) => console.error(`${new Date().toLocaleString()}\t [Error] ${message}`, params),
	ApiError: (message: string, ...params: any[]) => console.error(`${new Date().toLocaleString()}\t [API Error] ${message}`, params),
	info: (message: string, ...params: any[]) => console.info(`${new Date().toLocaleString()}\t [Info] ${message}`, params),
	debug: (message: string, ...params: any[]) => console.debug(`${new Date().toLocaleString()}\t [Debug] ${message}`, params),
	loading: (message: string, ...params: any[]) => console.log(`${new Date().toLocaleString()}\t [Loading] ${message}`, params),
	custom: (loggerName: string, loggerType: customLoggerType, message: string, ...params: any[]) => console[loggerType](`${new Date().toLocaleString()}\t [${loggerName}] ${message}`, params)
}

export default logger;
