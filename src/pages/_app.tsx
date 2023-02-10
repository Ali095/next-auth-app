// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/globals.scss';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Progressbar from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { AuthHelper } from '../lib/AuthHelper';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // run auth check on initial load
        authCheck(router.asPath);

        // set authorized to false to hide page content while changing routes
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
    });

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/signin', '/signup', '/recover-pass'];
        const path = url.split('?')[0];
        if (!AuthHelper.isUserLoggedIn() && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/signin',
                query: { returnUrl: url }
            });
        } else {
            setAuthorized(true);
        }
    }

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Progressbar />
        {authorized && <Component {...pageProps} />}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>;
};
