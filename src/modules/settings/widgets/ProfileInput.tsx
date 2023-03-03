
import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { authService } from '../../authentication';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import styles from './styles/profile.module.scss';

type ProfileInputProps = {
	value: string
	variant: 'email' | 'password' | 'username'
}

export const ProfileInput = ({ value, variant }: ProfileInputProps) => {
	const [openModal, setOpenModal] = useState(false);

	// const handleAuthDataUpdate = async (params: { email?: string; password?: string; username?: string }) => {

	// }

	return (
		<>
			<div
				className={styles.email}
				onClick={() => setOpenModal(true)}
			>
				<span className={styles.placeholder}>{value}</span>
				<span className={styles.cta}>Change {variant}</span>
			</div>

			<Modal
				isOpen={openModal}
				handleClose={() => setOpenModal(false)}
				id='change-credentials'
				title={`Change ${variant}`}
			>
				{variant === 'email' && <ChangeEmail />}
				{variant === 'password' && <ChangePassword />}
			</Modal>
		</>
	)
}

