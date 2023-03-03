import { AuthHelper } from '../common/auth'
import { fetchErrorHandler } from '../common/handlers';
import { keysToCamel } from '../common/helpers';
import { authService } from '../modules/authentication';

/**
 * Represents an API response.
 */
export type APIResponse<T> = {
	success: boolean,
	statusCode: number,
	message: string,
	data: T
}

/**
 * Represents a service for making HTTP requests to an API.
 */
export class APIService {
	private baseUrl: string;

	/**
	 * Creates a new instance of the APIService.
	 * @param baseAPIURL - The base URL of the API.
	 * @param version - The version of the API to use.
	 */
	constructor(baseAPIURL = "http://192.168.18.239:5000/api", version = "1") {
		this.baseUrl = `${baseAPIURL}/v${version}`;
	}

	/**
	 * Generates the authentication header for a request to the API.
	 * @param requestUrl - The URL of the request being made.
	 * @returns The authentication header.
	 */
	private authHeader(requestUrl: string): HeadersInit {
		// return auth header with jwt if user is logged in and request is to the api url
		const user = AuthHelper.getLoggedInUserData();
		const isLoggedIn = user && user.accessToken;
		const isApiUrl = requestUrl.startsWith(this.baseUrl);
		return (isLoggedIn && isApiUrl) ? { Authorization: `Bearer ${user.accessToken}` } : {};
	}

	/**
	 * Handles a response from the API.
	 * @param response - The response object returned from the API.
	 * @returns A promise that resolves to an APIResponse object.
	 */
	private async handleResponse(response: Response): Promise<APIResponse<any>> {
		const textResponse = await response.text();
		const data = textResponse && JSON.parse(textResponse);

		if (!response.ok) {
			if ([401].includes(response.status) && AuthHelper.isUserLoggedIn()) {
				// auto logout if 401 Unauthorized returned from api because the token is expired at backend
				authService.signout();
			}

			data.success = false;
			const error = data || response.statusText;
			return Promise.reject(error);
		}

		data.success = true;
		if (data.data?.paginate_options) {
			data.data.paginate_options = keysToCamel(data.data?.paginate_options);
		}
		return data;
	}

	/**
	 * Sends a GET request to the API.
	 * @param apiPath - The API path to send the request to.
	 * @returns A promise that resolves to an APIResponse object.
	 */
	protected async get(apiPath: string): Promise<APIResponse<any>> {
		const requestUrl: string = this.baseUrl + apiPath;
		const requestOptions: RequestInit = {
			method: 'GET',
			headers: this.authHeader(requestUrl)
		};
		const response = await fetch(requestUrl, requestOptions).catch(fetchErrorHandler);
		return this.handleResponse(response);
	}

	/**
	 * Sends a POST request to the API.
	 * @param apiPath - The API path to send the request to.
	 * @param body - The request body to send.
	 * @param credentials - The request credentials to use.
	 * @returns A promise that resolves to an APIResponse object.
	 */
	protected async post(apiPath: string, body: Record<string, any>, credentials?: RequestCredentials): Promise<APIResponse<any>> {
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

	/**
	 Sends a PUT request to the specified API path with the given request body.
	 @param {string} apiPath - The API endpoint to send the request to.
	 @param {Record<string, any>} body - The request body to include in the request.
	 @returns {Promise<APIResponse<any>>} - A Promise that resolves to an APIResponse object containing the result of the request.
	 */
	protected async put(apiPath: string, body: Record<string, any>): Promise<APIResponse<any>> {
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
