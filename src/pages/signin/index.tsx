
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getUserAuthentication } from '../../lib/auth-validator';
import logger from '../../lib/logger';
import { authService } from '../../services/auth.service';
import AuthForm from '../../template-parts/Auth/AuthForm/AuthForm';

let loaded = false;

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // redirect to home if already logged in
        if (getUserAuthentication() && !loaded) {
            router.push('/');
        }
        loaded = true;
    });

    const handleSigin = async (data: any) => {
        logger.log(typeof data, data);
        const { email, password } = data;
        setLoading(true);
        try {
            await authService.signin(email, password);
            const returnUrl = router.query.returnUrl?.toString() || '/';
            setLoading(false);
            router.push(returnUrl);

        } catch (error) {
            logger.ApiError('Signin API failed', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="description" content="sign in" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AuthForm
                varient='signIn'
                onValidSubmit={handleSigin}
                loading={loading}
            />


        </>
    );
}

