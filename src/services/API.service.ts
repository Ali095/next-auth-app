import { AuthHelper } from '../lib/AuthHelper'
import { fetchErrorHandler } from '../lib/handlers';


export type APIResponse = {
	success: boolean,
	statusCode: number,
	message: string,
	data: any
}

export class APIService {
	private baseUrl: string;
	constructor(baseAPIURL = "http://localhost:5000/api", version = "1") {
		this.baseUrl = `${baseAPIURL}/v${version}`;
	}

	private authHeader(requestUrl: string): HeadersInit {
		// return auth header with jwt if user is logged in and request is to the api url
		const user = AuthHelper.getLoggedInUserData();
		const isLoggedIn = user && user.accessToken;
		const isApiUrl = requestUrl.startsWith(this.baseUrl);
		return (isLoggedIn && isApiUrl) ? { Authorization: `Bearer ${user.accessToken}` } : {};
	}

	private async handleResponse(response: Response): Promise<APIResponse> {
		const textResponse = await response.text();
		const data = textResponse && JSON.parse(textResponse);

		if (!response.ok) {
			if ([401].includes(response.status) && AuthHelper.isUserLoggedIn()) {
				// auto logout if 401 Unauthorized returned from api because the token is expired at backend
				// userService.logout();
			}

			data.success = false;
			const error = data || response.statusText;
			return Promise.reject(error);
		}

		data.success = true;
		return data;
	}

	public async get(apiPath: string): Promise<APIResponse> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'GET',
			headers: this.authHeader(requestUrl)
		};
		const response = await fetch(requestUrl, requestOptions).catch(fetchErrorHandler);
		return this.handleResponse(response);
	}

	async post(apiPath: string, body: Record<string, any>, credentials?: RequestCredentials): Promise<APIResponse | any> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...this.authHeader(requestUrl) },
			credentials: credentials || 'include',
			body: JSON.stringify(body)
		};
		const response = await fetch(requestUrl, requestOptions).catch(fetchErrorHandler);
		return this.handleResponse(response);
	}

	async put(apiPath: string, body: Record<string, any>): Promise<APIResponse> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...this.authHeader(requestUrl) },
			body: JSON.stringify(body)
		};
		const response = await fetch(requestUrl, requestOptions).catch(fetchErrorHandler);
		return this.handleResponse(response);
	}
}

export const apiService = new APIService();
export default apiService;
