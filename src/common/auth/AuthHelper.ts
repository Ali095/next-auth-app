import logger from '../logger';

interface IUserData {
	id: number,
	company: string;
	firstName: string;
	lastName: string;
	permissions: string[];
	roles: string[];
	profilePicture: string;
	timezone: string;
}

export interface UserAuthData {
	accessToken: string;
	accessTokenExpires: string;
	refreshToken: string;
	user: IUserData
}

export class AuthHelper {
	private static getdecrypteduserData(userData?: any): UserAuthData {
		return {
			accessToken: userData?.access_token || "",
			accessTokenExpires: userData?.access_token_expires || "",
			refreshToken: userData?.refresh_token || "",
			user: {
				id: userData?.user?.id || 0,
				firstName: userData?.user?.first_name || "",
				lastName: userData?.user?.last_name || "",
				company: userData?.user?.company || "",
				roles: userData?.user?.roles || [],
				permissions: userData?.user?.permissions || [],
				profilePicture: userData?.user?.profile_picture || "",
				timezone: userData?.user?.timezone || ""
			}
		}
	}

	private static decryptUser(user: string | null): UserAuthData {
		try {
			if (typeof user !== "string") throw new Error("No logged in user Found");
			const userData = JSON.parse(user)
			return this.getdecrypteduserData(userData);
		} catch (error) {
			return this.getdecrypteduserData();
		}
	}

	private static getUserFromStorage(): string | null {
		if (typeof window !== undefined) {
			return localStorage.getItem('user');
		}
		logger.loading("Waiting for window to load at cleint side");
		return null;
	}

	public static getLoggedInUserData(): UserAuthData {
		return this.decryptUser(this.getUserFromStorage());
	}

	public static isUserLoggedIn(): boolean {
		const user = this.decryptUser(this.getUserFromStorage());
		return user.accessToken.length > 0;
	}
}
