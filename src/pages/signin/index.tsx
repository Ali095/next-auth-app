
import Head from 'next/head';
import { SignInModule } from '../../modules/authentication';


export default function SignIn() {
    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="description" content="sign in" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SignInModule />
        </>
    );
}

