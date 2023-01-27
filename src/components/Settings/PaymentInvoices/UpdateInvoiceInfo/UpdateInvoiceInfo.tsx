
import React, { ChangeEvent, useState } from 'react';
import Checkbox from '../../../Checkbox/Checkbox';
import CheckboxGroup from '../../../Checkbox/CheckboxGroup';
import InputGroup from '../../../InputGroup/InputGroup';
import Modal from '../../../Modal/Modal';
import styles from './update.module.scss';

const UpdateInvoiceInfo = () => {
    const [openModal, setOpenModal] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    return (
        <div className={styles.wrap}>
            <p>Add your company name and email address to invoice receipts</p>
            <button
                className="btn__transparent"
                onClick={() => setOpenModal(true)}
            >Update Info</button>

            <Modal
                isOpen={openModal}
                handleClose={() => setOpenModal(false)}
                id="invoice-info"
                title='Update invoice info'
            >
                <div style={{ padding: '24px 20px 32px' }}>
                    <CheckboxGroup style={{ marginBottom: '24px' }}>
                        <Checkbox
                            id='email-invoice'
                            checked={showEmail}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setShowEmail(e.target.checked)}
                        />
                        <label htmlFor="email-invoice">Email a copy of paid invoices</label>
                    </CheckboxGroup>

                    {
                        showEmail && <InputGroup label='Email where you want invoices sent' >
                            <input type="email" />
                            <small>Defaults to your accounts email address if left empty</small>
                        </InputGroup>
                    }

                    <InputGroup label='Company Name' >
                        <input type="text" />
                    </InputGroup>

                    <InputGroup label='Company Address' >
                        <textarea />
                    </InputGroup>

                    <button
                        className="btn__primary"
                        style={{
                            maxWidth: 'max-content',
                            marginTop: '32px',
                            marginLeft: 'auto',
                        }}
                    >Save Changes</button>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateInvoiceInfo;
