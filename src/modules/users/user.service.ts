import { PaginationOptionsRequest, PaginationResponse } from '../../@types';
import { defaultPaginationOptions, defaultPaginationOptionsRequest } from '../../common/constants';
import { errorHandler } from '../../common/handlers';
import { APIService, APIResponse } from '../../services/base.api.service';
import { UserType } from './@types';

export class UserService extends APIService {
	public async getUsersList(params: PaginationOptionsRequest): Promise<PaginationResponse<UserType>> {
		const {
			page = defaultPaginationOptionsRequest.page,
			limit = defaultPaginationOptionsRequest.limit,
			search = defaultPaginationOptionsRequest.search
		} = params;

		try {
			const res: APIResponse<any> = await this.get(`/users?page=${page}&limit=${limit}&search=${search}`);

			const payload = res.data.payload.map((u: any) => ({
				id: u.id,
				name: u.first_name + " " + u.last_name,
				avatar: u.profile_picture || `https://ui-avatars.com/api/?name=${u.first_name}+${u.last_name}&size=512&background=random&font-size=0.45`,
				email: u.email,
				lastLogin: u.last_logged_in ? `${new Date(u.last_logged_in).toDateString()}, ${new Date(u.last_logged_in).toLocaleTimeString()},` : 'N/A',
				role: u?.roles[0]?.name,
				signupDate: new Date(u.created_at).toDateString(),
				status: u.status,
				billing: "Monthly",
				plan: "Basic"
			}))

			const usersPaginatedData: PaginationResponse<UserType> = {
				paginateOptions: res.data.paginate_options,
				payload
			}

			return usersPaginatedData;

		} catch (error) {
			errorHandler(error, 'Error occurred while fetching users');
			return {
				paginateOptions: defaultPaginationOptions,
				payload: []
			}
		}
	}
}

export const userService = new UserService();
export default userService;
