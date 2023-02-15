
import Head from 'next/head';
import { HomeModule } from '../modules/home';

export const Users = () => {

	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="dashboard" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HomeModule />
		</>
	);
}

export default Users
