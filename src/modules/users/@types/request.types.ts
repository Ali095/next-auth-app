import { PaginationRequestOptions } from '../../../@types';

export interface UserFilterPaginationRequest extends PaginationRequestOptions {
	roleId: number;
}
