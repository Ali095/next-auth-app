import { errorHandler } from '../../common/handlers';
import { APIService, APIResponse } from '../../services/base.api.service';
import { ResourcePermissions } from './@types';

export class PermissionService extends APIService {

	public async getPermissionsOfSpecificResource(resourceName: string): Promise<ResourcePermissions[]> {

		try {
			const res: APIResponse<any> = await this.get(`/access/permissions?page=${1}&limit=${20}&search=${resourceName}`);

			const payload: ResourcePermissions[] = res.data.payload.map((p: any) => ({
				id: p.id,
				slug: p.slug,
				description: p.description
			}));

			return payload;

		} catch (error) {
			errorHandler(error, 'Error occurred while fetching roles');
			return [];
		}
	}
}

export const permissionService = new PermissionService();
export default permissionService;
