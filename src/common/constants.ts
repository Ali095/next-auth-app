import { PaginationRequestOptions, PaginationOptionsResponse } from '../@types'

export const publicPages: string[] = [
	'signin',
	'signup'
]

export const defaultPaginationOptions: PaginationOptionsResponse = {
	currentPage: 0,
	hasNext: false,
	payloadSize: 0,
	skippedRecords: 0,
	totalPages: 0,
	totalRecords: 0
}

export const getDefaultPaginationRequestOptions = (options?: Partial<PaginationRequestOptions>): PaginationRequestOptions => {
	return {
		limit: options?.limit || 10,
		page: options?.page || 1,
		search: options?.search || ''
	};
}
