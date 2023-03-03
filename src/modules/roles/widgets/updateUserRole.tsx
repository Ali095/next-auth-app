
import { useEffect, useState } from 'react';
import { InputGroup } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { RolesList } from '../@types';
import roleService from '../roles.service';
import styles from './styles/form.module.scss';

export type UpdateUserRoleProps = {
	loading?: boolean;
	currentRole?: Partial<RolesList>
	rolesOptionsList?: RolesList[];
	onSubmit?: (newRoleId: number) => any;
	onDiscard?: () => void;
}

export const UpdateUserRole = ({ loading = false, onSubmit, onDiscard, currentRole, rolesOptionsList }: UpdateUserRoleProps) => {
	const [waiting, setWaiting] = useState(false);
	const [rolesOptions, setRolesOption] = useState<RolesList[]>([]);
	const [selectedRole, setSelectedRole] = useState<RolesList>();

	const fetchRoles = async () => {
		setWaiting(true);
		let options: RolesList[] = [];
		if (rolesOptionsList) {
			options = rolesOptionsList;
			setRolesOption(options);
		} else {
			const res = await roleService.getRolesList({ limit: 50 });
			options = res.payload;
			setRolesOption(options);
		}
		setSelectedRole(options.find(r => (currentRole?.value && currentRole?.value === r.value) || (currentRole?.label && r.label === currentRole.label)));
		setWaiting(false);
	};

	useEffect(() => {
		fetchRoles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = () => {
		if (selectedRole && selectedRole.value !== -1)
			if (currentRole?.value !== selectedRole.value || currentRole?.label !== selectedRole.label)
				onSubmit && onSubmit(selectedRole.value);
			else onDiscard && onDiscard()
	}

	return (
		<div className={styles.wrap}>
			<InputGroup label='Select Role' required>
				{currentRole?.label && <small>Current Role: {currentRole?.label}</small>}
				<Select
					value={selectedRole}
					options={rolesOptions}
					onChange={r => setSelectedRole({ value: Number(r.value), label: r.label })}
					style={{ maxWidth: '100%' }}
				/>
				{selectedRole?.value === -1 && <p style={{ display: 'block' }} className='invalid-feedback'>Please select role</p>}
			</InputGroup>

			<div className={styles.actions}>
				<button
					className="btn__transparent"
					onClick={onDiscard}
					type='button'
				>
					Discard
				</button>
				<button
					disabled={loading || waiting || selectedRole?.value === -1}
					className="btn__primary"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</div >
	);
};

