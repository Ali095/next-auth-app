export interface RolesAPIResponse {
	id: number;
	roleName: string;
	usersCount: number;
	permissions: string[];
}

export interface RolesList {
	value: number;
	label: string;
}
