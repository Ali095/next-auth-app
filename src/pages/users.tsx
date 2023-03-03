
import Head from 'next/head';
import { UsersModule } from '../modules/users';

export const Users = () => {

	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="dashboard" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<UsersModule />
		</>
	);
}

export default Users
