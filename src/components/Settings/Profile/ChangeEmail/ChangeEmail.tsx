
import React from 'react';
import Button from '../../../Button/Button';
import InputGroup from '../../../InputGroup/InputGroup';
import styles from '../profile.module.scss';

const ChangeEmail = () => {
    return (
        <div className={styles.wrap}>
            <InputGroup
                label='Enter New Email'
                id='change-email'
                required
            >

                <input type="email" name="" id="change-email" />
            </InputGroup>

            <InputGroup
                label='Confirm New Email'
                id='change-email'
                required
            >

                <input type="email" name="" id="change-email" />
            </InputGroup>

            <Button
                text='Save Changes'
                variant='transparent'
                style={{
                    marginTop: '42px'
                }}
            />
        </div>
    );
};

export default ChangeEmail;
