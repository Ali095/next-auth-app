
import React, { CSSProperties, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles/add.user.module.scss';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { CustomAlert } from '../../../components/Alert';
import { InputGroup } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { RolesList } from '../../roles/@types';
import roleService from '../../roles/roles.service';
import { Loader } from '../../../components/Loader';
import { IUserCreation } from '../../authentication/@types';

export type AddUserProps = {
    onValidSubmit?: (data: IUserCreation) => any
    style?: CSSProperties
    loading?: boolean,
    error?: boolean | string
    onDiscard?: () => any;
}

export const AddUser = ({ loading = false, style, onValidSubmit, error = false, onDiscard, ...props }: AddUserProps) => {
    const [passHidden, setPassHidden] = useState(true);
    const [inputType, setInputType] = useState('password');
    const [rolesOptions, setRolesOption] = useState<RolesList[]>([]);
    const [selectedRole, setSelectedRole] = useState<RolesList>({ value: -2, label: 'Please Select' });
    const [waiting, setWaiting] = useState(false);

    const fetchRoles = async () => {
        setWaiting(true);
        const res = await roleService.getRolesList({ limit: 50 });
        setRolesOption(res.payload);
        setWaiting(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        passHidden ? setInputType('password') : setInputType('text');

    }, [inputType, passHidden]);

    const togglePasswordView = () => {
        setPassHidden(prev => !prev);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Too weak password'),
        username: Yup.string().required('Username is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const handleFormSubmit = (data: FieldValues) => {
        console.log(data);
        onValidSubmit && onValidSubmit({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            username: data.username,
            roles: [selectedRole.value],
            company: data.company,
            timezone: data.timezone
        });
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.body}>
                <Form noValidate onSubmit={handleSubmit(handleFormSubmit)}
                    style={style}
                    className={styles.form}
                    {...props}
                >

                    <InputGroup label='First Name' required>
                        <Form.Control isInvalid={Boolean(errors.firstName)} {...register('firstName')} type="text" placeholder="Enter first name" />
                        <Form.Control.Feedback type='invalid'>{errors.firstName?.message?.toString()}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup label='Last Name' required>
                        <Form.Control isInvalid={Boolean(errors.lastName)} {...register('lastName')} type="text" placeholder="Enter last name" />
                        <Form.Control.Feedback type='invalid'>{errors.lastName?.message?.toString()}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup label='Select Role' required>
                        <Select
                            value={selectedRole}
                            options={rolesOptions}
                            onChange={r => setSelectedRole({ value: Number(r.value), label: r.label })}
                            style={{ maxWidth: '100%' }}
                            loading={waiting}
                        />
                        {selectedRole?.value === -1 && <p style={{ display: 'block' }} className='invalid-feedback'>Role is required</p>}
                    </InputGroup>

                    <InputGroup label='Email' required>
                        <Form.Control isInvalid={Boolean(errors.email)} {...register('email')} type="text" placeholder="Enter email" />
                        <Form.Control.Feedback type='invalid'>{errors.email?.message?.toString()}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup label='Username'>
                        <Form.Control isInvalid={Boolean(errors.username)} {...register('username')} type="text" placeholder="Enter username" />
                        <Form.Control.Feedback type='invalid'>{errors.username?.message?.toString()}</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup label='Password' required>
                        <Form.Control isInvalid={Boolean(errors.password)} {...register('password')} type={inputType} placeholder="Enter password" />
                        <Form.Control.Feedback type='invalid'>{errors.password?.message?.toString()}</Form.Control.Feedback>
                    </InputGroup>

                    {error && <CustomAlert type='danger' heading={`User Creation Failed`} content={String(error)} />}

                    <div className={styles.footer}>
                        <button
                            type='submit'
                            className="btn__primary"
                            style={{ maxWidth: 'max-content' }}
                        >{loading ? <Loader width={40} height={40} /> : 'Submit'}</button>

                        <button
                            type='button'
                            className="btn__transparent"
                            onClick={onDiscard}
                        >Cancel</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}


