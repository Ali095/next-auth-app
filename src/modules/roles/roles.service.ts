import { PaginationRequestOptions, PaginationResponse } from '../../@types';
import { defaultPaginationOptions, getDefaultPaginationRequestOptions } from '../../common/constants';
import { errorHandler } from '../../common/handlers';
import { APIService, APIResponse } from '../../services/base.api.service';
import userService from '../users/user.service';
import { RolesAPIResponse } from './@types';

export class RoleService extends APIService {
	private limitPermissionstoCardView = (permissions: any[], limit = 5) => {
		const limitedPermissions: any[] = permissions.slice(0, limit).map((p: any) => p.slug);
		if (permissions.length > limit)
			limitedPermissions.push(`and ${permissions.length - limit} more...`);

		return limitedPermissions;
	}

	public async getAllRoles(params: Partial<PaginationRequestOptions>): Promise<PaginationResponse<RolesAPIResponse>> {
		const { page, limit, search } = getDefaultPaginationRequestOptions(params);

		try {
			const res: APIResponse<any> = await this.get(`/access/roles?page=${page}&limit=${limit}&search=${search}`);

			const payload: RolesAPIResponse[] = res.data.payload.map((r: any) => ({
				id: r.id,
				roleName: r.name,
				usersCount: r.user_count,
				permissions: this.limitPermissionstoCardView(r.permissions)
			}));

			const rolesPaginatedData: PaginationResponse<RolesAPIResponse> = {
				paginateOptions: res.data.paginate_options,
				payload
			};

			return rolesPaginatedData;

		} catch (error) {
			errorHandler(error, 'Error occurred while fetching roles');
			return {
				paginateOptions: defaultPaginationOptions,
				payload: []
			}
		}
	}

	public async createRole(roleData: { name: string; permissions: number[] }): Promise<string> {
		try {
			await this.post('/access/roles', { ...roleData });
			return 'Role created successfully';
		} catch (error) {
			errorHandler(error, 'Error occurred while creating role');
			return 'Error occured while creating role';
		}
	}

	public async updateRole(id: number, roleData: { name: string; permissions: number[] }): Promise<string> {
		try {
			await this.put(`/access/roles/${id}`, { ...roleData });
			return 'Role updated successfully'
		} catch (error) {
			errorHandler(error, 'Error occurred while updating role');
			return 'Error occured while updating role';
		}
	}

	public async getUserofSpecificRole(id: number, page = 1, limit = 10) {
		return userService.getUsersList({ page, roleId: id, limit });
	}

	public async removeUserFromRole({ userId, roleId }: { userId: number, roleId: number }): Promise<string> {
		try {
			// await this.get(`/access/roles/${id}`);
			return 'Role updated successfully'
		} catch (error) {
			errorHandler(error, 'Error occurred while updating role');
			return 'Error occured while updating role';
		}
	}

}

export const roleService = new RoleService();
export default roleService;
