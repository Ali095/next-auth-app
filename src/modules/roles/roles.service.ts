import { PaginationRequestOptions, PaginationResponse } from '../../@types';
import { defaultPaginationOptions, getDefaultPaginationRequestOptions } from '../../common/constants';
import { errorHandler } from '../../common/handlers';
import { APIService, APIResponse } from '../../services/base.api.service';
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
				usersCount: 50,
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

	public async createRole(roleData: { name: string; permissions: number[] }): Promise<APIResponse<any>> {
		return this.post('/access/roles', { ...roleData });
	}

	public async updateRole(id: number, roleData: { name: string; permissions: number[] }): Promise<APIResponse<any>> {
		return this.put(`/access/roles/${id}`, { ...roleData });
	}
}

export const roleService = new RoleService();
export default roleService;
