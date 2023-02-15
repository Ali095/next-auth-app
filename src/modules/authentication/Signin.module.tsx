import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthHelper } from '../../common/auth';
import { errorHandler } from '../../common/handlers';
import { authService } from './';
import { AuthForm } from './widgets/AuthForm';

let loaded = false;

export function SignInModule() {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		// redirect to home if already logged in
		if (AuthHelper.isUserLoggedIn() && !loaded) {
			Router.push('/');
		}
		loaded = true;
	});

	const handleSigin = async (data: any) => {
		const { email, password } = data;
		setLoading(true); setErrorMessage('');

		const { success } = await authService.signin(email, password)
			.catch(e => errorHandler(e, false, setErrorMessage(e.message)));
		setLoading(false);

		if (success) {
			toast.success('Authenticated Successfully');
			const returnUrl = Router.query.returnUrl?.toString() || '/';
			Router.push(returnUrl);
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

