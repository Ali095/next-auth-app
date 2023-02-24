import { Checkbox } from '../../../components/Checkbox';
import { Loader } from '../../../components/Loader';
import { Status, Table, UserProfile } from '../../../components/Table';
import { UserType } from '../@types/response.types';
import { UserTableActions } from './UserTableActions';

export const UsersDataTable = ({ users = [], loading }: { users: UserType[], loading?: boolean }): JSX.Element => {
	const labels = ['#', 'Name', 'Role', 'Plan', 'Billing', 'Signup Date', 'Last Login', 'Status', 'Action'];
	//profilePicture={user.avatar}
	const renderUsers: JSX.Element[] = users.map((user, idx) => (
		<tr key={idx}>
			<td><Checkbox /></td>
			<td>{idx + 1}</td>
			<td><UserProfile profilePicture={user.avatar} name={user.name} email={user.email} /></td>
			<td>{user.role}</td>
			<td>{user.plan}</td>
			<td>{user.billing}</td>
			<td>{user.signupDate}</td>
			<td>{user.lastLogin}</td>
			<td><Status status={user.status} /></td>
			<td><UserTableActions /></td>
		</tr>
	));

	return (
		<Table labels={labels} >
			<tr>
				<td className='text-center' colSpan={labels.length + 1} >
					{loading ? <Loader /> : users.length === 0 && "No records found"}
				</td>
			</tr>
			{!loading && [...renderUsers]}
		</Table>
	)
}
