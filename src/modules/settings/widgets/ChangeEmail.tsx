
import React from 'react';
import { InputGroup } from '../../../components/Input';
import styles from './styles/profile.module.scss';

export const ChangeEmail = () => {
    return (
        <div className={styles.wrap}>
            <InputGroup
                label='Enter New Email'
                id='change-email'
                required
            >
                <input type="email" name="" id="change-email" />
            </InputGroup>

            <button
                type='button'
                className='btn__transparent'
                style={{ marginTop: '42px' }}
            >Save Changes</button>
        </div>
    )
}
