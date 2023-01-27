
import Link from 'next/link';
import React from 'react';
import Button from '../../../Button/Button';
import InputGroup from '../../../InputGroup/InputGroup';
import styles from '../profile.module.scss';

const ChangePassword = () => {
    return (
        <div className={styles.wrap}>
            <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '20px'
            }} >
                Forgot or never set up your password? <Link href='/recover-pass' > Request a new password here</Link>.
            </p>

            <InputGroup
                id='cur-pass'
                label='Verify Current Password'
                required
            >
                <input type="password" id="cur-pass" />
            </InputGroup>

            <InputGroup
                id='new-pass'
                label='New Password'
                required
            >
                <input type="password" id="new-pass" />
            </InputGroup>

            <InputGroup
                id='confirm-new-pass'
                label='Confirm New Password'
                required
            >
                <input type="password" id="confirm-new-pass" />
            </InputGroup>

            <Button
                text='Save Changes'
                variant='transparent'
                style={{
                    marginTop: '36px',
                    maxWidth: 'max-content',
                }}
            />
        </div>
    );
};

export default ChangePassword;
