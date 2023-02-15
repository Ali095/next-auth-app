
import { CSSProperties, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import * as Yup from 'yup';
import { Icon } from '../../../components/Icons';
import styles from './styles/auth.module.scss';
import AuthButton from './AuthButton';
import AuthDivider from './AuthDivider';
import AuthHints from './AuthHints';
import AuthTitle from './AuthTitle';
import feildStyles from './styles/input.module.scss';
import { CustomAlert } from '../../../components/Alert';




export type AuthFormProps = {
    varient: 'signIn' | 'signUp'
    onValidSubmit: (data: any) => void
    onInvalidSubmit?: (data: any) => void
    style?: CSSProperties
    loading?: boolean,
    authError?: boolean | string
}

export const AuthForm = ({ varient, loading, style, onValidSubmit, onInvalidSubmit, authError = false, ...props }: AuthFormProps) => {
    const [passHidden, setPassHidden] = useState(true);
    const [inputType, setInputType] = useState('password');

    useEffect(() => {
        passHidden ? setInputType('password') : setInputType('text');

    }, [inputType, passHidden]);

    function togglePasswordView() {
        setPassHidden(prev => !prev);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                varient === 'signIn' ? 'Invalid password provided' : 'Too weak password'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return <>
        <Form noValidate onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            style={style}
            className={styles.form}
            {...props}
        >

            <AuthTitle>{varient === 'signIn' ? 'Sign In' : 'Create Account'}</AuthTitle>
            <AuthButton name='google' variant='blue' />
            <AuthButton name='apple' variant='black' />
            <AuthDivider />

            <Form.Group className={`${feildStyles.wrap} mb-3`} controlId='formEmail'>
                <Form.Control isInvalid={Boolean(errors.email)} {...register('email')} type="text" placeholder="Enter email" />
                <Form.Control.Feedback type='invalid' tooltip>{errors.email?.message?.toString()}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={`${feildStyles.wrap} mb-3`} controlId='formPassword'>
                <Form.Control style={{ backgroundImage: 'none' }} isInvalid={Boolean(errors.password)} {...register('password')} type={inputType} placeholder="Enter password" />
                <Form.Control.Feedback type='invalid' tooltip>{errors.password?.message?.toString()}</Form.Control.Feedback>
                <button type='button' className={feildStyles['pass-switch']} onClick={togglePasswordView}>
                    <Icon name={`${passHidden ? 'passHide' : 'passView'}`} />
                </button>
            </Form.Group>

            {authError && <CustomAlert type='danger' heading={`${varient === 'signIn' ? 'Authentication' : 'Registration'} Failed`} content={String(authError)} />}

            <button disabled={loading} type='submit' className="btn__primary">
                {loading ? <Bars color='#fff' height={40} /> : varient === 'signIn' ? 'Sign In' : 'Create Account'}
            </button>

            {varient === 'signIn' &&
                <AuthHints style={{ marginTop: '12px' }}>
                    Don&apos;t have an account? <Link href='/signup'>Create Account</Link>
                </AuthHints>
            }

            {varient === 'signUp' &&
                <AuthHints style={{ marginTop: '12px' }}>
                    Already have an account? <Link href='/signin'>Sign in</Link>
                </AuthHints>
            }

            <AuthHints>
                Forgot Password? <Link href='/recover-pass'>Reset Password</Link>
            </AuthHints>

        </Form>

        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '15px' }}>
            By continuing you accept our
            <Link
                href='/terms'
                style={{ color: 'var(--clr-brand-primary)', fontWeight: '600', margin: '0 6px' }}
            >
                Terms of Service
            </Link>
            and
            <Link
                href="privacy"
                style={{ color: 'var(--clr-brand-primary)', fontWeight: '600', margin: '0 6px' }}
            >
                Privacy Policy
            </Link>
        </p>
    </>
}
