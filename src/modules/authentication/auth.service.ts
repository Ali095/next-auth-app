import Router from "next/router";
import { APIService, APIResponse } from '../../services/base.api.service';
import { IUserCreation } from './@types';

export class AuthService extends APIService {
	public async signup(email: string, password: string, userData?: Partial<IUserCreation>): Promise<APIResponse<any>> {
		const res: APIResponse<any> = await this.post('/auth/signup', { email, password, ...userData });
		localStorage.setItem("user", JSON.stringify(res.data));

		return res;
	}

	public async signin(email: string, password: string): Promise<APIResponse<any>> {
		const res: APIResponse<any> = await this.post('/auth/signin', { email, password });
		localStorage.setItem("user", JSON.stringify(res.data));

		return res;
	}

	public signout(): void {
		localStorage.clear();
		Router.push("/signin");
	}
}

export const authService = new AuthService();
export default authService;
