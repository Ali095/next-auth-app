// import { BehaviorSubject } from "rxjs";

import logger from './logger';

export interface userAuthentication {
	token: string,
	userId: string,
	role?: string,
	permissions?: any[]
}

const parseUser = (user: string | null): userAuthentication | undefined => {
	if (typeof user === "string")
		return JSON.parse(user)
	return undefined;
}

export const getUserAuthentication = (): userAuthentication | undefined => {
	if (typeof window !== undefined) {
		const userData = parseUser(localStorage.getItem('user'));
		// const userSubject: BehaviorSubject<userAuthentication> = new BehaviorSubject(userData);
		return userData
	}
	logger.loading(`Waiting for window to load at cleint side`);
	return undefined;
};
