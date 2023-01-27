import { getUserAuthentication } from '../lib/auth-validator'


export type APIResponse = {
	statusCode: number,
	message: string,
	data: any
}

export class APIService {
	private baseUrl: string;
	constructor(baseAPIURL?: string) {
		this.baseUrl = baseAPIURL || 'http://localhost:5000/api';
	}

	private authHeader(requestUrl: string): HeadersInit {
		// return auth header with jwt if user is logged in and request is to the api url
		const user = getUserAuthentication();
		const isLoggedIn = user && user.token;
		const isApiUrl = requestUrl.startsWith(this.baseUrl);
		return (isLoggedIn && isApiUrl) ? { Authorization: `Bearer ${user.token}` } : {};
	}

	private async handleResponse(response: Response): Promise<APIResponse> {
		const textResponse = await response.text();
		const data = textResponse && JSON.parse(textResponse);

		if (!response.ok) {
			if ([401].includes(response.status) && getUserAuthentication()?.token) {
				// auto logout if 401 Unauthorized returned from api because the token is expired at backend
				// userService.logout();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	}

	public async get(apiPath: string): Promise<APIResponse> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'GET',
			headers: this.authHeader(requestUrl)
		};
		const response = await fetch(requestUrl, requestOptions);
		return this.handleResponse(response);
	}

	async post(apiPath: string, body: Record<string, any>, credentials?: RequestCredentials): Promise<APIResponse> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...this.authHeader(requestUrl) },
			credentials: credentials || 'include',
			body: JSON.stringify(body)
		};
		const response = await fetch(requestUrl, requestOptions);
		return this.handleResponse(response);
	}

	async put(apiPath: string, body: Record<string, any>): Promise<APIResponse> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...this.authHeader(requestUrl) },
			body: JSON.stringify(body)
		};
		const response = await fetch(requestUrl, requestOptions);
		return this.handleResponse(response);
	}
}

export const apiService = new APIService();
export default apiService;
