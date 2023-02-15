import Head from 'next/head';
import { SignupModule } from '../../modules/authentication';

export default function Signup() {

    return (
        <>
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="Register a new account with us" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SignupModule />
        </>
    );
}
