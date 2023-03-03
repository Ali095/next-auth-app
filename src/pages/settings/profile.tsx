
import { ProfileModule } from '../../modules/settings';
import Head from 'next/head';

const Profile = () => {

	return (
		<>
			<Head>
				<title>User Profile</title>
				<meta name="description" content="User Profile" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ProfileModule />
		</>
	);
}

export default Profile;
