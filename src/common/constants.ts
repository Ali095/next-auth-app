import { PaginationOptionsRequest, PaginationOptionsResponse } from '../@types'

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

export const defaultPaginationOptionsRequest: PaginationOptionsRequest = {
	limit: 10,
	page: 1,
	search: ''
}
