
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthHelper } from '../../lib/AuthHelper';
import { errorHandler } from '../../lib/handlers';
import { authService } from '../../services/user_service';
import AuthForm from '../../template-parts/Auth/AuthForm/AuthForm';

let loaded = false;

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // redirect to home if already logged in
        if (AuthHelper.isUserLoggedIn() && !loaded) {
            router.push('/');
        }
        loaded = true;
        console.log("loader Afte r=>",loaded);
    });

    const handleSigin = async (data: any) => {
        const { email, password } = data;
        setLoading(true); setErrorMessage('');

        const { success } = await authService.signin(email, password)
            .catch(e => errorHandler(e, false, setErrorMessage(e.message)));
        setLoading(false);

        if (success) {
            toast.success('Authenticated Successfully');
            const returnUrl = router.query.returnUrl?.toString() || '/';
            router.push(returnUrl);
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
                authError={errorMessage}
            />
        </>
    );
}

