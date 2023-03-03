export interface IUserCreation {
	first_name: string;
	last_name: string;
	timezone?: string;
	company?: string;
	permissions?: number[];
	roles: number[];
	username?: string;
	email: string;
	password: string;
}
