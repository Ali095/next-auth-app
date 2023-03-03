export type UserType = {
	id: number;
	name: string;
	avatar: string;
	email: string;
	role: string;
	plan: string;
	billing: string;
	signupDate: string;
	lastLogin: string;
	status: string;
}

export type UserDetails = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	status: string;
	username: string;
	signupDate: string;
	updatedAt: string;
	company: string;
	timeZone: string;
	profilePicture: string;
	lastLogin: string;
	role: { value: number, label: string };
	permissions: string[]
}

export const emptyUserDetails: UserDetails = {
	id: -1,
	firstName: '',
	lastName: '',
	email: '',
	emailVerified: false,
	status: '',
	username: '',
	signupDate: '',
	updatedAt: '',
	company: '',
	timeZone: '',
	profilePicture: '',
	lastLogin: '',
	role: { value: 0, label: 'Please Select' },
	permissions: []
}

// export type UserResponseDto = {

// 	id: number;


// 	firstName: string;


// 	lastName: string;


// 	email: string;


// 	username: string;


// 	status: string;


// 	emailVerified: boolean;


// 	timezone: string;


// 	company: string;


// 	roles?: RoleDto[];

// 	permissions?: PermissionDto[];

// 	profilePicture?: string;


// 	lastLoggedIn?: string;
// }
