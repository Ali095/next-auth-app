import { PaginationResponse } from '../../@types';
import { defaultPaginationOptions, getDefaultPaginationRequestOptions } from '../../common/constants';
import { errorHandler } from '../../common/handlers';
import { APIService, APIResponse } from '../../services/base.api.service';
import { authService } from '../authentication';
import { IUserCreation } from '../authentication/@types';
import { UserType, UserFilterPaginationRequest, UserDetails, emptyUserDetails } from './@types';

export class UserService extends APIService {
	public async getUsersList(params: Partial<UserFilterPaginationRequest>): Promise<PaginationResponse<UserType>> {
		const { page, limit, search } = getDefaultPaginationRequestOptions(params);

		const { roleId } = params;

		try {
			let url = `/users?page=${page}&limit=${limit}`;
			url += search ? `&search=${search}` : '';
			url += roleId ? `&role_id=${roleId}` : '';

			const res: APIResponse<any> = await this.get(url);

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

	public async getUsersDetails(userId: number): Promise<UserDetails> {
		try {

			const res: APIResponse<any> = await this.get(`/users/${userId}`);

			const payload: UserDetails = {
				id: res.data.id,
				firstName: res.data.first_name + " " + res.data.last_name,
				profilePicture: res.data.profile_picture || `https://ui-avatars.com/api/?name=${res.data.first_name}+${res.data.last_name}&size=512&background=random&font-size=0.45`,
				email: res.data.email,
				lastLogin: res.data.last_logged_in ? `${new Date(res.data.last_logged_in).toDateString()}, ${new Date(res.data.last_logged_in).toLocaleTimeString()},` : 'N/A',
				role: { label: res.data?.roles[0]?.name, value: res.data?.roles[0]?.id },
				signupDate: new Date(res.data.created_at).toDateString(),
				status: res.data.status,
				company: res.data.company,
				emailVerified: res.data.email_verified,
				lastName: res.data.last_name,
				permissions: res.data.permissions?.map((p: { slug: string, description: string }) => p.slug),
				timeZone: res.data.timezone,
				updatedAt: res.data.updated_at ? `${new Date(res.data.updated_at).toDateString()}, ${new Date(res.data.updated_at).toLocaleTimeString()},` : 'N/A',
				username: res.data.username
			};

			return payload;

		} catch (error) {
			errorHandler(error, 'Error occurred while fetching users');
			return emptyUserDetails;
		}
	}

	public async addNewUser(userData: IUserCreation) {
		return authService.signup(userData.email, userData.password, { ...userData }).catch(e => errorHandler(e, 'Error occurred while creating new user'));
	}

	public async updateUser(userId: number, userData: Partial<IUserCreation>) {
		return this.put(`/users/${userId}`, { ...userData }).catch(e => errorHandler(e, 'Error occurred while updating user'));
	}
}

export const userService = new UserService();
export default userService;
