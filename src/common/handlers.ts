import { toast } from 'react-toastify';
import { APIResponse } from '../services/base.api.service';
import logger from './logger';

export type asyncHandlerOptions = {
	errorMessage: boolean | string,
	successMessage: boolean | string,
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const asyncHandler = async <T>(asyncFunction: Function, errorMessage: boolean | string = false, successMessage: boolean | string = false, ...functionArguments: any[]): Promise<[error: any, data: T | null]> => {
	try {
		const data: T = await asyncFunction(functionArguments);
		if (successMessage)
			toast.error(String(successMessage));
		return [null, data];
	}
	catch (error) {
		logger.custom('Async Handler', 'error', 'Error occured while executing the operation', error);
		if (errorMessage)
			toast.error(String(errorMessage));
		return [error, null];
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: any, toastErrorMessage: boolean | string = false): APIResponse<any> => {
	if (toastErrorMessage) {
		logger.custom('Error Handler', 'error', error.message);
		toast.error(String(error.message));
	} else {
		logger.custom('Error Handler', 'error', 'Error occured while executing the operation', error);
	}
	return {
		success: false,
		data: undefined,
		message: toastErrorMessage || error.message || 'Error occured while executing the operation',
		statusCode: 500
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchErrorHandler = (error: any) => {
	throw new Error('API server is down or not responding');
}
