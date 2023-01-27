
import React, { useState } from 'react';
import Modal from '../../../Modal/Modal';
import ChangeEmail from '../ChangeEmail/ChangeEmail';
import ChangePassword from '../ChangePassword/ChangePassword';
import styles from '../profile.module.scss';

type ProfileInputProps = {
    value: string
    variant: 'email' | 'password'
}

const ProfileInput = ({ value, variant }: ProfileInputProps) => {
    const [openModal, setOpenModal] = useState(false);

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
    );
};

export default ProfileInput;
