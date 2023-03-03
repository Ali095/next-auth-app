
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { AuthHelper } from '../../common/auth';
import { UseACL } from '../../components/AccessControl';
import { CustomAlert } from '../../components/Alert';
import { InputGroup } from '../../components/Input';
import { Layout, Section, SectionHeader, SectionTitle } from '../../components/Layout';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { IUserCreation } from '../authentication/@types';
import { RolesList } from '../roles/@types';
import roleService from '../roles/roles.service';
import { emptyUserDetails, UserDetails } from '../users/@types';
import userService from '../users/user.service';
import { ProfileInput } from './widgets/ProfileInput';

export const ProfileModule = ({ userId = -1 }: { userId: number }) => {
	const [rolesOptions, setRolesOption] = useState<RolesList[]>([]);
	const [selectedRole, setSelectedRole] = useState<RolesList>({ value: -2, label: 'Please Select' });
	const [waiting, setWaiting] = useState<{ profileData?: boolean, rolesData?: boolean, profileUpdate?: boolean }>();
	const [alertMessage, setAlertMessage] = useState<{ heading: string; description: string; success?: boolean }>();
	const [profileData, setProfileData] = useState<UserDetails>(emptyUserDetails);

	const fetchRoles = async () => {
		setWaiting({ ...waiting, rolesData: true });
		const res = await roleService.getRolesList({ limit: 50 });
		setRolesOption(res.payload);
		setWaiting({ ...waiting, rolesData: false });
	};

	const fetchUserProfileDetails = async (userId: number) => {
		setWaiting({ ...waiting, profileData: true });
		const userData: UserDetails = await userService.getUsersDetails(userId);
		if (userData.id === -1) setAlertMessage({ description: 'Unable to fetch user details', heading: 'User Fetching Failed' });
		else setAlertMessage(undefined);
		setProfileData(userData);
		setWaiting({ ...waiting, profileData: false });
	}

	useEffect(() => {
		let fetchProfileOf: number = userId;
		if (fetchProfileOf === -1) { // self profile
			const { user } = AuthHelper.getLoggedInUserData();
			fetchProfileOf = user.id;
		} else fetchRoles();
		fetchUserProfileDetails(fetchProfileOf);
	}, []);

	const validationSchema = Yup.object().shape({
		// email: Yup.string()
		// 	.required('Email is required')
		// 	.email('Email is invalid'),
		// password: Yup.string()
		// 	.required('Password is required')
		// 	.matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Too weak password'),
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		username: Yup.string().optional(),
		company: Yup.string().optional(),
		timezone: Yup.string().optional(),
	});

	// get functions to build form with useForm() hook
	const { register, handleSubmit, formState, setValue } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			firstName: profileData.firstName,
			lastName: profileData.lastName,
			company: profileData.company,
			timezone: profileData.timeZone
		}
	});
	const { errors } = formState;

	useEffect(() => {
		setValue('firstName', profileData.firstName);
		setValue('lastName', profileData.lastName);
		setValue('company', profileData.company);
		setValue('timezone', profileData.timeZone);
	}, [profileData, setValue]);

	const handleFormSubmit = async (data: FieldValues) => {
		setWaiting({ profileUpdate: true });
		setAlertMessage(undefined);
		const dataToUpdate: Partial<IUserCreation> = {
			first_name: data.firstName,
			last_name: data.lastName,
			username: data.username,
			company: data.company,
			timezone: data.timezone
		}
		if (userId !== -1 && selectedRole.value !== -2)
			dataToUpdate.roles = [selectedRole.value];

		const res = await userService.updateUser(profileData.id, dataToUpdate);
		if (res.success)
			setAlertMessage({ success: true, heading: 'Profile updated successfully', description: 'The details of user updated successfully' });
		else
			setAlertMessage({ heading: 'Profile Updation Failed successfully', description: res.message });
		setWaiting({ profileUpdate: true });
	}

	return (
		<Layout screen='settings'>
			<Section>
				<SectionHeader>
					<SectionTitle>My Profile</SectionTitle>
				</SectionHeader>

				{waiting?.profileData ? <Loader /> :
					<Form noValidate
						onSubmit={handleSubmit(handleFormSubmit)}
						style={{ maxWidth: '800px' }}
						className='form'
					>
						<InputGroup label='Email' required>
							<ProfileInput
								value={profileData.email}
								variant='email'
							/>
						</InputGroup>

						<InputGroup label='Username' required>
							<ProfileInput
								value={profileData.username}
								variant='username'
							/>
						</InputGroup>

						<InputGroup label='Password' required>
							<ProfileInput
								value='••••••••'
								variant='password'
							/>
						</InputGroup>

						<InputGroup label='First Name' required>
							<Form.Control isInvalid={Boolean(errors.firstName)} {...register('firstName')} type="text" placeholder="Enter first name" />
							<Form.Control.Feedback type='invalid'>{errors.firstName?.message?.toString()}</Form.Control.Feedback>
						</InputGroup>

						<InputGroup label='Last Name' required>
							<Form.Control isInvalid={Boolean(errors.lastName)} {...register('lastName')} type="text" placeholder="Enter last name" />
							<Form.Control.Feedback type='invalid'>{errors.lastName?.message?.toString()}</Form.Control.Feedback>
						</InputGroup>

						<UseACL self={userId === -1} selfEligible={false} requiredPermissions={['update.user.role']} >
							<InputGroup label='Select Role' required>
								<Select
									value={selectedRole}
									options={rolesOptions}
									onChange={r => setSelectedRole({ value: Number(r.value), label: r.label })}
									style={{ maxWidth: '100%' }}
									loading={waiting?.rolesData}
								/>
								{selectedRole?.value === -1 && <p style={{ display: 'block' }} className='invalid-feedback'>Role is required</p>}
							</InputGroup>
						</UseACL>

						<InputGroup label='Company'>
							<Form.Control isInvalid={Boolean(errors.company)} {...register('company')} type="text" placeholder="Enter company" />
							<Form.Control.Feedback type='invalid'>{errors.company?.message?.toString()}</Form.Control.Feedback>
						</InputGroup>

						<InputGroup label='Timezone'>
							<Form.Control isInvalid={Boolean(errors.timezone)} {...register('timezone')} type="text" placeholder="Enter timezone" />
							<Form.Control.Feedback type='invalid'>{errors.timezone?.message?.toString()}</Form.Control.Feedback>
						</InputGroup>

						{alertMessage && <CustomAlert type={alertMessage.success ? 'success' : 'danger'} heading={alertMessage.heading} content={String(alertMessage.description)} />}

						<button
							disabled={waiting?.profileUpdate}
							type='submit'
							className='btn__primary'
							style={{ maxWidth: 'max-content', marginTop: '24px' }}
						>
							{waiting?.profileUpdate ? <Loader width={40} height={40} /> : 'Save Changes'}
						</button>

					</Form>
				}
			</Section>
		</Layout>
	);
}
