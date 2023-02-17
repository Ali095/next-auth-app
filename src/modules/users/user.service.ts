import Router from "next/router";
import { APIService, APIResponse } from '../../services/base.api.service';

export class UserService extends APIService {
	public async getUsersList(): Promise<APIResponse> {
		const res: APIResponse = await this.get('/users');
		console.log(res);

		return res;
	}
}

export const authService = new UserService();
export default authService;
