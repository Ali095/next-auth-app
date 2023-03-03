
import Link from 'next/link';
import React from 'react';
import { InputGroup } from '../../../components/Input';
import styles from './styles/profile.module.scss';

export const ChangePassword = () => {
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

            <button
                type='button'
                className='btn__transparent'
                style={{
                    marginTop: '36px',
                    maxWidth: 'max-content',
                }}
            >Save Changes</button>
        </div>
    )
}
