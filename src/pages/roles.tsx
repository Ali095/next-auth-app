
import Head from 'next/head';
import { RolesModule } from '../modules/roles';

export const Roles = () => {
    return (
        <>
            <Head>
                <title>Dashboard | Roles</title>
                <meta name="description" content="dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <RolesModule />
        </>
    );
}

export default Roles;
