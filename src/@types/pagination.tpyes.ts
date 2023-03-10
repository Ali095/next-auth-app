export type PaginationOptionsResponse = {
	currentPage: number;
	skippedRecords: number;
	totalPages: number;
	hasNext: boolean;
	payloadSize: number;
	totalRecords: number;
}

export type PaginationResponse<T> = {
	payload: T[];
	paginateOptions: PaginationOptionsResponse;
}

export type PaginationRequestOptions = {
	page: number;
	limit: number;
	search: string;
}
