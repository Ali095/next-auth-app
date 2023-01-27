
import { CSSProperties, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Bars } from 'react-loader-spinner';
import * as Yup from 'yup';
import Icon from '../../../components/Icons/Icons';
import styles from '../auth.module.scss';
import AuthButton from '../AuthButton/AuthButton';
import AuthDivider from '../AuthDivider/AuthDivider';
import AuthHints from '../AuthHints/AuthHints';
import AuthTitle from '../AuthTitle/AuthTitle';
import feildStyles from '../input.module.scss';


type AuthFormProps = {
    varient: 'signIn' | 'signUp'
    onValidSubmit: (data: any) => void
    onInvalidSubmit?: (data: any) => void
    style?: CSSProperties
    loading?: boolean
}

const AuthForm = ({ varient, loading, style, onValidSubmit, onInvalidSubmit, ...props }: AuthFormProps) => {
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

            <button type='submit' className="btn__primary">
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








        {/* <form
            onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            style={style}
            className={styles.form}
            {...props}
        >
            <AuthTitle>{varient === 'signIn' ? 'Sign In' : 'Create Account'}</AuthTitle>
            <AuthButton name='google' variant='blue' />
            <AuthButton name='apple' variant='black' />
            <AuthDivider />

            <div className={feildStyles.wrap}>
                <input
                    type='text'
                    placeholder='Email'
                    className={`input ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email')}
                />
                <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
            </div>

            <div className={feildStyles.wrap}>
                <input
                    type={inputType}
                    placeholder={varient === 'signIn' ? 'Password' : 'Set a Password'}
                    className={`input ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password')}
                />
                <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                <button
                    className={feildStyles['pass-switch']}
                    onClick={togglePasswordView}
                    type="button"
                >
                    <Icon name={`${passHidden ? 'passHide' : 'passView'}`} />
                </button>
            </div>

            <div style={{ width: '100%' }} className="alert alert-danger" role="alert">
                Invalid Login Credentials
            </div>

            <div style={{ width: '100%' }} className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Authentication Error!</strong><br /> Invalid login credentials are provided
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <button type='submit' className="btn__primary">
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
        </form> */}

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

export default AuthForm;
