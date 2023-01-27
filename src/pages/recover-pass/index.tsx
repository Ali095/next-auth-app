
import Head from 'next/head';
import Link from 'next/link';
import AuthForm from '../../template-parts/Auth/AuthForm/AuthForm';
import AuthHints from '../../template-parts/Auth/AuthHints/AuthHints';
import AuthTitle from '../../template-parts/Auth/AuthTitle/AuthTitle';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Recover Password</title>
                <meta name="description" content="Recover Password" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AuthForm varient='signIn' onValidSubmit={() => ''} />
            <AuthTitle>Recover your password</AuthTitle>

            <p style={{ marginBottom: '6px' }}>Enter your email address and we&apos;ll send you a verification code to recover your password.</p>

            <button className="btn__primary">Next</button>

            <AuthHints style={{ marginTop: '12px' }}>
                <Link href='/signin'>Back to sign in</Link>
            </AuthHints>
        </>
    );
}
