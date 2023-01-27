import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getUserAuthentication } from '../../lib/auth-validator';
import logger from '../../lib/logger';
import { authService } from '../../services/auth.service';
import AuthForm from '../../template-parts/Auth/AuthForm/AuthForm';

let loaded = false;

export default function Signup() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // redirect to home if already logged in
        if (getUserAuthentication() && !loaded) {
            router.push('/');
        }
        loaded = true;
    });

    const handleSigup = async (data: any) => {
        const { email, password } = data;
        setLoading(true);
        try {
            await authService.signup(email, password);
            // get return url from query parameters or default to '/'
            const returnUrl = router.query.returnUrl?.toString() || '/';
            router.push(returnUrl);
        } catch (error) {
            logger.ApiError('Signup API failed', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="sign in" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AuthForm
                varient='signUp'
                onValidSubmit={handleSigup}
                loading={loading}
            />
        </>
    );
}
